// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Updated headers function to use JWT from NextAuth session
const getHeaders = async () => {
  // Get the session from NextAuth
  const { getSession } = await import("next-auth/react");
  const session = await getSession();
  
  return {
    'Content-Type': 'application/json',
    'Authorization': session?.token ? `Bearer ${session.token}` : '',
  };
};

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
  connectionStatus: string;
  connectionTime: string;
  disconnectionTime: string | null;
  ipAddress: string;
  location: string;
  bandwidth: number;
}

// API functions
export async function fetchComputers() {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/computers/`, {
    headers,
  });
  
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('Authentication required. Please log in.');
    }
    throw new Error('Failed to fetch computers');
  }
  
  return response.json();
}

export async function fetchUserVerifications(): Promise<UserVerification[]> {
  const response = await fetch(`${API_BASE_URL}/user-verifications/`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('Authentication required. Please log in.');
    }
    throw new Error('Failed to fetch user verifications');
  }
  return response.json();
}

export async function fetchVPNStatuses(): Promise<VPNStatus[]> {
  const response = await fetch(`${API_BASE_URL}/vpn-status/`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('Authentication required. Please log in.');
    }
    throw new Error('Failed to fetch VPN statuses');
  }
  return response.json();
}

export interface VerificationTask {
  id: string;
  taskName: string;
  assigneeName: string;
  status: string;
  priority: string;
  scheduledTime: string;
  completionTime: string | null;
}

export async function fetchVerificationTasks(): Promise<VerificationTask[]> {
  const response = await fetch(`${API_BASE_URL}/verification-tasks/`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('Authentication required. Please log in.');
    }
    throw new Error('Failed to fetch verification tasks');
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
