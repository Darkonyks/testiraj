import { useState } from 'react';
import { User, Mail, Shield, Calendar, Edit2, Save, X, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { themes } from '../themes';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface UserProfileProps {
  onClose: () => void;
}

const roleLabels = {
  admin: 'Administrator',
  technician: 'Tehničar',
  viewer: 'Posmatrač',
};

const roleBadgeColors = {
  admin: 'bg-purple-100 text-purple-800',
  technician: 'bg-blue-100 text-blue-800',
  viewer: 'bg-gray-100 text-gray-800',
};

export default function UserProfile({ onClose }: UserProfileProps) {
  const { user, logout, updateProfile } = useAuth();
  const [currentTheme] = useLocalStorage<string>('theme', 'light');
  const theme = themes[currentTheme] || themes.light;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
  });

  if (!user) return null;

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      fullName: user.fullName,
      email: user.email,
    });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className={`${theme.colors.cardBg} rounded-lg shadow-xl max-w-md w-full p-6`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${theme.colors.text}`}>Korisnički Profil</h2>
          <button
            onClick={onClose}
            className={`${theme.colors.textSecondary} hover:${theme.colors.text}`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className={`${theme.colors.primary} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4`}>
            <User className="w-12 h-12 text-white" />
          </div>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              roleBadgeColors[user.role]
            }`}
          >
            {roleLabels[user.role]}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${theme.colors.textSecondary} mb-2`}>
              Korisničko ime
            </label>
            <div className={`flex items-center gap-3 px-4 py-3 ${currentTheme === 'dark' || currentTheme === 'ocean' ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
              <User className="w-5 h-5 text-gray-400" />
              <span className={theme.colors.text}>{user.username}</span>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium ${theme.colors.textSecondary} mb-2`}>
              Puno ime
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={`w-full px-4 py-3 border ${theme.colors.border} ${theme.colors.cardBg} ${theme.colors.text} rounded-lg focus:ring-2 focus:ring-blue-500`}
              />
            ) : (
              <div className={`flex items-center gap-3 px-4 py-3 ${currentTheme === 'dark' || currentTheme === 'ocean' ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                <User className="w-5 h-5 text-gray-400" />
                <span className={theme.colors.text}>{user.fullName}</span>
              </div>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium ${theme.colors.textSecondary} mb-2`}>
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 border ${theme.colors.border} ${theme.colors.cardBg} ${theme.colors.text} rounded-lg focus:ring-2 focus:ring-blue-500`}
              />
            ) : (
              <div className={`flex items-center gap-3 px-4 py-3 ${currentTheme === 'dark' || currentTheme === 'ocean' ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                <Mail className="w-5 h-5 text-gray-400" />
                <span className={theme.colors.text}>{user.email}</span>
              </div>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium ${theme.colors.textSecondary} mb-2`}>
              Član od
            </label>
            <div className={`flex items-center gap-3 px-4 py-3 ${currentTheme === 'dark' || currentTheme === 'ocean' ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className={theme.colors.text}>
                {new Date(user.createdAt).toLocaleDateString('sr-RS')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className={`flex-1 flex items-center justify-center gap-2 ${theme.colors.primary} text-white py-3 rounded-lg ${theme.colors.primaryHover} font-medium`}
              >
                <Save className="w-5 h-5" />
                Sačuvaj
              </button>
              <button
                onClick={handleCancel}
                className={`flex-1 ${currentTheme === 'dark' || currentTheme === 'ocean' ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} py-3 rounded-lg font-medium`}
              >
                Otkaži
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className={`flex-1 flex items-center justify-center gap-2 ${theme.colors.primary} text-white py-3 rounded-lg ${theme.colors.primaryHover} font-medium`}
              >
                <Edit2 className="w-5 h-5" />
                Izmeni Profil
              </button>
              <button
                onClick={logout}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-medium"
              >
                <LogOut className="w-5 h-5" />
                Odjavi se
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
