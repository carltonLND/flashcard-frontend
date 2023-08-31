import { useEffect, useState } from "react";
import { User } from "../types/user";
import { Deck } from "../types/deck";
import { server } from "../core/requests";
import DecksTable from "./DecksTable";

interface DecksViewProps {
  user: User;
}

// @ts-ignore
function DecksView({ user }: DecksViewProps): JSX.Element {
  const [deckList, setDeckList] = useState<Deck[]>([]);

  useEffect(() => {
    async function getDeckList() {
      const response = await server.get("/decks");
      setDeckList(response.data);
    }

    getDeckList();
  }, []);

  return (
    <>
      <>Add Deck</>
      <DecksTable deckList={deckList}></DecksTable>
    </>
  );
}

export default DecksView;
