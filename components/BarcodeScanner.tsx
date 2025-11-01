import React from 'react';
import type { FoodItem } from '../types';
import { FOOD_DATABASE } from '../constants';

interface BarcodeScannerProps {
    onScan: (food: FoodItem) => void;
    onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan, onClose }) => {
    
    const handleSimulateScan = () => {
        // Find a specific item from the database to return as the "scanned" item
        const scannedItem = FOOD_DATABASE.find(item => item.name === 'Scanned Granola Bar');
        if (scannedItem) {
            onScan(scannedItem);
        } else {
            // Fallback if the item is not found
            onScan({ name: 'Scanned Item', calories: 200, servingUnit: 'item' });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4 p-4 h-full">
            <div className="relative w-full max-w-xs h-48 bg-gray-800 rounded-lg overflow-hidden border-2 border-zinc-700">
                <div className="absolute top-0 left-0 w-full h-full animate-scan-line bg-red-500/50"></div>
                <p className="absolute inset-0 flex items-center justify-center text-zinc-400">Camera Permission Required</p>
            </div>
            <style>{`
                @keyframes scan-line {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                .animate-scan-line {
                    animation: scan-line 2s infinite linear;
                    height: 2px;
                }
            `}</style>

            <p className="text-zinc-400 text-sm text-center">Simulating barcode scanner. <br /> Press the button below to scan an item.</p>

            <div className="w-full max-w-xs flex flex-col space-y-2">
                <button 
                    onClick={handleSimulateScan}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg"
                >
                    Simulate Scan
                </button>
                <button 
                    onClick={onClose}
                    className="w-full bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-3 rounded-lg"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default BarcodeScanner;