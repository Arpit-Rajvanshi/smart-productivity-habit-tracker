import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Zap, Coffee } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { toast } from 'react-hot-toast';

const FocusTimer = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setSessionCount(prev => prev + 1);
      if (onComplete) onComplete(25);
      toast.success('Focus session complete! 25 XP earned.', {
        icon: '👏',
        duration: 5000,
      });
      setTimeLeft(25 * 60);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <Card className={cn(
        "p-6 border-slate-200 dark:border-slate-800 transition-all shadow-lg",
        isActive ? "border-blue-500 ring-4 ring-blue-500/10" : ""
    )}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Zap className={cn("w-4 h-4", isActive ? "text-blue-500 animate-pulse" : "text-slate-400")} />
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Focus Timer</h2>
        </div>
        <div className="px-2 py-0.5 bg-slate-100 dark:bg-slate-900 rounded text-[10px] font-black text-slate-500 uppercase">
          Session #{sessionCount + 1}
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center mb-8">
        <div className="text-6xl font-black tracking-tighter text-slate-900 dark:text-slate-50 mb-2">
          {formatTime(timeLeft)}
        </div>
        
        {/* Minimal Linear Progress Bar */}
        <div className="w-full h-1 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden mt-4">
           <div 
            className="h-full bg-blue-500 transition-all duration-300" 
            style={{ width: `${progress}%` }} 
           />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <Button 
          variant={isActive ? "secondary" : "primary"}
          className="col-span-3 font-bold"
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
          {isActive ? 'Pause Session' : 'Start Focus'}
        </Button>
        
        <Button 
          variant="secondary"
          size="icon"
          onClick={() => { setIsActive(false); setTimeLeft(25 * 60); }}
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="mt-6 flex items-center justify-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
         <span className="flex items-center gap-1">
            <Zap className="w-3 h-3" /> 25m Focus
         </span>
         <span className="w-1 h-1 bg-slate-300 rounded-full" />
         <span className="flex items-center gap-1">
            <Coffee className="w-3 h-3" /> 5m Break
         </span>
      </div>
    </Card>
  );
};

export default FocusTimer;
