import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { server } from "../core/requests";
import { Deck, DeckContent } from "../types/deck";

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
  const [deck, setDeck] = useState<DeckContent>({} as DeckContent);
  const [deckNameInput, setDeckNameInput] = useState("");

  useEffect(() => {
    async function getDeck() {
      const response = await server.get(`/decks/${deckId}/${userId}`);
      setDeck(response.data);
      setDeckNameInput(response.data.name);
    }

    getDeck();
  }, [deckId, userId]);

  const onSave = async () => {
    setDeckList((prev) =>
      prev.map((d) => (d.id === deckId ? { ...d, name: deckNameInput } : d))
    );
    onClose();
    await server.patch(`/decks/${deckId}`, { name: deckNameInput });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>EDIT DECK: {deck.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            onChange={(e) => setDeckNameInput(e.target.value.slice(0, 40))}
            value={deckNameInput}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onSave}>Save Changes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditView;
