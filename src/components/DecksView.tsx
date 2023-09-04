import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { server } from "../core/requests";
import { Deck } from "../types/deck";
import { User } from "../types/user";
import DecksTable from "./DecksTable";
import EditView from "./EditView";
import NewDeck from "./NewDeck";
import PracticeView from "./PracticeView";

interface DecksViewProps {
  user: User;
}

function DecksView({ user }: DecksViewProps): JSX.Element {
  const [deckList, setDeckList] = useState<Deck[]>([]);
  const [deckId, setDeckId] = useState<number>();

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenPractice,
    onOpen: onOpenPractice,
    onClose: onClosePractice,
  } = useDisclosure();

  async function getDeckList() {
    const response = await server.get("/decks");
    setDeckList(response.data);
  }

  useEffect(() => {
    getDeckList();
  }, []);

  const onEdit = (id: number) => {
    setDeckId(id);
    onOpenEdit();
  };

  const onPractice = (id: number) => {
    setDeckId(id);
    onOpenPractice();
  };

  const onDelete = async (id: number) => {
    setDeckList((prev) => prev.filter((deck) => deck.id !== id));
    await server.delete(`/decks/${id}`);
  };

  const onNewDeck = async (name: string) => {
    if (name === "") return;
    await server.post("/decks", { name });
    getDeckList();
  };

  return (
    <>
      <NewDeck onSubmit={onNewDeck} />
      <DecksTable
        deckList={deckList}
        onPracticeDeck={onPractice}
        onEditDeck={onEdit}
        onDeleteDeck={onDelete}
      ></DecksTable>

      {isOpenEdit && (
        <EditView
          isOpen={isOpenEdit}
          onClose={onCloseEdit}
          userId={user.id}
          deckId={deckId as number}
          setDeckList={setDeckList}
        />
      )}
      {isOpenPractice && (
        <PracticeView
          userId={user.id}
          deckId={deckId as number}
          isOpen={isOpenPractice}
          onClose={onClosePractice}
        />
      )}
    </>
  );
}

export default DecksView;
