import { UploadBox } from './UploadBox';
import { Loader2, Video, Sparkles } from 'lucide-react';

export function PromptPanel({ mode, prompt, setPrompt, image, setImage, onGenerate, isGenerating }: any) {
  return (
    <div className="flex flex-col gap-4">
      {mode === 'img2img' && (
        <UploadBox image={image} setImage={setImage} />
      )}
      <div className="relative group">
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Describe what you want to see in detail..."
          className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 min-h-[140px] resize-none transition-all"
          disabled={isGenerating}
        />
        <div className="absolute bottom-4 right-4 text-[10px] font-medium text-zinc-500 bg-black/40 px-2 py-1 rounded-md backdrop-blur-md">
          {prompt.length} chars
        </div>
      </div>
      <div className="sticky bottom-4 z-20 mt-4 flex flex-col gap-4">
        <button 
          onClick={onGenerate}
          disabled={isGenerating || !prompt.trim() || (mode === 'img2img' && !image)}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-base hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-indigo-500/20 active:scale-[0.98]"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin w-5 h-5" />
              Generating...
            </span>
          ) : 'Generate Image'}
        </button>

        {/* Promotional Offer */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-center backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Video className="w-4 h-4 text-indigo-400" />
              <h4 className="text-sm font-semibold text-indigo-300">Tingkatkan Kualitas Karya Anda</h4>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
            
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed px-2">
              Bawa imajinasi Anda menjadi nyata. Hasilkan video ultra-realistis yang didukung output audio imersif untuk hasil yang lebih profesional dan memukau.
            </p>
            
            <a 
              href="https://lynk.id/ai-unlimited/283ejko3lx8w" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 rounded-full transition-all shadow-lg shadow-indigo-500/25 active:scale-[0.98]"
            >
              Akses Fitur Premium Sekarang
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
