
import React, { useState, useCallback } from 'react';
import { getHealthAdvice } from '../services/geminiService';
import type { HealthLog } from '../types';

interface AiCoachProps {
  logs: HealthLog[];
}

const AiCoach: React.FC<AiCoachProps> = ({ logs }) => {
  const [advice, setAdvice] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchAdvice = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setAdvice('');
    try {
      const result = await getHealthAdvice(logs);
      setAdvice(result);
    } catch (e: any) {
      setError(e.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logs]);
  
  const formatAdvice = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-lg font-semibold text-blue-400 mt-4 mb-2">{line.substring(4)}</h3>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-xl font-bold text-purple-400 mt-4 mb-2">{line.substring(3)}</h2>;
        }
        if (line.startsWith('* ')) {
          return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
        }
        if (line.startsWith('- ')) {
            return <li key={index} className="ml-5 list-disc">{line.substring(2)}</li>;
        }
        return <p key={index} className="my-1">{line}</p>;
      });
  };

  return (
    <div className="mt-8">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div>
                <h2 className="text-xl font-bold">AI Health Coach</h2>
                <p className="text-zinc-400 text-sm">Get personalized tips based on your logs.</p>
            </div>
          <button
            onClick={fetchAdvice}
            disabled={isLoading || logs.length === 0}
            className="mt-4 sm:mt-0 w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-300 whitespace-nowrap"
          >
            {isLoading ? 'Thinking...' : 'Get Advice'}
          </button>
        </div>

        {logs.length === 0 && <p className="mt-4 text-center text-zinc-500">Log some activities to get advice.</p>}

        {isLoading && (
          <div className="mt-4 text-center text-zinc-400">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto"></div>
            <p className="mt-2">Generating your personalized advice...</p>
          </div>
        )}

        {error && <p className="mt-4 text-red-400">{error}</p>}
        
        {advice && (
          <div className="mt-4 pt-4 border-t border-zinc-800 text-zinc-300 prose prose-invert max-w-none">
            {formatAdvice(advice)}
          </div>
        )}
      </div>
    </div>
  );
};

export default AiCoach;
