# Multi-Language Setup Guide for NyayaSetu AI

## Overview
NyayaSetu AI now supports multiple languages including English, Hindi, Gujarati, Marathi, Tamil, and Bengali. This guide explains how to set up and use the multi-language features.

## Prerequisites
Before setting up the multi-language features, ensure you have the required dependencies installed:

```bash
npm install react-i18next i18next i18next-browser-languagedetector i18next-http-backend
```

## Supported Languages

| Language | Code | Native Name |
|----------|------|-------------|
| English  | en   | English     |
| Hindi    | hi   | हिन्दी      |
| Gujarati | gu   | ગુજરાતી     |
| Marathi  | mr   | मराठी       |
| Tamil    | ta   | தமிழ்       |
| Bengali  | bn   | বাংলা       |

## Features

### 1. **UI Language Switching**
- Language selector in the top navigation
- Persistent language preference (stored in localStorage)
- Automatic language detection based on browser settings

### 2. **Multi-Language Document Analysis**
- AI analysis responses in the selected language
- Legal document summaries in native languages
- Risk assessments and recommendations localized

### 3. **Complete UI Internationalization**
- All interface elements translated
- Form labels, buttons, and messages
- Error messages and notifications
- Footer and navigation elements

## Implementation Details

### Frontend Structure
```
client/src/i18n/
├── index.ts              # i18n configuration
└── locales/
    ├── en.json          # English translations
    ├── hi.json          # Hindi translations
    ├── gu.json          # Gujarati translations
    ├── mr.json          # Marathi translations
    ├── ta.json          # Tamil translations
    └── bn.json          # Bengali translations
```

### Backend Integration
- Language preference passed via `Accept-Language` header
- Gemini AI configured for multi-language responses
- Document analysis adapted to user's language preference

## Usage

### For Users
1. **Changing Language**: Click the language selector in the top-right corner
2. **Document Upload**: Upload documents in any supported language
3. **Analysis**: Receive analysis results in your selected language
4. **Q&A Chat**: Ask questions and get responses in your preferred language

### For Developers
1. **Adding New Languages**:
   ```typescript
   // Add to client/src/i18n/index.ts
   import newLangTranslations from './locales/newlang.json';
   
   const resources = {
     // ... existing languages
     newlang: {
       translation: newLangTranslations
     }
   };
   ```

2. **Adding New Translation Keys**:
   ```json
   {
     "newSection": {
       "newKey": "Translation text"
     }
   }
   ```

3. **Using Translations in Components**:
   ```typescript
   import { useTranslation } from 'react-i18next';
   
   function MyComponent() {
     const { t } = useTranslation();
     return <div>{t('newSection.newKey')}</div>;
   }
   ```

## Configuration

### i18n Configuration
The main configuration is in `client/src/i18n/index.ts`:
- **Fallback Language**: English (en)
- **Detection Order**: localStorage → browser → HTML tag
- **Debug Mode**: Enabled in development

### Gemini AI Language Support
The AI service automatically detects and responds in the user's selected language:
- Document analysis in native language
- Risk assessments with cultural context
- Legal explanations adapted to local legal systems

## Testing

### Manual Testing Checklist
- [ ] Language selector displays all supported languages
- [ ] UI elements update when language is changed
- [ ] Language preference persists across sessions
- [ ] Document analysis returns results in selected language
- [ ] Error messages appear in correct language
- [ ] Q&A chat responds in user's language

### Browser Testing
Test the application in different browsers with various language settings:
- Chrome with Hindi locale
- Firefox with Gujarati locale
- Safari with Tamil locale

## Troubleshooting

### Common Issues

1. **Missing Translations**
   - Check if translation key exists in all language files
   - Verify correct JSON syntax
   - Ensure proper import in i18n configuration

2. **Language Not Switching**
   - Clear localStorage and browser cache
   - Check browser console for JavaScript errors
   - Verify language code matches configuration

3. **AI Responses in Wrong Language**
   - Check `Accept-Language` header in network requests
   - Verify backend language parameter handling
   - Ensure Gemini AI service receives language parameter

### Debug Mode
Enable debug mode in development to see missing translation keys:
```typescript
debug: process.env.NODE_ENV === 'development'
```

## Performance Considerations

- Translation files are loaded on-demand
- Language switching is instant (no page reload)
- Minimal impact on bundle size
- Efficient caching of translation resources

## Future Enhancements

1. **Additional Languages**: Punjabi, Telugu, Kannada, Malayalam
2. **RTL Support**: Arabic, Urdu language support
3. **Regional Variants**: Different dialects and regional preferences
4. **Legal Context**: Region-specific legal terminology and concepts
5. **Voice Input**: Multi-language speech recognition for document queries

## Contributing

When adding new features:
1. Add translation keys to all language files
2. Test with multiple languages
3. Consider cultural and legal context differences
4. Update this documentation

## Support

For issues related to multi-language features:
1. Check this documentation
2. Review browser console for errors
3. Test with different language settings
4. Verify translation file syntax
