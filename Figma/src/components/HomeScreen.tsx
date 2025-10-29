import { Calendar, Clock, Flame, Target, CalendarCheck, Trophy, TrendingUp, Award, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { useState } from 'react';

export function HomeScreen() {
  const [isTodayClassesOpen, setIsTodayClassesOpen] = useState(false);
  const [isUpcomingOpen, setIsUpcomingOpen] = useState(true);

  const workoutTypes = [
    { name: 'Full Body', icon: Target, color: '#1E4B82' },
    { name: 'Upper Body', icon: Flame, color: '#C9A678' },
    { name: 'Cardio', icon: Clock, color: '#9A7B4F' },
  ];

  const todayClasses = [
    { name: 'Morning Yoga Flow', time: '08:00', coach: 'Sarah Johnson', enrolled: 15, capacity: 20 },
    { name: 'Strength & Power', time: '10:00', coach: 'Mike Thompson', enrolled: 12, capacity: 15 },
    { name: 'HIIT Bootcamp', time: '18:00', coach: 'Emily Chen', enrolled: 20, capacity: 25 },
  ];

  // My Upcoming Classes - Enrolled classes
  const upcomingClasses = [
    { name: 'Morning Yoga Flow', time: '08:00', instructor: 'Sarah Johnson', date: '2025-10-28', day: 'Today' },
    { name: 'HIIT Bootcamp', time: '18:00', instructor: 'Emily Chen', date: '2025-10-28', day: 'Today' },
    { name: 'Strength & Power', time: '10:00', instructor: 'Mike Thompson', date: '2025-10-29', day: 'Tomorrow' },
    { name: 'Evening Pilates', time: '19:00', instructor: 'Sarah Johnson', date: '2025-10-30', day: 'Thursday' },
  ];

  // Format time to 12-hour format
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Weekly statistics
  const stats = {
    totalClasses: 142,
    classesThisWeek: 4,
    weeklyGoal: 5,
    currentStreak: 7,
  };

  return (
    <div className="px-4 space-y-5 pb-6 sm:px-6 sm:space-y-6">
      {/* Hero Section - Mobile First */}
      <div className="relative h-48 rounded-3xl overflow-hidden soft-shadow sm:h-56">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1551047163-78c1a36ad573?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlayUyMHN0YXR1ZSUyMGJ1c3QlMjBtYXJibGV8ZW58MXx8fHwxNzYxNjUyNDI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E4B82]/90 via-[#1E4B82]/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end p-5 text-white sm:p-6">
          <p className="font-serif italic text-center mb-1.5 sm:mb-2" style={{ fontSize: '16px', lineHeight: '1.6' }}>
            "Discipline Builds Legacy."
          </p>
          <div className="gold-divider w-20 mb-2 sm:w-24 sm:mb-3" />
          <p className="font-sans text-[#C9A678] text-center" style={{ fontSize: '12px', letterSpacing: '0.05em' }}>
            Tuesday, October 28, 2025
          </p>
        </div>
      </div>

      {/* Weekly Goal & Statistics - Mobile First */}
      <div className="marble-card-strong rounded-3xl p-5 soft-shadow sm:p-6">
        <div className="mb-4 sm:mb-5">
          <h3 className="font-serif text-[#1E4B82]" style={{ fontSize: '18px', fontWeight: 600 }}>
            Weekly Goal & Statistics
          </h3>
          <p className="font-sans text-[#9A7B4F] mt-0.5" style={{ fontSize: '12px' }}>
            Track your fitness journey
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Weekly Goal Progress */}
          <div className="bg-white border-2 border-[#1E4B82]/20 rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-10">
              <Target className="w-10 h-10 text-[#1E4B82]" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-1.5 mb-2">
                <Target className="w-4 h-4 text-[#1E4B82]" />
                <p className="font-sans text-[#9A7B4F]" style={{ fontSize: '11px' }}>
                  Weekly Goal
                </p>
              </div>
              <div className="flex items-baseline gap-1.5">
                <p className="font-serif text-[#1E4B82]" style={{ fontSize: '28px', fontWeight: 600, lineHeight: '1' }}>
                  {stats.classesThisWeek}
                </p>
                <p className="font-sans text-[#9A7B4F]" style={{ fontSize: '16px' }}>
                  / {stats.weeklyGoal}
                </p>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-[#F7F5F2] rounded-full h-1.5 overflow-hidden mt-2.5">
                <div 
                  className="h-full bg-gradient-to-r from-[#1E4B82] to-[#C9A678] rounded-full transition-all duration-500"
                  style={{ width: `${(stats.classesThisWeek / stats.weeklyGoal) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Current Streak */}
          <div className="bg-gradient-to-br from-[#9A7B4F] to-[#C9A678] rounded-2xl p-4 text-white relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-20">
              <Flame className="w-10 h-10" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-1.5 mb-2">
                <Flame className="w-4 h-4" />
                <p className="font-sans" style={{ fontSize: '11px', opacity: 0.9 }}>
                  Current Streak
                </p>
              </div>
              <div className="flex items-baseline gap-1">
                <p className="font-serif" style={{ fontSize: '28px', fontWeight: 600, lineHeight: '1' }}>
                  {stats.currentStreak}
                </p>
                <p className="font-sans" style={{ fontSize: '14px', opacity: 0.9 }}>
                  days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* My Upcoming Classes - Mobile First with Progressive Disclosure */}
      <Collapsible open={isUpcomingOpen} onOpenChange={setIsUpcomingOpen}>
        <div className="marble-card-strong rounded-3xl p-5 soft-shadow sm:p-6">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CalendarCheck className="w-5 h-5 text-[#C9A678]" />
                <h3 className="font-serif text-[#1E4B82]" style={{ fontSize: '18px', fontWeight: 600 }}>
                  My Upcoming Classes
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#1E4B82] to-[#C9A678] badge-count">
                  <span className="font-sans text-white" style={{ fontSize: '11px', fontWeight: 500 }}>
                    {upcomingClasses.length} BOOKED
                  </span>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-[#1E4B82] transition-transform duration-300 ${
                    isUpcomingOpen ? 'rotate-180' : ''
                  }`} 
                />
              </div>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-4">
            <div className="space-y-2.5 sm:space-y-3">
              {upcomingClasses.map((classItem, index) => (
                <div 
                  key={index} 
                  className="marble-card rounded-2xl p-4 soft-shadow active:scale-[0.98] transition-transform duration-200 sm:hover:scale-[1.01] animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-[#1E4B82] mb-1" style={{ fontSize: '15px', fontWeight: 600 }}>
                        {classItem.name}
                      </h4>
                      <p className="font-sans text-[#9A7B4F]" style={{ fontSize: '12px' }}>
                        with {classItem.instructor}
                      </p>
                    </div>
                    <div className={`px-2.5 py-1 rounded-full flex-shrink-0 ${
                      classItem.day === 'Today' 
                        ? 'bg-gradient-to-r from-[#1E4B82] to-[#C9A678]' 
                        : 'bg-[#C9A678]'
                    } text-white`}>
                      <span className="font-sans whitespace-nowrap" style={{ fontSize: '11px', fontWeight: 600 }}>
                        {classItem.day}
                      </span>
                    </div>
                  </div>
                  
                  <div className="gold-divider mb-3" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#1E4B82]" />
                      <span className="font-serif text-[#1E4B82]" style={{ fontSize: '14px', fontWeight: 500 }}>
                        {formatTime(classItem.time)}
                      </span>
                    </div>
                    <button className="bg-white border-2 border-[#1E4B82] text-[#1E4B82] px-4 py-1.5 rounded-full font-sans active:scale-95 transition-all duration-200 sm:hover:bg-[#1E4B82] sm:hover:text-white" style={{ fontSize: '12px', fontWeight: 600 }}>
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Quick Access - Mobile First */}
      <div>
        <h3 className="font-serif text-[#1E4B82] mb-3 sm:mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>
          Quick Start
        </h3>
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {workoutTypes.map((workout) => {
            const Icon = workout.icon;
            return (
              <button
                key={workout.name}
                className="marble-card-strong rounded-2xl p-3.5 flex flex-col items-center gap-2.5 soft-shadow active:scale-95 transition-transform duration-200 sm:p-4 sm:gap-3 sm:hover:scale-105"
              >
                <div 
                  className="p-2.5 rounded-full sm:p-3"
                  style={{ backgroundColor: `${workout.color}20` }}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: workout.color }} />
                </div>
                <span 
                  className="font-sans text-center text-[#3C3C3C]" 
                  style={{ fontSize: '11px', fontWeight: 500, lineHeight: '1.3' }}
                >
                  {workout.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Today's Classes - Collapsible - Mobile First */}
      <Collapsible open={isTodayClassesOpen} onOpenChange={setIsTodayClassesOpen}>
        <div className="marble-card-strong rounded-3xl p-5 soft-shadow sm:p-6">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-[#C9A678]" />
                <h3 className="font-serif text-[#1E4B82]" style={{ fontSize: '18px', fontWeight: 600 }}>
                  Today's Classes
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-sans text-[#9A7B4F] badge-count" style={{ fontSize: '12px' }}>
                  {todayClasses.length} classes
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-[#1E4B82] transition-transform duration-300 ${
                    isTodayClassesOpen ? 'rotate-180' : ''
                  }`} 
                />
              </div>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-4">
            <div className="space-y-2.5 sm:space-y-3">
              {todayClasses.map((classItem, index) => (
                <div 
                  key={index} 
                  className="marble-card-strong rounded-2xl p-4 soft-shadow active:scale-[0.98] transition-transform duration-200 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-2.5 sm:mb-3">
                    <div className="flex-1 min-w-0 pr-2">
                      <h4 className="font-serif text-[#1E4B82] truncate" style={{ fontSize: '15px', fontWeight: 600 }}>
                        {classItem.name}
                      </h4>
                      <p className="font-sans text-[#9A7B4F] truncate" style={{ fontSize: '12px' }}>
                        with {classItem.coach}
                      </p>
                    </div>
                    <div className="bg-[#1E4B82] text-white px-2.5 py-1 rounded-full flex-shrink-0">
                      <span className="font-sans whitespace-nowrap" style={{ fontSize: '12px', fontWeight: 500 }}>
                        {classItem.time}
                      </span>
                    </div>
                  </div>
                  <div className="gold-divider mb-2.5 sm:mb-3" />
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="w-full bg-[#F7F5F2] rounded-full h-2 overflow-hidden max-w-[100px] sm:max-w-[120px]">
                        <div 
                          className="h-full bg-gradient-to-r from-[#C9A678] to-[#9A7B4F] rounded-full"
                          style={{ width: `${(classItem.enrolled / classItem.capacity) * 100}%` }}
                        />
                      </div>
                      <span className="font-sans text-[#9A7B4F] whitespace-nowrap" style={{ fontSize: '11px' }}>
                        {classItem.enrolled}/{classItem.capacity}
                      </span>
                    </div>
                    <button className="bg-[#1E4B82] text-white px-4 py-1.5 rounded-full btn-glow font-sans active:scale-95 transition-transform duration-200 flex-shrink-0" style={{ fontSize: '12px', fontWeight: 500 }}>
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
}
