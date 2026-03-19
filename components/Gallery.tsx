import { Download, RefreshCw, Trash2, Image as ImageIcon } from 'lucide-react';

export function Gallery({ history, onReuse, onDelete }: any) {
  if (!history || history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center border border-white/5 rounded-3xl bg-white/[0.02] border-dashed">
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
          <ImageIcon className="w-8 h-8 text-zinc-600" />
        </div>
        <h3 className="text-lg font-medium text-zinc-300 mb-1">No images yet</h3>
        <p className="text-sm text-zinc-500 max-w-sm">Generate your first image using the panel on the left to see it appear here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {history.map((item: any) => (
        <ImageCard key={item.id} item={item} onReuse={onReuse} onDelete={onDelete} />
      ))}
    </div>
  );
}

function ImageCard({ item, onReuse, onDelete }: any) {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-black/20 border border-white/10 aspect-square shadow-lg">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={item.url} 
        alt={item.prompt} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        loading="lazy" 
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <p className="text-zinc-200 text-xs line-clamp-3 mb-4 leading-relaxed">{item.prompt}</p>
        <div className="flex gap-2 justify-between items-center">
          <div className="flex gap-2">
            <button 
              onClick={() => onReuse(item)} 
              className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-white backdrop-blur-md transition-all hover:scale-105" 
              title="Reuse Prompt"
            >
              <RefreshCw size={16} />
            </button>
            <a 
              href={item.url} 
              download={`studio-ai-${item.id}.png`} 
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-white backdrop-blur-md transition-all hover:scale-105" 
              title="Download"
            >
              <Download size={16} />
            </a>
          </div>
          <button 
            onClick={() => onDelete(item.id)} 
            className="p-2.5 bg-red-500/20 hover:bg-red-500/40 text-red-200 rounded-xl backdrop-blur-md transition-all hover:scale-105" 
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] text-zinc-300 uppercase tracking-wider font-semibold border border-white/10">
        {item.mode === 'text2img' ? 'Text â†’ Image' : 'Image Edit'}
      </div>
    </div>
  );
}
