import { useState } from 'react';
import { MobileLayout } from './components/MobileLayout';
import { HomeScreen } from './components/HomeScreen';
import { WorkoutsScreen } from './components/WorkoutsScreen';
import { ProgressScreen } from './components/ProgressScreen';
import { MembershipScreen } from './components/MembershipScreen';
import { HoursScreen } from './components/HoursScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { WorkoutDetailScreen } from './components/WorkoutDetailScreen';
import { OwnerDashboard } from './components/OwnerDashboard';
import { CoachDashboard } from './components/CoachDashboard';
import { GymClass, Coach, Member, GymHours, UserRole } from './types';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

type TabType = 'home' | 'workouts' | 'progress' | 'hours' | 'profile';

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>('member');
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedWorkout, setSelectedWorkout] = useState<GymClass | null>(null);

  // Mock data
  const [coaches, setCoaches] = useState<Coach[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@gym.com',
      specialty: 'Yoga & Pilates',
    },
    {
      id: '2',
      name: 'Mike Thompson',
      email: 'mike@gym.com',
      specialty: 'Strength Training',
    },
    {
      id: '3',
      name: 'Emily Chen',
      email: 'emily@gym.com',
      specialty: 'HIIT & Cardio',
    },
  ]);

  const [classes, setClasses] = useState<GymClass[]>([
    {
      id: '1',
      name: 'Morning Yoga Flow',
      description: 'Start your day with energizing yoga poses',
      coachId: '1',
      coachName: 'Sarah Johnson',
      date: '2025-10-27',
      time: '08:00',
      duration: 60,
      capacity: 20,
      enrolled: 15,
      category: 'yoga',
    },
    {
      id: '2',
      name: 'Strength & Power',
      description: 'Build muscle and increase strength',
      coachId: '2',
      coachName: 'Mike Thompson',
      date: '2025-10-27',
      time: '10:00',
      duration: 90,
      capacity: 15,
      enrolled: 12,
      category: 'strength',
    },
    {
      id: '3',
      name: 'HIIT Bootcamp',
      description: 'High intensity interval training for maximum results',
      coachId: '3',
      coachName: 'Emily Chen',
      date: '2025-10-28',
      time: '18:00',
      duration: 45,
      capacity: 25,
      enrolled: 20,
      category: 'hiit',
    },
    {
      id: '4',
      name: 'Evening Pilates',
      description: 'Core strengthening and flexibility',
      coachId: '1',
      coachName: 'Sarah Johnson',
      date: '2025-10-29',
      time: '19:00',
      duration: 60,
      capacity: 18,
      enrolled: 10,
      category: 'pilates',
    },
  ]);

  const [hours, setHours] = useState<GymHours[]>([
    { day: 'Monday', open: '06:00', close: '22:00', isClosed: false },
    { day: 'Tuesday', open: '06:00', close: '22:00', isClosed: false },
    { day: 'Wednesday', open: '06:00', close: '22:00', isClosed: false },
    { day: 'Thursday', open: '06:00', close: '22:00', isClosed: false },
    { day: 'Friday', open: '06:00', close: '22:00', isClosed: false },
    { day: 'Saturday', open: '08:00', close: '20:00', isClosed: false },
    { day: 'Sunday', open: '08:00', close: '18:00', isClosed: false },
  ]);

  const [mockMember] = useState<Member>({
    id: 'm1',
    name: 'John Smith',
    email: 'john@example.com',
    subscriptionType: 'premium',
    subscriptionStart: '2025-10-01',
    subscriptionEnd: '2025-11-05',
    status: 'active',
  });

  const handleAddClass = (newClass: Omit<GymClass, 'id'>) => {
    const id = (classes.length + 1).toString();
    setClasses([...classes, { ...newClass, id }]);
    toast.success('Class created successfully', {
      description: `${newClass.name} has been added to the schedule`,
      duration: 3000,
    });
  };

  const handleDeleteClass = (id: string) => {
    const className = classes.find((c) => c.id === id)?.name;
    setClasses(classes.filter((c) => c.id !== id));
    toast.success('Class deleted', {
      description: `${className} has been removed from the schedule`,
      duration: 3000,
    });
  };

  const handleUpdateHours = (updatedHours: GymHours[]) => {
    setHours(updatedHours);
    toast.success('Hours updated successfully', {
      description: 'Gym operating hours have been saved',
      duration: 3000,
    });
  };

  const handleAddCoach = (newCoach: Omit<Coach, 'id'>) => {
    const id = (coaches.length + 1).toString();
    setCoaches([...coaches, { ...newCoach, id }]);
    toast.success('Coach added successfully', {
      description: `${newCoach.name} has been added to your team`,
      duration: 3000,
    });
  };

  const handleRoleChange = (newRole: UserRole) => {
    setUserRole(newRole);
    // Reset to home when switching roles
    setActiveTab('home');
    setSelectedWorkout(null);
  };

  const handleClassSelect = (classItem: GymClass) => {
    setSelectedWorkout(classItem);
  };

  const handleBackFromWorkout = () => {
    setSelectedWorkout(null);
  };

  // All roles use mobile-first ATHLION UI
  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#F7F5F2',
            border: '1px solid #C9A678',
            color: '#1E4B82',
            fontFamily: 'Inter, sans-serif',
          },
          className: 'marble-card soft-shadow',
        }}
      />
      <MobileLayout 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        userRole={userRole}
      >
      {selectedWorkout ? (
        <WorkoutDetailScreen onBack={handleBackFromWorkout} />
      ) : (
        <>
          {activeTab === 'home' && userRole === 'member' && <HomeScreen />}
          {activeTab === 'home' && userRole === 'owner' && (
            <OwnerDashboard
              classes={classes}
              coaches={coaches}
              hours={hours}
              onAddClass={handleAddClass}
              onUpdateHours={handleUpdateHours}
              onDeleteClass={handleDeleteClass}
              onAddCoach={handleAddCoach}
            />
          )}
          {activeTab === 'home' && userRole === 'coach' && (
            <CoachDashboard
              coachId="1"
              coachName="Sarah Johnson"
              classes={classes}
            />
          )}
          {activeTab === 'workouts' && (
            <WorkoutsScreen
              classes={classes}
              userRole={userRole}
              onClassSelect={handleClassSelect}
            />
          )}
          {activeTab === 'progress' && <ProgressScreen />}
          {activeTab === 'hours' && <HoursScreen hours={hours} />}
          {activeTab === 'profile' && (
            <ProfileScreen 
              userRole={userRole} 
              onRoleChange={handleRoleChange}
              member={userRole === 'member' ? mockMember : undefined}
            />
          )}
        </>
      )}
    </MobileLayout>
    </>
  );
}
