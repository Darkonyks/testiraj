export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    primaryHover: string;
    secondary: string;
    secondaryHover: string;
    background: string;
    cardBg: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    danger: string;
  };
}

export const themes: Record<string, Theme> = {
  light: {
    id: 'light',
    name: 'Svetla',
    colors: {
      primary: 'bg-blue-600',
      primaryHover: 'hover:bg-blue-700',
      secondary: 'bg-green-600',
      secondaryHover: 'hover:bg-green-700',
      background: 'bg-gradient-to-br from-blue-50 to-indigo-100',
      cardBg: 'bg-white',
      text: 'text-gray-800',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      danger: 'bg-red-100 text-red-800',
    },
  },
  dark: {
    id: 'dark',
    name: 'Tamna',
    colors: {
      primary: 'bg-indigo-600',
      primaryHover: 'hover:bg-indigo-700',
      secondary: 'bg-emerald-600',
      secondaryHover: 'hover:bg-emerald-700',
      background: 'bg-gradient-to-br from-gray-900 to-gray-800',
      cardBg: 'bg-gray-800',
      text: 'text-gray-100',
      textSecondary: 'text-gray-300',
      border: 'border-gray-700',
      success: 'bg-green-900 text-green-200',
      warning: 'bg-yellow-900 text-yellow-200',
      danger: 'bg-red-900 text-red-200',
    },
  },
  cyan: {
    id: 'cyan',
    name: 'Cijan',
    colors: {
      primary: 'bg-cyan-600',
      primaryHover: 'hover:bg-cyan-700',
      secondary: 'bg-teal-600',
      secondaryHover: 'hover:bg-teal-700',
      background: 'bg-gradient-to-br from-cyan-50 to-teal-100',
      cardBg: 'bg-white',
      text: 'text-gray-800',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200',
      success: 'bg-teal-100 text-teal-800',
      warning: 'bg-amber-100 text-amber-800',
      danger: 'bg-rose-100 text-rose-800',
    },
  },
  purple: {
    id: 'purple',
    name: 'Ljubičasta',
    colors: {
      primary: 'bg-purple-600',
      primaryHover: 'hover:bg-purple-700',
      secondary: 'bg-pink-600',
      secondaryHover: 'hover:bg-pink-700',
      background: 'bg-gradient-to-br from-purple-50 to-pink-100',
      cardBg: 'bg-white',
      text: 'text-gray-800',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200',
      success: 'bg-emerald-100 text-emerald-800',
      warning: 'bg-orange-100 text-orange-800',
      danger: 'bg-red-100 text-red-800',
    },
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean',
    colors: {
      primary: 'bg-blue-700',
      primaryHover: 'hover:bg-blue-800',
      secondary: 'bg-sky-600',
      secondaryHover: 'hover:bg-sky-700',
      background: 'bg-gradient-to-br from-blue-900 to-cyan-900',
      cardBg: 'bg-slate-800',
      text: 'text-gray-100',
      textSecondary: 'text-gray-300',
      border: 'border-slate-700',
      success: 'bg-emerald-900 text-emerald-200',
      warning: 'bg-amber-900 text-amber-200',
      danger: 'bg-rose-900 text-rose-200',
    },
  },
  forest: {
    id: 'forest',
    name: 'Šuma',
    colors: {
      primary: 'bg-green-700',
      primaryHover: 'hover:bg-green-800',
      secondary: 'bg-lime-600',
      secondaryHover: 'hover:bg-lime-700',
      background: 'bg-gradient-to-br from-green-50 to-emerald-100',
      cardBg: 'bg-white',
      text: 'text-gray-800',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      danger: 'bg-red-100 text-red-800',
    },
  },
  sunset: {
    id: 'sunset',
    name: 'Zalazak',
    colors: {
      primary: 'bg-orange-600',
      primaryHover: 'hover:bg-orange-700',
      secondary: 'bg-red-600',
      secondaryHover: 'hover:bg-red-700',
      background: 'bg-gradient-to-br from-orange-50 to-red-100',
      cardBg: 'bg-white',
      text: 'text-gray-800',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-amber-100 text-amber-800',
      danger: 'bg-red-100 text-red-800',
    },
  },
};
