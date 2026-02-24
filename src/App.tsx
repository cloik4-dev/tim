import { useState, useEffect } from 'react';
import { WORKFLOWS } from './workflows';
import { runWorkflow } from './services/gemini';
import { 
  LayoutDashboard, 
  Library, 
  Flame, 
  UserPlus, 
  Wrench, 
  Globe, 
  ShieldAlert, 
  Loader2,
  Menu,
  X,
  ChevronRight,
  PlusCircle,
  Search,
  Zap,
  Bird,
  ShieldCheck
} from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'motion/react';

const iconMap: Record<string, any> = {
  LayoutDashboard,
  Library,
  Flame,
  UserPlus,
  Wrench,
  Globe,
  ShieldAlert
};

export default function App() {
  const [activeWorkflowId, setActiveWorkflowId] = useState(WORKFLOWS[0].id);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeWorkflow = WORKFLOWS.find(w => w.id === activeWorkflowId)!;

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await runWorkflow(activeWorkflow.name, formData);
      setResponse(result);
    } catch (err: any) {
      setError(err.message || "An error occurred while generating the response.");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (id: string) => {
    setActiveWorkflowId(id);
    setFormData({});
    setResponse(null);
    setError(null);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans text-stone-900 pb-20 md:pb-0 md:pl-72">
      {/* Mobile Header */}
      <header className="md:hidden bg-stone-900 text-white p-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center font-bold italic">BP</div>
          <h1 className="text-lg font-bold tracking-tight">ThermoTrader</h1>
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-stone-800 rounded-lg transition-colors">
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar (Desktop) / Fullscreen Menu (Mobile) */}
      <AnimatePresence>
        {(isMenuOpen || window.innerWidth >= 768) && (
          <motion.aside 
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed inset-y-0 left-0 w-72 bg-stone-900 text-stone-100 z-40 flex flex-col shadow-2xl md:shadow-none"
          >
            <div className="p-8 border-b border-stone-800">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center font-black text-2xl italic shadow-lg shadow-emerald-500/20">BP</div>
                <div>
                  <h1 className="text-xl font-black tracking-tighter text-white leading-none">BPWOOD</h1>
                  <p className="text-[9px] text-stone-400 uppercase tracking-[0.3em] mt-1">Thermo Intelligence</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 px-1">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center" title="LDCwood">
                    <Zap className="w-3 h-3 text-emerald-400" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center" title="Protected by Nature">
                    <ShieldCheck className="w-3 h-3 text-blue-400" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center" title="Upgrade Nature">
                    <Bird className="w-3 h-3 text-purple-400" />
                  </div>
                </div>
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Partners</span>
              </div>
            </div>
            
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              <p className="px-4 text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Main Menu</p>
              {WORKFLOWS.map(workflow => {
                const Icon = iconMap[workflow.icon];
                const isActive = activeWorkflowId === workflow.id;
                return (
                  <button
                    key={workflow.id}
                    onClick={() => handleTabChange(workflow.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl transition-all text-left ${
                      isActive 
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                        : 'text-stone-400 hover:bg-stone-800 hover:text-stone-200'
                    }`}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-stone-500'}`} />
                    <span className="font-semibold text-sm">{workflow.name}</span>
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
                  </button>
                );
              })}
            </nav>

            <div className="p-6 border-t border-stone-800">
              <div className="bg-stone-800/50 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-stone-700 border-2 border-emerald-500/30 flex items-center justify-center text-sm font-bold">C</div>
                  <div>
                    <p className="text-xs font-bold text-white">Curtis</p>
                    <p className="text-[10px] text-stone-500">Inside Sales Lead</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 animate-pulse"></div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full">
        <div className="p-6 md:p-10 space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-stone-900 tracking-tight">{activeWorkflow.name}</h2>
            <p className="text-stone-500 text-sm md:text-base leading-relaxed max-w-2xl">{activeWorkflow.description}</p>
          </div>

          {/* Brand Partner Highlights */}
          {activeWorkflowId === 'dashboard' && !response && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-stone-200 rounded-[2rem] p-6 shadow-sm flex items-center space-x-4 transition-transform hover:scale-[1.02]">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Protected by Nature</h3>
                  <p className="text-xs text-stone-500">LDCwood Rhino Standard</p>
                </div>
              </div>
              <div className="bg-white border border-stone-200 rounded-[2rem] p-6 shadow-sm flex items-center space-x-4 transition-transform hover:scale-[1.02]">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                  <Bird className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Upgrade Nature</h3>
                  <p className="text-xs text-stone-500">Lemahieu Group Heritage</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Card */}
            <div className="lg:col-span-5">
              <motion.div 
                layout
                className="bg-white rounded-[32px] shadow-xl shadow-stone-200/50 border border-stone-200 p-8"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {activeWorkflow.fields.map(field => (
                    <div key={field.name} className="space-y-2">
                      <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-widest ml-1">
                        {field.label}
                      </label>
                      <div className="relative group">
                        {field.type === 'textarea' ? (
                          <textarea
                            value={formData[field.name] || ''}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            placeholder={field.placeholder}
                            className="w-full px-5 py-4 rounded-2xl bg-stone-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all resize-none min-h-[140px] text-sm font-medium"
                          />
                        ) : (
                          <input
                            type="text"
                            value={formData[field.name] || ''}
                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                            placeholder={field.placeholder}
                            className="w-full px-5 py-4 rounded-2xl bg-stone-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all text-sm font-medium"
                          />
                        )}
                        <div className="absolute right-4 top-4 opacity-0 group-focus-within:opacity-100 transition-opacity">
                          <PlusCircle className="w-4 h-4 text-emerald-500" />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-stone-900 hover:bg-stone-800 active:scale-[0.98] text-white font-bold py-4 px-6 rounded-2xl transition-all flex items-center justify-center space-x-3 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-stone-900/20"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Consulting Dossier...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        <span>Run Intelligence</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Output Card */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {response || loading || error ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-[32px] shadow-xl shadow-stone-200/50 border border-stone-200 p-8 min-h-[500px] flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-6 border-b border-stone-100 pb-4">
                      <h3 className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">
                        Operator Output
                      </h3>
                      {response && (
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">Verified</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                      {loading ? (
                        <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-6 py-20">
                          <div className="relative">
                            <Loader2 className="w-12 h-12 animate-spin text-emerald-600" />
                            <div className="absolute inset-0 blur-xl bg-emerald-500/20 animate-pulse"></div>
                          </div>
                          <div className="text-center space-y-1">
                            <p className="text-sm font-bold text-stone-800">Processing Category Weapon...</p>
                            <p className="text-xs">Analyzing fire compliance & SKU architecture</p>
                          </div>
                        </div>
                      ) : error ? (
                        <div className="p-6 bg-red-50 text-red-700 rounded-2xl text-sm border border-red-100 flex items-start space-x-3">
                          <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold">System Error</p>
                            <p className="opacity-80">{error}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="prose prose-stone prose-sm max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-li:my-1 prose-strong:text-stone-900 prose-a:text-emerald-600">
                          <Markdown remarkPlugins={[remarkGfm]}>{response!}</Markdown>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full min-h-[500px] border-4 border-dashed border-stone-200 rounded-[32px] flex flex-col items-center justify-center p-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center">
                      <LayoutDashboard className="w-8 h-8 text-stone-300" />
                    </div>
                    <div className="max-w-xs">
                      <p className="text-stone-800 font-bold">Awaiting Intelligence Request</p>
                      <p className="text-stone-400 text-xs mt-1 leading-relaxed">
                        Input project details to generate a compliance-backed, margin-defending response.
                      </p>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-stone-900 text-stone-400 flex items-center justify-around p-3 pb-6 z-50 border-t border-stone-800 shadow-2xl">
        {WORKFLOWS.slice(0, 4).map(workflow => {
          const Icon = iconMap[workflow.icon];
          const isActive = activeWorkflowId === workflow.id;
          return (
            <button
              key={workflow.id}
              onClick={() => handleTabChange(workflow.id)}
              className={`flex flex-col items-center space-y-1 transition-all ${isActive ? 'text-emerald-500 scale-110' : 'hover:text-stone-200'}`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[9px] font-bold uppercase tracking-tighter">{workflow.name.split(' ')[0]}</span>
            </button>
          );
        })}
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="flex flex-col items-center space-y-1 text-stone-400"
        >
          <Menu className="w-6 h-6" />
          <span className="text-[9px] font-bold uppercase tracking-tighter">More</span>
        </button>
      </nav>
    </div>
  );
}
