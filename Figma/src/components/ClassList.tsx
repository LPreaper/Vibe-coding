import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { GymClass } from '../types';
import { Calendar, Clock, Users, Trash2 } from 'lucide-react';

interface ClassListProps {
  classes: GymClass[];
  onDeleteClass?: (id: string) => void;
  showActions?: boolean;
}

export function ClassList({ classes, onDeleteClass, showActions = false }: ClassListProps) {
  const getCategoryColor = (category: GymClass['category']) => {
    const colors = {
      yoga: 'bg-[#1E4B82]/10 text-[#1E4B82]',
      strength: 'bg-[#C9A678]/10 text-[#C9A678]',
      cardio: 'bg-[#9A7B4F]/10 text-[#9A7B4F]',
      hiit: 'bg-[#C9A678]/10 text-[#C9A678]',
      pilates: 'bg-[#1E4B82]/10 text-[#1E4B82]',
    };
    return colors[category];
  };

  if (classes.length === 0) {
    return (
      <Card className="marble-card p-8 text-center soft-shadow border-0">
        <p className="font-sans text-[#9A7B4F]" style={{ fontSize: '15px' }}>
          No classes scheduled yet
        </p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {classes.map((gymClass) => (
        <Card key={gymClass.id} className="marble-card p-6 soft-shadow border-0">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-serif text-[#1E4B82]" style={{ fontSize: '18px', fontWeight: 600 }}>
                  {gymClass.name}
                </h4>
                <p className="font-sans text-[#9A7B4F]" style={{ fontSize: '14px' }}>
                  {gymClass.description}
                </p>
              </div>
              <Badge className={`${getCategoryColor(gymClass.category)} font-sans uppercase border-0`} style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.05em' }}>
                {gymClass.category}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#C9A678]" />
                <span className="font-sans text-[#3C3C3C]" style={{ fontSize: '14px' }}>
                  Coach: {gymClass.coachName}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C9A678]" />
                <span className="font-sans text-[#3C3C3C]" style={{ fontSize: '14px' }}>
                  {new Date(gymClass.date).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C9A678]" />
                <span className="font-sans text-[#3C3C3C]" style={{ fontSize: '14px' }}>
                  {gymClass.time} ({gymClass.duration} min)
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#9A7B4F]" />
                  <span className="font-sans text-[#9A7B4F]" style={{ fontSize: '14px' }}>
                    {gymClass.enrolled}/{gymClass.capacity} enrolled
                  </span>
                </div>
                {showActions && onDeleteClass && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDeleteClass(gymClass.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
