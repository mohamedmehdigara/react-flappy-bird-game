import React, { useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// --- CONFIG ---
const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;
const BIRD_SIZE = 34;
const PIPE_WIDTH = 64;
const INITIAL_SPEED = 2.5; 
const MAGNET_RANGE = 120;  

const useStore = create(
  persist(
    (set, get) => ({
      birdY: 250,
      birdV: 0,
      birdR: 0,
      pipes: [],
      items: [],
      score: 0,
      highScore: 0,
      level: 1,
      status: 'menu',
      hasShield: false,

      startGame: () => set({
        status: 'playing',
        birdY: 250,
        birdV: 0,
        birdR: 0,
        pipes: [{ x: GAME_WIDTH + 100, h: 200, passed: false }],
        items: [],
        score: 0,
        level: 1,
        hasShield: false
      }),

      jump: () => {
        if (get().status === 'playing') set({ birdV: -6.5, birdR: -25 });
      },

      tick: () => {
        const { status, birdY, birdV, birdR, pipes, items, score, level, hasShield } = get();
        if (status !== 'playing') return;

        const speed = INITIAL_SPEED + level * 0.15;
        const gap = Math.max(180, 240 - level * 5);

        // 1. Physics & Ceiling Safety (Bonk instead of die)
        let nextV = birdV + 0.35;
        let nextY = birdY + nextV;
        if (nextY < 0) { nextY = 0; nextV = 1; }
        const nextR = Math.min(birdR + 2, 60);

        // 2. Initialize Arrays (FIXED: nextItems declared BEFORE use)
        let nextPipes = pipes.map(p => ({ ...p, x: p.x - speed }));
        let nextItemsBase = items.map(it => {
            const dx = (50 - it.x);
            const dy = (nextY - it.y);
            const dist = Math.sqrt(dx*dx + dy*dy);
            // Magnet effect
            if (dist < MAGNET_RANGE) {
                return { ...it, x: it.x + dx * 0.1, y: it.y + dy * 0.1 };
            }
            return { ...it, x: it.x - speed };
        });

        // 3. Spawning Logic
        if (nextPipes[nextPipes.length - 1].x < GAME_WIDTH - 250) {
          const h = Math.floor(Math.random() * (GAME_HEIGHT - gap - 180)) + 90;
          nextPipes.push({ x: GAME_WIDTH, h, passed: false });
          
          if (Math.random() < 0.4) {
            nextItemsBase.push({
              x: GAME_WIDTH + 20,
              y: h + gap / 2 - 15,
              type: Math.random() > 0.5 ? 'shield' : 'star'
            });
          }
        }

        // 4. Scoring
        let scoreGain = 0;
        nextPipes = nextPipes.map(p => {
          if (!p.passed && p.x + PIPE_WIDTH < 50) {
            scoreGain = 1;
            return { ...p, passed: true };
          }
          return p;
        });

        // 5. Item Collection
        const remainingItems = nextItemsBase.filter(item => {
          const hit = Math.abs(item.x - 50) < 30 && Math.abs(item.y - nextY) < 30;
          if (hit) {
            if (item.type === 'shield') set({ hasShield: true });
            if (item.type === 'star') set({ score: get().score + 2 });
          }
          return !hit && item.x > -50;
        });

        // 6. Forgiving Collision (Shrunken Hitbox)
        const b = { 
            t: nextY + 8, 
            b: nextY + BIRD_SIZE - 8, 
            l: 50 + 8, 
            r: 50 + BIRD_SIZE - 8 
        };

        const hitFloor = b.b > GAME_HEIGHT;
        const hitPipe = nextPipes.some(p => {
          const withinX = b.r > p.x && b.l < p.x + PIPE_WIDTH;
          return withinX && (b.t < p.h || b.b > p.h + gap);
        });

        if (hitFloor || (hitPipe && !hasShield)) {
          set({ status: 'gameover', highScore: Math.max(score + scoreGain, get().highScore) });
        } else if (hitPipe && hasShield) {
          set({ hasShield: false, pipes: nextPipes.filter(p => p.x > 220) });
        } else {
          set({
            birdY: nextY, birdV: nextV, birdR: nextR,
            pipes: nextPipes.filter(p => p.x > -100),
            items: remainingItems,
            score: score + scoreGain,
            level: Math.floor((score + scoreGain) / 10) + 1
          });
        }
      }
    }),
    { name: 'bird-zen-v2' }
  )
);

// --- STYLES ---
const Viewport = styled.div`
  position: relative; width: ${GAME_WIDTH}px; height: ${GAME_HEIGHT}px;
  background: ${p => p.lv % 2 === 0 ? '#1e293b' : '#bae6fd'};
  border: 8px solid #334155; border-radius: 16px; overflow: hidden;
  transition: background 1.5s ease;
`;

const BirdWrap = styled.div.attrs(p => ({
  style: { top: p.y, transform: `rotate(${p.r}deg)` }
}))`
  position: absolute; left: 50px; width: ${BIRD_SIZE}px; height: ${BIRD_SIZE}px; z-index: 10;
  background: #fde047; border: 3px solid #713f12; border-radius: 50% 50% 20% 50%;
  box-shadow: ${p => p.shield ? '0 0 20px #4ade80, 0 0 40px rgba(74, 222, 128, 0.4)' : 'none'};
  &::after { content: ''; position: absolute; right: -8px; top: 35%; border-left: 10px solid #f97316; border-top: 5px solid transparent; border-bottom: 5px solid transparent; }
`;

const Wing = styled.div.attrs(p => ({ style: { transform: `rotate(${Math.max(-20, p.v * 4)}deg)` } }))`
  position: absolute; left: 2px; top: 30%; width: 18px; height: 12px; background: #eab308; border: 2px solid #713f12; border-radius: 50%; transform-origin: right center;
`;

const PipeSet = styled.div.attrs(p => ({ style: { left: p.x } }))`
  position: absolute; width: ${PIPE_WIDTH}px; height: 100%;
  & > div { background: #4ade80; border: 3px solid #064e3b; width: 100%; position: absolute; }
`;

const HUD = styled.div`
  position: absolute; top: 20px; width: 100%; display: flex; justify-content: space-around; 
  color: ${p => p.lv % 2 === 0 ? 'white' : '#0f172a'}; font-weight: 900; z-index: 20; text-shadow: ${p => p.lv % 2 === 0 ? '2px 2px #000' : 'none'};
`;

export default function App() {
  const s = useStore();
  const requestRef = useRef();
  
  const loop = () => { 
    s.tick(); 
    requestRef.current = requestAnimationFrame(loop); 
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#020617', userSelect: 'none' }} onMouseDown={s.jump}>
      <Viewport lv={s.level}>
        <HUD lv={s.level}>
          <span>LVL {s.level}</span>
          <span style={{fontSize: '2.5rem'}}>{s.score}</span>
          <span>BEST {s.highScore}</span>
        </HUD>

        <BirdWrap y={s.birdY} r={s.birdR} shield={s.hasShield}><Wing v={s.birdV} /></BirdWrap>

        {s.pipes.map((p, i) => {
          const gap = Math.max(180, 240 - s.level * 5);
          return (
            <PipeSet key={i} x={p.x}>
              <div style={{ top: 0, height: p.h }} />
              <div style={{ bottom: 0, height: GAME_HEIGHT - p.h - gap }} />
            </PipeSet>
          );
        })}

        {s.items.map((it, i) => (
          <div key={i} style={{ 
            position: 'absolute', left: it.x, top: it.y, width: 30, height: 30, 
            background: it.type === 'shield' ? '#4ade80' : '#fbbf24', border: '3px solid white',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 11,
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
          }}>
            {it.type === 'shield' ? '🛡️' : '⭐'}
          </div>
        ))}

        {s.status !== 'playing' && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.8)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', zIndex: 30, textAlign: 'center', backdropFilter: 'blur(4px)' }}>
            <h1 style={{fontSize: '3.5rem', margin: 0, color: '#fde047'}}>BIRD ZEN</h1>
            <p style={{margin: '10px 0 25px', opacity: 0.9, lineHeight: 1.5}}>Items pull toward you!<br/>Ceiling is safe. Relax.</p>
            <button onClick={(e) => { e.stopPropagation(); s.startGame(); }} style={{ padding: '16px 48px', fontSize: '1.5rem', background: '#f43f5e', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 8px 0 #9f1239' }}>
              {s.status === 'menu' ? 'START' : 'RETRY'}
            </button>
          </div>
        )}
      </Viewport>
    </div>
  );
}