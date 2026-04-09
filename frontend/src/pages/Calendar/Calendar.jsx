import { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths 
} from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import Sidebar from '../../components/Shared/Sidebar';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { cn } from '../../lib/utils';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Mock data for display
  const events = [
    { date: new Date(), title: 'Project Proposal', type: 'task' },
    { date: new Date(), title: 'Workout', type: 'habit' },
  ];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="flex bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Sidebar onLogout={() => window.location.href = '/login'} />
      
      <main className="flex-1 ml-64 p-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mb-1">Calendar</h1>
            <p className="text-slate-500 dark:text-slate-400">View and manage your tasks and habits over time.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-800 rounded-lg p-1 bg-white dark:bg-slate-900">
              <Button variant="ghost" size="icon" onClick={prevMonth} className="h-8 w-8">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-bold w-32 text-center text-slate-700 dark:text-slate-300">
                {format(currentDate, 'MMMM yyyy')}
              </span>
              <Button variant="ghost" size="icon" onClick={nextMonth} className="h-8 w-8">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Entry
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {calendarDays.map((day, idx) => {
              const isCurrentMonth = isSameMonth(day, monthStart);
              const isToday = isSameDay(day, new Date());
              const dayEvents = events.filter(e => isSameDay(e.date, day));

              return (
                <div 
                  key={idx} 
                  className={cn(
                    "min-h-[120px] p-2 border-b border-r border-slate-200 dark:border-slate-800 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/50",
                    !isCurrentMonth && "bg-slate-50/30 dark:bg-slate-900/10 text-slate-400"
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={cn(
                      "text-xs font-bold flex items-center justify-center w-6 h-6 rounded-md",
                      isToday ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" : "text-slate-500"
                    )}>
                      {format(day, 'd')}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {dayEvents.map((event, eIdx) => (
                      <div 
                        key={eIdx}
                        className={cn(
                          "px-2 py-1 rounded text-[10px] font-bold truncate",
                          event.type === 'task' 
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" 
                            : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        )}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Calendar;
