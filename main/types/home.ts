// Core types for home dashboard
export interface Memory {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: 'photo' | 'voice' | 'text';
  personIds: string[];
  tags: string[];
  imageUri?: string;
  audioUri?: string;
}

export interface Person {
  id: string;
  name: string;
  avatar?: string;
  relationship: string;
  lastInteraction: Date;
  totalMemories: number;
  birthDate?: Date;
  anniversaryDate?: Date;
  phoneNumber?: string;
  email?: string;
}

export interface Reminder {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: 'birthday' | 'anniversary' | 'custom';
  personId?: string;
  isCompleted: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface DashboardStats {
  totalMemories: number;
  totalPeople: number;
  memoriesThisMonth: number;
  upcomingReminders: number;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  location: string;
}