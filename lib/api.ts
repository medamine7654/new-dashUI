// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Types based on Django models
export interface Computer {
  id: string;
  hostname: string;
  location: string;
  status: string;
  cpu_usage: number;
  memory_usage: number;
  last_maintenance: string;
}

export interface UserVerification {
  id: string;
  user_id: string;
  user_name: string;
  computer_id: string;
  login_status: string;
  login_time: string;
  last_activity_time: string;
  admin_rights: boolean;
  access_level: string;
}

export interface VPNStatus {
  id: string;
  user_id: string;
  user_name: string;
  connection_status: string;
  connection_time: string;
  disconnection_time: string | null;
  ip_address: string;
}

// API functions
export async function fetchComputers(): Promise<Computer[]> {
  const response = await fetch(`${API_BASE_URL}/computers/`);
  if (!response.ok) {
    throw new Error('Failed to fetch computers');
  }
  return response.json();
}

export async function fetchUserVerifications(): Promise<UserVerification[]> {
  const response = await fetch(`${API_BASE_URL}/user-verifications/`);
  if (!response.ok) {
    throw new Error('Failed to fetch user verifications');
  }
  return response.json();
}

export async function fetchVPNStatuses(): Promise<VPNStatus[]> {
  const response = await fetch(`${API_BASE_URL}/vpn-statuses/`);
  if (!response.ok) {
    throw new Error('Failed to fetch VPN statuses');
  }
  return response.json();
}

// Utility function to calculate statistics
export function calculateComputerStats(computers: Computer[]) {
  const online = computers.filter(c => c.status.toLowerCase() === 'online').length;
  const total = computers.length;
  const avgCpuUsage = computers.reduce((sum, c) => sum + c.cpu_usage, 0) / total;
  
  return {
    onlineCount: online,
    offlineCount: total - online,
    operationalRate: Math.round((online / total) * 100),
    averageCpuUsage: Math.round(avgCpuUsage)
  };
}
