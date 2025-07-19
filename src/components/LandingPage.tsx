import React, { useEffect, useState } from 'react';
import { Heart, Shield, Brain, Smartphone, LogIn, UserPlus } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';
import AuthModal from './AuthModal';
import QueryModal from './QueryModal';
import { useTheme } from '../contexts/ThemeContext';

interface LandingPageProps {
  onAuth: (status: boolean) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAuth }) => {
  const { isDark, toggleTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showQueryModal, setShowQueryModal] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleAuthSuccess = (status: boolean) => {
    onAuth(status);
    setShowAuthModal(false);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      <AnimatedBackground />
      
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
      >
        {isDark ? '☀️' : '🌙'}
      </button>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className={`text-2xl font-bold ${isVisible ? 'animate-pulse' : ''}`}>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VEYON
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Features</a>
            <a href="#security" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Security</a>
            <a href="#privacy" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Privacy</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-6 animate-pulse">
              <Heart className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Your AI Health
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Companion
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the future of healthcare with VEYON - your intelligent, secure, and personalized AI health assistant that's available 24/7.
          </p>

          {/* Auth Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setShowAuthModal(true)}
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <LogIn className="w-5 h-5" />
              <span className="font-semibold">Sign In</span>
            </button>
            
            <button
              onClick={() => setShowAuthModal(true)}
              className="group flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <UserPlus className="w-5 h-5" />
              <span className="font-semibold">Create Account</span>
            </button>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            By continuing, you agree to our{' '}
            <a href="#terms" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
            <a href="#privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Revolutionizing Healthcare
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Advanced AI technology meets compassionate care to deliver personalized health insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Brain,
              title: 'AI-Powered Insights',
              description: 'Advanced machine learning analyzes your health data to provide personalized recommendations'
            },
            {
              icon: Shield,
              title: 'Secure & Private',
              description: 'End-to-end encryption ensures your health data remains completely private and secure'
            },
            {
              icon: Heart,
              title: 'Symptom Tracking',
              description: 'Monitor your health journey with intelligent symptom tracking and trend analysis'
            },
            {
              icon: Smartphone,
              title: 'Always Available',
              description: '24/7 access to health guidance with emergency features and location sharing'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105 ${isVisible ? 'animate-fade-in' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Security Section */}
      <div id="security" className="relative z-10 bg-white/5 dark:bg-gray-800/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Health Data is Safe
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              VEYON employs military-grade security measures to protect your most sensitive information
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'End-to-End Encryption',
                  description: 'All data is encrypted both in transit and at rest using AES-256 encryption'
                },
                {
                  title: 'HIPAA Compliant',
                  description: 'Fully compliant with healthcare privacy regulations and industry standards'
                },
                {
                  title: 'Zero Knowledge',
                  description: 'We cannot access your personal health data - only you have the keys'
                }
              ].map((item, index) => (
                <div key={index} className="p-6 rounded-2xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/50">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-white/5 dark:bg-gray-900/50 backdrop-blur-md border-t border-white/10 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                VEYON
              </span>
            </div>
            <div className="flex justify-center space-x-8 mb-6">
              <a href="#terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">Terms of Service</a>
              <a href="#privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#support" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">Support</a>
              <button
                onClick={() => setShowQueryModal(true)}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
              >
                Raise a Query
              </button>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              © 2025 VEYON. All rights reserved. Your health, our priority.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuthSuccess}
      />

      {/* Query Modal */}
      <QueryModal
        isOpen={showQueryModal}
        onClose={() => setShowQueryModal(false)}
      />
    </div>
  );
};

export default LandingPage;