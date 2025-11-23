import { AuthUser } from '../types';

export function seedDemoUsers() {
  const existingUsers = localStorage.getItem('users');
  
  if (!existingUsers || JSON.parse(existingUsers).length === 0) {
    const demoUsers: AuthUser[] = [
      {
        id: 'demo-admin-1',
        username: 'admin',
        password: 'admin123',
        email: 'admin@servis.com',
        fullName: 'Marko Marković',
        role: 'admin',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'demo-tech-1',
        username: 'tech',
        password: 'tech123',
        email: 'tech@servis.com',
        fullName: 'Petar Petrović',
        role: 'technician',
        createdAt: new Date().toISOString(),
      },
    ];

    localStorage.setItem('users', JSON.stringify(demoUsers));
  }
}
