import { Calendar, CreditCard, Crown, Check, Clock, Users, Dumbbell, Trophy, Sparkles, Gift } from 'lucide-react';
import { Member } from '../types';

interface MembershipScreenProps {
  member: Member;
}

export function MembershipScreen({ member }: MembershipScreenProps) {
  // Calculate days remaining
  const endDate = new Date(member.subscriptionEnd);
  const today = new Date();
  const daysRemaining = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isExpiringSoon = daysRemaining <= 7;

  // Membership tier configurations
  const membershipTiers = {
    basic: {
      name: 'Basic',
      color: '#9A7B4F',
      icon: Dumbbell,
      price: '$29',
      gradient: 'from-[#9A7B4F] to-[#C9A678]',
    },
    premium: {
      name: 'Premium',
      color: '#1E4B82',
      icon: Crown,
      price: '$49',
      gradient: 'from-[#1E4B82] to-[#C9A678]',
    },
    vip: {
      name: 'VIP Elite',
      color: '#C9A678',
      icon: Trophy,
      price: '$99',
      gradient: 'from-[#C9A678] to-[#9A7B4F]',
    },
  };

  const currentTier = membershipTiers[member.subscriptionType];
  const Icon = currentTier.icon;

  // Benefits per tier
  const benefits = {
    basic: [
      'Access to gym equipment',
      'Locker room access',
      'Basic fitness assessment',
      '2 group classes per week',
    ],
    premium: [
      'All Basic benefits',
      'Unlimited group classes',
      'Personal training session (1/month)',
      'Nutrition consultation',
      'Priority class booking',
      'Guest pass (2/month)',
    ],
    vip: [
      'All Premium benefits',
      'Unlimited personal training',
      'Private locker',
      'Massage therapy (2/month)',
      'Exclusive VIP lounge access',
      'Complimentary protein shakes',
      'Priority parking',
      '24/7 gym access',
    ],
  };

  const currentBenefits = benefits[member.subscriptionType];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="px-4 space-y-5 pb-6 sm:px-6 sm:space-y-6">
      {/* Current Membership Card - Mobile First */}
      <div className="relative overflow-hidden rounded-3xl soft-shadow">
        <div className={`bg-gradient-to-br ${currentTier.gradient} p-6 text-white`}>
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="font-sans uppercase tracking-widest" style={{ fontSize: '11px', fontWeight: 500 }}>
                  Current Plan
                </span>
              </div>
              <h2 className="font-serif" style={{ fontSize: '28px', fontWeight: 600 }}>
                {currentTier.name}
              </h2>
              <p className="font-sans opacity-90 mt-1" style={{ fontSize: '13px' }}>
                {member.name}
              </p>
            </div>
            <div className="text-right">
              <div className="font-serif" style={{ fontSize: '32px', fontWeight: 600 }}>
                {currentTier.price}
              </div>
              <div className="font-sans opacity-90" style={{ fontSize: '12px' }}>
                per month
              </div>
            </div>
          </div>

          <div className="gold-divider opacity-50 mb-5" />

          {/* Membership Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="font-sans opacity-80" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                  Member Since
                </span>
              </div>
              <p className="font-sans" style={{ fontSize: '13px', fontWeight: 500 }}>
                {formatDate(member.subscriptionStart)}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4" />
                <span className="font-sans opacity-80" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                  Expires
                </span>
              </div>
              <p className="font-sans" style={{ fontSize: '13px', fontWeight: 500 }}>
                {formatDate(member.subscriptionEnd)}
              </p>
            </div>
          </div>

          {/* Greek pattern decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 12px)',
            }} />
          </div>
        </div>

        {/* Days Remaining Bar */}
        <div className={`${isExpiringSoon ? 'bg-[#d4183d]' : 'bg-[#1E4B82]'} px-6 py-3 text-white relative overflow-hidden`}>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              {isExpiringSoon && (
                <Sparkles className="w-4 h-4 animate-pulse" />
              )}
              <span className="font-sans" style={{ fontSize: '13px', fontWeight: 500 }}>
                {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Membership expired'}
              </span>
            </div>
            <div className={`px-2 py-0.5 rounded-full ${isExpiringSoon ? 'bg-white/20' : 'bg-white/10'}`}>
              <span className="font-sans" style={{ fontSize: '11px', fontWeight: 500 }}>
                {member.status.toUpperCase()}
              </span>
            </div>
          </div>
          {/* Progress bar */}
          {daysRemaining > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <div 
                className="h-full bg-white/50 transition-all duration-500"
                style={{ width: `${Math.max(0, Math.min(100, (daysRemaining / 30) * 100))}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Expiring Soon Alert - Mobile First */}
      {isExpiringSoon && daysRemaining > 0 && (
        <div className="marble-card-strong rounded-2xl p-4 soft-shadow border-2 border-[#d4183d]/30">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#d4183d]/10 flex items-center justify-center">
              <Gift className="w-5 h-5 text-[#d4183d]" />
            </div>
            <div className="flex-1">
              <h4 className="font-serif text-[#1E4B82] mb-1" style={{ fontSize: '15px', fontWeight: 600 }}>
                Renewal Special Offer
              </h4>
              <p className="font-sans text-[#3C3C3C] mb-2" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                Renew now and get <span className="font-serif text-[#C9A678]" style={{ fontWeight: 600 }}>20% off</span> your next month!
              </p>
              <p className="font-sans text-[#9A7B4F]" style={{ fontSize: '11px' }}>
                Offer expires in {daysRemaining} days
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Renew Button - Mobile First */}
      {member.status === 'active' && (
        <button className="w-full bg-[#1E4B82] text-white py-3.5 rounded-full btn-glow font-sans shadow-lg active:scale-[0.98] transition-transform duration-200 flex items-center justify-center gap-2 sm:py-4 sm:hover:scale-[1.02]" style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '0.05em' }}>
          <CreditCard className="w-5 h-5" />
          {isExpiringSoon ? 'RENEW WITH 20% OFF' : 'RENEW MEMBERSHIP'}
        </button>
      )}

      {/* Membership Benefits - Mobile First */}
      <div>
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="font-serif text-[#1E4B82]" style={{ fontSize: '18px', fontWeight: 600 }}>
            Your Benefits
          </h3>
          <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${currentTier.gradient}`}>
            <span className="font-sans text-white" style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.05em' }}>
              {currentBenefits.length} PERKS
            </span>
          </div>
        </div>
        <div className="marble-card-strong rounded-3xl p-5 soft-shadow sm:p-6">
          <div className="space-y-3">
            {currentBenefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#C9A678] to-[#9A7B4F] flex items-center justify-center mt-0.5 shadow-sm">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
                <p className="font-sans text-[#3C3C3C] flex-1" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Membership Usage Stats - Mobile First */}
      <div>
        <h3 className="font-serif text-[#1E4B82] mb-3 sm:mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>
          This Month's Activity
        </h3>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          <div className="marble-card-strong rounded-2xl p-4 soft-shadow">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-[#C9A678]" />
              <span className="font-sans text-[#9A7B4F]" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                Classes
              </span>
            </div>
            <p className="font-serif text-[#1E4B82]" style={{ fontSize: '24px', fontWeight: 600 }}>
              12
            </p>
            <p className="font-sans text-[#9A7B4F] mt-1" style={{ fontSize: '11px' }}>
              {member.subscriptionType === 'basic' ? '2 per week limit' : 'Unlimited'}
            </p>
          </div>

          <div className="marble-card-strong rounded-2xl p-4 soft-shadow">
            <div className="flex items-center gap-2 mb-2">
              <Dumbbell className="w-4 h-4 text-[#C9A678]" />
              <span className="font-sans text-[#9A7B4F]" style={{ fontSize: '11px', textTransform: 'uppercase' }}>
                Check-ins
              </span>
            </div>
            <p className="font-serif text-[#1E4B82]" style={{ fontSize: '24px', fontWeight: 600 }}>
              24
            </p>
            <p className="font-sans text-[#9A7B4F] mt-1" style={{ fontSize: '11px' }}>
              This period
            </p>
          </div>
        </div>
      </div>

      {/* VIP Exclusive Section - Only for VIP members */}
      {member.subscriptionType === 'vip' && (
        <div className="relative overflow-hidden rounded-3xl soft-shadow">
          <div className="bg-gradient-to-br from-[#C9A678] via-[#9A7B4F] to-[#1E4B82] p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-5 h-5" />
              <span className="font-sans uppercase tracking-widest" style={{ fontSize: '11px', fontWeight: 500 }}>
                VIP Exclusive
              </span>
            </div>
            <h3 className="font-serif mb-2" style={{ fontSize: '22px', fontWeight: 600 }}>
              Elite Member Perks
            </h3>
            <p className="font-sans opacity-90" style={{ fontSize: '13px', lineHeight: '1.6' }}>
              As our most valued member, you have access to exclusive events, priority support, and complimentary services.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="font-sans" style={{ fontSize: '12px' }}>
                Concierge service available 24/7
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Options - Mobile First */}
      {member.subscriptionType !== 'vip' && (
        <div>
          <h3 className="font-serif text-[#1E4B82] mb-3 sm:mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>
            Upgrade Your Plan
          </h3>
          <div className="space-y-3">
            {Object.entries(membershipTiers)
              .filter(([key]) => {
                const tiers = ['basic', 'premium', 'vip'];
                const currentIndex = tiers.indexOf(member.subscriptionType);
                const tierIndex = tiers.indexOf(key);
                return tierIndex > currentIndex;
              })
              .map(([key, tier]) => {
                const TierIcon = tier.icon;
                return (
                  <button
                    key={key}
                    className="w-full marble-card-strong rounded-2xl p-4 soft-shadow active:scale-[0.98] transition-all duration-200 sm:hover:scale-[1.02]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${tier.color}20` }}
                        >
                          <TierIcon className="w-5 h-5" style={{ color: tier.color }} />
                        </div>
                        <div className="text-left">
                          <h4 className="font-serif text-[#1E4B82]" style={{ fontSize: '16px', fontWeight: 600 }}>
                            {tier.name}
                          </h4>
                          <p className="font-sans text-[#9A7B4F]" style={{ fontSize: '12px' }}>
                            {tier.price}/month
                          </p>
                        </div>
                      </div>
                      <div className="bg-[#1E4B82] text-white px-4 py-1.5 rounded-full">
                        <span className="font-sans" style={{ fontSize: '12px', fontWeight: 500 }}>
                          Upgrade
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      )}

      {/* Motivational Quote - Mobile First */}
      <div className="marble-card-strong rounded-3xl p-5 soft-shadow text-center sm:p-6">
        <p className="font-serif italic text-[#1E4B82] mb-2" style={{ fontSize: '15px', lineHeight: '1.6' }}>
          "Your commitment today defines your legacy tomorrow."
        </p>
        <div className="gold-divider w-20 mx-auto" />
      </div>
    </div>
  );
}
