import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Member, GymClass } from '../types';
import { ClassList } from './ClassList';
import { CreditCard, Calendar, TrendingUp, CheckCircle2 } from 'lucide-react';

interface MemberDashboardProps {
  member: Member;
  classes: GymClass[];
}

export function MemberDashboard({ member, classes }: MemberDashboardProps) {
  const getStatusColor = (status: Member['status']) => {
    const colors = {
      active: 'bg-green-100 text-green-700',
      expired: 'bg-red-100 text-red-700',
      cancelled: 'bg-gray-100 text-gray-700',
    };
    return colors[status];
  };

  const getSubscriptionColor = (type: Member['subscriptionType']) => {
    const colors = {
      basic: 'bg-blue-100 text-blue-700',
      premium: 'bg-purple-100 text-purple-700',
      vip: 'bg-amber-100 text-amber-700',
    };
    return colors[type];
  };

  const daysRemaining = Math.ceil(
    (new Date(member.subscriptionEnd).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const subscriptionProgress = Math.max(0, Math.min(100, (daysRemaining / 30) * 100));

  // Mock enrolled classes
  const enrolledClasses = classes.slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h2>Member Dashboard</h2>
        <p className="text-gray-600">Welcome back, {member.name}!</p>
      </div>

      {/* Subscription Card */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3>Subscription Status</h3>
                <p className="text-gray-600">Your membership details</p>
              </div>
            </div>
            <Badge className={getStatusColor(member.status)}>
              {member.status}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="space-y-2">
              <p className="text-gray-600">Plan Type</p>
              <Badge className={getSubscriptionColor(member.subscriptionType)}>
                {member.subscriptionType.toUpperCase()}
              </Badge>
            </div>

            <div className="space-y-2">
              <p className="text-gray-600">Days Remaining</p>
              <p className="text-2xl">{daysRemaining} days</p>
            </div>

            <div className="space-y-2">
              <p className="text-gray-600">Start Date</p>
              <p>{new Date(member.subscriptionStart).toLocaleDateString()}</p>
            </div>

            <div className="space-y-2">
              <p className="text-gray-600">End Date</p>
              <p>{new Date(member.subscriptionEnd).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-gray-600">Subscription Period</p>
              <p className="text-gray-600">{subscriptionProgress.toFixed(0)}%</p>
            </div>
            <Progress value={subscriptionProgress} />
          </div>

          {member.status === 'active' && daysRemaining < 7 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-orange-800">
                Your subscription is expiring soon. Renew now to continue enjoying our services!
              </p>
              <Button className="mt-3 w-full">Renew Subscription</Button>
            </div>
          )}
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600">Classes Attended</p>
              <p className="text-2xl">24</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600">Upcoming Classes</p>
              <p className="text-2xl">{enrolledClasses.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-600">This Month</p>
              <p className="text-2xl">8 classes</p>
            </div>
          </div>
        </Card>
      </div>

      {/* My Classes */}
      <div>
        <h3 className="mb-4">My Enrolled Classes</h3>
        <ClassList classes={enrolledClasses} />
      </div>
    </div>
  );
}
