
import type { ComponentType } from 'react';

export enum LogType {
  Food = 'FOOD',
  Water = 'WATER',
  Workout = 'WORKOUT',
  Mental = 'MENTAL',
}

export enum TimeFrame {
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
  SixMonths = '6 Months',
  Yearly = 'Yearly',
}

export interface FoodLog {
  type: LogType.Food;
  name: string;
  calories: number;
  quantity: number;
}

export interface WaterLog {
  type: LogType.Water;
  amount: number; // in ml
}

export interface WorkoutLog {
  type: LogType.Workout;
  name: string;
  duration: number; // in minutes
  caloriesBurned: number;
}

export interface MentalLog {
  type: LogType.Mental;
  activity: string;
  duration: number; // in minutes
}

export type HealthLog = {
  id: string;
  timestamp: Date;
  data: FoodLog | WaterLog | WorkoutLog | MentalLog;
};

export interface FoodItem {
  name: string;
  calories: number; // per serving
  servingUnit: string;
}

export interface WorkoutItem {
  name: string;
  caloriesPerMinute: number;
}

export interface MentalActivityItem {
  name: string;
}

// Gamification Types
export enum BadgeId {
    FirstWorkout = 'FIRST_WORKOUT',
    WorkoutStreak7 = 'WORKOUT_STREAK_7',
    LoggingStreak30 = 'LOGGING_STREAK_30',
    SaladLover = 'SALAD_LOVER',
    HydrationHero = 'HYDRATION_HERO',
}

export interface Badge {
    id: BadgeId;
    name: string;
    description: string;
    // Fix: Use ComponentType instead of React.ComponentType to align with the new import.
    icon: ComponentType<{ className?: string }>;
}

export interface LeaderboardUser {
    id: string;
    name: string;
    score: number;
    isCurrentUser?: boolean;
}
