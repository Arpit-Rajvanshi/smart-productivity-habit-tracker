import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  RotateCcw, 
  BarChart3, 
  Settings, 
  LogOut,
  Zap,
  Calendar as CalendarIcon
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { ModeToggle } from '../ModeToggle';

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: RotateCcw, label: 'Habits', path: '/habits' },
    { icon: CalendarIcon, label: 'Calendar', path: '/calendar' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  ];

  return (
    <div className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col h-screen fixed left-0 top-0 z-20">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-slate-900 dark:bg-slate-100 p-1.5 rounded-md">
            <Zap className="w-5 h-5 text-white dark:text-slate-900" />
          </div>
          <h1 className="text-sm font-bold tracking-tight text-slate-950 dark:text-slate-50 uppercase tracking-widest">FocusFlow</h1>
        </div>
        <ModeToggle />
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm font-medium",
                isActive 
                  ? "bg-slate-100 text-slate-950 dark:bg-slate-800 dark:text-slate-50 shadow-sm" 
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "text-slate-950 dark:text-slate-50" : "text-slate-400")} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 space-y-2 border-t border-slate-200 dark:border-slate-800">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-slate-500 font-medium" 
          onClick={() => navigate('/settings')}
        >
          <Settings className="w-4 h-4" />
          Settings
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 font-medium" 
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
