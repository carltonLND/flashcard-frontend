import { Button } from "@chakra-ui/react";
import "./App.css";
import UserLogin from "./UserLogin";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("");

  return (
    <>
      {user === "" ? (
        <UserLogin setUser={setUser} />
      ) : (
        <>
          <h1>WE ARE LOGGED IN AS {user}</h1>
          <Button onClick={() => setUser("")}>LOGOUT</Button>
        </>
      )}
    </>
  );
}

export default App;
