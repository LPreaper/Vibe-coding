import { GymClass, UserRole } from '../types';
import { Clock, Users, Calendar, Flame, Target, Dumbbell } from 'lucide-react';
import { useState } from 'react';

interface WorkoutsScreenProps {
  classes: GymClass[];
  userRole: UserRole;
  onClassSelect: (classItem: GymClass) => void;
}

export function WorkoutsScreen({ classes, userRole, onClassSelect }: WorkoutsScreenProps) {
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const categories = [
    { id: 'all', name: 'All', icon: Target },
    { id: 'yoga', name: 'Yoga', icon: Flame },
    { id: 'strength', name: 'Strength', icon: Dumbbell },
    { id: 'hiit', name: 'HIIT', icon: Target },
    { id: 'pilates', name: 'Pilates', icon: Flame },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      yoga: '#1E4B82',
      strength: '#C9A678',
      hiit: '#9A7B4F',
      pilates: '#1E4B82',
      cardio: '#C9A678',
    };
    return colors[category] || '#1E4B82';
  };

  // Generate day options
  const getDayOptions = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const options = [{ id: 'all', name: 'All', shortName: 'All', date: null }];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = daysOfWeek[date.getDay()];
      const dateStr = date.toISOString().split('T')[0];
      
      options.push({
        id: dateStr,
        name: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : dayName,
        shortName: i === 0 ? 'Today' : i === 1 ? 'Tom' : dayName.slice(0, 3),
        date: dateStr,
      });
    }
    
    return options;
  };

  const dayOptions = getDayOptions();

  // Filter classes based on selected day
  const filteredClasses = selectedDay === 'all' 
    ? classes 
    : classes.filter(classItem => classItem.date === selectedDay);

  const groupedByDate = filteredClasses.reduce((acc, classItem) => {
    const date = classItem.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(classItem);
    return acc;
  }, {} as Record<string, GymClass[]>);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="px-4 space-y-5 pb-6 sm:px-6 sm:space-y-6">
      {/* Header - Mobile First */}
      <div className="space-y-2">
        {/* App Name */}
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-gradient-to-b from-[#C9A678] to-[#9A7B4F] rounded-full" />
          <h1 className="font-serif text-[#C9A678]" style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em' }}>
            ATHLION
          </h1>
        </div>
        
        {/* Tab Title */}
        <div>
          <h2 className="font-serif text-[#1E4B82] mb-1" style={{ fontSize: '26px', fontWeight: 600 }}>
            Class Schedule
          </h2>
          <p className="font-sans text-[#9A7B4F]" style={{ fontSize: '13px' }}>
            Discover your next challenge
          </p>
        </div>
      </div>

      {/* Day Selector - Mobile First with horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 scrollbar-hide">
        {dayOptions.map((day) => (
          <button
            key={day.id}
            onClick={() => setSelectedDay(day.id)}
            className={`flex-shrink-0 px-4 py-2.5 rounded-full border transition-all duration-200 soft-shadow sm:px-5 sm:py-3 ${
              selectedDay === day.id
                ? 'bg-[#1E4B82] text-white border-[#1E4B82]'
                : 'marble-card border-[#C9A678]/20 text-[#3C3C3C] active:bg-[#1E4B82] active:text-white sm:hover:bg-[#1E4B82]/10'
            }`}
          >
            <span className="font-sans whitespace-nowrap" style={{ fontSize: '13px', fontWeight: 500 }}>
              {day.name}
            </span>
          </button>
        ))}
      </div>

      {/* Category Filter Pills - Mobile First with horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 scrollbar-hide">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full marble-card border border-[#C9A678]/20 active:bg-[#1E4B82] active:text-white transition-all duration-200 soft-shadow sm:gap-2 sm:px-4 sm:hover:bg-[#1E4B82] sm:hover:text-white"
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="font-sans whitespace-nowrap" style={{ fontSize: '12px', fontWeight: 500 }}>
                {category.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Classes Grouped by Date - Mobile First */}
      <div className="space-y-5 sm:space-y-6">
        {Object.entries(groupedByDate).map(([date, dateClasses]) => (
          <div key={date}>
            {/* Date Header */}
            <div className="flex items-center gap-2 mb-3 sm:gap-3 sm:mb-4">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A678]" />
              <h3 className="font-serif text-[#1E4B82]" style={{ fontSize: '18px', fontWeight: 600 }}>
                {formatDate(date)}
              </h3>
            </div>

            {/* Classes - Mobile First cards */}
            <div className="space-y-2.5 sm:space-y-3">
              {dateClasses.map((classItem) => (
                <button
                  key={classItem.id}
                  onClick={() => onClassSelect(classItem)}
                  className="w-full marble-card-strong rounded-3xl p-4 soft-shadow active:scale-[0.98] transition-transform duration-200 sm:p-5 sm:hover:scale-[1.02]"
                >
                  {/* Category Badge & Time */}
                  <div className="flex items-start justify-between mb-2.5 sm:mb-3">
                    <div
                      className="px-2.5 py-0.5 rounded-full sm:px-3 sm:py-1"
                      style={{ backgroundColor: `${getCategoryColor(classItem.category)}20` }}
                    >
                      <span
                        className="font-sans uppercase tracking-wide"
                        style={{
                          fontSize: '10px',
                          fontWeight: 500,
                          color: getCategoryColor(classItem.category),
                        }}
                      >
                        {classItem.category}
                      </span>
                    </div>
                    <div className="bg-[#1E4B82] text-white px-2.5 py-0.5 rounded-full sm:px-3 sm:py-1">
                      <span className="font-sans whitespace-nowrap" style={{ fontSize: '12px', fontWeight: 500 }}>
                        {classItem.time}
                      </span>
                    </div>
                  </div>

                  {/* Class Info */}
                  <div className="text-left mb-3 sm:mb-4">
                    <h4 className="font-serif text-[#1E4B82] mb-1" style={{ fontSize: '17px', fontWeight: 600 }}>
                      {classItem.name}
                    </h4>
                    <p className="font-sans text-[#9A7B4F] mb-1.5 line-clamp-2 sm:mb-2" style={{ fontSize: '13px', lineHeight: '1.5' }}>
                      {classItem.description}
                    </p>
                    <p className="font-sans text-[#C9A678]" style={{ fontSize: '12px' }}>
                      with {classItem.coachName}
                    </p>
                  </div>

                  <div className="gold-divider mb-3 sm:mb-4" />

                  {/* Class Meta - Mobile optimized */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#9A7B4F]" />
                        <span className="font-sans text-[#3C3C3C]" style={{ fontSize: '12px' }}>
                          {classItem.duration} min
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#9A7B4F]" />
                        <span className="font-sans text-[#3C3C3C]" style={{ fontSize: '12px' }}>
                          {classItem.enrolled}/{classItem.capacity}
                        </span>
                      </div>
                    </div>

                    {/* Capacity Bar */}
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-[#F7F5F2] rounded-full h-1.5 overflow-hidden sm:w-20 sm:h-2">
                        <div
                          className="h-full bg-gradient-to-r from-[#C9A678] to-[#9A7B4F] rounded-full transition-all duration-500"
                          style={{ width: `${(classItem.enrolled / classItem.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Motivational Footer - Mobile First */}
      <div className="marble-card rounded-3xl p-5 soft-shadow text-center sm:p-6">
        <p className="font-serif italic text-[#1E4B82]" style={{ fontSize: '15px', lineHeight: '1.6' }}>
          "Every workout is a step towards greatness."
        </p>
        <div className="gold-divider w-20 mx-auto mt-2.5 sm:w-24 sm:mt-3" />
      </div>
    </div>
  );
}
