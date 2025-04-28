import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BedtimeModal from "@/components/bedtime-modal";

export default function FacebookLogin() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError(true);
      return false;
    } else {
      setEmailError(false);
      return true;
    }
  };

  const validatePassword = () => {
    if (!password.trim()) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
      return true;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    if (isEmailValid && isPasswordValid) {
      // Short delay to simulate form processing
      setTimeout(() => setShowModal(true), 500);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError(false);
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Main container */}
      <div className="flex flex-col md:flex-row items-center justify-center px-4 py-6 md:py-20 w-full max-w-6xl mx-auto">
        
        {/* Left column - Facebook branding */}
        <div className="md:w-1/2 pb-4 md:pb-0 md:pr-12 text-center md:text-left">
          <div className="flex justify-center md:justify-start mb-4">
            <h1 className="text-facebook-blue text-[42px] leading-none font-sans" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontWeight: '700' }}>
              facebook
            </h1>
          </div>
          <h2 className="text-facebook-text-dark text-2xl md:text-3xl font-normal mb-3 max-w-md mx-auto md:mx-0">
            Facebook helps you connect and share with the people in your life.
          </h2>
        </div>
        
        {/* Right column - Login form */}
        <div className="md:w-1/2 w-full max-w-md">
          <div className="bg-white p-4 rounded-lg shadow-md mb-4 animate-fade-in">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="mb-3">
                <Input 
                  type="text" 
                  id="email" 
                  name="email"
                  placeholder="Email address or phone number" 
                  className={`facebook-input w-full p-3 ${emailError ? 'border-red-500' : ''}`}
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={validateEmail}
                />
                {emailError && (
                  <div className="text-red-500 text-xs mt-1">
                    Please enter your email or phone number
                  </div>
                )}
              </div>
              
              <div className="mb-3">
                <Input 
                  type="password" 
                  id="password" 
                  name="password"
                  placeholder="Password" 
                  className={`facebook-input w-full p-3 ${passwordError ? 'border-red-500' : ''}`}
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={validatePassword}
                />
                {passwordError && (
                  <div className="text-red-500 text-xs mt-1">
                    Please enter your password
                  </div>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="facebook-button bg-facebook-blue text-white py-2 px-4 rounded-md font-bold text-xl w-full mb-3 transition duration-200 hover:bg-facebook-blue-dark"
              >
                Log In
              </Button>
            </form>
            
            <div className="text-center mb-4">
              <a href="#" className="text-facebook-blue hover:underline text-sm">Forgotten password?</a>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex justify-center">
              <Button 
                className="create-account-button bg-facebook-green text-white py-2 px-4 rounded-md font-bold text-base transition duration-200 hover:bg-facebook-green-dark"
              >
                Create New Account
              </Button>
            </div>
          </div>
          
          <div className="text-center text-sm">
            <p><a href="#" className="font-bold hover:underline">Create a Page</a> for a celebrity, brand or business.</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-auto py-6 bg-white w-full">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap text-xs text-facebook-text-light">
            <div className="mr-3 mb-1">English (US)</div>
            <div className="mr-3 mb-1">Español</div>
            <div className="mr-3 mb-1">Français (France)</div>
            <div className="mr-3 mb-1">中文(简体)</div>
            <div className="mr-3 mb-1">العربية</div>
            <div className="mr-3 mb-1">Português (Brasil)</div>
            <div className="mr-3 mb-1">Italiano</div>
            <div className="mr-3 mb-1">한국어</div>
            <div className="mr-3 mb-1">Deutsch</div>
            <div className="mr-3 mb-1">हिन्दी</div>
            <div className="mr-3 mb-1">日本語</div>
          </div>
          
          <Separator className="my-3" />
          
          <div className="flex flex-wrap text-xs text-facebook-text-light">
            <div className="mr-3 mb-1">Sign Up</div>
            <div className="mr-3 mb-1">Log In</div>
            <div className="mr-3 mb-1">Messenger</div>
            <div className="mr-3 mb-1">Facebook Lite</div>
            <div className="mr-3 mb-1">Watch</div>
            <div className="mr-3 mb-1">Places</div>
            <div className="mr-3 mb-1">Games</div>
            <div className="mr-3 mb-1">Marketplace</div>
            <div className="mr-3 mb-1">Meta Pay</div>
            <div className="mr-3 mb-1">Meta Store</div>
          </div>
          
          <div className="mt-3 text-xs text-facebook-text-light">
            Meta © 2023
          </div>
        </div>
      </div>

      {/* Bedtime Modal */}
      <BedtimeModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
