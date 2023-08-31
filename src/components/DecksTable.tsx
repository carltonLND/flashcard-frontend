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
    <TableContainer>
      <Table variant="simple">
        <Tbody>{tableRows}</Tbody>
        <TableCaption>Imperial to metric conversion factors</TableCaption>
      </Table>
    </TableContainer>
  );
}

export default DecksTable;
