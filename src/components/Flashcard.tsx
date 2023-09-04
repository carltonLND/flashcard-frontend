import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  HStack,
  Button,
  VStack,
  Center,
} from "@chakra-ui/react";
import { CardWithStreak } from "../types/card";
import { useState } from "react";

interface FlashcardProps {
  card: CardWithStreak;
  onCorrect: () => Promise<void>;
  onWrong: () => Promise<void>;
}

function Flashcard({ card, onCorrect, onWrong }: FlashcardProps) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Center padding={10}>
      <VStack spacing={3}>
        <Tabs
          isFitted
          variant="enclosed"
          index={tabIndex}
          onChange={(index) => setTabIndex(index)}
          width={"500px"}
        >
          <TabList mb="1em">
            <Tab>Question</Tab>
            <Tab>Answer</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Center>{card.question}</Center>
            </TabPanel>
            <TabPanel>
              <Center>{card.answer}</Center>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <HStack spacing={10}>
          <Button
            onClick={() => {
              onWrong();
              setTabIndex(0);
            }}
          >
            Wrong
          </Button>
          <Button
            onClick={() => {
              onCorrect();
              setTabIndex(0);
            }}
          >
            Correct
          </Button>
        </HStack>
      </VStack>
    </Center>
  );
}

export default Flashcard;
