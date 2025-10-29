import { Calendar, TrendingUp, Award, Flame, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

export function ProgressScreen() {
  const [showAchievements, setShowAchievements] = useState(false);
  const stats = [
    { label: 'Workouts', value: '24', icon: Flame, change: '+12%' },
    { label: 'Hours', value: '18.5', icon: Calendar, change: '+8%' },
    { label: 'Achievements', value: '7', icon: Award, change: '+2' },
  ];

  const weeklyData = [
    { day: 'Mon', value: 60 },
    { day: 'Tue', value: 45 },
    { day: 'Wed', value: 75 },
    { day: 'Thu', value: 30 },
    { day: 'Fri', value: 90 },
    { day: 'Sat', value: 60 },
    { day: 'Sun', value: 45 },
  ];

  const maxValue = Math.max(...weeklyData.map(d => d.value));

  const achievements = [
    { name: '7-Day Streak', description: 'Completed workouts for 7 days straight', earned: true },
    { name: 'Early Bird', description: 'Attended 10 morning classes', earned: true },
    { name: 'Strength Master', description: 'Completed 20 strength sessions', earned: true },
    { name: 'Flexibility Pro', description: 'Attended 15 yoga classes', earned: false },
    { name: 'Marathon', description: 'Complete 50 total workouts', earned: false },
  ];

  return (
    <div className="px-4 space-y-5 pb-6 sm:px-6 sm:space-y-6">
      {/* Circular Progress - Mobile First */}
      <div className="relative h-64 rounded-3xl overflow-hidden soft-shadow marble-card-strong sm:h-72">
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJibGUlMjB0ZXh0dXJlJTIwd2hpdGV8ZW58MXx8fHwxNzYxNjQ3NDA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          }}
        />
        <div className="relative h-full flex flex-col items-center justify-center">
          {/* Circular Progress Indicator - Mobile optimized */}
          <div className="relative">
            {/* Mobile size */}
            <svg className="w-32 h-32 transform -rotate-90 sm:hidden">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#F7F5F2"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#progressGradient)"
                strokeWidth="10"
                fill="none"
                strokeDasharray={`${(75 / 100) * 352} 352`}
                className="progress-circle"
              />
            </svg>
            {/* Desktop size */}
            <svg className="hidden sm:block w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#F7F5F2"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#progressGradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${(75 / 100) * 440} 440`}
                className="progress-circle"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C9A678" />
                  <stop offset="50%" stopColor="#9A7B4F" />
                  <stop offset="100%" stopColor="#1E4B82" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-serif text-[#1E4B82]" style={{ fontSize: '40px', fontWeight: 600 }}>
                75%
              </span>
              <span className="font-sans text-[#9A7B4F]" style={{ fontSize: '13px' }}>
                Monthly Goal
              </span>
            </div>
          </div>
          
          {/* Quote Overlay */}
          <div className="mt-4 text-center px-6 sm:mt-6">
            <p className="font-serif italic text-[#1E4B82]" style={{ fontSize: '15px', lineHeight: '1.6' }}>
              "Sculpt your potential."
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards - Mobile First */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="marble-card-strong rounded-2xl p-3.5 soft-shadow sm:p-4">
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A678] mb-1.5 sm:mb-2" />
              <p className="font-serif text-[#1E4B82] mb-0.5 sm:mb-1" style={{ fontSize: '20px', fontWeight: 600 }}>
                {stat.value}
              </p>
              <p className="font-sans text-[#9A7B4F] mb-1" style={{ fontSize: '10px' }}>
                {stat.label}
              </p>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#C9A678]" />
                <span className="font-sans text-[#C9A678]" style={{ fontSize: '10px', fontWeight: 500 }}>
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly Activity Graph - Mobile First */}
      <div className="marble-card-strong rounded-3xl p-5 soft-shadow sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-[#1E4B82]" style={{ fontSize: '18px', fontWeight: 600 }}>
            Weekly Activity
          </h3>
          <div className="text-right">
            <p className="font-serif text-[#1E4B82]" style={{ fontSize: '20px', fontWeight: 600 }}>
              {weeklyData.reduce((sum, d) => sum + d.value, 0)}
            </p>
            <p className="font-sans text-[#9A7B4F]" style={{ fontSize: '10px', textTransform: 'uppercase' }}>
              Total Minutes
            </p>
          </div>
        </div>
        
        <div className="space-y-2.5 sm:space-y-3">
          {weeklyData.map((data, index) => {
            const percentage = (data.value / maxValue) * 100;
            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[#3C3C3C]" style={{ fontSize: '13px', fontWeight: 500 }}>
                    {data.day}
                  </span>
                  <span className="font-serif text-[#1E4B82]" style={{ fontSize: '15px', fontWeight: 600 }}>
                    {data.value}<span className="font-sans text-[#9A7B4F]" style={{ fontSize: '11px', fontWeight: 400 }}>min</span>
                  </span>
                </div>
                <div className="relative h-2 bg-[#F7F5F2] rounded-full overflow-hidden">
                  <div 
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#1E4B82] to-[#C9A678] rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Weekly Stats Summary */}
        <div className="grid grid-cols-3 gap-2 mt-5 pt-5 border-t border-[#C9A678]/20">
          <div className="text-center">
            <p className="font-serif text-[#1E4B82]" style={{ fontSize: '18px', fontWeight: 600 }}>
              {Math.round(weeklyData.reduce((sum, d) => sum + d.value, 0) / weeklyData.length)}
            </p>
            <p className="font-sans text-[#9A7B4F]" style={{ fontSize: '10px', textTransform: 'uppercase' }}>
              Avg/Day
            </p>
          </div>
          <div className="text-center">
            <p className="font-serif text-[#1E4B82]" style={{ fontSize: '18px', fontWeight: 600 }}>
              {maxValue}
            </p>
            <p className="font-sans text-[#9A7B4F]" style={{ fontSize: '10px', textTransform: 'uppercase' }}>
              Best Day
            </p>
          </div>
          <div className="text-center">
            <p className="font-serif text-[#1E4B82]" style={{ fontSize: '18px', fontWeight: 600 }}>
              {weeklyData.filter(d => d.value > 0).length}
            </p>
            <p className="font-sans text-[#9A7B4F]" style={{ fontSize: '10px', textTransform: 'uppercase' }}>
              Active Days
            </p>
          </div>
        </div>
      </div>

      {/* Achievements - Mobile First with Progressive Disclosure */}
      <Collapsible open={showAchievements} onOpenChange={setShowAchievements}>
        <div className="marble-card-strong rounded-3xl p-5 soft-shadow sm:p-6">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-[#C9A678]" />
                <h3 className="font-serif text-[#1E4B82]" style={{ fontSize: '18px', fontWeight: 600 }}>
                  Achievements
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#C9A678] to-[#9A7B4F] badge-count">
                  <span className="font-sans text-white" style={{ fontSize: '11px', fontWeight: 500 }}>
                    {achievements.filter(a => a.earned).length}/{achievements.length}
                  </span>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-[#1E4B82] transition-transform duration-300 ${
                    showAchievements ? 'rotate-180' : ''
                  }`} 
                />
              </div>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-4">
            <div className="space-y-2.5 sm:space-y-3">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className={`marble-card rounded-2xl p-4 soft-shadow animate-fade-in ${!achievement.earned && 'opacity-50'}`}
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                      achievement.earned 
                        ? 'bg-gradient-to-br from-[#C9A678] to-[#9A7B4F]' 
                        : 'bg-[#F7F5F2] border-2 border-[#C9A678]/30'
                    }`}>
                      <Award className={`w-5 h-5 sm:w-6 sm:h-6 ${achievement.earned ? 'text-white' : 'text-[#C9A678]/50'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-[#1E4B82] truncate" style={{ fontSize: '15px', fontWeight: 600 }}>
                        {achievement.name}
                      </h4>
                      <p className="font-sans text-[#9A7B4F] line-clamp-1" style={{ fontSize: '12px' }}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned && (
                      <div className="flex-shrink-0">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#C9A678] flex items-center justify-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}
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
