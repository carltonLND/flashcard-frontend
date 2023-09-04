import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { server } from "../core/requests";
import { CardWithStreak } from "../types/card";
import { DeckContent } from "../types/deck";
import EditCardRow from "./EditCardRow";
import NewCard from "./NewCard";

interface CardsTableProps {
  deckId: number;
  cardList: CardWithStreak[];
  setDeck: React.Dispatch<React.SetStateAction<DeckContent | undefined>>;
  getDeck: () => Promise<void>;
}

function CardsTable({ deckId, cardList, setDeck, getDeck }: CardsTableProps) {
  const onDelete = async (id: number) => {
    setDeck((prev) => {
      if (!prev) return prev;
      const updatedCards = prev.cards.filter((card) => card.id !== id);
      return { ...prev, cards: updatedCards };
    });
    await server.delete(`/cards/${id}`);
  };

  const cardRows = cardList.map((card) => (
    <EditCardRow key={card.id} card={card} onDelete={onDelete} />
  ));

  return (
    <TableContainer display={"grid"} placeItems={"center"} p={5} gap={10}>
      <Heading size={"lg"}>Cards</Heading>
      <NewCard getDeck={getDeck} deckId={deckId} />
      <Table variant="simple" maxWidth={"min-content"} minWidth={"50%"}>
        <Thead>
          <Tr>
            <Th>question</Th>
            <Th>answer</Th>
            <Th>update card</Th>
            <Th>delete card</Th>
          </Tr>
        </Thead>
        <Tbody>{cardRows}</Tbody>
      </Table>
    </TableContainer>
  );
}

export default CardsTable;
