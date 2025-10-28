import { ReactNode } from 'react';

export enum CardCategory {
  PERSONAL = 'personal',
  PHILOSOPHICAL = 'philosophical',
  IDEOLOGICAL = 'ideological',
  FUNNY = 'funny',
  SPICY = 'spicy',
  RANDOM = 'random',
}

export interface CategoryInfo {
  id: CardCategory;
  label: string;
  prompt: string;
  color: string;
  gradient: string;
  icon: ReactNode;
}

export enum Player {
  Player1 = 'Jugador 1',
  Player2 = 'Jugador 2',
}

export enum GameState {
  SELECTING,
  LOADING,
  REVEALED,
}