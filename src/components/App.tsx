import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import UserLogin from "./UserLogin";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("");

  return (
    <ChakraProvider>
      {user === "" ? (
        <UserLogin setUser={setUser} />
      ) : (
        <h1>WE ARE LOGGED IN AS {user}</h1>
      )}
    </ChakraProvider>
  );
}

export default App;
