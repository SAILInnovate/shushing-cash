import { useState } from 'react';
import { X, ChevronRight, Check, Server, Shield, Globe, CreditCard, Loader2, Mail, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  useCase: string;
  platform: string;
  location: string;
  reliability: string;
  fullName: string;
  email: string;
  login: string;
  password: string;
  serverName: string;
}

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const [formData, setFormData] = useState<FormData>({
    useCase: 'Forex API',
    platform: 'MT5',
    location: 'london',
    reliability: 'High',
    fullName: '',
    email: '',
    login: '',
    password: '',
    serverName: ''
  });

  if (!isOpen) return null;

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  
  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // --- SUBMISSION LOGIC ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare payload for Formspree
    const payload = {
      _subject: `NEW CLIENT: ${formData.fullName} (Forex API)`,
      _replyto: formData.email, // Allows you to reply directly to them
      "Client Name": formData.fullName,
      "Contact Email": formData.email,
      "Platform": formData.platform,
      "Broker Server": formData.serverName,
      "Login ID": formData.login,
      "Password": formData.password, // Sent securely via HTTPS
      "Region": formData.location,
      "Service": "Forex API (SMC Titan)"
    };

    try {
      // Sends to your Formspree
      const response = await fetch("https://formspree.io/f/xdankdyq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Details received. Redirecting to secure payment...");
        // Redirects to your Stripe
        window.location.href = "https://buy.stripe.com/6oU14m37v8mH50X3zlgA81d"; 
      } else {
        alert("Transmission failed. Please check your internet connection.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm font-mono">
      <div className="w-full max-w-2xl bg-[#0a0a0a] border border-[#333] rounded-lg shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#222]">
          <div>
            <h2 className="text-[#00ff41] text-xl font-bold tracking-widest flex items-center gap-2">
              <Server className="w-5 h-5" />
              DEPLOY PROTOCOL
            </h2>
            <p className="text-gray-500 text-xs mt-1">STEP {step} OF 4: CONFIGURATION</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <AnimatePresence mode='wait'>
            
            {/* STEP 1: SERVICE & PLATFORM */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key="step1">
                
                <label className="text-gray-400 text-sm mb-4 block">SELECTED SERVICE</label>
                <div className="p-4 border border-[#00ff41] bg-[#00ff41]/10 rounded flex justify-between items-center mb-8">
                  <div>
                    <span className="text-white font-bold block tracking-wider">FOREX API ACCESS</span>
                    <span className="text-[#00ff41] text-xs">High-Frequency SMC Titan Engine</span>
                  </div>
                  <Check className="text-[#00ff41] w-6 h-6" />
                </div>

                <label className="text-gray-400 text-sm mb-4 block">TRADING PLATFORM</label>
                <div className="flex gap-4">
                  {['MT4', 'MT5'].map((p) => (
                    <div key={p}
                      onClick={() => updateField('platform', p)}
                      className={`flex-1 p-6 border rounded text-center cursor-pointer font-bold text-lg transition-all ${formData.platform === p ? 'border-[#00ff41] bg-[#222] text-white shadow-[0_0_15px_rgba(0,255,65,0.2)]' : 'border-[#333] text-gray-500 hover:border-gray-500'}`}
                    >
                      {p}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: CLIENT DETAILS & CREDENTIALS */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key="step2">
                
                {/* Contact Info */}
                <div className="mb-6 space-y-4">
                  <div>
                    <label className="text-gray-400 text-xs uppercase mb-1 block flex items-center gap-2">
                      <User className="w-3 h-3" /> Full Name
                    </label>
                    <input type="text" 
                      className="w-full bg-[#111] border border-[#333] p-3 text-white focus:border-[#00ff41] outline-none rounded transition-colors"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs uppercase mb-1 block flex items-center gap-2">
                      <Mail className="w-3 h-3" /> Email Address (For Delivery)
                    </label>
                    <input type="email" 
                      className="w-full bg-[#111] border border-[#333] p-3 text-white focus:border-[#00ff41] outline-none rounded transition-colors"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full h-px bg-[#222] my-6"></div>

                {/* Broker Details */}
                <div className="bg-yellow-900/10 border border-yellow-700/30 p-3 rounded mb-6 text-yellow-500 text-xs flex gap-2">
                  <Shield className="w-4 h-4 shrink-0" />
                  <div>Credentials are transmitted via SSL encryption. We use them once to provision the bot connection.</div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-xs uppercase mb-1 block">Broker Server Name (Exact)</label>
                    <input type="text" 
                      className="w-full bg-[#111] border border-[#333] p-3 text-white focus:border-[#00ff41] outline-none rounded"
                      placeholder="e.g. ICMarkets-Server01"
                      value={formData.serverName}
                      onChange={(e) => updateField('serverName', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-xs uppercase mb-1 block">Login ID</label>
                      <input type="number" 
                        className="w-full bg-[#111] border border-[#333] p-3 text-white focus:border-[#00ff41] outline-none rounded"
                        placeholder="12345678"
                        value={formData.login}
                        onChange={(e) => updateField('login', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs uppercase mb-1 block">Password</label>
                      <input type="password" 
                        className="w-full bg-[#111] border border-[#333] p-3 text-white focus:border-[#00ff41] outline-none rounded"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => updateField('password', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: INFRASTRUCTURE */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key="step3">
                <div className="space-y-6">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                      <Globe className="w-4 h-4" /> Server Location
                    </label>
                    <select 
                      className="w-full bg-[#111] border border-[#333] p-3 text-white rounded appearance-none focus:border-[#00ff41] outline-none"
                      value={formData.location}
                      onChange={(e) => updateField('location', e.target.value)}
                    >
                      <option value="london">London (Recommended)</option>
                      <option value="new-york">New York</option>
                      <option value="singapore">Singapore</option>
                      <option value="frankfurt">Frankfurt</option>
                    </select>
                    <p className="text-gray-600 text-xs mt-2">
                      We recommend choosing the location closest to your broker's server for minimum latency.
                    </p>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Reliability Tier</label>
                    <div className="p-4 border border-[#00ff41] bg-[#00ff41]/5 rounded flex justify-between items-center">
                      <div>
                        <span className="text-white font-bold block">High Reliability</span>
                        <span className="text-gray-400 text-xs">Redundant infrastructure for 24/7 uptime.</span>
                      </div>
                      <Check className="text-[#00ff41]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: CONFIRM & PAY */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key="step4">
                <div className="bg-[#111] p-5 rounded border border-[#333] space-y-3 mb-6 font-mono text-sm">
                  <div className="flex justify-between border-b border-[#222] pb-3 mb-3">
                    <span className="text-gray-500">Service</span>
                    <span className="text-white font-bold">Forex API Access</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Client</span>
                    <span className="text-white">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email</span>
                    <span className="text-white">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Broker</span>
                    <span className="text-white">{formData.serverName} ({formData.platform})</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-[#222] mt-3">
                    <span className="text-white">Setup Fee</span>
                    <span className="text-[#00ff41] font-bold text-xl">£99.00</span>
                  </div>
                </div>

                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.email || !formData.fullName || !formData.serverName}
                  className="w-full bg-[#00ff41] hover:bg-[#00cc33] text-black font-bold p-4 rounded flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,255,65,0.2)]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      PROCESSING...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      SECURE CHECKOUT
                    </>
                  )}
                </button>
                <p className="text-center text-gray-500 text-xs mt-4">
                  Payment processed securely by Stripe. <br/>
                  Your API Key will be emailed to {formData.email || "you"} within 24 hours.
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[#222] flex justify-between bg-[#0a0a0a] rounded-b-lg">
          {step > 1 ? (
            <button 
              onClick={handleBack} 
              disabled={isSubmitting}
              className="text-gray-400 hover:text-white px-4 py-2 disabled:opacity-50 font-bold"
            >
              BACK
            </button>
          ) : <div></div>}
          
          {step < 4 && (
            <button 
              onClick={handleNext} 
              className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded font-bold flex items-center gap-2"
            >
              NEXT <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}