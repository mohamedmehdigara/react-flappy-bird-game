import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { create } from 'zustand';

// --- CONFIG & CONSTANTS ---
const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;
const BIRD_SIZE = 34;
const PIPE_WIDTH = 60;

// --- STATE MANAGEMENT ---
const useStore = create((set, get) => ({
  birdY: 250,
  birdV: 0,
  birdR: 0,
  pipes: [],
  items: [], // { x, y, type: 'shield' | 'star' }
  score: 0,
  level: 1,
  status: 'menu',
  hasShield: false,

  startGame: () => set({
    status: 'playing',
    birdY: 250,
    birdV: 0,
    birdR: 0,
    pipes: [{ x: GAME_WIDTH + 50, h: 200, passed: false }],
    items: [],
    score: 0,
    level: 1,
    hasShield: false
  }),

  jump: () => {
    if (get().status === 'playing') set({ birdV: -7.5, birdR: -30 });
  },

  tick: () => {
    const { status, birdY, birdV, birdR, pipes, items, score, level, hasShield } = get();
    if (status !== 'playing') return;

    // 1. Difficulty Scaling
    const speed = 3 + level * 0.5; 
    const gap = Math.max(130, 200 - level * 10);

    // 2. Physics
    const nextV = birdV + 0.45;
    const nextY = birdY + nextV;
    const nextR = Math.min(birdR + 3, 90);

    // 3. Move Pipes & Spawn Items
    let nextPipes = pipes.map(p => ({ ...p, x: p.x - speed }));
    let nextItems = items.map(i => ({ ...i, x: i.x - speed }));
    let scoreGain = 0;

    // Pipe Spawning
    if (nextPipes[nextPipes.length - 1].x < GAME_WIDTH - 220) {
      const h = Math.floor(Math.random() * (GAME_HEIGHT - gap - 150)) + 75;
      nextPipes.push({ x: GAME_WIDTH, h, passed: false });

      // 20% chance to spawn an item in the gap of the new pipe
      if (Math.random() < 0.20) {
        nextItems.push({
          x: GAME_WIDTH + 20,
          y: h + gap / 2 - 15,
          type: Math.random() > 0.6 ? 'shield' : 'star'
        });
      }
    }

    // 4. Scoring & Leveling
    nextPipes = nextPipes.map(p => {
      if (!p.passed && p.x + PIPE_WIDTH < 50) {
        scoreGain = 1;
        return { ...p, passed: true };
      }
      return p;
    });
    
    const newScore = score + scoreGain;
    const newLevel = Math.floor(newScore / 5) + 1;

    // 5. Item Collection
    const remainingItems = nextItems.filter(item => {
      const hit = Math.abs(item.x - 50) < 30 && Math.abs(item.y - nextY) < 30;
      if (hit) {
        if (item.type === 'shield') set({ hasShield: true });
        if (item.type === 'star') set({ score: get().score + 3 });
      }
      return !hit && item.x > -50;
    });

    // 6. Collision
    const hitFloor = nextY > GAME_HEIGHT - BIRD_SIZE || nextY < 0;
    const hitPipe = nextPipes.some(p => {
      const withinX = 50 + BIRD_SIZE > p.x && 50 < p.x + PIPE_WIDTH;
      return withinX && (nextY < p.h || nextY + BIRD_SIZE > p.h + gap);
    });

    if (hitFloor || (hitPipe && !hasShield)) {
      set({ status: 'gameover' });
    } else if (hitPipe && hasShield) {
      // Shield Break logic
      set({ hasShield: false, pipes: nextPipes.filter(p => p.x > 150) }); 
    } else {
      set({
        birdY: nextY, birdV: nextV, birdR: nextR,
        pipes: nextPipes.filter(p => p.x > -100),
        items: remainingItems,
        score: newScore,
        level: newLevel
      });
    }
  }
}));

// --- STYLED COMPONENTS ---

