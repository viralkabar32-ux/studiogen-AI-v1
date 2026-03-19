import { useCallback } from 'react';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';

export function UploadBox({ image, setImage }: any) {
  const handleDrop = useCallback((e: any) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    }
  }, [setImage]);

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  if (image) {
    return (
      <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-white/10 group bg-black/20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-contain" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            onClick={() => setImage(null)}
            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-transform hover:scale-110 shadow-lg"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <label 
      onDragOver={e => e.preventDefault()} 
      onDrop={handleDrop}
      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all bg-black/20 group"
    >
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
        <UploadCloud className="w-6 h-6 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
      </div>
      <p className="text-sm font-medium text-zinc-300 mb-1">Click or drag image to upload</p>
      <p className="text-xs text-zinc-500">Supports JPG, PNG, WEBP</p>
      <input type="file" className="hidden" accept="image/*" onChange={handleChange} />
    </label>
  );
}
