'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Building2, ChevronDown, ChevronLeft, ChevronRight, Clock3, Factory, GraduationCap, House, Layers3, Map, MapPin, Minus, Play, Plus, Store, X } from 'lucide-react';

const GpuLayer = dynamic(() => import('./gpu-layer').then((m) => m.GpuLayer), { ssr: false });
const YEARS = [2026, 2030, 2035, 2040, 2043];
const CATEGORIES = [
  { name: 'Office', Icon: Building2 }, { name: 'Residential', Icon: House },
  { name: 'Commercial', Icon: Store }, { name: 'Education', Icon: GraduationCap },
  { name: 'Retail', Icon: Store }, { name: 'Mobility', Icon: Map },
  { name: 'Industrial', Icon: Factory }, { name: 'Utilities', Icon: Layers3 },
];
const PLACES = [
  { name: 'District IO', status: 'PLANNED 2030', detail: 'DSO HQ Complex', category: 'Office' },
  { name: 'DSO HQ', status: 'LEASED', detail: 'Headquarter', category: 'Office' },
  { name: 'TechnoHub 4', status: 'AVAILABLE', detail: 'Campus offices', category: 'Education' },
  { name: 'LIU 8', status: 'LEASED', detail: 'Light industrial', category: 'Industrial' },
];
const VIDEOS = [
  { title: 'Innovation companies', tone: 'city' },
  { title: 'Tech events and culture', tone: 'night' },
  { title: 'Investment opportunities', tone: 'district' },
];

