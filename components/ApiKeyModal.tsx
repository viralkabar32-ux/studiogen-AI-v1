import { useState } from 'react';
import { Key, ExternalLink } from 'lucide-react';

export function ApiKeyModal({ isOpen, onClose, onSave, initialKey }: any) {
  const [key, setKey] = useState(initialKey || '');
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 border border-indigo-500/20">
          <Key className="w-6 h-6 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">API Key Required</h2>
        <p className="text-zinc-400 mb-6 text-sm leading-relaxed">
          Please enter your API key to use Studio Generator AI. Your key is stored locally in your browser.
        </p>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">API Key</label>
            <a href="https://www.apifree.ai/manage/api-keys" target="_blank" rel="noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
              Aktifkan API key <ExternalLink size={12} />
            </a>
          </div>
          <input 
            type="password" 
            value={key} 
            onChange={e => setKey(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            placeholder="sk-..."
            autoFocus
          />
        </div>

        <div className="flex justify-end gap-3">
          {onClose && (
            <button 
              onClick={onClose} 
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
          )}
          <button 
            onClick={() => onSave(key)} 
            disabled={!key.trim()}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/20"
          >
            Save Key
          </button>
        </div>
      </div>
    </div>
  );
}
