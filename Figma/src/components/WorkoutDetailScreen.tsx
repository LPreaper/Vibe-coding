import { Clock, Flame, TrendingUp, User, ArrowLeft, CheckCircle2, AlertCircle, Users } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface WorkoutDetailScreenProps {
  onBack: () => void;
}

export function WorkoutDetailScreen({ onBack }: WorkoutDetailScreenProps) {
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const workoutMetrics = [
    { label: 'Duration', value: '60 min', icon: Clock, color: '#1E4B82' },
    { label: 'Calories', value: '450 kcal', icon: Flame, color: '#C9A678' },
    { label: 'Level', value: 'Intermediate', icon: TrendingUp, color: '#9A7B4F' },
  ];

  const exercises = [
    { name: 'Warm-up Flow', duration: '10 min', sets: '-' },
    { name: 'Sun Salutations', duration: '15 min', sets: '5 rounds' },
    { name: 'Warrior Sequence', duration: '15 min', sets: '3 rounds' },
    { name: 'Balance Poses', duration: '10 min', sets: '-' },
    { name: 'Cool Down & Stretch', duration: '10 min', sets: '-' },
  ];

  return (
    <div className="min-h-full">
      {/* Header - Mobile First */}
      <div className="relative h-64 sm:h-72">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJibGUlMjB0ZXh0dXJlJTIwd2hpdGV8ZW58MXx8fHwxNzYxNjQ3NDA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E4B82]/80 to-[#1E4B82]/95" />
        
        {/* Back Button - Touch optimized */}
        <button
          onClick={onBack}
          className="absolute top-5 left-4 p-2 bg-white/20 backdrop-blur-sm rounded-full active:scale-95 transition-transform duration-200 sm:top-6 sm:left-6"
        >
          <ArrowLeft className="w-5 h-5 text-white sm:w-6 sm:h-6" />
        </button>

        {/* Workout Title */}
        <div className="absolute inset-0 flex flex-col items-center justify-end p-5 text-white sm:p-6">
          <div className="text-center">
            <h1 className="font-serif mb-1.5 sm:mb-2" style={{ fontSize: '26px', fontWeight: 600, letterSpacing: '0.02em' }}>
              Morning Yoga Flow
            </h1>
            <p className="font-sans text-[#C9A678] mb-3 sm:mb-4" style={{ fontSize: '13px', letterSpacing: '0.05em' }}>
              Start your day with energizing poses
            </p>
            <div className="flex items-center justify-center gap-2">
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A678]" />
              <span className="font-sans" style={{ fontSize: '12px' }}>
                Sarah Johnson
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content - Mobile First */}
      <div className="px-4 py-5 space-y-5 sm:px-6 sm:py-6 sm:space-y-6">
        {/* Metrics Cards - Mobile First */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {workoutMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="marble-card rounded-2xl p-3.5 soft-shadow text-center sm:p-4">
                <div 
                  className="inline-flex p-1.5 rounded-full mb-1.5 sm:p-2 sm:mb-2"
                  style={{ backgroundColor: `${metric.color}20` }}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: metric.color }} />
                </div>
                <p className="font-sans text-[#9A7B4F] mb-0.5 sm:mb-1" style={{ fontSize: '10px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  {metric.label}
                </p>
                <p className="font-serif text-[#1E4B82]" style={{ fontSize: '15px', fontWeight: 600 }}>
                  {metric.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Exercise List - Mobile First */}
        <div>
          <h3 className="font-serif text-[#1E4B82] mb-3 sm:mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>
            Exercise Sequence
          </h3>
          <div className="space-y-2.5 sm:space-y-3">
            {exercises.map((exercise, index) => (
              <div key={index} className="marble-card rounded-2xl p-4 soft-shadow">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#C9A678] to-[#9A7B4F] flex items-center justify-center">
                    <span className="font-serif text-white" style={{ fontSize: '15px', fontWeight: 600 }}>
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-[#1E4B82] truncate" style={{ fontSize: '15px', fontWeight: 600 }}>
                      {exercise.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5 sm:gap-3 sm:mt-1">
                      <span className="font-sans text-[#9A7B4F] whitespace-nowrap" style={{ fontSize: '12px' }}>
                        {exercise.duration}
                      </span>
                      {exercise.sets !== '-' && (
                        <>
                          <span className="text-[#C9A678]">•</span>
                          <span className="font-sans text-[#9A7B4F] truncate" style={{ fontSize: '12px' }}>
                            {exercise.sets}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Quote - Mobile First */}
        <div className="marble-card rounded-3xl p-5 soft-shadow text-center sm:p-6">
          <p className="font-serif italic text-[#1E4B82] mb-2" style={{ fontSize: '16px', lineHeight: '1.6' }}>
            "Train with Purpose."
          </p>
          <div className="gold-divider w-16 mx-auto sm:w-20" />
        </div>

        {/* Join/Start Button - Mobile First, touch optimized */}
        {!isJoined ? (
          <button 
            onClick={() => setShowJoinDialog(true)}
            disabled={isProcessing}
            className="w-full bg-[#1E4B82] text-white py-3.5 rounded-full btn-glow font-sans shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed sm:py-4 sm:hover:scale-[1.02]" 
            style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '0.05em' }}
            aria-label="Join this class"
          >
            {isProcessing ? 'JOINING...' : 'JOIN CLASS'}
          </button>
        ) : (
          <div className="space-y-3">
            <div className="marble-card-strong rounded-2xl p-4 soft-shadow flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#1E4B82] to-[#C9A678] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-serif text-[#1E4B82]" style={{ fontSize: '15px', fontWeight: 600 }}>
                  You're Enrolled!
                </p>
                <p className="font-sans text-[#9A7B4F]" style={{ fontSize: '12px' }}>
                  See you in class
                </p>
              </div>
            </div>
            <button 
              className="w-full bg-[#1E4B82] text-white py-3.5 rounded-full btn-glow font-sans shadow-lg active:scale-[0.98] transition-transform duration-200 sm:py-4 sm:hover:scale-[1.02]" 
              style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '0.05em' }}
              aria-label="Start workout"
            >
              START WORKOUT
            </button>
          </div>
        )}

        {/* Current Enrollment Info */}
        <div className="marble-card rounded-2xl p-4 soft-shadow flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#C9A678]" />
            <span className="font-sans text-[#3C3C3C]" style={{ fontSize: '13px' }}>
              Current Enrollment
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-serif text-[#1E4B82]" style={{ fontSize: '16px', fontWeight: 600 }}>
              {isJoined ? 16 : 15}/20
            </span>
            <div className="w-20 h-2 bg-[#F7F5F2] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#1E4B82] to-[#C9A678] rounded-full transition-all duration-500"
                style={{ width: `${((isJoined ? 16 : 15) / 20) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Join Confirmation Dialog */}
      <AlertDialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
        <AlertDialogContent className="marble-card-strong soft-shadow border-2 border-[#C9A678]/30 max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-[#1E4B82]" style={{ fontSize: '20px', fontWeight: 600 }}>
              Join Morning Yoga Flow?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-sans text-[#3C3C3C] space-y-3" style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <p>
                You're about to join this class with Sarah Johnson.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-[#C9A678]/20">
                  <span className="text-[#9A7B4F]">Date & Time</span>
                  <span className="text-[#1E4B82] font-medium">Tomorrow, 8:00 AM</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#C9A678]/20">
                  <span className="text-[#9A7B4F]">Duration</span>
                  <span className="text-[#1E4B82] font-medium">60 minutes</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-[#9A7B4F]">Spots Available</span>
                  <span className="text-[#1E4B82] font-medium">5 remaining</span>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel 
              className="w-full marble-card border-2 border-[#C9A678]/30 text-[#3C3C3C] font-sans active:scale-95 transition-transform sm:w-auto"
              style={{ fontSize: '14px', fontWeight: 500 }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setIsProcessing(true);
                setTimeout(() => {
                  setIsJoined(true);
                  setIsProcessing(false);
                  setShowJoinDialog(false);
                  toast.success('Successfully joined class!', {
                    description: 'Morning Yoga Flow - Tomorrow at 8:00 AM',
                    duration: 3000,
                  });
                }, 800);
              }}
              className="w-full bg-[#1E4B82] text-white font-sans btn-glow active:scale-95 transition-transform sm:w-auto"
              style={{ fontSize: '14px', fontWeight: 600 }}
            >
              Confirm & Join
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
