import React from 'react';
import { CloseIcon } from './icons';
import { MOCK_LEADERBOARD_DATA } from '../constants';

interface LeaderboardModalProps {
  onClose: () => void;
}

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-xl font-bold">Leaderboard</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <CloseIcon />
          </button>
        </header>

        <div className="p-6 overflow-y-auto">
          <ul className="space-y-3">
            {MOCK_LEADERBOARD_DATA.sort((a,b) => b.score - a.score).map((user, index) => (
              <li key={user.id} className={`flex items-center justify-between p-3 rounded-lg ${user.isCurrentUser ? 'bg-purple-600/30 border border-purple-500' : 'bg-zinc-800'}`}>
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-lg w-6 text-center">{index + 1}</span>
                  <span className={user.isCurrentUser ? 'font-bold text-white' : 'text-zinc-300'}>{user.name}</span>
                </div>
                <span className="font-semibold text-purple-400">{user.score.toLocaleString()} pts</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardModal;