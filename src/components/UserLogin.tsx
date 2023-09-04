import { server } from "../core/requests";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import {
  Button,
  Center,
  Divider,
  HStack,
  Input,
  Select,
} from "@chakra-ui/react";
import Loading from "./Loading";

interface UserLoginProps {
  setUser: (obj: User | null) => void;
}

function UserLogin({ setUser }: UserLoginProps) {
  const [userList, setUserList] = useState<User[]>();
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [newUserInput, setNewUserInput] = useState("");

  const handleNewUserSubmit = async () => {
    if (newUserInput === "") return;

    const response = await server.post("/users", { name: newUserInput });
    if (response.status === 201) {
      setUser(response.data);
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
    <>
      {!userList ? (
        <Loading />
      ) : (
        <HStack justifyContent={"space-evenly"} height={"100vh"}>
          <Center flexDirection={"column"} gap={"1em"}>
            <Select
              onChange={(e) => setSelectedUserId(parseInt(e.target.value))}
              defaultValue={"-1"}
            >
              <option disabled value="-1">
                Select User
              </option>
              {userList.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
            <Button
              onClick={() =>
                setUser(
                  userList.find((user) => user.id === selectedUserId) as User
                )
              }
            >
              LOGIN
            </Button>
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
      )}
    </>
  );
}

export default UserLogin;
