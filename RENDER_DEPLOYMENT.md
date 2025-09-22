# Render Deployment Guide for NyayaSetu.AI

## Prerequisites

1. A Render account (sign up at https://render.com)
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. Required environment variables (see below)

## Environment Variables

You need to set up the following environment variables in your Render dashboard:

### Required Environment Variables

1. **GEMINI_API_KEY** (Required)
   - Your Google Gemini API key
   - Get it from: https://makersuite.google.com/app/apikey
   - Format: `AIzaSy...` (starts with AIzaSy)

2. **DATABASE_URL** (Required)
   - Your PostgreSQL database connection string
   - Format: `postgresql://username:password@host:port/database`
   - You can use Render's managed PostgreSQL service or any other PostgreSQL provider

3. **NODE_ENV** (Optional)
   - Set to `production` (automatically set by Render)

4. **PORT** (Optional)
   - Port number (automatically set by Render to 10000)

## Deployment Steps

### Method 1: Using render.yaml (Recommended)

1. **Push your code to Git repository**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Connect to Render**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your Git repository

3. **Configure the service**
   - Render will automatically detect the `render.yaml` file
   - The configuration is already set up for you

4. **Set Environment Variables**
   - In the Render dashboard, go to your service
   - Navigate to "Environment" tab
   - Add the required environment variables listed above

5. **Deploy**
   - Click "Deploy" and wait for the build to complete
   - Your app will be available at `https://your-app-name.onrender.com`

### Method 2: Manual Configuration

If you prefer to configure manually:

1. **Service Type**: Web Service
2. **Build Command**: `npm install && npm run build`
3. **Start Command**: `npm start`
4. **Node Version**: 20.x (or latest)
5. **Plan**: Free (or paid if you need more resources)

## Project Structure

This is a full-stack application with:
- **Frontend**: React + Vite (served from `/dist/public`)
- **Backend**: Express.js server (serves both API and static files)
- **Database**: PostgreSQL with Drizzle ORM

## Build Process

The build process:
1. Installs all dependencies (`npm install`)
2. Builds the frontend with Vite (`vite build`)
3. Bundles the backend with esbuild (`esbuild server/index.ts`)
4. Outputs everything to the `dist/` directory

## CORS Configuration

The app is configured to allow requests from:
- Local development (localhost:3000, 3001, 5173)
- Netlify deployments
- Render deployments (*.onrender.com)

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check that all dependencies are in `package.json`
   - Ensure Node.js version is 20.x or higher
   - Check build logs for specific errors

2. **App Crashes on Start**
   - Verify all required environment variables are set
   - Check that `GEMINI_API_KEY` is valid
   - Ensure `DATABASE_URL` is correct and accessible

3. **CORS Errors**
   - Make sure your frontend domain is in the allowed origins list
   - Check that the backend URL is correct

4. **Database Connection Issues**
   - Verify `DATABASE_URL` format
   - Ensure database is accessible from Render's IP ranges
   - Check if SSL is required

### Logs

- View logs in the Render dashboard under "Logs" tab
- Check both build logs and runtime logs
- Look for specific error messages

## Performance Considerations

- **Free Plan Limitations**:
  - Service sleeps after 15 minutes of inactivity
  - Cold start takes ~30 seconds
  - 750 hours per month limit

- **Upgrading to Paid Plan**:
  - Eliminates sleep mode
  - Faster cold starts
  - More resources (CPU, RAM)

## Security Notes

- Never commit API keys or secrets to your repository
- Use Render's environment variables for sensitive data
- Consider using Render's managed database for production
- Enable HTTPS (automatically provided by Render)

## Support

- Render Documentation: https://render.com/docs
- Render Community: https://community.render.com
- Project Issues: Create an issue in your repository
