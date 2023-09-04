import { CardWithStreak } from "../types/card";

export function filterNeedReview(cards: CardWithStreak[]) {
  return cards.filter((card) => card.needs_review);
}

export function randomSort<T>(arr: T[]) {
  const sortedArr = [...arr];
  return sortedArr.sort(() => (Math.random() < 0.5 ? 1 : -1));
}
