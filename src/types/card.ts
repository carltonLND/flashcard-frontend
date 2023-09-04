import { Streak } from "./streak";

export interface CardCandidate {
  question: string;
  answer: string;
  deck_id: number;
}

export interface Card extends CardCandidate {
  id: number;
  created_at: Date;
}

export type CardWithStreak = Omit<Card, "deck_id"> &
  Pick<Streak, "streak"> & { needs_review: boolean };
