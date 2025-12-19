import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface CounterProps {
  value: number;
  onChange: (val: number) => void;
  label: string;
  pricePerUnit: number;
  max?: number;
}

export const Counter: React.FC<CounterProps> = ({ value, onChange, label, pricePerUnit, max = 10 }) => {
  const handleDecrement = () => {
    if (value > 0) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-stone-200">
      <div className="flex flex-col">
        <span className="text-stone-800 font-medium">{label}</span>
        <span className="text-xs text-stone-500">+${pricePerUnit} / 指</span>
      </div>
      <div className="flex items-center gap-3 bg-stone-100 rounded-lg p-1">
        <button 
          onClick={handleDecrement}
          disabled={value === 0}
          className={`p-1 rounded-md transition-colors ${value === 0 ? 'text-stone-300' : 'text-stone-600 hover:bg-white shadow-sm'}`}
        >
          <Minus size={16} />
        </button>
        <span className="w-6 text-center font-medium text-stone-800">{value}</span>
        <button 
          onClick={handleIncrement}
          disabled={value === max}
          className={`p-1 rounded-md transition-colors ${value === max ? 'text-stone-300' : 'text-stone-600 hover:bg-white shadow-sm'}`}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};
