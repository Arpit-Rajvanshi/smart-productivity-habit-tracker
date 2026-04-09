import { useState } from 'react';
import { 
  CheckCircle2, 
  Plus, 
  RotateCcw, 
  Flame, 
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Target
} from 'lucide-react';
import Sidebar from '../../components/Shared/Sidebar';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { cn } from '../../lib/utils';
import { toast } from 'react-hot-toast';

const Habits = () => {
  const [habits, setHabits] = useState([
    { id: 1, title: 'Morning Meditation', streak: 12, category: 'Health', history: [1, 1, 0, 1, 1, 1, 1] },
    { id: 2, title: 'Drink 3L Water', streak: 45, category: 'Health', history: [1, 1, 1, 1, 1, 1, 1] },
    { id: 3, title: 'Read 20 Pages', streak: 5, category: 'Study', history: [0, 1, 0, 1, 1, 0, 1] },
  ]);

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const handleCheckIn = (id) => {
    toast.success('Habit completed! +15 XP');
  };

  return (
    <div className="flex bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Sidebar onLogout={() => window.location.href = '/login'} />
      
      <main className="flex-1 ml-64 p-12">
        <div className="flex items-start justify-between mb-12">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mb-1">Habit Flow</h1>
            <p className="text-slate-500 dark:text-slate-400">Consistency is key. Track your daily rituals and build momentum.</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Habit
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Habits Grid */}
          <div className="lg:col-span-2 space-y-4">
             {habits.map((habit) => (
                <Card key={habit.id} className="p-6 flex flex-col gap-6 hover:border-slate-400 dark:hover:border-slate-600 transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                        <Target className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                         <h3 className="font-bold text-lg text-slate-900 dark:text-slate-50">{habit.title}</h3>
                         <div className="flex items-center gap-2 mt-1">
                           <Badge variant="secondary" className="px-1.5 py-0">{habit.category}</Badge>
                           <span className="text-xs font-bold text-red-500 flex items-center gap-1">
                             <Flame className="w-3 h-3 fill-current" />
                             {habit.streak} day streak
                           </span>
                         </div>
                      </div>
                    </div>
                    <Button variant="primary" size="sm" onClick={() => handleCheckIn(habit.id)} className="shadow-lg shadow-blue-500/10">
                      Check In
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                      <span>Last 7 Days</span>
                      <span>85% completion</span>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                       {habit.history.map((status, i) => (
                         <div key={i} className="flex flex-col items-center gap-2">
                           <div className={cn(
                             "w-full h-8 rounded-lg flex items-center justify-center border-2 transition-all",
                             status 
                              ? "bg-emerald-500 border-emerald-500 text-white" 
                              : "border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-300"
                           )}>
                              {status && <CheckCircle2 className="w-4 h-4" />}
                           </div>
                           <span className="text-[10px] font-bold text-slate-400">{days[i]}</span>
                         </div>
                       ))}
                    </div>
                  </div>
                </Card>
             ))}
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
             <Card className="p-8 bg-slate-900 text-white overflow-hidden relative border-none">
                <TrendingUp className="w-8 h-8 text-blue-500 mb-6" />
                <h3 className="text-xl font-black mb-2">Weekly Progress</h3>
                <p className="text-slate-400 text-sm mb-6">You've completed 24 habits this week. That's 15% more than last week!</p>
                
                <div className="flex items-end gap-2 h-24 mt-8">
                   {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                     <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className={cn(
                            "w-full rounded-t-md transition-all duration-1000",
                            i === 3 ? "bg-blue-500" : "bg-slate-700 hover:bg-slate-600"
                          )} 
                          style={{ height: `${h}%` }} 
                        />
                        <span className="text-[10px] font-bold text-slate-500">{days[i]}</span>
                     </div>
                   ))}
                </div>
             </Card>

             <Card className="p-6 border-slate-200 dark:border-slate-800">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-500">History Log</CardTitle>
                </CardHeader>
                <div className="space-y-4">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        <div className="flex-1">
                          <p className="text-sm font-bold">Meditation Completed</p>
                          <p className="text-[10px] font-medium text-slate-400">Oct 8, 08:32 AM</p>
                        </div>
                     </div>
                   ))}
                </div>
             </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Habits;
