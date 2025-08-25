# Medusa PM2 Deployment Template

## Files Needed

### 1. ecosystem.config.js

```javascript
module.exports = {
  apps: [
    {
      name: "medusa-server",
      script: "npm",
      args: "start",
      cwd: "/path/to/your/project/medusa/.medusa/server",
      instances: 1,
      exec_mode: "cluster",

      // Environment variables
      env: {
        NODE_ENV: "production",
        PORT: 9000,
        // Add other environment variables from your .env file here
        // DATABASE_URL: 'your_database_url',
        // JWT_SECRET: 'your_jwt_secret',
        // COOKIE_SECRET: 'your_cookie_secret',
      },

      // Logging
      log_file: "./logs/medusa-combined.log",
      out_file: "./logs/medusa-out.log",
      error_file: "./logs/medusa-error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",

      // Auto-restart settings
      watch: false,
      autorestart: true,
      restart_delay: 1000,
      max_restarts: 10,
      min_uptime: "10s",

      // Memory and performance
      max_memory_restart: "1G",

      // Process management
      kill_timeout: 5000,
      listen_timeout: 3000,

      // Health monitoring
      health_check_grace_period: 3000,

      // Source map support for better error reporting
      source_map_support: true,

      // Merge logs from all instances
      merge_logs: true,

      // Time zone
      time: true,
    },
  ],

  // Optional: deployment configuration
  deploy: {
    production: {
      user: "your-username",
      host: "your-server-ip",
      ref: "origin/main",
      repo: "your-git-repo-url",
      path: "/path/to/your/project",
      "post-deploy":
        "cd medusa && npm install && npx medusa build && pm2 reload ecosystem.config.js --env production",
    },
  },
};
```

### 2. deploy.sh (Deployment Script)

```bash
#!/bin/bash

# Medusa PM2 Deployment Script
# Usage: ./deploy.sh [project-name] [project-path]

PROJECT_NAME=${1:-medusa-server}
PROJECT_PATH=${2:-$(pwd)}

echo "🚀 Starting Medusa deployment for: $PROJECT_NAME"
echo "📁 Project path: $PROJECT_PATH"

# Navigate to project directory
cd "$PROJECT_PATH"

# Build Medusa application
echo "🔨 Building Medusa application..."
npx medusa build

# Copy environment file to build directory
echo "📄 Copying .env file to build directory..."
cp .env .medusa/server/.env.production

# Install dependencies in build directory
echo "📦 Installing dependencies in build directory..."
cd .medusa/server
npm install

# Go back to project root
cd "$PROJECT_PATH"

# Update ecosystem.config.js with current path
echo "⚙️ Updating ecosystem config with project path..."
sed -i "s|/path/to/your/project|$PROJECT_PATH|g" ecosystem.config.js

# Start with PM2
echo "🚦 Starting PM2..."
pm2 start ecosystem.config.js

# Save PM2 configuration
echo "💾 Saving PM2 configuration..."
pm2 save

# Setup PM2 startup
echo "🔄 Setting up PM2 startup..."
pm2 startup

# Show status
echo "✅ Deployment complete! PM2 status:"
pm2 status

echo "📊 To monitor logs: pm2 logs $PROJECT_NAME"
echo "🔄 To restart: pm2 restart $PROJECT_NAME"
echo "🛑 To stop: pm2 stop $PROJECT_NAME"
```

## Deployment Steps

### Manual Deployment:

1. **Create ecosystem.config.js in project root:**

   ```bash
   nano ecosystem.config.js
   ```

   (Copy the config above and update paths)

2. **Build Medusa:**

   ```bash
   npx medusa build
   ```

3. **Setup build environment:**

   ```bash
   cp .env .medusa/server/.env.production
   cd .medusa/server
   npm install
   cd ../..
   ```

4. **Start with PM2:**

   ```bash
   pm2 start ecosystem.config.js
   ```

5. **Save PM2 configuration:**
   ```bash
   pm2 save
   pm2 startup
   ```

### Automated Deployment:

1. **Make script executable:**

   ```bash
   chmod +x deploy.sh
   ```

2. **Run deployment:**
   ```bash
   ./deploy.sh [project-name] [project-path]
   ```

## PM2 Commands Reference

- **Status:** `pm2 status`
- **Logs:** `pm2 logs medusa-server`
- **Restart:** `pm2 restart medusa-server`
- **Stop:** `pm2 stop medusa-server`
- **Delete:** `pm2 delete medusa-server`
- **Monitor:** `pm2 monit`

## Template Customization

Update these placeholders:

- `/path/to/your/project` → Your actual project path
- `your-username` → Your server username
- `your-server-ip` → Your server IP
- `your-git-repo-url` → Your Git repository URL
- Environment variables in the config file

## Notes

- PM2 processes persist after SSH disconnect
- Logs are stored in `./logs/` directory
- Environment variables loaded from `.env.production` in build directory
- PM2 startup ensures auto-restart on server reboot
