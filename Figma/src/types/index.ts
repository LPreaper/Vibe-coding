export interface GymClass {
  id: string;
  name: string;
  description: string;
  coachId: string;
  coachName: string;
  date: string;
  time: string;
  duration: number; // in minutes
  capacity: number;
  enrolled: number;
  category: 'yoga' | 'strength' | 'cardio' | 'hiit' | 'pilates';
}

export interface Coach {
  id: string;
  name: string;
  email: string;
  specialty: string;
  avatar?: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  subscriptionType: 'basic' | 'premium' | 'vip';
  subscriptionStart: string;
  subscriptionEnd: string;
  status: 'active' | 'expired' | 'cancelled';
}

export interface GymHours {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

export type UserRole = 'owner' | 'coach' | 'member';
