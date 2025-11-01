import React, { useState, useMemo } from 'react';
import type { HealthLog } from '../types';
import { LogType, TimeFrame, BadgeId } from '../types';
import { PlusIcon, StreakIcon, BadgeIcon, LeaderboardIcon } from './icons';
import AddDataModal from './AddDataModal';
import AiCoach from './AiCoach';
import BadgesModal from './BadgesModal';
import LeaderboardModal from './LeaderboardModal';
import { calculateStreak, calculateEarnedBadges } from '../services/gamificationService';

interface DashboardProps {
  healthLogs: HealthLog[];
  addHealthLog: (log: HealthLog) => void;
}

const MetricCard: React.FC<{ title: string; value: string; unit: string }> = ({ title, value, unit }) => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between">
    <div>
      <h3 className="text-zinc-400 text-sm font-medium">{title}</h3>
      <div className="flex items-baseline space-x-2 mt-1">
        <p className="text-3xl font-bold text-white">{value}</p>
        <span className="text-zinc-400">{unit}</span>
      </div>
    </div>
  </div>
);

const TimeFilter: React.FC<{ selected: TimeFrame; onSelect: (tf: TimeFrame) => void }> = ({ selected, onSelect }) => {
  const timeFrames = Object.values(TimeFrame);
  return (
    <div className="flex space-x-2 bg-zinc-900 p-1 rounded-full border border-zinc-800 overflow-x-auto">
      {timeFrames.map(tf => (
        <button
          key={tf}
          onClick={() => onSelect(tf)}
          className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-300 whitespace-nowrap ${
            selected === tf ? 'bg-blue-600 text-white' : 'text-zinc-300 hover:bg-zinc-800'
          }`}
        >
          {tf}
        </button>
      ))}
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ healthLogs, addHealthLog }) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>(TimeFrame.Daily);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(false);
  const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState(false);

  const filteredLogs = useMemo(() => {
    const now = new Date();
    return healthLogs.filter(log => {
      const logDate = log.timestamp;
      const diff = now.getTime() - logDate.getTime();
      const diffDays = diff / (1000 * 3600 * 24);

      switch (timeFrame) {
        case TimeFrame.Daily: return diffDays <= 1;
        case TimeFrame.Weekly: return diffDays <= 7;
        case TimeFrame.Monthly: return diffDays <= 30;
        case TimeFrame.SixMonths: return diffDays <= 182;
        case TimeFrame.Yearly: return diffDays <= 365;
        default: return true;
      }
    });
  }, [healthLogs, timeFrame]);

  const metrics = useMemo(() => {
    return filteredLogs.reduce((acc, log) => {
      switch (log.data.type) {
        case LogType.Food:
          acc.caloriesTaken += log.data.calories * log.data.quantity;
          break;
        case LogType.Workout:
          acc.caloriesBurnt += log.data.caloriesBurned;
          acc.workoutsCompleted += 1;
          break;
        case LogType.Mental:
          acc.mentalHealthScore = Math.min(10, acc.mentalHealthScore + 0.5); // Example scoring
          break;
      }
      return acc;
    }, {
      caloriesTaken: 0,
      caloriesBurnt: 0,
      mentalHealthScore: 0,
      workoutsCompleted: 0,
    });
  }, [filteredLogs]);

  const dailyStreak = useMemo(() => calculateStreak(healthLogs), [healthLogs]);
  const earnedBadges = useMemo(() => calculateEarnedBadges(healthLogs), [healthLogs]);

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-24 max-w-lg mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-zinc-400">Your health summary</p>
      </header>
      
      <div className="mb-6">
        <TimeFilter selected={timeFrame} onSelect={setTimeFrame} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <MetricCard title="Calories Taken" value={metrics.caloriesTaken.toLocaleString()} unit="kcal" />
        <MetricCard title="Calories Burnt" value={metrics.caloriesBurnt.toLocaleString()} unit="kcal" />
        <MetricCard title="Mental Health" value={metrics.mentalHealthScore.toFixed(1)} unit="score" />
        <MetricCard title="Workouts" value={metrics.workoutsCompleted.toString()} unit="completed" />
      </div>

      <div className="mt-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Progress & Community</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-zinc-800 p-4 rounded-lg">
                    <StreakIcon className="w-8 h-8 mx-auto text-orange-400"/>
                    <p className="text-2xl font-bold mt-2">{dailyStreak}</p>
                    <p className="text-zinc-400 text-sm">Day Streak</p>
                </div>
                 <button onClick={() => setIsBadgesModalOpen(true)} className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition-colors">
                    <BadgeIcon className="w-8 h-8 mx-auto text-yellow-400"/>
                    <p className="text-2xl font-bold mt-2">{earnedBadges.length}</p>
                    <p className="text-zinc-400 text-sm">Badges</p>
                </button>
                 <button onClick={() => setIsLeaderboardModalOpen(true)} className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition-colors">
                    <LeaderboardIcon className="w-8 h-8 mx-auto text-purple-400"/>
                    <p className="text-2xl font-bold mt-2">#3</p>
                    <p className="text-zinc-400 text-sm">Ranking</p>
                </button>
            </div>
        </div>
      </div>

      <AiCoach logs={filteredLogs} />

      <button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-6 right-6 lg:right-1/2 lg:translate-x-[240px] bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-4 shadow-lg shadow-purple-500/30 hover:scale-110 transition-transform duration-300 z-50"
        aria-label="Add new health log"
      >
        <PlusIcon className="w-8 h-8" />
      </button>

      {isAddModalOpen && <AddDataModal onClose={() => setIsAddModalOpen(false)} onAddLog={addHealthLog} />}
      {isBadgesModalOpen && <BadgesModal onClose={() => setIsBadgesModalOpen(false)} earnedBadgeIds={earnedBadges} />}
      {isLeaderboardModalOpen && <LeaderboardModal onClose={() => setIsLeaderboardModalOpen(false)} />}
    </div>
  );
};

export default Dashboard;