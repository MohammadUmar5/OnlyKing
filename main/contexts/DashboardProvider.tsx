import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Memory, Person, Reminder, DashboardStats, WeatherData } from '../types/home';

interface DashboardContextType {
  memories: Memory[];
  people: Person[];
  reminders: Reminder[];
  stats: DashboardStats;
  weather: WeatherData | null;
  loading: boolean;
  addMemory: (memory: Omit<Memory, 'id'>) => void;
  addPerson: (person: Omit<Person, 'id'>) => void;
  addReminder: (reminder: Omit<Reminder, 'id'>) => void;
  updateReminder: (id: string, updates: Partial<Reminder>) => void;
  getRecentMemories: (count: number) => Memory[];
  getUpcomingReminders: (count: number) => Reminder[];
  getPeopleByInteraction: () => Person[];
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Mock data for initial implementation
const mockMemories: Memory[] = [
  {
    id: '1',
    title: 'Weekend with Family',
    description: 'Had a wonderful dinner with family at home',
    date: new Date(2025, 5, 8),
    type: 'photo',
    personIds: ['1', '2'],
    tags: ['family', 'dinner'],
  },
  {
    id: '2',
    title: 'College Reunion',
    description: 'Met old friends after 2 years',
    date: new Date(2025, 5, 5),
    type: 'photo',
    personIds: ['3', '4'],
    tags: ['friends', 'reunion'],
  },
];

const mockPeople: Person[] = [
  {
    id: '1',
    name: 'Mom',
    relationship: 'Mother',
    lastInteraction: new Date(2025, 5, 8),
    totalMemories: 45,
    birthDate: new Date(1965, 3, 15),
  },
  {
    id: '2',
    name: 'Dad',
    relationship: 'Father',
    lastInteraction: new Date(2025, 5, 8),
    totalMemories: 42,
    birthDate: new Date(1962, 8, 22),
  },
  {
    id: '3',
    name: 'Rahul',
    relationship: 'Best Friend',
    lastInteraction: new Date(2025, 5, 5),
    totalMemories: 28,
    birthDate: new Date(1995, 11, 10),
  },
  {
    id: '4',
    name: 'Priya',
    relationship: 'Friend',
    lastInteraction: new Date(2025, 5, 1),
    totalMemories: 15,
    birthDate: new Date(1996, 6, 5),
  },
];

const mockReminders: Reminder[] = [
  {
    id: '1',
    title: "Mom's Birthday",
    description: 'Plan birthday celebration',
    date: new Date(2025, 6, 15),
    type: 'birthday',
    personId: '1',
    isCompleted: false,
    priority: 'high',
  },
  {
    id: '2',
    title: 'Call Rahul',
    description: 'Weekly catch-up call',
    date: new Date(2025, 5, 12),
    type: 'custom',
    personId: '3',
    isCompleted: false,
    priority: 'medium',
  },
];

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [memories, setMemories] = useState<Memory[]>(mockMemories);
  const [people, setPeople] = useState<Person[]>(mockPeople);
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  // Calculate stats
  const stats: DashboardStats = {
    totalMemories: memories.length,
    totalPeople: people.length,
    memoriesThisMonth: memories.filter(m => 
      m.date.getMonth() === new Date().getMonth() && 
      m.date.getFullYear() === new Date().getFullYear()
    ).length,
    upcomingReminders: reminders.filter(r => !r.isCompleted && r.date > new Date()).length,
  };

  // Mock weather data for Aligarh
  useEffect(() => {
    setWeather({
      temperature: 32,
      condition: 'Sunny',
      icon: '☀️',
      location: 'Aligarh',
    });
  }, []);

  const addMemory = (memory: Omit<Memory, 'id'>) => {
    const newMemory: Memory = {
      ...memory,
      id: Date.now().toString(),
    };
    setMemories(prev => [newMemory, ...prev]);
  };

  const addPerson = (person: Omit<Person, 'id'>) => {
    const newPerson: Person = {
      ...person,
      id: Date.now().toString(),
    };
    setPeople(prev => [...prev, newPerson]);
  };

  const addReminder = (reminder: Omit<Reminder, 'id'>) => {
    const newReminder: Reminder = {
      ...reminder,
      id: Date.now().toString(),
    };
    setReminders(prev => [...prev, newReminder]);
  };

  const updateReminder = (id: string, updates: Partial<Reminder>) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id ? { ...reminder, ...updates } : reminder
      )
    );
  };

  const getRecentMemories = (count: number) => {
    return memories
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, count);
  };

  const getUpcomingReminders = (count: number) => {
    return reminders
      .filter(r => !r.isCompleted && r.date > new Date())
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, count);
  };

  const getPeopleByInteraction = () => {
    return people.sort((a, b) => b.lastInteraction.getTime() - a.lastInteraction.getTime());
  };

  return (
    <DashboardContext.Provider value={{
      memories,
      people,
      reminders,
      stats,
      weather,
      loading,
      addMemory,
      addPerson,
      addReminder,
      updateReminder,
      getRecentMemories,
      getUpcomingReminders,
      getPeopleByInteraction,
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}