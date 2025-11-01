import React from 'react';
import { CloseIcon } from './icons';
import { BADGES_DATABASE } from '../constants';
import type { Badge, BadgeId } from '../types';

interface BadgesModalProps {
  onClose: () => void;
  earnedBadgeIds: BadgeId[];
}

const BadgeItem: React.FC<{ badge: Badge, isEarned: boolean }> = ({ badge, isEarned }) => {
  const Icon = badge.icon;
  return (
    <div className={`text-center p-4 rounded-lg transition-all duration-300 ${isEarned ? 'bg-zinc-700' : 'bg-zinc-800 opacity-50'}`}>
        <Icon className={`w-12 h-12 mx-auto mb-2 ${isEarned ? 'text-yellow-400' : 'text-zinc-500'}`} />
        <p className={`font-bold ${isEarned ? 'text-white' : 'text-zinc-400'}`}>{badge.name}</p>
        <p className="text-xs text-zinc-400">{badge.description}</p>
    </div>
  )
}

const BadgesModal: React.FC<BadgesModalProps> = ({ onClose, earnedBadgeIds }) => {
  const earnedSet = new Set(earnedBadgeIds);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-xl font-bold">Your Badges</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <CloseIcon />
          </button>
        </header>

        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {BADGES_DATABASE.map(badge => (
                <BadgeItem key={badge.id} badge={badge} isEarned={earnedSet.has(badge.id)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgesModal;