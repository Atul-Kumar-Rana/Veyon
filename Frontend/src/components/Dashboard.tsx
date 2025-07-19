import React, { useState, useEffect } from 'react';
import { MessageCircle, FileText, Calendar, User, Settings, Moon, Sun, Phone, MapPin, Mic, Upload, Edit } from 'lucide-react';
import ChatBot from './ChatBot';
import HealthForm from './HealthForm';
import EmergencyButton from './EmergencyButton';
import HealthStats from './HealthStats';
import VoiceInput from './VoiceInput';
import ProfileEditor from './ProfileEditor';
import DeveloperCards from './DeveloperCards';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { isDark, toggleTheme } = useTheme();
  const { user, setUser } = useUser();
  const [activeTab, setActiveTab] = useState('chat');
  const [showHealthForm, setShowHealthForm] = useState(false);
  const [showProfileEditor, setShowProfileEditor] = useState(false);

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem('veyon_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem('veyon_auth');
    localStorage.removeItem('veyon_user');
    onLogout();
  };

  const tabs = [
    { id: 'chat', label: 'AI Chat', icon: MessageCircle },
    { id: 'reports', label: 'Health Reports', icon: FileText },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      {/* Header */}
      <header className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border-b border-white/20 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  VEYON
                </span>
              </div>
              <div className="hidden md:block text-sm text-gray-600 dark:text-gray-300">
                Welcome back, {user?.name || 'User'}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <EmergencyButton />
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-600 dark:text-red-400 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/50 p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-white/20 dark:border-gray-700/50">
                <button
                  onClick={() => setShowHealthForm(true)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Upload className="w-5 h-5" />
                  <span>New Health Input</span>
                </button>
              </div>
            </div>

            {/* Health Stats */}
            <div className="mt-6">
              <HealthStats />
            </div>

            {/* Developer Cards */}
            <DeveloperCards />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/50 min-h-[600px]">
              {activeTab === 'chat' && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      AI Health Assistant
                    </h2>
                    <VoiceInput />
                  </div>
                  <ChatBot />
                </div>
              )}

              {activeTab === 'reports' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                    Health Reports & History
                  </h2>
                  <div className="grid gap-4">
                    {[
                      {
                        date: '2025-01-15',
                        title: 'General Health Checkup',
                        status: 'Reviewed',
                        summary: 'Overall health is good. Continue current exercise routine.'
                      },
                      {
                        date: '2025-01-10',
                        title: 'Headache Consultation',
                        status: 'Completed',
                        summary: 'Tension headache likely due to stress. Recommended relaxation techniques.'
                      },
                      {
                        date: '2025-01-05',
                        title: 'Blood Test Results',
                        status: 'Normal',
                        summary: 'All blood markers within normal range. Vitamin D slightly low.'
                      }
                    ].map((report, index) => (
                      <div key={index} className="p-4 bg-white/10 dark:bg-gray-700/50 rounded-xl border border-white/20 dark:border-gray-600/50">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200">{report.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            report.status === 'Normal' ? 'bg-green-500/20 text-green-600' :
                            report.status === 'Completed' ? 'bg-blue-500/20 text-blue-600' :
                            'bg-purple-500/20 text-purple-600'
                          }`}>
                            {report.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{report.date}</p>
                        <p className="text-gray-700 dark:text-gray-300">{report.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'calendar' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                    Appointments & Reminders
                  </h2>
                  <div className="grid gap-4">
                    {[
                      {
                        date: '2025-01-20',
                        time: '10:00 AM',
                        type: 'Doctor Appointment',
                        title: 'Annual Physical Exam',
                        doctor: 'Dr. Sarah Johnson'
                      },
                      {
                        date: '2025-01-18',
                        time: '8:00 AM',
                        type: 'Medication',
                        title: 'Take Blood Pressure Medication',
                        reminder: 'Daily'
                      },
                      {
                        date: '2025-01-22',
                        time: '2:00 PM',
                        type: 'Lab Test',
                        title: 'Blood Work Follow-up',
                        location: 'City Medical Center'
                      }
                    ].map((appointment, index) => (
                      <div key={index} className="p-4 bg-white/10 dark:bg-gray-700/50 rounded-xl border border-white/20 dark:border-gray-600/50">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200">{appointment.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            appointment.type === 'Doctor Appointment' ? 'bg-blue-500/20 text-blue-600' :
                            appointment.type === 'Medication' ? 'bg-green-500/20 text-green-600' :
                            'bg-purple-500/20 text-purple-600'
                          }`}>
                            {appointment.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          {appointment.date} at {appointment.time}
                        </p>
                        {appointment.doctor && (
                          <p className="text-sm text-gray-700 dark:text-gray-300">with {appointment.doctor}</p>
                        )}
                        {appointment.location && (
                          <p className="text-sm text-gray-700 dark:text-gray-300">at {appointment.location}</p>
                        )}
                        {appointment.reminder && (
                          <p className="text-sm text-gray-700 dark:text-gray-300">Reminder: {appointment.reminder}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                    Profile Settings
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                      <img
                        src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100'}
                        alt="Profile"
                        className="w-16 h-16 rounded-full"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{user?.name || 'User'}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{user?.email || 'user@example.com'}</p>
                        {user?.phone && <p className="text-sm text-gray-500 dark:text-gray-500">{user.phone}</p>}
                      </div>
                      </div>
                      <button
                        onClick={() => setShowProfileEditor(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Profile
                      </button>
                    </div>

                    <div className="grid gap-4">
                      <div className="p-4 bg-white/10 dark:bg-gray-700/50 rounded-xl">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Personal Information</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Location:</span>
                            <p className="text-gray-700 dark:text-gray-300">{user?.location || 'Not specified'}</p>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Blood Type:</span>
                            <p className="text-gray-700 dark:text-gray-300">{user?.bloodType || 'Not specified'}</p>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Emergency Contact:</span>
                            <p className="text-gray-700 dark:text-gray-300">{user?.emergencyContact || 'Not specified'}</p>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Date of Birth:</span>
                            <p className="text-gray-700 dark:text-gray-300">{user?.dateOfBirth || 'Not specified'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-white/10 dark:bg-gray-700/50 rounded-xl">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Medical Information</h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Allergies:</span>
                            <p className="text-gray-700 dark:text-gray-300">{user?.allergies || 'None specified'}</p>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Current Medications:</span>
                            <p className="text-gray-700 dark:text-gray-300">{user?.medications || 'None specified'}</p>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Medical Conditions:</span>
                            <p className="text-gray-700 dark:text-gray-300">{user?.medicalConditions || 'None specified'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-white/10 dark:bg-gray-700/50 rounded-xl">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Privacy Settings</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Your data is encrypted end-to-end and never shared with third parties.
                        </p>
                      </div>
                      <div className="p-4 bg-white/10 dark:bg-gray-700/50 rounded-xl">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Emergency Contacts</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Manage your emergency contacts for quick access during health emergencies.
                        </p>
                      </div>
                      <div className="p-4 bg-white/10 dark:bg-gray-700/50 rounded-xl">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Data Export</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Download your health data and chat history at any time.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Health Form Modal */}
      {showHealthForm && (
        <HealthForm onClose={() => setShowHealthForm(false)} />
      )}

      {/* Profile Editor Modal */}
      {showProfileEditor && (
        <ProfileEditor
          isOpen={showProfileEditor}
          onClose={() => setShowProfileEditor(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;