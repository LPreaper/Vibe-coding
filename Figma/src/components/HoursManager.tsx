import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { GymHours } from '../types';
import { Clock, Save } from 'lucide-react';

interface HoursManagerProps {
  hours: GymHours[];
  onUpdateHours: (hours: GymHours[]) => void;
}

export function HoursManager({ hours, onUpdateHours }: HoursManagerProps) {
  const [localHours, setLocalHours] = useState(hours);

  const handleToggleDay = (day: string, isClosed: boolean) => {
    setLocalHours(
      localHours.map((h) => (h.day === day ? { ...h, isClosed } : h))
    );
  };

  const handleTimeChange = (day: string, field: 'open' | 'close', value: string) => {
    setLocalHours(
      localHours.map((h) => (h.day === day ? { ...h, [field]: value } : h))
    );
  };

  const handleSave = () => {
    onUpdateHours(localHours);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5" />
        <h3>Operating Hours</h3>
      </div>

      <div className="space-y-4">
        {localHours.map((dayHours) => (
          <div
            key={dayHours.day}
            className="flex flex-col md:flex-row md:items-center gap-4 p-4 border rounded-lg"
          >
            <div className="flex items-center gap-3 md:w-48">
              <Switch
                checked={!dayHours.isClosed}
                onCheckedChange={(checked) =>
                  handleToggleDay(dayHours.day, !checked)
                }
              />
              <Label className="min-w-24">{dayHours.day}</Label>
            </div>

            {!dayHours.isClosed ? (
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor={`${dayHours.day}-open`}>Open</Label>
                  <Input
                    id={`${dayHours.day}-open`}
                    type="time"
                    value={dayHours.open}
                    onChange={(e) =>
                      handleTimeChange(dayHours.day, 'open', e.target.value)
                    }
                    className="w-32"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor={`${dayHours.day}-close`}>Close</Label>
                  <Input
                    id={`${dayHours.day}-close`}
                    type="time"
                    value={dayHours.close}
                    onChange={(e) =>
                      handleTimeChange(dayHours.day, 'close', e.target.value)
                    }
                    className="w-32"
                  />
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Closed</p>
            )}
          </div>
        ))}

        <Button onClick={handleSave} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Save Hours
        </Button>
      </div>
    </Card>
  );
}
