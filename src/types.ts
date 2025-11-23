export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: 'admin' | 'technician' | 'viewer';
  avatar?: string;
  createdAt: string;
}

export interface AuthUser extends User {
  password: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  createdBy: string; // userId
}

export interface Service {
  id: string;
  clientId: string;
  date: string;
  description: string;
  problem: string;
  solution: string;
  price: number;
  status: 'pending' | 'in-progress' | 'completed';
  parts?: string;
  notes?: string;
  createdBy: string; // userId
  assignedTo?: string; // userId
}

export type ServiceStatus = 'pending' | 'in-progress' | 'completed';
export type UserRole = 'admin' | 'technician' | 'viewer';
