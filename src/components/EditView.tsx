import {
  Button,
  Center,
  Divider,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { server } from "../core/requests";
import { Deck, DeckContent } from "../types/deck";
import CardsTable from "./CardsTable";

interface EditViewProps {
  userId: number;
  deckId: number;
  isOpen: boolean;
  onClose: () => void;
  setDeckList: React.Dispatch<React.SetStateAction<Deck[]>>;
}

function EditView({
  userId,
  deckId,
  isOpen,
  onClose,
  setDeckList,
}: EditViewProps) {
  const [deck, setDeck] = useState<DeckContent>();
  const [deckNameInput, setDeckNameInput] = useState("");

  const getDeck = useCallback(async () => {
    const response = await server.get(`/decks/${deckId}/${userId}`);
    setDeck(response.data);
    setDeckNameInput(response.data.name);
  }, [deckId, userId]);

  useEffect(() => {
    getDeck();
  }, [getDeck]);

  const onEditDeckName = async () => {
    setDeckList((prev) =>
      prev.map((d) => (d.id === deckId ? { ...d, name: deckNameInput } : d))
    );
    await server.patch(`/decks/${deckId}`, { name: deckNameInput });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        {deck && (
          <>
            <ModalHeader>EDIT DECK: {deck.name}</ModalHeader>
            <Divider />
            <ModalBody>
              <Center padding={10}>
                <HStack width={"max-content"} spacing={3}>
                  <Input
                    onChange={(e) =>
                      setDeckNameInput(e.target.value.slice(0, 40))
                    }
                    value={deckNameInput}
                  />
                  <Button
                    paddingLeft={8}
                    paddingRight={8}
                    onClick={() => {
                      onEditDeckName();
                      setDeck((prev) => {
                        if (!prev) return prev;
                        return { ...prev, name: deckNameInput };
                      });
                    }}
                  >
                    UPDATE NAME
                  </Button>
                </HStack>
              </Center>
              <CardsTable
                cardList={deck.cards}
                setDeck={setDeck}
                getDeck={getDeck}
                deckId={deck.id}
              />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default EditView;
