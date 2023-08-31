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
}

function DecksTable({ deckList }: DecksTableProps): JSX.Element {
  const tableRows = deckList.map((deck) => (
    <Tr key={deck.id}>
      <Td>{deck.name}</Td>
      <Td>
        <Button>Practice</Button>
      </Td>
      <Td>
        <Button>Edit</Button>
      </Td>
      <Td>
        <Button>Delete</Button>
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
