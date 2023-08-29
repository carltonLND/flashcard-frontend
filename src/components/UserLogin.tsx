import { server } from "../core/requests";
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
    if (newUserInput === "") return;

    const response = await server.post("/users", { name: newUserInput });
    if (response.status === 201) {
      setUser(newUserInput);
    }
  };

  useEffect(() => {
    async function getUserList() {
      const response = await server.get("/users");
      setUserList(response.data);
    }

    getUserList();
  }, []);

  return (
    <HStack justifyContent={"space-evenly"} height={"100vh"}>
      <Center flexDirection={"column"} gap={"1em"}>
        <Select onChange={(e) => setSelectedUser(e.target.value)}>
          <option selected disabled value="">
            Select User
          </option>
          {userList.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
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
