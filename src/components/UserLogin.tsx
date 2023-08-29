import { useEffect, useState } from "react";
import { User } from "../types/IUser";
import {
  Button,
  Center,
  Divider,
  HStack,
  Input,
  Select,
} from "@chakra-ui/react";

interface UserLoginProps {
  setUser: (name: string) => void;
}

function UserLogin({ setUser }: UserLoginProps) {
  const [userList, setUserList] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [newUserInput, setNewUserInput] = useState("");

  const handleNewUserSubmit = async () => {
    // IF newUserInput is not an empty string
    if (newUserInput === "") return;
    // Send a request
    // IF response status is 201
    // THEN
    setUser(newUserInput);
  };

  useEffect(() => {
    // TODO: Fetch the users from the backend
    setUserList(["Carlton", "Ana", "Neill", "Beth"]);
  }, []);

  return (
    <HStack justifyContent={"space-evenly"} height={"100vh"}>
      <Center flexDirection={"column"} gap={"1em"}>
        <Select onChange={(e) => setSelectedUser(e.target.value)}>
          <option selected disabled value="">
            Select User
          </option>
          {userList.map((u, i) => (
            <option key={i} value={u}>
              {u}
            </option>
          ))}
        </Select>
        <Button onClick={() => setUser(selectedUser)}>LOGIN</Button>
      </Center>
      <Center height="50%">
        <Divider orientation="vertical" />
      </Center>
      <Center flexDirection={"column"} gap={"1em"}>
        <Input
          onChange={(e) => setNewUserInput(e.target.value.slice(0, 20))}
          value={newUserInput}
          placeholder="Your name..."
        />
        <Button onClick={handleNewUserSubmit}>SIGNUP</Button>
      </Center>
    </HStack>
  );
}

export default UserLogin;
