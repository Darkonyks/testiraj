import { Client, Service } from '../types';
import { User, Mail, Phone, MapPin, Wrench, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { themes } from '../themes';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ClientCardProps {
  client: Client;
  services: Service[];
  onAddService: (clientId: string) => void;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
};

const statusLabels = {
  pending: 'Na čekanju',
  'in-progress': 'U toku',
  completed: 'Završeno',
};

export default function ClientCard({ client, services, onAddService }: ClientCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [currentTheme] = useLocalStorage<string>('theme', 'light');
  const theme = themes[currentTheme] || themes.light;
  const clientServices = services.filter((s) => s.clientId === client.id);
  const totalSpent = clientServices.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className={`${theme.colors.cardBg} rounded-lg shadow-md overflow-hidden border ${theme.colors.border}`}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className={`${currentTheme === 'dark' || currentTheme === 'ocean' ? 'bg-blue-900' : 'bg-blue-100'} p-3 rounded-full`}>
              <User className={`w-6 h-6 ${currentTheme === 'dark' || currentTheme === 'ocean' ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${theme.colors.text}`}>{client.name}</h3>
              <p className={`text-sm ${theme.colors.textSecondary}`}>
                Klijent od {new Date(client.createdAt).toLocaleDateString('sr-RS')}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-sm ${theme.colors.textSecondary}`}>Ukupno servisa</p>
            <p className={`text-2xl font-bold ${currentTheme === 'dark' || currentTheme === 'ocean' ? 'text-blue-400' : 'text-blue-600'}`}>{clientServices.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className={`flex items-center gap-2 ${theme.colors.textSecondary}`}>
            <Mail className="w-4 h-4" />
            <span className="text-sm">{client.email}</span>
          </div>
          <div className={`flex items-center gap-2 ${theme.colors.textSecondary}`}>
            <Phone className="w-4 h-4" />
            <span className="text-sm">{client.phone}</span>
          </div>
          <div className={`flex items-center gap-2 ${theme.colors.textSecondary} md:col-span-2`}>
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{client.address}</span>
          </div>
        </div>

        <div className={`flex items-center justify-between pt-4 border-t ${theme.colors.border}`}>
          <div>
            <p className={`text-sm ${theme.colors.textSecondary}`}>Ukupna zarada</p>
            <p className={`text-lg font-bold ${currentTheme === 'dark' || currentTheme === 'ocean' ? 'text-green-400' : 'text-green-600'}`}>
              {totalSpent.toLocaleString('sr-RS')} RSD
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onAddService(client.id)}
              className={`flex items-center gap-2 ${theme.colors.primary} text-white px-4 py-2 rounded-lg ${theme.colors.primaryHover} font-medium text-sm`}
            >
              <Wrench className="w-4 h-4" />
              Novi Servis
            </button>
            {clientServices.length > 0 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className={`flex items-center gap-2 ${currentTheme === 'dark' || currentTheme === 'ocean' ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} px-4 py-2 rounded-lg font-medium text-sm`}
              >
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {expanded ? 'Sakrij' : 'Prikaži'}
              </button>
            )}
          </div>
        </div>
      </div>

      {expanded && clientServices.length > 0 && (
        <div className={`${currentTheme === 'dark' || currentTheme === 'ocean' ? 'bg-gray-900' : 'bg-gray-50'} p-6 border-t ${theme.colors.border}`}>
          <h4 className={`font-bold ${theme.colors.text} mb-4`}>Istorija Servisa</h4>
          <div className="space-y-3">
            {clientServices.map((service) => (
              <div
                key={service.id}
                className={`${theme.colors.cardBg} p-4 rounded-lg border ${theme.colors.border}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 className={`font-semibold ${theme.colors.text}`}>{service.description}</h5>
                    <p className={`text-sm ${theme.colors.textSecondary}`}>
                      {new Date(service.date).toLocaleDateString('sr-RS')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        statusColors[service.status]
                      }`}
                    >
                      {statusLabels[service.status]}
                    </span>
                    <p className={`text-lg font-bold ${theme.colors.text} mt-1`}>
                      {service.price.toLocaleString('sr-RS')} RSD
                    </p>
                  </div>
                </div>
                <div className={`text-sm ${theme.colors.textSecondary} space-y-1`}>
                  <p>
                    <strong>Problem:</strong> {service.problem}
                  </p>
                  {service.solution && (
                    <p>
                      <strong>Rešenje:</strong> {service.solution}
                    </p>
                  )}
                  {service.parts && (
                    <p>
                      <strong>Delovi:</strong> {service.parts}
                    </p>
                  )}
                  {service.notes && (
                    <p>
                      <strong>Napomene:</strong> {service.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
