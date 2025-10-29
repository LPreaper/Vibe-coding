import { ReactNode, useRef, useState } from 'react';
import { Home, Dumbbell, TrendingUp, User, Clock } from 'lucide-react';
import { UserRole } from '../types';

interface MobileLayoutProps {
  children: ReactNode;
  activeTab: 'home' | 'workouts' | 'progress' | 'hours' | 'profile';
  onTabChange: (tab: 'home' | 'workouts' | 'progress' | 'hours' | 'profile') => void;
  userRole: UserRole;
}

export function MobileLayout({ children, activeTab, onTabChange, userRole }: MobileLayoutProps) {
  // Base tabs for all users
  const baseTabs = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'workouts' as const, label: 'Workouts', icon: Dumbbell },
    { id: 'progress' as const, label: 'Progress', icon: TrendingUp },
  ];
  
  // Hours tab for everyone
  const hoursTab = { id: 'hours' as const, label: 'Hours', icon: Clock };
  
  // Profile tab for everyone
  const profileTab = { id: 'profile' as const, label: 'Profile', icon: User };

  // Build tabs array - same for all roles now
  const tabs = [...baseTabs, hoursTab, profileTab];

  // Swipe gesture handling
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsScrolling(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Detect if user is scrolling vertically
    const deltaY = Math.abs(e.touches[0].clientY - touchStartY.current);
    const deltaX = Math.abs(e.touches[0].clientX - touchStartX.current);
    
    if (deltaY > deltaX && deltaY > 10) {
      setIsScrolling(true);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    // Don't trigger tab change if user was scrolling vertically
    if (isScrolling) return;

    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;
    const minSwipeDistance = 50; // Minimum swipe distance in pixels

    if (Math.abs(deltaX) > minSwipeDistance) {
      const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
      
      if (deltaX > 0 && currentIndex > 0) {
        // Swipe right - go to previous tab
        onTabChange(tabs[currentIndex - 1].id);
      } else if (deltaX < 0 && currentIndex < tabs.length - 1) {
        // Swipe left - go to next tab
        onTabChange(tabs[currentIndex + 1].id);
      }
    }
  };

  const getRoleLabel = () => {
    switch (userRole) {
      case 'owner':
        return 'Management Portal';
      case 'coach':
        return 'Coach Dashboard';
      default:
        return 'Strength Refined Through Discipline';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#F7F5F2] marble-texture">
      {/* Header - Mobile First */}
      <header className="px-4 pt-6 pb-3 bg-gradient-to-b from-white/50 to-transparent backdrop-blur-md sm:px-6 sm:pt-8 sm:pb-4">
        <div className="text-center max-w-md mx-auto">
          <h1 className="font-serif text-[#1E4B82] tracking-wider" style={{ fontSize: '28px', fontWeight: 600, letterSpacing: '0.05em' }}>
            ATHLION
          </h1>
          <p className="font-sans text-[#9A7B4F] tracking-widest mt-0.5" style={{ fontSize: '9px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            {getRoleLabel()}
          </p>
        </div>
      </header>

      {/* Main Content - Mobile First with vertical scrolling and swipe gestures */}
      <main 
        className="flex-1 overflow-y-auto pb-20"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </main>

      {/* Bottom Navigation - Mobile First, adaptive for 4, 5, or 6 tabs */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-[#C9A678]/20 shadow-lg marble-card safe-area-bottom">
        <div className={`flex items-center justify-around py-2 max-w-2xl mx-auto sm:py-3 ${
          tabs.length >= 5 ? 'px-0.5 sm:px-2' : 'px-2 sm:px-4'
        }`}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center gap-0.5 py-1.5 transition-all duration-300 sm:py-2 ${
                  tabs.length === 6 
                    ? 'px-1.5 min-w-[52px] sm:min-w-[60px] sm:px-2' 
                    : tabs.length === 5 
                      ? 'px-2 min-w-[56px] sm:min-w-[64px] sm:px-3' 
                      : 'px-3 min-w-[60px] sm:px-4'
                }`}
              >
                <div className={`p-1.5 rounded-full transition-all duration-300 sm:p-2 ${
                  isActive 
                    ? 'bg-[#1E4B82] shadow-lg shadow-[#1E4B82]/30' 
                    : 'bg-transparent'
                }`}>
                  <Icon 
                    className={`transition-colors duration-300 ${
                      tabs.length >= 5 ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-5 h-5'
                    } ${isActive ? 'text-white' : 'text-[#1E4B82]'}`} 
                  />
                </div>
                <span 
                  className={`font-greek transition-colors duration-300 ${
                    isActive ? 'text-[#C9A678]' : 'text-[#9A7B4F]'
                  }`}
                  style={{ 
                    fontSize: tabs.length === 6 ? '8px' : tabs.length === 5 ? '9px' : '10px', 
                    fontWeight: 500 
                  }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
