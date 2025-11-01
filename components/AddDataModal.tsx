import React, { useState, useMemo } from 'react';
import { FoodIcon, WaterIcon, WorkoutIcon, MentalIcon, CloseIcon, BarcodeIcon } from './icons';
import { FOOD_DATABASE, WORKOUT_DATABASE, MENTAL_ACTIVITIES } from '../constants';
import type { HealthLog, FoodItem, WorkoutItem, MentalActivityItem } from '../types';
import { LogType } from '../types';
import BarcodeScanner from './BarcodeScanner';

interface AddDataModalProps {
  onClose: () => void;
  onAddLog: (log: HealthLog) => void;
}

type ActiveTab = 'food' | 'water' | 'workout' | 'mental';

const AddDataModal: React.FC<AddDataModalProps> = ({ onClose, onAddLog }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('food');
  
  const handleAddLog = (data: HealthLog['data']) => {
    onAddLog({ id: crypto.randomUUID(), timestamp: new Date(), data });
    onClose();
  };
  
  const renderContent = () => {
    switch(activeTab) {
      case 'food': return <FoodLogger onLog={handleAddLog} />;
      case 'water': return <WaterLogger onLog={handleAddLog} />;
      case 'workout': return <WorkoutLogger onLog={handleAddLog} />;
      case 'mental': return <MentalLogger onLog={handleAddLog} />;
      default: return null;
    }
  }

  const TabButton = ({ tab, icon, label }: { tab: ActiveTab; icon: React.ReactNode; label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex-1 p-3 flex flex-col items-center justify-center space-y-1 rounded-t-lg transition-colors duration-200 ${
        activeTab === tab ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-700'
      }`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-xl font-bold">Add to Journal</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <CloseIcon />
          </button>
        </header>

        <div className="flex border-b border-zinc-800">
          <TabButton tab="food" icon={<FoodIcon />} label="Food" />
          <TabButton tab="water" icon={<WaterIcon />} label="Water" />
          <TabButton tab="workout" icon={<WorkoutIcon />} label="Workout" />
          <TabButton tab="mental" icon={<MentalIcon />} label="Wellness" />
        </div>

        <div className="p-6 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// --- Sub-components for each logger ---
const FoodLogger: React.FC<{ onLog: (data: HealthLog['data']) => void }> = ({ onLog }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isScanning, setIsScanning] = useState(false);

  const filteredFood = useMemo(() => {
    if (!searchTerm) return [];
    return FOOD_DATABASE.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const handleLog = () => {
    if (selectedFood && quantity > 0) {
      onLog({ type: LogType.Food, name: selectedFood.name, calories: selectedFood.calories, quantity });
    }
  };

  const handleScan = (food: FoodItem) => {
    setSelectedFood(food);
    setIsScanning(false);
  }

  if (isScanning) {
      return <BarcodeScanner onScan={handleScan} onClose={() => setIsScanning(false)} />;
  }

  if (selectedFood) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{selectedFood.name}</h3>
        <p className="text-zinc-400">Calories per {selectedFood.servingUnit}: {selectedFood.calories}</p>
        <div className="flex items-center space-x-4">
          <label htmlFor="quantity">Quantity:</label>
          <input id="quantity" type="number" value={quantity} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-20 bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-center" />
        </div>
        <p className="text-xl font-bold">Total Calories: {selectedFood.calories * quantity}</p>
        <div className="flex space-x-2">
            <button onClick={handleLog} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg">Log Food</button>
            <button onClick={() => setSelectedFood(null)} className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-3 rounded-lg">Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <input type="text" placeholder="Search for food..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        <button onClick={() => setIsScanning(true)} className="p-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg" aria-label="Scan barcode">
          <BarcodeIcon />
        </button>
      </div>
      <div className="max-h-60 overflow-y-auto space-y-2">
        {filteredFood.map(food => (
          <button key={food.name} onClick={() => { setSelectedFood(food); setSearchTerm(''); }} className="w-full text-left p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg">
            {food.name}
          </button>
        ))}
        {searchTerm && filteredFood.length === 0 && (
            <p className="text-zinc-500 text-center p-4">No food found.</p>
        )}
      </div>
    </div>
  );
};

const WaterLogger: React.FC<{ onLog: (data: HealthLog['data']) => void }> = ({ onLog }) => {
    const [amount, setAmount] = useState(250); // default to 250ml
    return (
        <div className="space-y-4 text-center">
            <h3 className="text-lg font-semibold">Log Water Intake</h3>
            <div className="flex items-center justify-center space-x-4">
                <button onClick={() => setAmount(p => Math.max(50, p - 50))} className="w-12 h-12 bg-zinc-700 rounded-full text-2xl" aria-label="Decrease water amount">-</button>
                <p className="text-3xl font-bold w-32">{amount} ml</p>
                <button onClick={() => setAmount(p => p + 50)} className="w-12 h-12 bg-zinc-700 rounded-full text-2xl" aria-label="Increase water amount">+</button>
            </div>
            <button onClick={() => onLog({ type: LogType.Water, amount })} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg mt-4">Log Water</button>
        </div>
    );
};

const WorkoutLogger: React.FC<{ onLog: (data: HealthLog['data']) => void }> = ({ onLog }) => {
    const [selectedWorkout, setSelectedWorkout] = useState<WorkoutItem | null>(null);
    const [duration, setDuration] = useState(30); // in minutes

    if (selectedWorkout) {
        return (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">{selectedWorkout.name}</h3>
                <div className="flex items-center space-x-4">
                    <label htmlFor="duration">Duration (minutes):</label>
                    <input id="duration" type="number" value={duration} onChange={e => setDuration(Math.max(1, parseInt(e.target.value) || 1))} className="w-24 bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-center" />
                </div>
                <p className="text-xl font-bold">Calories Burned: {Math.round(selectedWorkout.caloriesPerMinute * duration)}</p>
                <div className="flex space-x-2">
                    <button onClick={() => onLog({ type: LogType.Workout, name: selectedWorkout.name, duration, caloriesBurned: Math.round(selectedWorkout.caloriesPerMinute * duration) })} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg">Log Workout</button>
                    <button onClick={() => setSelectedWorkout(null)} className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-3 rounded-lg">Back</button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {WORKOUT_DATABASE.map(workout => (
                <button key={workout.name} onClick={() => setSelectedWorkout(workout)} className="w-full text-left p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg">
                    {workout.name}
                </button>
            ))}
        </div>
    );
};

const MentalLogger: React.FC<{ onLog: (data: HealthLog['data']) => void }> = ({ onLog }) => {
    const [selectedActivity, setSelectedActivity] = useState<MentalActivityItem | null>(null);
    const [duration, setDuration] = useState(10); // in minutes

    if (selectedActivity) {
        return (
             <div className="space-y-4">
                <h3 className="text-lg font-semibold">{selectedActivity.name}</h3>
                <div className="flex items-center space-x-4">
                    <label htmlFor="mental-duration">Duration (minutes):</label>
                    <input id="mental-duration" type="number" value={duration} onChange={e => setDuration(Math.max(1, parseInt(e.target.value) || 1))} className="w-24 bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-center" />
                </div>
                <div className="flex space-x-2">
                    <button onClick={() => onLog({ type: LogType.Mental, activity: selectedActivity.name, duration })} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg">Log Session</button>
                    <button onClick={() => setSelectedActivity(null)} className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-3 rounded-lg">Back</button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-2">
            {MENTAL_ACTIVITIES.map(activity => (
                <button key={activity.name} onClick={() => setSelectedActivity(activity)} className="w-full text-left p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg">
                    {activity.name}
                </button>
            ))}
        </div>
    );
};


export default AddDataModal;