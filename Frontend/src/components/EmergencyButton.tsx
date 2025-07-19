import React, { useState } from 'react';
import { Phone, MapPin, AlertTriangle } from 'lucide-react';

const EmergencyButton: React.FC = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEmergencyPress = () => {
    setShowConfirm(true);
  };

  const handleConfirmEmergency = () => {
    setIsPressed(true);
    
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Emergency location:', { latitude, longitude });
          
          // In a real app, this would:
          // 1. Call emergency services
          // 2. Send location to emergency contacts
          // 3. Alert medical staff
          
          alert(`Emergency services notified!\nLocation: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        },
        (error) => {
          console.error('Location error:', error);
          alert('Emergency services notified! (Location unavailable)');
        }
      );
    } else {
      alert('Emergency services notified!');
    }

    setTimeout(() => {
      setIsPressed(false);
      setShowConfirm(false);
    }, 3000);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <button
        onClick={handleEmergencyPress}
        className={`relative p-3 rounded-full transition-all duration-300 ${
          isPressed
            ? 'bg-red-600 animate-pulse'
            : 'bg-red-500 hover:bg-red-600 hover:scale-110'
        } text-white shadow-lg`}
        disabled={isPressed}
      >
        {isPressed ? (
          <AlertTriangle className="w-6 h-6" />
        ) : (
          <Phone className="w-6 h-6" />
        )}
        
        {isPressed && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-ping" />
        )}
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Emergency Alert
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to call emergency services? This will:
              </p>
              
              <div className="text-left space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact emergency services (911)
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  Share your current location
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Notify your emergency contacts
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmEmergency}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Call Emergency
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencyButton;