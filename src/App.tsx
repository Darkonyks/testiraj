import { useState } from 'react';
import { UserPlus, Wrench, Users, DollarSign, TrendingUp, UserCircle } from 'lucide-react';
import { Client, Service } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useAuth } from './contexts/AuthContext';
import { themes } from './themes';
import ClientForm from './components/ClientForm';
import ServiceForm from './components/ServiceForm';
import ClientCard from './components/ClientCard';
import ThemeSelector from './components/ThemeSelector';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';

function App() {
  const { user, isAuthenticated } = useAuth();
  const [showAuthForm, setShowAuthForm] = useState<'login' | 'register' | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [clients, setClients] = useLocalStorage<Client[]>('clients', []);
  const [services, setServices] = useLocalStorage<Service[]>('services', []);
  const [currentTheme, setCurrentTheme] = useLocalStorage<string>('theme', 'light');
  const [showClientForm, setShowClientForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  const theme = themes[currentTheme] || themes.light;

  const handleAddClient = (clientData: Omit<Client, 'id' | 'createdAt' | 'createdBy'>) => {
    const newClient: Client = {
      ...clientData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      createdBy: user?.id || 'unknown',
    };
    setClients([...clients, newClient]);
    setShowClientForm(false);
  };

  const handleAddService = (serviceData: Omit<Service, 'id' | 'createdBy'>) => {
    const newService: Service = {
      ...serviceData,
      id: crypto.randomUUID(),
      createdBy: user?.id || 'unknown',
    };
    setServices([...services, newService]);
    setShowServiceForm(false);
    setSelectedClientId(undefined);
  };

  // Show login if not authenticated
  if (!isAuthenticated) {
    if (showAuthForm === 'register') {
      return <Register onSwitchToLogin={() => setShowAuthForm('login')} />;
    }
    return <Login onSwitchToRegister={() => setShowAuthForm('register')} />;
  }

  const openServiceForm = (clientId?: string) => {
    setSelectedClientId(clientId);
    setShowServiceForm(true);
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const totalRevenue = services.reduce((sum, service) => sum + service.price, 0);
  const completedServices = services.filter((s) => s.status === 'completed').length;
  const pendingServices = services.filter((s) => s.status === 'pending').length;

  return (
    <div className={`min-h-screen ${theme.colors.background}`}>
      {/* Header */}
      <header className={`${theme.colors.cardBg} shadow-md`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className={`${theme.colors.primary} p-3 rounded-lg`}>
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${theme.colors.text}`}>Servis Manager</h1>
                <p className={theme.colors.textSecondary}>Evidencija klijenata i servisa računara</p>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setShowProfile(true)}
                className={`flex items-center gap-2 ${currentTheme === 'dark' || currentTheme === 'ocean' ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} px-4 py-2 rounded-lg font-medium shadow-lg`}
                title={user?.fullName}
              >
                <UserCircle className="w-5 h-5" />
                <span className="hidden md:inline">{user?.fullName}</span>
              </button>
              <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
              {(user?.role === 'admin' || user?.role === 'technician') && (
                <>
                  <button
                    onClick={() => setShowClientForm(true)}
                    className={`flex items-center gap-2 ${theme.colors.primary} text-white px-6 py-3 rounded-lg ${theme.colors.primaryHover} font-medium shadow-lg`}
                  >
                    <UserPlus className="w-5 h-5" />
                    <span className="hidden sm:inline">Novi Klijent</span>
                  </button>
                  <button
                    onClick={() => openServiceForm()}
                    className={`flex items-center gap-2 ${theme.colors.secondary} text-white px-6 py-3 rounded-lg ${theme.colors.secondaryHover} font-medium shadow-lg`}
                  >
                    <Wrench className="w-5 h-5" />
                    <span className="hidden sm:inline">Novi Servis</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`${theme.colors.cardBg} p-6 rounded-lg shadow-md border ${theme.colors.border}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${theme.colors.textSecondary} text-sm font-medium`}>Ukupno Klijenata</p>
                <p className={`text-3xl font-bold ${theme.colors.text}`}>{clients.length}</p>
              </div>
              <Users className={`w-12 h-12 ${currentTheme === 'dark' || currentTheme === 'ocean' ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
          </div>

          <div className={`${theme.colors.cardBg} p-6 rounded-lg shadow-md border ${theme.colors.border}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${theme.colors.textSecondary} text-sm font-medium`}>Ukupno Servisa</p>
                <p className={`text-3xl font-bold ${theme.colors.text}`}>{services.length}</p>
              </div>
              <Wrench className={`w-12 h-12 ${currentTheme === 'dark' || currentTheme === 'ocean' ? 'text-green-400' : 'text-green-600'}`} />
            </div>
          </div>

          <div className={`${theme.colors.cardBg} p-6 rounded-lg shadow-md border ${theme.colors.border}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${theme.colors.textSecondary} text-sm font-medium`}>Ukupna Zarada</p>
                <p className={`text-2xl font-bold ${theme.colors.text}`}>
                  {totalRevenue.toLocaleString('sr-RS')} RSD
                </p>
              </div>
              <DollarSign className={`w-12 h-12 ${currentTheme === 'dark' || currentTheme === 'ocean' ? 'text-yellow-400' : 'text-yellow-600'}`} />
            </div>
          </div>

          <div className={`${theme.colors.cardBg} p-6 rounded-lg shadow-md border ${theme.colors.border}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`${theme.colors.textSecondary} text-sm font-medium`}>Završeno / Na čekanju</p>
                <p className={`text-3xl font-bold ${theme.colors.text}`}>
                  {completedServices} / {pendingServices}
                </p>
              </div>
              <TrendingUp className={`w-12 h-12 ${currentTheme === 'dark' || currentTheme === 'ocean' ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Pretraži klijente po imenu, email-u ili telefonu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full px-4 py-3 border ${theme.colors.border} ${theme.colors.cardBg} ${theme.colors.text} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm`}
          />
        </div>

        {/* Clients List */}
        {filteredClients.length === 0 ? (
          <div className={`${theme.colors.cardBg} rounded-lg shadow-md p-12 text-center border ${theme.colors.border}`}>
            <Users className={`w-16 h-16 ${theme.colors.textSecondary} mx-auto mb-4 opacity-50`} />
            <h3 className={`text-xl font-semibold ${theme.colors.text} mb-2`}>
              {searchTerm ? 'Nema rezultata' : 'Nema klijenata'}
            </h3>
            <p className={`${theme.colors.textSecondary} mb-6`}>
              {searchTerm
                ? 'Pokušajte sa drugačijim pojmom za pretragu'
                : 'Dodajte prvog klijenta da biste počeli'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowClientForm(true)}
                className={`${theme.colors.primary} text-white px-6 py-3 rounded-lg ${theme.colors.primaryHover} font-medium`}
              >
                Dodaj Prvog Klijenta
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredClients.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                services={services}
                onAddService={openServiceForm}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
      {showClientForm && (
        <ClientForm onSubmit={handleAddClient} onClose={() => setShowClientForm(false)} />
      )}
      {showServiceForm && (
        <ServiceForm
          clients={clients}
          onSubmit={handleAddService}
          onClose={() => {
            setShowServiceForm(false);
            setSelectedClientId(undefined);
          }}
          preselectedClientId={selectedClientId}
        />
      )}
    </div>
  );
}

export default App;
