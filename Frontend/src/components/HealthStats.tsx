import React from 'react';
import { Heart, Activity, Moon, Droplets } from 'lucide-react';

const HealthStats: React.FC = () => {
  const stats = [
    {
      icon: Heart,
      label: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      status: 'normal',
      color: 'text-green-500'
    },
    {
      icon: Activity,
      label: 'Steps Today',
      value: '8,240',
      unit: 'steps',
      status: 'good',
      color: 'text-blue-500'
    },
    {
      icon: Moon,
      label: 'Sleep',
      value: '7.5',
      unit: 'hours',
      status: 'good',
      color: 'text-purple-500'
    },
    {
      icon: Droplets,
      label: 'Hydration',
      value: '6/8',
      unit: 'glasses',
      status: 'fair',
      color: 'text-cyan-500'
    }
  ];

  return (
    <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/50 p-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Health Overview
      </h3>
      
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-white/10 dark:bg-gray-700/50`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {stat.status}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {stat.value}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {stat.unit}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/20 dark:border-gray-700/50">
        <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
          Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default HealthStats;