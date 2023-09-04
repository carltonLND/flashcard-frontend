import { Button, Td, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { server } from "../core/requests";
import { CardWithStreak } from "../types/card";

interface EditCardRowProps {
  card: CardWithStreak;
  onDelete: (id: number) => void;
}

function EditCardRow({ card, onDelete }: EditCardRowProps) {
  const [questionInput, setQuestionInput] = useState(card.question);
  const [answerInput, setAnswerInput] = useState(card.answer);

  const onUpdate = async () => {
    if (questionInput === "" || answerInput === "") return;
    await server.patch(`/cards/${card.id}`, {
      question: questionInput,
      answer: answerInput,
    });
  };

  return (
    <Tr>
      <Td>
        <input
          style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          onChange={(e) => setQuestionInput(e.target.value.slice(0, 255))}
          value={questionInput}
        />
      </Td>
      <Td>
        <input
          style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          onChange={(e) => setAnswerInput(e.target.value.slice(0, 255))}
          value={answerInput}
        />
      </Td>
      <Td>
        <Button onClick={onUpdate}> UPDATE </Button>
      </Td>
      <Td>
        <Button onClick={() => onDelete(card.id)}> DELETE </Button>
      </Td>
    </Tr>
  );
}

export default EditCardRow;
