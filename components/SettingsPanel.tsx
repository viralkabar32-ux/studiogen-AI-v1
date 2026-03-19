export function SettingsPanel({ settings, setSettings, mode }: any) {
  const isVideo = mode === 'text2video' || mode === 'img2video';

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div>
        <label className="block text-[10px] text-zinc-500 mb-1.5 uppercase tracking-wider font-semibold">Aspect Ratio</label>
        <select 
          value={settings.aspect_ratio} 
          onChange={e => setSettings({...settings, aspect_ratio: e.target.value})}
          className="w-full bg-black/20 border border-white/10 rounded-xl p-2.5 text-zinc-200 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all appearance-none"
        >
          <option value="16:9">16:9</option>
          <option value="9:16">9:16</option>
          <option value="1:1">1:1</option>
          <option value="4:3">4:3</option>
          <option value="3:4">3:4</option>
          <option value="3:2">3:2</option>
          <option value="2:3">2:3</option>
        </select>
      </div>
      <div>
        <label className="block text-[10px] text-zinc-500 mb-1.5 uppercase tracking-wider font-semibold">Resolution</label>
        <select 
          value={settings.resolution} 
          onChange={e => setSettings({...settings, resolution: e.target.value})}
          className="w-full bg-black/20 border border-white/10 rounded-xl p-2.5 text-zinc-200 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all appearance-none"
        >
          {isVideo ? (
            <>
              <option value="480p">480p</option>
              <option value="720p">720p</option>
            </>
          ) : (
            <>
              <option value="1k">1K</option>
              <option value="2k">2K</option>
            </>
          )}
        </select>
      </div>
      <div>
        <label className="block text-[10px] text-zinc-500 mb-1.5 uppercase tracking-wider font-semibold">
          {isVideo ? 'Duration (s)' : 'Images'}
        </label>
        {isVideo ? (
          <input 
            type="number"
            min={1}
            max={15}
            value={settings.duration}
            onChange={e => setSettings({...settings, duration: parseInt(e.target.value) || 6})}
            className="w-full bg-black/20 border border-white/10 rounded-xl p-2.5 text-zinc-200 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
          />
        ) : (
          <select 
            value={settings.n} 
            onChange={e => setSettings({...settings, n: parseInt(e.target.value)})}
            className="w-full bg-black/20 border border-white/10 rounded-xl p-2.5 text-zinc-200 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all appearance-none"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        )}
      </div>
    </div>
  );
}
