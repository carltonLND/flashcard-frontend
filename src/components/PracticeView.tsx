import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { DeckContent } from "../types/deck";
import { useEffect, useMemo, useState } from "react";
import { server } from "../core/requests";
import { CardWithStreak } from "../types/card";
import { filterNeedReview, randomSort } from "../core/filterCards";
import Flashcard from "./Flashcard";

interface PracticeViewProps {
  userId: number;
  deckId: number;
  isOpen: boolean;
  onClose: () => void;
}

function PracticeView({ isOpen, onClose, deckId, userId }: PracticeViewProps) {
  const [deck, setDeck] = useState<DeckContent>();
  const [cardsToReview, setCardsToReview] = useState<CardWithStreak[]>();

  useEffect(() => {
    async function getDeck() {
      const response = await server.get(`/decks/${deckId}/${userId}`);
      setDeck(response.data);
      const filteredCards = filterNeedReview(response.data.cards);
      const shuffledCards = randomSort(filteredCards);

      setCardsToReview(shuffledCards);
    }
    getDeck();
  }, [deckId, userId]);

  const currentCard = useMemo(
    () => (cardsToReview ? cardsToReview[cardsToReview.length - 1] : undefined),
    [cardsToReview]
  );

  const onCorrect = async () => {
    setCardsToReview((prev) => {
      if (!prev) return prev;
      const updatedCards = [...prev];
      updatedCards.pop();
      return updatedCards;
    });

    if (!currentCard) return;
    await server.put(`/streaks/${currentCard.id}/${userId}`, {
      streak: currentCard.streak === null ? 1 : currentCard.streak + 1,
    });
  };

  const onWrong = async () => {
    setCardsToReview((prev) => {
      if (!prev) return prev;
      const updatedCards = [...prev];
      const wrongCard = updatedCards.pop();

      if (!wrongCard) return prev;
      updatedCards.unshift(wrongCard);
      return updatedCards;
    });

    if (!currentCard) return;
    await server.delete(`/streaks/${currentCard.id}/${userId}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        {deck && (
          <>
            <ModalHeader>{deck.name}</ModalHeader>
            <Divider />
            <ModalBody>
              {currentCard ? (
                <Flashcard
                  card={currentCard}
                  onCorrect={onCorrect}
                  onWrong={onWrong}
                />
              ) : (
                <Heading>There are no cards to review from this deck</Heading>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default PracticeView;
