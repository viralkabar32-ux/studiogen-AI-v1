'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { submitImageRequest, pollImageResult } from '@/services/api';
import { ApiKeyModal } from '@/components/ApiKeyModal';
import { PromptPanel } from '@/components/PromptPanel';
import { SettingsPanel } from '@/components/SettingsPanel';
import { Gallery } from '@/components/Gallery';
import { useToast } from '@/components/ToastProvider';
import { Sparkles, Image as ImageIcon, Wand2 } from 'lucide-react';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export default function Home() {
  const [apiKey, setApiKey, isMounted] = useLocalStorage('studio_ai_apikey', '');
  const [history, setHistory] = useLocalStorage<any[]>('studio_ai_history', []);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  
  const [mode, setMode] = useState<'text2img' | 'img2img'>('text2img');
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [settings, setSettings] = useState({
    aspect_ratio: '1:1',
    resolution: '1k',
    n: 1
  });

  const { addToast } = useToast();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMounted && !apiKey) {
      setShowApiKeyModal(true);
    }
  }, [isMounted, apiKey]);

  const handleGenerate = async () => {
    if (!apiKey) {
      setShowApiKeyModal(true);
      return;
    }
    
    setIsGenerating(true);
    try {
      let payload: any = {
        aspect_ratio: settings.aspect_ratio,
        prompt: prompt,
      };

      if (mode === 'text2img') {
        payload.model = "google/imagen-4-ultra";
        payload.num_images = settings.n;
        payload.resolution = settings.resolution;
      } else {
        if (!image) {
          addToast('Please upload an image for editing', 'error');
          setIsGenerating(false);
          return;
        }
        const base64Image = await fileToBase64(image);
        payload.model = "google/gemini-3.1-flash-image-preview/edit";
        payload.image_urls = [base64Image];
        payload.resolution = settings.resolution.toUpperCase(); // The API expects 1K, 2K, 4K for image edit
      }

      const submitRes = await submitImageRequest(payload, apiKey);
      if (submitRes.code !== 200) {
        throw new Error(submitRes.code_msg || submitRes.error || 'Submission failed');
      }
      
      const requestId = submitRes.resp_data.request_id;
      
      let finalResult;
      while (true) {
        await new Promise(res => setTimeout(res, 2000));
        const checkRes = await pollImageResult(requestId, apiKey);
        if (checkRes.code !== 200) {
          throw new Error(checkRes.code_msg || 'Check failed');
        }
        
        const status = checkRes.resp_data.status;
        if (status === 'success') {
          finalResult = checkRes.resp_data;
          break;
        } else if (status === 'error' || status === 'failed') {
          throw new Error(checkRes.resp_data.error || 'Generation failed');
        }
      }

      if (finalResult && finalResult.image_list) {
        const newItems = finalResult.image_list.map((url: string) => ({
          id: Math.random().toString(36).substring(2, 9),
          url: url,
          prompt,
          mode,
          createdAt: new Date().toISOString()
        }));
        setHistory(prev => [...newItems, ...prev]);
        addToast('Image generated successfully!', 'success');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error: any) {
      console.error(error);
      if (error.message.includes('401')) {
        addToast('Invalid API Key. Please check your key.', 'error');
        setShowApiKeyModal(true);
      } else if (error.message.includes('429')) {
        addToast('Quota exceeded or rate limited.', 'error');
      } else {
        addToast(error.message || 'Failed to generate image', 'error');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReuse = (item: any) => {
    setMode(item.mode);
    setPrompt(item.prompt);
    panelRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
    addToast('Image removed from history', 'info');
  };

  if (!isMounted) return null;

  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30 font-sans overflow-hidden">
      {/* Background gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-20 flex-none flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
            Studio Generator AI
          </h1>
        </div>
        <button 
          onClick={() => setShowApiKeyModal(true)}
          className="text-sm px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          {apiKey ? 'API Key Set ✓' : 'Set API Key'}
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Column: Controls */}
        <div 
          className="w-full lg:w-[420px] xl:w-[480px] flex-none overflow-y-auto border-r border-white/10 bg-black/20 backdrop-blur-xl custom-scrollbar" 
          ref={panelRef}
        >
          <div className="p-6 space-y-6">
            {/* Mode Selector */}
            <div className="flex p-1 bg-black/40 rounded-xl">
              <button
                onClick={() => setMode('text2img')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === 'text2img' ? 'bg-white/10 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
              >
                <Wand2 size={16} /> Text to Image
              </button>
              <button
                onClick={() => setMode('img2img')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === 'img2img' ? 'bg-white/10 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
              >
                <ImageIcon size={16} /> Image Edit
              </button>
            </div>

            <SettingsPanel settings={settings} setSettings={setSettings} />
            
            <PromptPanel 
              mode={mode}
              prompt={prompt}
              setPrompt={setPrompt}
              image={image}
              setImage={setImage}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </div>
        </div>

        {/* Right Column: Gallery */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar bg-black/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold">Your Creations</h2>
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                {history.length} images
              </span>
            </div>
            <Gallery history={history} onReuse={handleReuse} onDelete={handleDelete} />
          </div>
        </div>
      </main>

      <ApiKeyModal 
        isOpen={showApiKeyModal} 
        onClose={apiKey ? () => setShowApiKeyModal(false) : undefined}
        onSave={(key: string) => {
          setApiKey(key);
          setShowApiKeyModal(false);
          addToast('API Key saved successfully', 'success');
        }}
        initialKey={apiKey}
      />
    </div>
  );
}
