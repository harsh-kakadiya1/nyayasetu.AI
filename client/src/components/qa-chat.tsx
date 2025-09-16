import { useState, useEffect } from "react";
import { Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { API_ENDPOINTS } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface ChatMessage {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
}

interface QAChatProps {
  analysisId: string;
  documentContent: string;
}

export default function QAChat({ analysisId, documentContent }: QAChatProps) {
  const [question, setQuestion] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch existing chat messages
  const { data: messages = [] } = useQuery<ChatMessage[]>({
    queryKey: [API_ENDPOINTS.analysis.getMessages(analysisId)],
    enabled: !!analysisId,
  });

  // Mutation for asking questions
  const askQuestionMutation = useMutation({
    mutationFn: async (questionText: string) => {
      const response = await apiRequest('POST', API_ENDPOINTS.analysis.askQuestion(analysisId), {
        question: questionText,
      });
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch messages
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.analysis.getMessages(analysisId)] });
      setQuestion("");
      toast({
        title: "Question answered",
        description: "Your question has been answered successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to answer question",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    askQuestionMutation.mutate(question.trim());
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 analysis-card" data-testid="card-qa-chat">
      <h3 className="text-lg font-semibold text-foreground mb-4" data-testid="text-qa-title">
        Ask Questions About This Document
      </h3>
      
      {/* Chat Messages */}
      <ScrollArea className="bg-muted/30 rounded-lg p-4 mb-4 h-64" data-testid="area-chat-messages">
        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div key={message.id} className="space-y-2">
                {/* User Question */}
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-xs" data-testid={`message-question-${message.id}`}>
                    <p className="text-sm">{message.question}</p>
                  </div>
                </div>
                {/* AI Answer */}
                <div className="flex justify-start">
                  <div className="bg-card border border-border rounded-lg p-3 max-w-md" data-testid={`message-answer-${message.id}`}>
                    <p className="text-sm text-foreground whitespace-pre-wrap">
                      {message.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-sm" data-testid="text-no-messages">
                Ask any question about this document to get started.
              </p>
            </div>
          )}
          
          {/* Loading indicator for new question */}
          {askQuestionMutation.isPending && (
            <div className="space-y-2">
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-xs" data-testid="message-pending-question">
                  <p className="text-sm">{question}</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-card border border-border rounded-lg p-3 max-w-md" data-testid="message-pending-answer">
                  <div className="flex items-center space-x-3">
                    <div className="loading-dots">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <p className="text-sm text-muted-foreground">Analyzing your question...</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="flex space-x-2" data-testid="form-chat-input">
        <Input
          type="text"
          placeholder="Ask a question about this document..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={askQuestionMutation.isPending}
          className="flex-1"
          data-testid="input-question"
        />
        <Button 
          type="submit" 
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={askQuestionMutation.isPending || !question.trim()}
          data-testid="button-send-question"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
