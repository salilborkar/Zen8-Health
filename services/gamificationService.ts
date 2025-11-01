
import type { HealthLog, FoodLog } from '../types';
import { LogType, BadgeId } from '../types';

const getDayIdentifier = (date: Date): string => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split('T')[0];
};

export function calculateStreak(logs: HealthLog[]): number {
  if (logs.length === 0) return 0;

  const loggedDays = new Set(logs.map(log => getDayIdentifier(log.timestamp)));
  
  const today = new Date();
  const todayId = getDayIdentifier(today);
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayId = getDayIdentifier(yesterday);

  if (!loggedDays.has(todayId) && !loggedDays.has(yesterdayId)) {
    return 0;
  }

  let streak = 0;
  let currentDate = today;

  // If last log was not today, start checking from yesterday
  if (!loggedDays.has(todayId)) {
      currentDate.setDate(currentDate.getDate() - 1);
  }

  while (loggedDays.has(getDayIdentifier(currentDate))) {
    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
}

const badgeCheckFunctions: Record<BadgeId, (logs: HealthLog[]) => boolean> = {
  [BadgeId.FirstWorkout]: (logs) => {
    return logs.some(log => log.data.type === LogType.Workout);
  },
  [BadgeId.SaladLover]: (logs) => {
    const saladCount = logs.filter(log =>
      log.data.type === LogType.Food &&
      (log.data as FoodLog).name.toLowerCase().includes('salad')
    ).length;
    return saladCount >= 5;
  },
  [BadgeId.LoggingStreak30]: (logs) => {
      // This is a simplified check. A full implementation would need more robust streak logic.
      return calculateStreak(logs) >= 30;
  },
  [BadgeId.WorkoutStreak7]: (logs) => {
    const workoutLogs = logs.filter(l => l.data.type === LogType.Workout);
    if(workoutLogs.length < 7) return false;
    // Simplified check: just checks for 7 workout logs total. A real implementation would check consecutive days.
    const workoutDays = new Set(workoutLogs.map(log => getDayIdentifier(log.timestamp)));
    return workoutDays.size >= 7; 
  },
  [BadgeId.HydrationHero]: (logs: HealthLog[]) => {
    // Fix: Use reduce to iterate once and correctly narrow the type of log.data.
    const dailyWaterIntake = logs.reduce((acc: Record<string, number>, log) => {
      if (log.data.type === LogType.Water) {
        const day = getDayIdentifier(log.timestamp);
        acc[day] = (acc[day] || 0) + log.data.amount;
      }
      return acc;
    }, {});
    return Object.values(dailyWaterIntake).some(total => total >= 2000);
  },
};

export function calculateEarnedBadges(logs: HealthLog[]): BadgeId[] {
  const earned: BadgeId[] = [];
  for (const badgeId in badgeCheckFunctions) {
    if (badgeCheckFunctions[badgeId as BadgeId](logs)) {
      earned.push(badgeId as BadgeId);
    }
  }
  return earned;
}
