import { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Flame, 
  Target, 
  Plus, 
  Bell, 
  ChevronRight, 
  Award, 
  Zap,
  TrendingUp,
  Lightbulb,
  ArrowUpRight,
  Loader2
} from 'lucide-react';
import Sidebar from '../../components/Shared/Sidebar';
import FocusTimer from '../../components/Dashboard/FocusTimer';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { toast } from 'react-hot-toast';
import apiClient from '../../api/apiClient';
import { cn } from '../../lib/utils';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await apiClient.get('/analytics/dashboard');
      setData(response.data);
    } catch (err) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleXpGain = async (amount) => {
    // In a real app, this would be an API call to update user XP
    // For now, we update local state and toast
    setData(prev => ({
      ...prev,
      user: {
        ...prev.user,
        xp: (prev.user.xp || 0) + amount
      }
    }));
    toast.success(`+${amount} XP Earned!`);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  const { stats, tasks, insights, user } = data || {};
  const level = user?.level || 1;
  const xpInLevel = (user?.xp || 0) % 1000;

  const statConfig = [
    { label: 'Pending Tasks', value: stats?.pending_tasks || 0, icon: CheckCircle2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Completed', value: stats?.completed_today || 0, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Active Habits', value: stats?.active_habits || 0, icon: Target, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Streak', value: `${stats?.avg_streak || 0} days`, icon: Flame, color: 'text-red-500', bg: 'bg-red-500/10' },
  ];

  return (
    <div className="flex bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-950 dark:text-slate-50">
      <Sidebar onLogout={() => {
        localStorage.removeItem('focusflow_token');
        window.location.href = '/login';
      }} />
      
      <main className="flex-1 ml-64 p-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-1">
              Good Morning, {user?.full_name?.split(' ')[0] || 'Achiever'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400">Here's your productivity overview for today.</p>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="secondary" size="icon" className="rounded-full">
                <Bell className="w-4 h-4" />
             </Button>
             <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center font-bold">
                {user?.full_name?.charAt(0) || 'A'}
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          {/* Main Content Column */}
          <div className="xl:col-span-2 space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statConfig.map((stat) => (
                <Card key={stat.label} className="p-4 flex items-center gap-4 transition-transform hover:scale-[1.02]">
                  <div className={cn("p-2 rounded-lg", stat.bg)}>
                    <stat.icon className={cn("w-5 h-5", stat.color)} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Task Area */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-slate-400" />
                  <h2 className="text-xl font-bold">Priority Tasks</h2>
                </div>
                <Button variant="secondary" size="sm" className="gap-2" onClick={() => window.location.href='/tasks'}>
                  <Plus className="w-4 h-4" />
                  New Task
                </Button>
              </div>

              <div className="space-y-3">
                {tasks?.length > 0 ? tasks.map((task, idx) => (
                  <Card key={idx} className="p-4 flex items-center justify-between group cursor-pointer hover:border-slate-400 dark:hover:border-slate-600 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-5 h-5 rounded border border-slate-300 dark:border-slate-700 flex items-center justify-center group-hover:bg-slate-100 dark:group-hover:bg-slate-800 transition-colors" />
                      <div>
                        <h3 className="text-sm font-bold tracking-tight mb-1">{task.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-[10px] py-0">{task.category}</Badge>
                          <span className={cn(
                            "text-[10px] font-bold",
                            task.priority === 'Urgent' ? 'text-red-500' : 'text-slate-400'
                          )}>
                             {task.priority || 'Medium'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0" />
                  </Card>
                )) : (
                  <div className="text-center py-12 border-2 border-dashed rounded-2xl text-slate-400 font-medium">
                    No priority tasks for today.
                  </div>
                )}
              </div>
            </section>

            {/* Productivity Chart placeholder */}
            <Card className="p-8 h-64 bg-slate-50/50 dark:bg-slate-900/50 border-dashed border-2 flex flex-col items-center justify-center text-slate-400">
               <TrendingUp className="w-12 h-12 mb-4 opacity-20" />
               <p className="text-sm font-medium">Activity trends will appear here as you log tasks.</p>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
             {/* Gamification Card */}
             <Card className="p-6 bg-slate-900 border-none shadow-2xl relative overflow-hidden group">
                <div className="relative z-10 text-white">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Current Level</p>
                      <h3 className="text-4xl font-black">Lvl {level}</h3>
                    </div>
                    <Award className="w-12 h-12 text-blue-500 bg-blue-500/10 p-2 rounded-2xl" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                       <span className="text-slate-400">Experience</span>
                       <span className="text-blue-400">{xpInLevel}/1000 XP</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${(xpInLevel/1000)*100}%` }} />
                    </div>
                  </div>
                </div>
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-[60px] group-hover:bg-blue-500/40 transition-all duration-1000" />
             </Card>

             {/* Focus Timer */}
             <FocusTimer onComplete={handleXpGain} />

             {/* Smart Insights */}
             <section>
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-4 h-4 text-orange-400" />
                  <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Smart Insights</h2>
                </div>
                <div className="space-y-3">
                  {insights?.length > 0 ? insights.map((insight, idx) => (
                    <Card key={idx} className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 cursor-help hover:bg-white dark:hover:bg-slate-900 transition-all">
                       <div className="flex gap-3">
                         <div className="bg-white dark:bg-slate-800 p-2 rounded-lg h-fit border border-slate-200 dark:border-slate-800 shadow-sm">
                            <ArrowUpRight className="w-4 h-4 text-blue-500" />
                         </div>
                         <p className="text-sm font-bold leading-relaxed">{insight.message}</p>
                       </div>
                    </Card>
                  )) : (
                    <p className="text-xs font-medium text-slate-500 italic">Logging data to generate insights...</p>
                  )}
                </div>
             </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
