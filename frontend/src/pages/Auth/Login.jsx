import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Github, Mail, Lock, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { toast } from 'react-hot-toast';
import apiClient from '../../api/apiClient';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', full_name: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const response = await apiClient.post(endpoint, formData);
      
      onLogin(response.token);
      toast.success(isLogin ? `Welcome back, ${response.user.full_name}!` : 'Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-950 font-sans selection:bg-blue-500/30">
      {/* Left Column: Branding Content */}
      <div className="hidden lg:flex lg:w-1/2 p-16 flex-col justify-between bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-3 mb-12">
             <div className="bg-slate-900 dark:bg-slate-50 p-2 rounded-xl">
               <Zap className="w-6 h-6 text-white dark:text-slate-900" />
             </div>
             <span className="text-xl font-black tracking-tight dark:text-slate-50">FocusFlow</span>
          </div>
          
          <h1 className="text-6xl font-black tracking-tighter text-slate-900 dark:text-slate-50 leading-[0.9] mb-8">
            The workspace for <span className="text-blue-500">high performance.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-md font-medium leading-relaxed">
            Unify tasks, habits, and focus sessions in a single, professional command center.
          </p>
        </div>

        <div className="space-y-8">
           <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-4 border-slate-50 dark:border-slate-900 bg-slate-200 dark:bg-slate-800" />
                 ))}
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-50">
                 Join 10,000+ experts using FocusFlow daily.
              </p>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                 <ShieldCheck className="w-5 h-5 text-blue-500 mb-2" />
                 <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Security</p>
                 <p className="text-sm font-bold">Bank-grade encryption</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                 <Star className="w-5 h-5 text-orange-400 mb-2" />
                 <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Reviews</p>
                 <p className="text-sm font-bold">4.9/5 User Rating</p>
              </div>
           </div>
        </div>
      </div>

      {/* Right Column: Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 xl:p-24">
        <div className="max-w-sm w-full mx-auto">
          <div className="mb-10 lg:hidden">
            <Zap className="w-10 h-10 text-blue-500 mb-4" />
          </div>
          
          <h2 className="text-3xl font-black tracking-tight mb-2 dark:text-slate-50">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10 font-medium">
            Enter your details to access your command center.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                <div className="relative">
                  <Input 
                    type="text" 
                    placeholder="Arpit Rajvanshi" 
                    className="h-11" 
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    required 
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="pl-10 h-11" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10 h-11" 
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required 
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-11 font-bold text-sm" disabled={isLoading}>
              {isLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest">
              <span className="bg-white dark:bg-slate-950 px-4 text-slate-400">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="secondary" className="font-bold gap-2 h-11">
              <Github className="w-4 h-4" />
              GitHub
            </Button>
            <Button variant="secondary" className="font-bold gap-2 h-11">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </Button>
          </div>

          <p className="mt-8 text-center text-sm font-medium text-slate-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 font-bold hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
