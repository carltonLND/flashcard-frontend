import {
  Button,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { server } from "../core/requests";

interface NewCardProps {
  deckId: number;
  getDeck: () => Promise<void>;
}

function NewCard({ deckId, getDeck }: NewCardProps) {
  const [questionInput, setQuestionInput] = useState("");
  const [answerInput, setAnswerInput] = useState("");

  const onClick = async () => {
    if (questionInput === "" || answerInput === "") return;
    const question = questionInput;
    const answer = answerInput;
    setQuestionInput("");
    setAnswerInput("");
    await server.post("/cards", {
      question,
      answer,
      deck_id: deckId,
    });
    await getDeck();
  };

  return (
    <Table variant="simple" maxWidth={"min-content"} minWidth={"50%"}>
      <Thead>
        <Tr>
          <Th>question</Th>
          <Th>answer</Th>
          <Th>create card</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>
            <Input
              width={"min-content"}
              onChange={(e) => setQuestionInput(e.target.value.slice(0, 255))}
              value={questionInput}
            />
          </Td>
          <Td>
            <Input
              width={"min-content"}
              onChange={(e) => setAnswerInput(e.target.value.slice(0, 255))}
              value={answerInput}
            />
          </Td>
          <Td>
            <Button onClick={onClick}> ADD </Button>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
}

export default NewCard;
