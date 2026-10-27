import { useState } from 'react';
export function useLocalState<T>(key: string, initial: T) {
 const [value, setValue] = useState<T>(() => { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) as T : initial; } catch { return initial; } });
 const update = (next: T | ((prev: T) => T)) => setValue(prev => { const result = typeof next === 'function' ? (next as (prev:T)=>T)(prev) : next; try { localStorage.setItem(key, JSON.stringify(result)); } catch { /* UI remains usable if browser storage is unavailable. */ } return result; });
 return [value, update] as const;
}
