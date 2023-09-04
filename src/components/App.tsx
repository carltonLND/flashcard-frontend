import UserLogin from "./UserLogin";
import { useState } from "react";
import { User } from "../types/user";
import PageHeader from "./PageHeader";
import DecksView from "./DecksView";

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      {!user ? (
        <UserLogin setUser={setUser} />
      ) : (
        <>
          <PageHeader userName={user.name} setUser={setUser} />
          <DecksView user={user} />
        </>
      )}
    </>
  );
}

export default App;
