import type {World} from './journey';
import {create} from 'zustand';
export type Quality='Balanced'|'Performance'|'Native 4K';
export type Palette='Iridescent'|'Ember'|'Verdant';
export type Aspect='Fit'|'16:9'|'9:16'|'1:1'|'4:5';
export interface Controls {world:World;journey:boolean;energy:number;motion:number;detail:number;glow:number;reactivity:number;imageMix:number;seed:number;palette:Palette;quality:Quality;aspect:Aspect;playing:boolean;orbit:boolean;}
export const defaults:Controls={world:'Emerald Spirals',journey:true,energy:.5,motion:.35,detail:.7,glow:.35,reactivity:.9,imageMix:.7,seed:7319,palette:'Iridescent',quality:'Balanced',aspect:'Fit',playing:true,orbit:true};
export const useControls=create<Controls & {set:<K extends keyof Controls>(key:K,value:Controls[K])=>void;reset:()=>void}>(set=>({...defaults,set:(key,value)=>set({[key]:value}),reset:()=>set(defaults)}));