export function GlassDemo() {
  const stageRef = useRef<HTMLElement>(null);
  const [size, setSize] = useState({ width: 1440, height: 900 });
  const [yearIndex, setYearIndex] = useState(4);
  const [mode, setMode] = useState('Free');
  const [category, setCategory] = useState('Office');
  const [selected, setSelected] = useState('District IO');
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [gpuEnabled, setGpuEnabled] = useState(false);
  const [gpuAvailable, setGpuAvailable] = useState(false);
  const [gpuError, setGpuError] = useState('');
  const [blur, setBlur] = useState(9);
  const [tint, setTint] = useState(0.47);
  const [zoom, setZoom] = useState(1);
  const [videoIndex, setVideoIndex] = useState(0);

  useEffect(() => {
    const element = stageRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setSize({ width: Math.round(entry.contentRect.width), height: Math.round(entry.contentRect.height) }));
    observer.observe(element);
    setGpuAvailable(Boolean('gpu' in navigator));
    return () => observer.disconnect();
  }, []);

  const visiblePlaces = useMemo(() => mode === 'Free' ? PLACES : PLACES.filter((p) => mode === 'Business' ? p.name !== 'LIU 8' : p.name === 'TechnoHub 4' || p.name === 'District IO'), [mode]);
  const activePlace = PLACES.find((p) => p.name === selected) ?? PLACES[0];
  const year = YEARS[yearIndex];
  const isGpu = gpuEnabled && gpuAvailable && !gpuError;

  return (
    <main className="demo" ref={stageRef} data-gpu={isGpu} style={{ '--glass-blur': `${blur}px`, '--glass-tint': tint, '--scene-zoom': zoom } as React.CSSProperties}>
      <div className="scene" aria-hidden="true" />
      <div className="scene-shade" aria-hidden="true" />
      {isGpu && <GpuLayer width={size.width} height={size.height} blur={blur} tint={tint} onError={(message) => { setGpuError(message); setGpuEnabled(false); }} />}

      <header className="topbar">
        <div className="dso-mark" aria-label="Dubai Silicon Oasis"><img src="/dso-logo.svg" alt="Dubai Silicon Oasis" width="103" height="38" /></div>
        <div className="compass" aria-label="View heading 202 degrees"><span>W</span><span>195</span><span className="compass-pointer">◆</span><span>210</span></div>
        <div className="topbar-right"><div className="clock">13:40:08 AST<small>28 MAY 2026</small></div><div className="avatar">JD</div><ChevronDown size={14} /><span className="district-logo"><img src="/district-io.png" alt="District IO" width="62" height="38" /></span></div>
      </header>

      <aside className="left-rail" aria-label="Explore Dubai Silicon Oasis">
        <nav className="mode-nav" aria-label="Exploration mode">{['Free', 'Business', 'Research'].map((item) => <button className={`glass pill ${mode === item ? 'selected' : ''}`} type="button" aria-pressed={mode === item} onClick={() => setMode(item)} key={item}>{item}</button>)}</nav>
        <section className="glass timeline" aria-label="Development timeline"><div className="timeline-body"><button type="button" className="plain arrow" aria-label="Previous year" disabled={yearIndex === 0} onClick={() => setYearIndex((n) => Math.max(0, n - 1))}><ChevronLeft size={21} /></button><div className="timeline-middle"><div className="year-line"><strong>{year}</strong><span><i />{year === 2026 ? 'CURRENT' : 'FUTURE'}</span></div><input aria-label="Development year" type="range" min={0} max={YEARS.length - 1} value={yearIndex} onChange={(e) => setYearIndex(Number(e.target.value))} className="year-range" /><div className="year-labels">{YEARS.map((n, i) => <button type="button" key={n} className={i === yearIndex ? 'current' : ''} onClick={() => setYearIndex(i)}>{n}</button>)}</div></div><button type="button" className="plain arrow" aria-label="Next year" disabled={yearIndex === YEARS.length - 1} onClick={() => setYearIndex((n) => Math.min(YEARS.length - 1, n + 1))}><ChevronRight size={21} /></button></div></section>

        <section className="glass assets"><h2 className="section-heading">Assets</h2><div className="chip-list">{CATEGORIES.map(({ name, Icon }) => <button type="button" key={name} className={`asset-chip ${category === name ? 'active' : ''}`} aria-pressed={category === name} onClick={() => setCategory(name)}><Icon size={12} strokeWidth={1.7} />{name}</button>)}</div></section>

        <section className="glass areas"><h2 className="section-heading">Areas of interest</h2><div className="places">{visiblePlaces.map((place) => <button key={place.name} type="button" className={`place ${selected === place.name ? 'place-selected' : ''}`} onClick={() => { setSelected(place.name); setDetailsOpen(true); }}><span className="place-icon">{place.name === 'LIU 8' ? <Factory size={18} /> : place.name === 'TechnoHub 4' ? <GraduationCap size={18} /> : <Building2 size={18} />}</span><span className="place-text"><strong>{place.name}</strong><em className={place.status === 'AVAILABLE' ? 'light-badge' : ''}>{place.status}</em><small>{place.detail}</small></span></button>)}</div></section>
      </aside>

      {detailsOpen && <aside className="glass detail" aria-label={`${activePlace.name} details`}><div className="detail-head"><div><span className="small-tag">{year === 2026 ? 'CURRENT' : 'FUTURE'}</span><h1>{activePlace.name}</h1><p>{activePlace.status === 'PLANNED 2030' ? 'PLANNED 2030' : activePlace.status}</p></div><button type="button" className="round-button" aria-label="Close details" onClick={() => setDetailsOpen(false)}><X size={18} /></button></div><div className="detail-image" role="img" aria-label="Dubai Silicon Oasis development view" /><div className="detail-thumbs"><button aria-label="Previous image" type="button" onClick={() => setVideoIndex((n) => (n + VIDEOS.length - 1) % VIDEOS.length)}><ChevronLeft size={17} /></button><span /><span /><span /><button aria-label="Next image" type="button" onClick={() => setVideoIndex((n) => (n + 1) % VIDEOS.length)}><ChevronRight size={17} /></button></div><p className="detail-description">Amalgamation of five plots (164,420 m²) on the DSO masterplan. Concept design by CPG Middle East: commercial offices and techno labs.</p><div className="detail-actions"><button type="button" onClick={() => alert(`${activePlace.name} · ${activePlace.detail}\nDevelopment year: ${year}`)}>Building Info</button><button type="button" onClick={() => alert("Enquiry is a design-only action in this demo.")}>Enquire</button></div></aside>}
      {!detailsOpen && <button type="button" className="glass reopen-detail" onClick={() => setDetailsOpen(true)}>Show {activePlace.name} <ChevronRight size={16} /></button>}

      <div className="map-tools"><button type="button" className="glass tool" title="Compare years" aria-label="Compare years" onClick={() => setYearIndex((n) => (n + 1) % YEARS.length)}><Clock3 size={19} /></button><button type="button" className="glass tool" title="Map view" aria-label="Reset map view" onClick={() => setZoom(1)}><Map size={19} /></button><button type="button" className="glass tool" title="District IO" aria-label="Show District IO" onClick={() => { setSelected('District IO'); setDetailsOpen(true); }}><MapPin size={19} /></button></div>
      <div className="zoom-tools"><button type="button" className="glass tool" aria-label="Zoom in" onClick={() => setZoom((n) => Math.min(1.35, +(n + 0.08).toFixed(2)))}><Plus size={21} /></button><button type="button" className="glass tool" aria-label="Zoom out" onClick={() => setZoom((n) => Math.max(1, +(n - 0.08).toFixed(2)))}><Minus size={21} /></button></div>

      <section className="glass stats" aria-label="District IO statistics"><div><span>GFA</span><strong>595,300 <small>m²</small></strong></div><div><span>FROM</span><strong>14,900 <small>AED/m²</small></strong></div><div><span>HOMES</span><strong>704</strong></div><div><span>HOTEL KEYS</span><strong>440</strong></div><div><span>LEVELS</span><strong>G+40</strong></div><div><span>TARGET YEAR</span><strong>2030</strong></div></section>
      <section className="glass videos" aria-label="Videos"><div className="videos-top"><h2 className="section-heading">Videos</h2><span>9</span><button type="button" aria-label="Previous video" onClick={() => setVideoIndex((n) => (n + VIDEOS.length - 1) % VIDEOS.length)}><ChevronLeft size={14} /></button><button type="button" aria-label="Next video" onClick={() => setVideoIndex((n) => (n + 1) % VIDEOS.length)}><ChevronRight size={14} /></button></div><div className="video-grid">{VIDEOS.map((v, i) => <button type="button" key={v.title} className={`video-card video-${v.tone} ${i === videoIndex ? 'video-active' : ''}`} onClick={() => setVideoIndex(i)} aria-label={`Select ${v.title}`}><Play size={22} fill="white" /><small>{v.title}</small></button>)}</div></section>

      <section className="glass lab" aria-label="Glass settings"><div className="lab-heading"><strong>GLASS STUDY</strong><span>{isGpu ? 'LIQUID-DOM' : 'CSS PREVIEW'}</span></div><label>Blur <input type="range" min="0" max="24" value={blur} onChange={(e) => setBlur(Number(e.target.value))} /><output>{blur}px</output></label><label>Tint <input type="range" min="0" max="0.85" step="0.01" value={tint} onChange={(e) => setTint(Number(e.target.value))} /><output>{Math.round(tint * 100)}%</output></label><button type="button" className="gpu-toggle" onClick={() => { setGpuError(''); setGpuEnabled((value) => !value); }} disabled={!gpuAvailable}>{isGpu ? 'Disable GPU glass' : 'Enable GPU glass'}</button><p>{gpuError ? `Renderer error: ${gpuError}` : gpuAvailable ? 'GPU mode needs Chrome Canvas Draw Element enabled in chrome://flags/#canvas-draw-element, then a browser restart.' : 'WebGPU is unavailable in this browser. CSS preview remains interactive.'}</p></section>
    </main>
  );
}
