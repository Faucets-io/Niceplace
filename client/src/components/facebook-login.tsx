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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-auto -ml-4" viewBox="0 0 1022 210">
              <path d="M166.43,126.68c-9.65,0-12.44,4.28-12.44,13.72v15.66h25.74l-2.58,25.3H154v76.78H123.11V181.36H102.3v-25.3h20.81V140.83c0-25.52,10.29-39,39-39a146.17,146.17,0,0,1,18,1.07v23.81Z" fill="#1877F2"/>
              <path d="M181.87,203.88c0-28.52,13.51-50,41.82-50,15.44,0,24.87,7.94,29.38,17.8V156.06h29.59V258.14H253.07V242.7c-4.29,9.87-13.94,17.59-29.38,17.59-28.31,0-41.82-21.45-41.82-50Zm30.88,6.87c0,15.22,5.57,25.3,19.94,25.3,12.66,0,19.09-9.22,19.09-23.8V202c0-14.58-6.43-23.8-19.09-23.8-14.37,0-19.94,10.08-19.94,25.3Z" fill="#1877F2"/>
              <path d="M347,153.91c12-2.58,27.73-4.29,46.39-4.29,31.53,0,50.61,7.94,50.61,33.23V258.14H415.46V238.35c-5.14,8.15-15.65,13.73-30.45,13.73-19.73,0-32.82-11.6-32.82-34.59,0-19.52,9.65-30.88,33.65-33.87l29.17-4.5V177c0-9-5.58-11.59-16.94-11.59-15.44,0-32.39,2.36-45.68,5.57Zm48.18,42.28-18.52,3c-8.58,1.29-11.37,5.14-11.37,10.72,0,6.43,4.5,10.08,14.15,10.08,8.15,0,15.65-2.37,15.65-11.59V196.19Z" fill="#1877F2"/>
              <path d="M482.93,205.7c0-38.39,21.45-57.92,55.28-57.92,33.44,0,54.36,19.52,54.36,57.71v10.94H514.24c1.29,16.73,9,22.95,24,22.95,14.8,0,30.45-5.57,40.82-10.29l8.37,22.3c-9.22,5.57-30.24,12.87-51.92,12.87-40.39,0-62.52-19.31-62.52-58.56Zm77.35-10.29c-.86-15.66-7.51-22.52-21.88-22.52s-21.45,6.86-22.52,22.52Z" fill="#1877F2"/>
              <path d="M640.14,155.77c11.8-3.43,27.31-6.21,45.24-6.21,25.1,0,40.82,6,50.32,15.87,8.36,8.58,11.8,19.3,11.8,35v57.7H717.58V203.45c0-11.37-1.72-16.3-6-20.59-4.72-4.5-12.23-6.64-22.74-6.64-7.51,0-13.73.64-18,1.29v80.63H641.21V155.77Z" fill="#1877F2"/>
              <path d="M770.09,258.14V104.35h30.45V258.14Z" fill="#1877F2"/>
              <path d="M943.1,157.92V258.14H912.87V178.15c0-2.15-.43-3-1.72-3.44-1.07-.21-3.22.43-5.57,2.15l-12.66,9.43V258.14H863.48V157.92h30.45v12c5.14-5.56,14.58-12.22,22.09-15C922.72,153,932.16,154.48,943.1,157.92Z" fill="#1877F2"/>
              <path d="M389.34,86.57c0-4.5,1.5-7.65,4.5-9.87,2.79-2.15,6.86-3.43,12-3.43,6,0,10.73,1.07,14.37,2.79l-3,14.79a50.7,50.7,0,0,0-11.16-1.71c-1.93,0-3.43.43-4.29,1.07s-1.5,1.71-1.5,3,1.29,2.36,3.86,3.43l6.22,2.57c4.28,1.72,7.5,3.86,9.65,6.43a14.67,14.67,0,0,1,3.22,9.65c0,5.79-1.93,10.29-6,13.51-3.86,3.22-9.87,4.93-18,4.93-7.29,0-13.94-1.29-18.66-3.65l3.65-15.43a45.13,45.13,0,0,0,15.22,3.21c5.14,0,7.72-1.71,7.72-5.14,0-1.93-1.29-3.43-3.86-4.5l-7.72-3.43c-8.37-3.65-12.44-9.22-12.44-16.73Z" fill="#1877F2"/>
            </svg>
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
