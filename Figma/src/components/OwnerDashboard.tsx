import { useState } from 'react';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ClassScheduler } from './ClassScheduler';
import { HoursManager } from './HoursManager';
import { ClassList } from './ClassList';
import { CoachManager } from './CoachManager';
import { GymClass, GymHours, Coach } from '../types';
import { Calendar, Clock, Users, Dumbbell } from 'lucide-react';

interface OwnerDashboardProps {
  classes: GymClass[];
  coaches: Coach[];
  hours: GymHours[];
  onAddClass: (newClass: Omit<GymClass, 'id'>) => void;
  onUpdateHours: (hours: GymHours[]) => void;
  onDeleteClass: (id: string) => void;
  onAddCoach: (coach: Omit<Coach, 'id'>) => void;
}

export function OwnerDashboard({
  classes,
  coaches,
  hours,
  onAddClass,
  onUpdateHours,
  onDeleteClass,
  onAddCoach,
}: OwnerDashboardProps) {
  const totalMembers = 142; // Mock data
  const activeClasses = classes.length;
  const totalCoaches = coaches.length;

  return (
    <div className="px-4 pb-6 space-y-5 sm:px-6 sm:space-y-6">
      {/* Welcome Section - Mobile First */}
      <div className="text-center sm:text-left">
        <h2 className="font-serif text-[#1E4B82]" style={{ fontSize: '24px', fontWeight: 600 }}>
          Owner Dashboard
        </h2>
        <p className="font-sans text-[#9A7B4F] mt-1" style={{ fontSize: '14px' }}>
          Manage your gym operations
        </p>
      </div>

      {/* Stats - Mobile First Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <Card className="marble-card-strong p-4 soft-shadow border-0">
          <div className="flex flex-col gap-2">
            <div className="p-2 bg-[#1E4B82]/10 rounded-xl w-fit">
              <Users className="w-5 h-5 text-[#1E4B82]" />
            </div>
            <div>
              <p className="font-sans text-[#9A7B4F]" style={{ fontSize: '11px' }}>Members</p>
              <p className="font-serif text-[#1E4B82]" style={{ fontSize: '24px', fontWeight: 600 }}>{totalMembers}</p>
            </div>
          </div>
        </Card>

        <Card className="marble-card-strong p-4 soft-shadow border-0">
          <div className="flex flex-col gap-2">
            <div className="p-2 bg-[#C9A678]/10 rounded-xl w-fit">
              <Calendar className="w-5 h-5 text-[#C9A678]" />
            </div>
            <div>
              <p className="font-sans text-[#9A7B4F]" style={{ fontSize: '11px' }}>Classes</p>
              <p className="font-serif text-[#1E4B82]" style={{ fontSize: '24px', fontWeight: 600 }}>{activeClasses}</p>
            </div>
          </div>
        </Card>

        <Card className="marble-card-strong p-4 soft-shadow border-0">
          <div className="flex flex-col gap-2">
            <div className="p-2 bg-[#9A7B4F]/10 rounded-xl w-fit">
              <Dumbbell className="w-5 h-5 text-[#9A7B4F]" />
            </div>
            <div>
              <p className="font-sans text-[#9A7B4F]" style={{ fontSize: '11px' }}>Coaches</p>
              <p className="font-serif text-[#1E4B82]" style={{ fontSize: '24px', fontWeight: 600 }}>{totalCoaches}</p>
            </div>
          </div>
        </Card>

        <Card className="marble-card-strong p-4 soft-shadow border-0">
          <div className="flex flex-col gap-2">
            <div className="p-2 bg-[#C9A678]/10 rounded-xl w-fit">
              <Clock className="w-5 h-5 text-[#C9A678]" />
            </div>
            <div>
              <p className="font-sans text-[#9A7B4F]" style={{ fontSize: '11px' }}>Open</p>
              <p className="font-sans text-[#1E4B82]" style={{ fontSize: '13px', fontWeight: 600 }}>6AM-10PM</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Management Tabs - Mobile First */}
      <Tabs defaultValue="classes" className="w-full">
        <TabsList className="grid w-full grid-cols-3 marble-card-strong soft-shadow border-0 p-1 h-auto">
          <TabsTrigger 
            value="classes" 
            className="font-sans text-xs py-2 data-[state=active]:bg-[#1E4B82] data-[state=active]:text-white sm:text-sm sm:py-2.5"
          >
            Classes
          </TabsTrigger>
          <TabsTrigger 
            value="hours" 
            className="font-sans text-xs py-2 data-[state=active]:bg-[#1E4B82] data-[state=active]:text-white sm:text-sm sm:py-2.5"
          >
            Hours
          </TabsTrigger>
          <TabsTrigger 
            value="coaches" 
            className="font-sans text-xs py-2 data-[state=active]:bg-[#1E4B82] data-[state=active]:text-white sm:text-sm sm:py-2.5"
          >
            Coaches
          </TabsTrigger>
        </TabsList>

        <TabsContent value="classes" className="space-y-4 mt-4">
          <ClassScheduler coaches={coaches} onAddClass={onAddClass} />
          <ClassList classes={classes} onDeleteClass={onDeleteClass} showActions />
        </TabsContent>

        <TabsContent value="hours" className="mt-4">
          <HoursManager hours={hours} onUpdateHours={onUpdateHours} />
        </TabsContent>

        <TabsContent value="coaches" className="mt-4">
          <CoachManager coaches={coaches} onAddCoach={onAddCoach} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
