import React from 'react';
import { Mail, Linkedin, Github, Code, Heart } from 'lucide-react';

const DeveloperCards: React.FC = () => {
  const developers = [
    {
      name: 'Atul Kumar Rana',
      role: 'Full Stack Developer',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=150',
      email: 'atul.kumar.rana@gmail.com',
      linkedin: 'https://linkedin.com/in/atul-kumar-rana',
      github: 'https://github.com/atulkumarrana'
    },
    {
      name: 'Parsngshu Mondal',
      role: 'AI/ML Engineer',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=150',
      email: 'parsngshu.mondal@gmail.com',
      linkedin: 'https://linkedin.com/in/parsngshu-mondal',
      github: 'https://github.com/parsngshumondal'
    }
  ];

  const handleSocialClick = (url: string, type: string) => {
    if (type === 'email') {
      window.open(`mailto:${url}`, '_blank');
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-white/20 dark:border-gray-700/50">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center justify-center gap-2">
          <Code className="w-5 h-5" />
          Built with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> by
        </h3>
      </div>
      
      <div className="grid gap-4">
        {developers.map((dev, index) => (
          <div
            key={index}
            className="group relative p-4 bg-white/10 dark:bg-gray-700/50 backdrop-blur-md rounded-xl border border-white/20 dark:border-gray-600/50 hover:bg-white/20 dark:hover:bg-gray-700/70 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            {/* Animated background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative flex items-center space-x-4">
              <div className="relative">
                <img
                  src={dev.avatar}
                  alt={dev.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/20 group-hover:border-blue-400 transition-colors duration-300"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {dev.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {dev.role}
                </p>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSocialClick(dev.email, 'email')}
                  className="p-2 rounded-lg bg-white/10 hover:bg-red-500/20 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-all duration-200 transform hover:scale-110"
                  title="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => handleSocialClick(dev.linkedin, 'linkedin')}
                  className="p-2 rounded-lg bg-white/10 hover:bg-blue-500/20 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-all duration-200 transform hover:scale-110"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => handleSocialClick(dev.github, 'github')}
                  className="p-2 rounded-lg bg-white/10 hover:bg-gray-800/20 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all duration-200 transform hover:scale-110"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Animated border on hover */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-600 opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeveloperCards;