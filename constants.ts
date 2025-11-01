import type { FoodItem, WorkoutItem, MentalActivityItem, Badge, LeaderboardUser } from './types';
import { BadgeId } from './types';
import { BadgeIcon, FoodIcon, WaterIcon, WorkoutIcon, MentalIcon } from './components/icons';


export const FOOD_DATABASE: FoodItem[] = [
  // Western
  { name: 'Chicken Caesar Salad', calories: 350, servingUnit: 'serving' },
  { name: 'Cheeseburger', calories: 450, servingUnit: 'burger' },
  { name: 'Spaghetti Bolognese', calories: 600, servingUnit: 'plate' },
  { name: 'Pizza Slice (Pepperoni)', calories: 280, servingUnit: 'slice' },
  { name: 'Oatmeal', calories: 150, servingUnit: 'cup' },
  { name: 'Scanned Granola Bar', calories: 190, servingUnit: 'bar' },


  // Mediterranean
  { name: 'Greek Salad', calories: 250, servingUnit: 'serving' },
  { name: 'Hummus with Pita', calories: 300, servingUnit: 'serving' },
  { name: 'Falafel Wrap', calories: 400, servingUnit: 'wrap' },
  { name: 'Grilled Salmon', calories: 400, servingUnit: 'fillet' },
  { name: 'Lentil Soup', calories: 200, servingUnit: 'bowl' },

  // Indian
  { name: 'Naan', calories: 260, servingUnit: 'piece' },
  { name: 'Chole Bhature', calories: 450, servingUnit: 'plate' },
  { name: 'Butter Chicken', calories: 490, servingUnit: 'serving' },
  { name: 'Palak Paneer', calories: 350, servingUnit: 'serving' },
  { name: 'Dal Makhani', calories: 380, servingUnit: 'serving' },
  { name: 'Samosa', calories: 150, servingUnit: 'piece' },

  // Asian
  { name: 'Sushi (Salmon Roll)', calories: 300, servingUnit: 'roll' },
  { name: 'Ramen (Tonkotsu)', calories: 650, servingUnit: 'bowl' },
  { name: 'Pho (Beef)', calories: 450, servingUnit: 'bowl' },
  { name: 'Bibimbap', calories: 550, servingUnit: 'bowl' },
  { name: 'Pad Thai (Chicken)', calories: 500, servingUnit: 'plate' },

  // South American
  { name: 'Arepas (with cheese)', calories: 350, servingUnit: 'arepa' },
  { name: 'Ceviche', calories: 250, servingUnit: 'serving' },
  { name: 'Feijoada', calories: 700, servingUnit: 'bowl' },
  { name: 'Empanada (Beef)', calories: 280, servingUnit: 'piece' },
];

export const WORKOUT_DATABASE: WorkoutItem[] = [
  { name: 'Running', caloriesPerMinute: 12 },
  { name: 'Weight Lifting', caloriesPerMinute: 6 },
  { name: 'Yoga', caloriesPerMinute: 4 },
  { name: 'Cycling', caloriesPerMinute: 10 },
  { name: 'Swimming', caloriesPerMinute: 8 },
  { name: 'Walking', caloriesPerMinute: 5 },
];

export const MENTAL_ACTIVITIES: MentalActivityItem[] = [
  { name: 'Meditation' },
  { name: 'Journaling' },
  { name: 'Deep Breathing' },
  { name: 'Mindful Walk' },
  { name: 'Digital Detox' },
];


// --- GAMIFICATION CONSTANTS ---

export const BADGES_DATABASE: Badge[] = [
    { id: BadgeId.FirstWorkout, name: 'First Step', description: 'Log your very first workout.', icon: WorkoutIcon },
    { id: BadgeId.WorkoutStreak7, name: 'Consistency King', description: 'Complete a workout 7 days in a row.', icon: WorkoutIcon },
    { id: BadgeId.LoggingStreak30, name: 'Dedicated Diarist', description: 'Log an activity for 30 consecutive days.', icon: BadgeIcon },
    { id: BadgeId.SaladLover, name: 'Green Machine', description: 'Log 5 salads.', icon: FoodIcon },
    { id: BadgeId.HydrationHero, name: 'Hydration Hero', description: 'Log over 2 liters of water in a single day.', icon: WaterIcon },
];

export const MOCK_LEADERBOARD_DATA: LeaderboardUser[] = [
    { id: '1', name: 'Alex', score: 1250 },
    { id: '2', name: 'Brenda', score: 1100 },
    { id: '3', name: 'You', score: 980, isCurrentUser: true },
    { id: '4', name: 'Carlos', score: 850 },
    { id: '5', name: 'Diana', score: 720 },
];