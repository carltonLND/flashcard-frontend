import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import { MyComponent } from "./MyComponent";

function App() {
  return (
    <ChakraProvider>
      <MyComponent />
    </ChakraProvider>
  );
}

export default App;
