import { Clock, MapPin, Phone, Mail, Globe, CheckCircle, XCircle, ChevronDown } from 'lucide-react';
import { GymHours } from '../types';
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface HoursScreenProps {
  hours: GymHours[];
}

export function HoursScreen({ hours }: HoursScreenProps) {
  const [showContact, setShowContact] = useState(false);
  const [showSchedule, setShowSchedule] = useState(true);

  // Get current day and time
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM format

  // Find today's hours
  const todayHours = hours.find(h => h.day === currentDay);
  
  // Check if gym is currently open
  const isOpenNow = todayHours && !todayHours.isClosed && 
    currentTime >= todayHours.open && currentTime <= todayHours.close;

  // Format time to 12-hour format
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Get next opening time if closed
  const getNextOpening = () => {
    if (isOpenNow) return null;
    
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayIndex = daysOfWeek.indexOf(currentDay);
    
    // Check if we're before opening today
    if (todayHours && !todayHours.isClosed && currentTime < todayHours.open) {
      return { day: 'today', time: todayHours.open };
    }
    
    // Check next days
    for (let i = 1; i <= 7; i++) {
      const nextDayIndex = (currentDayIndex + i) % 7;
      const nextDay = daysOfWeek[nextDayIndex];
      const nextDayHours = hours.find(h => h.day === nextDay);
      
      if (nextDayHours && !nextDayHours.isClosed) {
        return { 
          day: i === 1 ? 'tomorrow' : nextDay, 
          time: nextDayHours.open 
        };
      }
    }
    
    return null;
  };

  const nextOpening = getNextOpening();

  // Contact information
  const contactInfo = {
    address: '123 Fitness Avenue, Athens District',
    city: 'Mediterranean City, MC 12345',
    phone: '+1 (555) 123-4567',
    email: 'info@athlion.fit',
    website: 'www.athlion.fit',
  };

  return (
    <div className="px-4 space-y-5 pb-6 sm:px-6 sm:space-y-6">
      {/* Current Status Card - Mobile First */}
      <div className="relative overflow-hidden rounded-3xl soft-shadow">
        <div className={`bg-gradient-to-br ${isOpenNow 
          ? 'from-[#1E4B82] to-[#C9A678]' 
          : 'from-[#3C3C3C] to-[#9A7B4F]'
        } p-6 text-white`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="font-sans uppercase tracking-widest" style={{ fontSize: '11px', fontWeight: 500 }}>
                  Current Status
                </span>
              </div>
              <h2 className="font-serif mb-2" style={{ fontSize: '32px', fontWeight: 600 }}>
                {isOpenNow ? 'We\'re Open' : 'Currently Closed'}
              </h2>
              {todayHours && !todayHours.isClosed && (
                <p className="font-sans opacity-90" style={{ fontSize: '14px' }}>
                  {isOpenNow 
                    ? `Open until ${formatTime(todayHours.close)}`
                    : nextOpening 
                      ? `Opens ${nextOpening.day === 'today' ? 'today' : nextOpening.day} at ${formatTime(nextOpening.time)}`
                      : 'Check schedule below'
                  }
                </p>
              )}
            </div>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
              isOpenNow ? 'bg-white/20' : 'bg-white/10'
            }`}>
              {isOpenNow ? (
                <CheckCircle className="w-8 h-8" />
              ) : (
                <XCircle className="w-8 h-8" />
              )}
            </div>
          </div>

          {/* Today's Hours */}
          {todayHours && !todayHours.isClosed && (
            <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="font-sans" style={{ fontSize: '13px', fontWeight: 500 }}>
                  Today's Hours
                </span>
                <span className="font-serif" style={{ fontSize: '15px', fontWeight: 600 }}>
                  {formatTime(todayHours.open)} - {formatTime(todayHours.close)}
                </span>
              </div>
            </div>
          )}

          {/* Greek pattern decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 12px)',
            }} />
          </div>
        </div>
      </div>

      {/* Important Notice - Mobile First */}
      <div className="marble-card-strong rounded-2xl p-4 soft-shadow border-l-4 border-[#1E4B82]">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1E4B82]/10 flex items-center justify-center mt-0.5">
            <Clock className="w-4 h-4 text-[#1E4B82]" />
          </div>
          <div>
            <h4 className="font-serif text-[#1E4B82] mb-1" style={{ fontSize: '14px', fontWeight: 600 }}>
              Holiday Hours Notice
            </h4>
            <p className="font-sans text-[#3C3C3C]" style={{ fontSize: '12px', lineHeight: '1.6' }}>
              We'll be operating on reduced hours during the upcoming holidays. Please check our website or call for specific dates.
            </p>
          </div>
        </div>
      </div>

      {/* Weekly Schedule - Mobile First with Progressive Disclosure */}
      <Collapsible open={showSchedule} onOpenChange={setShowSchedule}>
        <div className="marble-card-strong rounded-3xl p-5 soft-shadow sm:p-6">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-[#C9A678]" />
                <h3 className="font-serif text-[#1E4B82]" style={{ fontSize: '18px', fontWeight: 600 }}>
                  Weekly Schedule
                </h3>
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-[#1E4B82] transition-transform duration-300 ${
                  showSchedule ? 'rotate-180' : ''
                }`} 
              />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="space-y-3">
              {hours.map((dayHours, index) => {
                const isToday = dayHours.day === currentDay;
                const isDayOpen = !dayHours.isClosed;
                
                return (
                  <div 
                    key={dayHours.day}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 animate-fade-in ${
                      isToday 
                        ? 'bg-gradient-to-r from-[#1E4B82]/10 to-[#C9A678]/10 border-2 border-[#C9A678]/30' 
                        : 'bg-white/50'
                    }`}
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      {isToday && (
                        <div className="w-2 h-2 rounded-full bg-[#C9A678] animate-pulse" />
                      )}
                      <span className={`font-sans ${
                        isToday ? 'text-[#1E4B82]' : 'text-[#3C3C3C]'
                      }`} style={{ 
                        fontSize: '14px', 
                        fontWeight: isToday ? 600 : 500 
                      }}>
                        {dayHours.day}
                      </span>
                    </div>
                    
                    {isDayOpen ? (
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-[#1E4B82]" style={{ fontSize: '14px', fontWeight: 500 }}>
                          {formatTime(dayHours.open)} - {formatTime(dayHours.close)}
                        </span>
                      </div>
                    ) : (
                      <span className="font-sans text-[#9A7B4F]" style={{ fontSize: '13px', fontStyle: 'italic' }}>
                        Closed
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Contact Information - Mobile First with Progressive Disclosure */}
      <Collapsible open={showContact} onOpenChange={setShowContact}>
        <div className="marble-card-strong rounded-3xl p-5 soft-shadow sm:p-6">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-[#C9A678]" />
                <h3 className="font-serif text-[#1E4B82]" style={{ fontSize: '18px', fontWeight: 600 }}>
                  Contact Information
                </h3>
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-[#1E4B82] transition-transform duration-300 ${
                  showContact ? 'rotate-180' : ''
                }`} 
              />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-4">
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#1E4B82] to-[#C9A678] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-serif text-[#1E4B82] mb-1" style={{ fontSize: '14px', fontWeight: 600 }}>
                    Location
                  </h4>
                  <p className="font-sans text-[#3C3C3C]" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                    {contactInfo.address}
                  </p>
                  <p className="font-sans text-[#9A7B4F]" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                    {contactInfo.city}
                  </p>
                  <button className="mt-2 font-sans text-[#1E4B82] underline" style={{ fontSize: '12px', fontWeight: 500 }}>
                    Get Directions →
                  </button>
                </div>
              </div>

              <div className="gold-divider" />

              {/* Phone */}
              <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-4 active:scale-[0.98] transition-transform">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A678] to-[#9A7B4F] flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-serif text-[#1E4B82] mb-0.5" style={{ fontSize: '14px', fontWeight: 600 }}>
                    Phone
                  </h4>
                  <p className="font-sans text-[#3C3C3C]" style={{ fontSize: '13px' }}>
                    {contactInfo.phone}
                  </p>
                </div>
              </a>

              <div className="gold-divider" />

              {/* Email */}
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4 active:scale-[0.98] transition-transform">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#1E4B82] to-[#C9A678] flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-serif text-[#1E4B82] mb-0.5" style={{ fontSize: '14px', fontWeight: 600 }}>
                    Email
                  </h4>
                  <p className="font-sans text-[#3C3C3C]" style={{ fontSize: '13px' }}>
                    {contactInfo.email}
                  </p>
                </div>
              </a>

              <div className="gold-divider" />

              {/* Website */}
              <a href={`https://${contactInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 active:scale-[0.98] transition-transform">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A678] to-[#9A7B4F] flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-serif text-[#1E4B82] mb-0.5" style={{ fontSize: '14px', fontWeight: 600 }}>
                    Website
                  </h4>
                  <p className="font-sans text-[#3C3C3C]" style={{ fontSize: '13px' }}>
                    {contactInfo.website}
                  </p>
                </div>
              </a>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Quick Actions - Mobile First */}
      <div className="grid grid-cols-2 gap-3">
        <a 
          href={`tel:${contactInfo.phone}`}
          className="marble-card-strong rounded-2xl p-4 soft-shadow active:scale-[0.98] transition-all duration-200 sm:hover:scale-[1.02] block"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1E4B82] to-[#C9A678] flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <span className="font-sans text-[#1E4B82]" style={{ fontSize: '13px', fontWeight: 600 }}>
              Call Us
            </span>
          </div>
        </a>

        <a 
          href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="marble-card-strong rounded-2xl p-4 soft-shadow active:scale-[0.98] transition-all duration-200 sm:hover:scale-[1.02] block"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A678] to-[#9A7B4F] flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <span className="font-sans text-[#1E4B82]" style={{ fontSize: '13px', fontWeight: 600 }}>
              Directions
            </span>
          </div>
        </a>
      </div>

      {/* Motivational Quote - Mobile First */}
      <div className="marble-card-strong rounded-3xl p-5 soft-shadow text-center sm:p-6">
        <p className="font-serif italic text-[#1E4B82] mb-2" style={{ fontSize: '15px', lineHeight: '1.6' }}>
          "Excellence is not a destination; it is a continuous journey that never ends."
        </p>
        <div className="gold-divider w-20 mx-auto" />
      </div>
    </div>
  );
}
