import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar
} from 'recharts';
import { 
  TrendingUp, 
  Award, 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronRight,
  Target,
  BarChart3,
  Zap,
  Activity
} from 'lucide-react';
import Sidebar from '../../components/Shared/Sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { cn } from '../../lib/utils';

const Analytics = () => {
  const productivityData = [
    { name: 'Mon', value: 30 },
    { name: 'Tue', value: 45 },
    { name: 'Wed', value: 60 },
    { name: 'Thu', value: 55 },
    { name: 'Fri', value: 80 },
    { name: 'Sat', value: 95 },
    { name: 'Sun', value: 85 },
  ];

  const distributionData = [
    { name: 'Work', value: 40, color: '#3b82f6' },
    { name: 'Study', value: 30, color: '#a855f7' },
    { name: 'Health', value: 20, color: '#10b981' },
    { name: 'Personal', value: 10, color: '#f59e0b' },
  ];

  const milestones = [
    { date: 'Today, 09:00 AM', title: 'Level 10 reached', description: 'Elite Achiever Unlocked', type: 'award' },
    { date: 'Oct 8', title: '7 Day Streak', description: 'Morning Meditation consistent', type: 'streak' },
    { date: 'Oct 5', title: 'Focus Master', description: 'Completed 5 Pomodoro sessions', type: 'focus' },
  ];

  return (
    <div className="flex bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Sidebar onLogout={() => window.location.href = '/login'} />
      
      <main className="flex-1 ml-64 p-12">
        <div className="flex items-start justify-between mb-12">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mb-1">Analytics & Insights</h1>
            <p className="text-slate-500 dark:text-slate-400">Data-driven breakdown of your focus and habit consistency.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/20">
             <TrendingUp className="w-4 h-4" />
             Productivity Up 12%
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
           {/* Primary Chart */}
           <Card className="lg:col-span-2 p-8">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-slate-400" />
                  <h2 className="text-lg font-bold">Activity Performance</h2>
                </div>
                <div className="flex gap-2">
                   <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Tasks</span>
                   </div>
                </div>
              </div>

              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={productivityData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:stroke-slate-800" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dx={-10} />
                    <Tooltip 
                      contentStyle={{borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)'}}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </Card>

           {/* Distribution */}
           <Card className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <Activity className="w-5 h-5 text-slate-400" />
                <h2 className="text-lg font-bold">Task Focus</h2>
              </div>
              <div className="space-y-6">
                 {distributionData.map((item) => (
                   <div key={item.name} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-500 uppercase tracking-widest">{item.name}</span>
                        <span>{item.value}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full transition-all duration-1000" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                      </div>
                   </div>
                 ))}
              </div>
              <div className="mt-12 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <Zap className="w-5 h-5 text-blue-500 mb-2" />
                <p className="text-xs font-bold leading-relaxed">
                   Most of your time is spent on <span className="text-blue-500">Work</span>. Balance with <span className="text-emerald-500">Health</span> for better performance.
                </p>
              </div>
           </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Achievement Timeline */}
           <Card className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-5 h-5 text-slate-400" />
                <h2 className="text-lg font-bold">Milestones</h2>
              </div>
              <div className="space-y-8">
                 {milestones.map((m, i) => (
                   <div key={i} className="flex gap-6 relative">
                      {i !== milestones.length - 1 && <div className="absolute left-6 top-10 bottom-[-2rem] w-px bg-slate-200 dark:bg-slate-800" />}
                      <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-800 relative z-10">
                         {m.type === 'award' ? <Award className="w-5 h-5 text-purple-500" /> : m.type === 'streak' ? <Flame className="w-5 h-5 text-red-500" /> : <Zap className="w-5 h-5 text-blue-500" />}
                      </div>
                      <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{m.date}</p>
                         <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50">{m.title}</h4>
                         <p className="text-xs text-slate-500">{m.description}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </Card>

           {/* Completion Stats */}
           <Card className="p-8 bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <Target className="w-10 h-10 text-emerald-500 mb-6 bg-emerald-500/10 p-2 rounded-xl" />
                  <h2 className="text-2xl font-black mb-2">Efficiency Rating</h2>
                  <p className="text-slate-400 font-medium">Your tasks are completed 4h faster than average.</p>
                </div>
                
                <div className="mt-12 grid grid-cols-2 gap-4">
                   <div className="p-4 bg-slate-800 rounded-2xl">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Avg. Focus</p>
                      <p className="text-2xl font-black">1.2h / day</p>
                   </div>
                   <div className="p-4 bg-slate-800 rounded-2xl">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Consistency</p>
                      <p className="text-2xl font-black">94%</p>
                   </div>
                </div>
              </div>
              <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />
           </Card>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
