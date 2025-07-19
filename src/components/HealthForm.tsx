import React, { useState } from 'react';
import { X, Upload, Smile, Frown, Meh, Heart, AlertTriangle } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface HealthFormProps {
  onClose: () => void;
}

const HealthForm: React.FC<HealthFormProps> = ({ onClose }) => {
  const { healthData, setHealthData, addChatMessage } = useUser();
  const [formData, setFormData] = useState(healthData);
  const [dragActive, setDragActive] = useState(false);

  const moods = [
    { id: 'great', label: 'Great', icon: Smile, color: 'text-green-500' },
    { id: 'good', label: 'Good', icon: Smile, color: 'text-blue-500' },
    { id: 'okay', label: 'Okay', icon: Meh, color: 'text-yellow-500' },
    { id: 'poor', label: 'Poor', icon: Frown, color: 'text-orange-500' },
    { id: 'terrible', label: 'Terrible', icon: Frown, color: 'text-red-500' }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setFormData(prev => ({ ...prev, files: [...prev.files, ...files] }));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, files: [...prev.files, ...files] }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHealthData(formData);

    // Add a summary message to chat
    const summaryMessage = {
      id: Date.now().toString(),
      message: `I've submitted my health information: ${formData.description}. Mood: ${formData.mood}, Severity: ${formData.severity}/10, Duration: ${formData.duration}. ${formData.files.length > 0 ? `Uploaded ${formData.files.length} file(s).` : ''}`,
      isUser: true,
      timestamp: new Date()
    };

    addChatMessage(summaryMessage);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        message: "Thank you for providing your health information. I've reviewed your symptoms and uploaded files. Based on your description and severity level, I'll provide you with personalized recommendations. Let me analyze this information for you.",
        isUser: false,
        timestamp: new Date()
      };
      addChatMessage(aiResponse);
    }, 1000);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Health Input Form
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Describe your symptoms or health concern
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Please describe what you're experiencing, when it started, and any relevant details..."
                className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                rows={4}
                required
              />
            </div>

            {/* Mood Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                How are you feeling overall?
              </label>
              <div className="grid grid-cols-5 gap-3">
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, mood: mood.id }))}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                      formData.mood === mood.id
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <mood.icon className={`w-6 h-6 mx-auto mb-1 ${mood.color}`} />
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {mood.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Severity Scale */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Rate the severity of your symptoms (1-10)
              </label>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">1 (Mild)</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.severity}
                  onChange={(e) => setFormData(prev => ({ ...prev, severity: parseInt(e.target.value) }))}
                  className="flex-1 h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-500">10 (Severe)</span>
              </div>
              <div className="mt-2 text-center">
                <span className={`text-lg font-bold ${
                  formData.severity <= 3 ? 'text-green-500' :
                  formData.severity <= 6 ? 'text-yellow-500' :
                  formData.severity <= 8 ? 'text-orange-500' :
                  'text-red-500'
                }`}>
                  {formData.severity}/10
                </span>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                How long have you been experiencing these symptoms?
              </label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-800 dark:text-gray-200"
                required
              >
                <option value="">Select duration</option>
                <option value="less-than-day">Less than a day</option>
                <option value="1-3-days">1-3 days</option>
                <option value="1-week">About a week</option>
                <option value="2-4-weeks">2-4 weeks</option>
                <option value="1-3-months">1-3 months</option>
                <option value="more-than-3-months">More than 3 months</option>
              </select>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Upload medical files (optional)
              </label>
              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                  dragActive
                    ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Drag and drop files here, or click to select
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
                  Supported: PDF, JPG, PNG, DOCX (Max 10MB each)
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.docx"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer transition-colors"
                >
                  Select Files
                </label>
              </div>

              {/* File List */}
              {formData.files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Submit Health Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HealthForm;