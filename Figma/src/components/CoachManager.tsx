import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Coach } from '../types';
import { UserPlus, Mail } from 'lucide-react';

interface CoachManagerProps {
  coaches: Coach[];
  onAddCoach: (coach: Omit<Coach, 'id'>) => void;
}

export function CoachManager({ coaches, onAddCoach }: CoachManagerProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialty: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCoach(formData);
    setFormData({ name: '', email: '', specialty: '' });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <UserPlus className="w-5 h-5" />
          <h3>Add New Coach</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="coach-name">Name</Label>
              <Input
                id="coach-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coach-email">Email</Label>
              <Input
                id="coach-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialty">Specialty</Label>
            <Input
              id="specialty"
              value={formData.specialty}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              placeholder="Yoga, Strength Training, etc."
              required
            />
          </div>

          <Button type="submit" className="w-full">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Coach
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4">Current Coaches</h3>
        <div className="space-y-3">
          {coaches.map((coach) => (
            <div
              key={coach.id}
              className="flex items-center gap-4 p-4 border rounded-lg"
            >
              <Avatar>
                <AvatarFallback>
                  {coach.name.split(' ').map((n) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p>{coach.name}</p>
                <div className="flex items-center gap-1 text-gray-600">
                  <Mail className="w-3 h-3" />
                  <p>{coach.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-600">{coach.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