const Viewport = styled.div.attrs(p => ({
  style: { background: `hsl(${195 + p.level * 15}, 60%, ${60 - p.level * 2}%)` }
}))`
  position: relative; width: ${GAME_WIDTH}px; height: ${GAME_HEIGHT}px;
  overflow: hidden; border: 5px solid #333; cursor: pointer;
  transition: background 1.5s ease;
`;

const BirdBody = styled.div.attrs(p => ({
  style: { top: p.y, transform: `rotate(${p.r}deg)` }
}))`
  position: absolute; left: 50px; width: ${BIRD_SIZE}px; height: ${BIRD_SIZE}px;
  z-index: 5;
  &::before { /* Body */
    content: ''; position: absolute; inset: 0; 
    background: #f1c40f; border: 2px solid #000; border-radius: 50% 50% 10px 50%;
    box-shadow: ${p => p.shield ? '0 0 15px 5px #2ecc71' : 'none'};
  }
  &::after { /* Beak */
    content: ''; position: absolute; right: -8px; top: 40%;
    border-left: 10px solid #e67e22; border-top: 5px solid transparent; border-bottom: 5px solid transparent;
  }
`;

const Wing = styled.div.attrs(p => ({
  style: { transform: `rotate(${Math.max(-20, p.v * 5)}deg)` }
}))`
  position: absolute; left: 2px; top: 30%; width: 18px; height: 12px;
  background: #d4ac0d; border: 2px solid #000; border-radius: 50%;
  transform-origin: right center; z-index: 6;
`;

const PipeGroup = styled.div.attrs(p => ({ style: { left: p.x } }))`
  position: absolute; width: ${PIPE_WIDTH}px; height: 100%;
  & > div { background: #73bf2e; border: 2px solid #000; width: 100%; position: absolute; }
`;

const Item = styled.div.attrs(p => ({ style: { left: p.x, top: p.y } }))`
  position: absolute; width: 25px; height: 25px; border-radius: 50%;
  border: 2px solid #000; z-index: 4;
  background: ${p => p.type === 'shield' ? '#2ecc71' : '#f1c40f'};
  display: flex; align-items: center; justify-content: center; font-size: 12px;
  box-shadow: 0 0 10px white;
`;

const HUD = styled.div`
  position: absolute; top: 10px; width: 100%; display: flex; 
  justify-content: space-around; color: white; text-shadow: 2px 2px #000; z-index: 10;
  pointer-events: none;
`;

// --- MAIN COMPONENT ---
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#111' }} onMouseDown={s.jump}>
      <Viewport level={s.level}>
        <HUD>
          <span>LVL {s.level}</span>
          <span style={{ fontSize: '2rem' }}>{s.score}</span>
          <span>{s.hasShield ? '🛡️ ON' : ''}</span>
        </HUD>
        
        <BirdBody y={s.birdY} r={s.birdR} shield={s.hasShield}>
          <Wing v={s.birdV} />
        </BirdBody>

        {s.pipes.map((p, i) => {
          const currentGap = Math.max(130, 200 - s.level * 10);
          return (
            <PipeGroup key={i} x={p.x}>
              <div style={{ top: 0, height: p.h }} />
              <div style={{ bottom: 0, height: GAME_HEIGHT - p.h - currentGap }} />
            </PipeGroup>
          );
        })}

        {s.items.map((item, i) => (
          <Item key={i} x={item.x} y={item.y} type={item.type}>
            {item.type === 'shield' ? '🛡️' : '⭐'}
          </Item>
        ))}

        {s.status !== 'playing' && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <h1 style={{ fontSize: '3rem' }}>{s.status === 'menu' ? 'WAVY BIRD' : 'CRASHED!'}</h1>
            {s.status === 'gameover' && <p>Reached Level {s.level} with {s.score} points</p>}
            <button 
              onClick={(e) => { e.stopPropagation(); s.startGame(); }} 
              style={{ padding: '15px 40px', fontSize: '1.5rem', cursor: 'pointer', background: '#ff4757', border: 'none', color: 'white', borderRadius: '8px' }}
            >
                {s.status === 'menu' ? 'START' : 'RETRY'}
            </button>
          </div>
        )}
      </Viewport>
    </div>
  );
}