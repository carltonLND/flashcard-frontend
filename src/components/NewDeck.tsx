import { Button, Center, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";

interface NewDeckProps {
  onSubmit: (name: string) => void;
}

function NewDeck({ onSubmit }: NewDeckProps) {
  const [newDeckInput, setNewDeckInput] = useState("");

  return (
    <Center padding={10}>
      <HStack width={"max-content"} spacing={3}>
        <Input
          onChange={(e) => setNewDeckInput(e.target.value.slice(0, 40))}
          value={newDeckInput}
        />
        <Button onClick={() => onSubmit(newDeckInput)}>Add Deck</Button>
      </HStack>
    </Center>
  );
}

export default NewDeck;
