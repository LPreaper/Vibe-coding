import { Card } from './ui/card';
import { GymClass } from '../types';
import { ClassList } from './ClassList';
import { Calendar, Clock, Award } from 'lucide-react';

interface CoachDashboardProps {
  coachId: string;
  coachName: string;
  classes: GymClass[];
}

export function CoachDashboard({ coachId, coachName, classes }: CoachDashboardProps) {
  const myClasses = classes.filter((c) => c.coachId === coachId);
  const upcomingClasses = myClasses.filter(
    (c) => new Date(c.date) >= new Date()
  ).length;
  const totalStudents = myClasses.reduce((sum, c) => sum + c.enrolled, 0);

  return (
    <div className="px-4 pb-6 space-y-5 sm:px-6 sm:space-y-6">
      {/* Welcome Section - Mobile First */}
      <div className="text-center sm:text-left">
        <h2 className="font-serif text-[#1E4B82]" style={{ fontSize: '24px', fontWeight: 600 }}>
          Welcome Back
        </h2>
        <p className="font-sans text-[#9A7B4F] mt-1" style={{ fontSize: '14px' }}>
          {coachName}
        </p>
      </div>

      {/* Stats - Mobile First Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        <Card className="marble-card-strong p-5 soft-shadow border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#1E4B82]/10 rounded-xl">
              <Calendar className="w-6 h-6 text-[#1E4B82]" />
            </div>
            <div>
              <p className="font-sans text-[#9A7B4F]" style={{ fontSize: '13px' }}>Upcoming</p>
              <p className="font-serif text-[#1E4B82]" style={{ fontSize: '28px', fontWeight: 600 }}>{upcomingClasses}</p>
            </div>
          </div>
        </Card>

        <Card className="marble-card-strong p-5 soft-shadow border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#C9A678]/10 rounded-xl">
              <Clock className="w-6 h-6 text-[#C9A678]" />
            </div>
            <div>
              <p className="font-sans text-[#9A7B4F]" style={{ fontSize: '13px' }}>Total Classes</p>
              <p className="font-serif text-[#1E4B82]" style={{ fontSize: '28px', fontWeight: 600 }}>{myClasses.length}</p>
            </div>
          </div>
        </Card>

        <Card className="marble-card-strong p-5 soft-shadow border-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#9A7B4F]/10 rounded-xl">
              <Award className="w-6 h-6 text-[#9A7B4F]" />
            </div>
            <div>
              <p className="font-sans text-[#9A7B4F]" style={{ fontSize: '13px' }}>Students</p>
              <p className="font-serif text-[#1E4B82]" style={{ fontSize: '28px', fontWeight: 600 }}>{totalStudents}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Classes Section - Mobile First */}
      <div>
        <h3 className="font-serif text-[#1E4B82] mb-4" style={{ fontSize: '20px', fontWeight: 600 }}>
          Your Classes
        </h3>
        <ClassList classes={myClasses} />
      </div>
    </div>
  );
}
