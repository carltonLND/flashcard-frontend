import {
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import { Deck } from "../types/deck";

interface DecksTableProps {
  deckList: Deck[];
  onPracticeDeck: (id: number) => void;
  onEditDeck: (id: number) => void;
  onDeleteDeck: (id: number) => void;
}

function DecksTable({
  deckList,
  onPracticeDeck,
  onEditDeck,
  onDeleteDeck,
}: DecksTableProps): JSX.Element {
  const tableRows = deckList.map((deck) => (
    <Tr key={deck.id}>
      <Td>{deck.name}</Td>
      <Td>
        <Button onClick={() => onPracticeDeck(deck.id)}>Practice</Button>
      </Td>
      <Td>
        <Button onClick={() => onEditDeck(deck.id)}>Edit</Button>
      </Td>
      <Td>
        <Button onClick={() => onDeleteDeck(deck.id)}>Delete</Button>
      </Td>
    </Tr>
  ));

  return (
    <TableContainer display={"grid"} placeItems={"center"} p={5}>
      <Table variant="simple" maxWidth={"min-content"} minWidth={"50%"}>
        <TableCaption>Total number of decks: {deckList.length}</TableCaption>
        <Tbody>{tableRows}</Tbody>
      </Table>
    </TableContainer>
  );
}

export default DecksTable;
