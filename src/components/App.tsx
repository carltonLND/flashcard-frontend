import { Button } from "@chakra-ui/react";
import UserLogin from "./UserLogin";
import { useState } from "react";
import { User } from "../types/IUser";

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      {!user ? (
        <UserLogin setUser={setUser} />
      ) : (
        <>
          <h1>WE ARE LOGGED IN AS {user.name}</h1>
          <Button onClick={() => setUser(null)}>LOGOUT</Button>
        </>
      )}
    </>
  );
}

export default App;
