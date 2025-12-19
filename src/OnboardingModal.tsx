import { useState } from 'react';
import { X, ChevronRight, Check, Server, Shield, Globe, CreditCard, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OnboardingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    useCases: ['Forex API', 'Risk management API'],
    platform: 'MT5',
    role: 'Subscriber',
    location: 'london',
    reliability: 'High',
    accountName: '',
    login: '',
    password: '',
    serverName: ''
  });

  if (!isOpen) return null;

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleUseCase = (val) => {
    const current = formData.useCases;
    if (current.includes(val)) {
      updateField('useCases', current.filter(item => item !== val));
    } else {
      updateField('useCases', [...current, val]);
    }
  };

  // --- SUBMISSION LOGIC ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Prepare data for Formspree
    const payload = {
      _subject: `NEW DEPLOYMENT REQUEST: ${formData.accountName} (${formData.platform})`,
      ...formData
    };

    try {
      // 2. Send to your Formspree Endpoint
      const response = await fetch("https://formspree.io/f/xdankdyq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        // 3. Success -> Redirect to Stripe
        alert("Configuration secured. Redirecting to payment gateway...");
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
            
            {/* STEP 1: ACCOUNT TYPE */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key="step1">
                <label className="text-gray-400 text-sm mb-4 block">SELECT MODULES (REQUIRED)</label>
                <div className="grid grid-cols-1 gap-3 mb-6">
                  {['Forex API', 'Copy trading', 'Risk management API', 'MetaStats API'].map((opt) => (
                    <div key={opt} 
                      onClick={() => toggleUseCase(opt)}
                      className={`p-3 border rounded cursor-pointer flex justify-between items-center transition-all ${formData.useCases.includes(opt) ? 'border-[#00ff41] bg-[#00ff41]/10 text-white' : 'border-[#333] text-gray-500 hover:border-gray-500'}`}
                    >
                      <span>{opt}</span>
                      {formData.useCases.includes(opt) && <Check className="w-4 h-4 text-[#00ff41]" />}
                    </div>
                  ))}
                </div>

                <label className="text-gray-400 text-sm mb-4 block">PLATFORM</label>
                <div className="flex gap-4">
                  {['MT4', 'MT5'].map((p) => (
                    <div key={p}
                      onClick={() => updateField('platform', p)}
                      className={`flex-1 p-4 border rounded text-center cursor-pointer font-bold ${formData.platform === p ? 'border-[#00ff41] bg-[#00ff41]/10 text-white' : 'border-[#333] text-gray-500'}`}
                    >
                      {p}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: CREDENTIALS (Secure) */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key="step2">
                <div className="bg-yellow-900/20 border border-yellow-700/50 p-3 rounded mb-6 text-yellow-500 text-xs flex gap-2">
                  <Shield className="w-4 h-4" />
                  <div>
                    Credentials are sent securely via SSL. We do not store them after provisioning.
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-xs uppercase mb-1 block">Account Name (For Dashboard)</label>
                    <input type="text" 
                      className="w-full bg-[#111] border border-[#333] p-3 text-white focus:border-[#00ff41] outline-none rounded"
                      placeholder="e.g. My Prop Firm Account"
                      value={formData.accountName}
                      onChange={(e) => updateField('accountName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs uppercase mb-1 block">Broker Server Name (Exact Match)</label>
                    <input type="text" 
                      className="w-full bg-[#111] border border-[#333] p-3 text-white focus:border-[#00ff41] outline-none rounded"
                      placeholder="e.g. ICMarkets-Server01"
                      value={formData.serverName}
                      onChange={(e) => updateField('serverName', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-xs uppercase mb-1 block">MetaTrader Login</label>
                      <input type="number" 
                        className="w-full bg-[#111] border border-[#333] p-3 text-white focus:border-[#00ff41] outline-none rounded"
                        placeholder="12345678"
                        value={formData.login}
                        onChange={(e) => updateField('login', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs uppercase mb-1 block">MetaTrader Password</label>
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

            {/* STEP 3: SERVER CONFIG */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key="step3">
                <div className="space-y-6">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block flex items-center gap-2">
                      <Globe className="w-4 h-4" /> Geographical Location
                    </label>
                    <select 
                      className="w-full bg-[#111] border border-[#333] p-3 text-white rounded appearance-none"
                      value={formData.location}
                      onChange={(e) => updateField('location', e.target.value)}
                    >
                      <option value="london">London (Recommended)</option>
                      <option value="new-york">New York</option>
                      <option value="singapore">Singapore</option>
                      <option value="frankfurt">Frankfurt</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Reliability Tier</label>
                    <div className="p-4 border border-[#00ff41] bg-[#00ff41]/5 rounded flex justify-between items-center">
                      <div>
                        <span className="text-white font-bold block">High Reliability</span>
                        <span className="text-gray-400 text-xs">Redundant infrastructure for 24/7 production workloads.</span>
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
                <div className="bg-[#111] p-4 rounded border border-[#333] space-y-3 mb-6 font-mono text-sm">
                  <div className="flex justify-between border-b border-[#222] pb-2">
                    <span className="text-gray-500">Service</span>
                    <span className="text-white font-bold">SMC Titan Setup</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Platform</span>
                    <span className="text-white">{formData.platform}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Server</span>
                    <span className="text-white">{formData.serverName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Region</span>
                    <span className="text-white uppercase">{formData.location}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#222]">
                    <span className="text-white">One-time Fee</span>
                    <span className="text-[#00ff41] font-bold text-lg">£99.00</span>
                  </div>
                </div>

                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-[#00ff41] hover:bg-[#00cc33] text-black font-bold p-4 rounded flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      PROCESSING...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      PAY £99.00 & DEPLOY
                    </>
                  )}
                </button>
                <p className="text-center text-gray-500 text-xs mt-3">
                  Secure checkout via Stripe. Provisioning within 24h.
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[#222] flex justify-between">
          {step > 1 ? (
            <button 
              onClick={handleBack} 
              disabled={isSubmitting}
              className="text-gray-400 hover:text-white px-4 py-2 disabled:opacity-50"
            >
              Back
            </button>
          ) : <div></div>}
          
          {step < 4 && (
            <button 
              onClick={handleNext} 
              className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded font-bold flex items-center gap-2"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}