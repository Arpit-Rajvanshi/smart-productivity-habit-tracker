import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Calendar as CalendarIcon,
  Tag,
  ChevronDown
} from 'lucide-react';
import Sidebar from '../../components/Shared/Sidebar';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { cn } from '../../lib/utils';
import { toast } from 'react-hot-toast';

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Database Migration', category: 'Backend', priority: 'High', dueDate: '2026-04-10', status: 'Todo' },
    { id: 2, title: 'Frontend Component Library', category: 'Design', priority: 'Medium', dueDate: '2026-04-12', status: 'Todo' },
    { id: 3, title: 'Write unit tests', category: 'QA', priority: 'Low', dueDate: '2026-04-15', status: 'In Progress' },
    { id: 4, title: 'Security Audit', category: 'Security', priority: 'Urgent', dueDate: '2026-04-09', status: 'Todo' },
  ]);

  const [filter, setFilter] = useState('All');

  const filteredTasks = tasks.filter(t => filter === 'All' || t.status === filter);

  const handleComplete = (id) => {
    toast.success('Task marked as completed!');
  };

  return (
    <div className="flex bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Sidebar onLogout={() => window.location.href = '/login'} />
      
      <main className="flex-1 ml-64 p-12">
        <div className="flex items-start justify-between mb-12">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mb-1">Focus Mode</h1>
            <p className="text-slate-500 dark:text-slate-400">Manage your workload with precision and clarity.</p>
          </div>
          <Button className="gap-2 shadow-xl shadow-blue-500/20">
            <Plus className="w-4 h-4" />
            New Task
          </Button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-4 mb-8">
           <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input className="pl-10 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800" placeholder="Search tasks..." />
           </div>
           <Button variant="secondary" size="md" className="gap-2">
              <Filter className="w-4 h-4" />
              View
              <ChevronDown className="w-3 h-3 text-slate-400" />
           </Button>
        </div>

        {/* Task Table Style List */}
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
           <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 dark:bg-slate-900 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">
              <div className="col-span-6">Title</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Priority</div>
              <div className="col-span-2 text-right">Due Date</div>
           </div>
           
           <div className="divide-y divide-slate-100 dark:divide-slate-800">
             {filteredTasks.length > 0 ? filteredTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="grid grid-cols-12 gap-4 px-6 py-4 items-center group hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer"
                >
                  <div className="col-span-6 flex items-center gap-4">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleComplete(task.id); }}
                      className="w-5 h-5 rounded border border-slate-300 dark:border-slate-700 flex items-center justify-center hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 opacity-0 group-hover:opacity-100" />
                    </button>
                    <div>
                       <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50 tracking-tight">{task.title}</h3>
                       <div className="flex items-center gap-2 mt-0.5 md:hidden">
                          <Badge variant="outline">{task.category}</Badge>
                       </div>
                    </div>
                  </div>

                  <div className="col-span-2">
                     <Badge variant="secondary">{task.category}</Badge>
                  </div>

                  <div className="col-span-2">
                     <div className="flex items-center gap-1.5">
                        <AlertCircle className={cn(
                          "w-3.5 h-3.5",
                          task.priority === 'Urgent' ? 'text-red-500' : 'text-slate-300'
                        )} />
                        <span className={cn(
                          "text-xs font-bold",
                          task.priority === 'Urgent' ? 'text-red-500' : 'text-slate-500'
                        )}>{task.priority}</span>
                     </div>
                  </div>

                  <div className="col-span-2 text-right">
                     <div className="flex items-center justify-end gap-1.5 text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-xs font-bold">{task.dueDate}</span>
                     </div>
                  </div>
                </div>
             )) : (
                <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                   <Target className="w-12 h-12 mb-4 opacity-10" />
                   <p className="text-sm font-bold">No tasks found. Enjoy your freedom!</p>
                </div>
             )}
           </div>
        </Card>
      </main>
    </div>
  );
};

export default Tasks;
