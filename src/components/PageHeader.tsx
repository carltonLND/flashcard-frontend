import {
  Button,
  Divider,
  Heading,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { User } from "../types/IUser";

interface PageHeaderProps {
  userName: string;
  setUser: (obj: User | null) => void;
}

function PageHeader({ userName, setUser }: PageHeaderProps): JSX.Element {
  const { toggleColorMode } = useColorMode();

  return (
    <>
      <Stack direction="row" justifyContent={"space-between"} p={5}>
        <Button onClick={toggleColorMode}>Toggle Theme</Button>
        <Heading>Logged in as {userName}</Heading>
        <Button onClick={() => setUser(null)}>LOGOUT</Button>
      </Stack>
      <Divider />
    </>
  );
}

export default PageHeader;
