import UserLogin from "./UserLogin";
import { useState } from "react";
import { User } from "../types/IUser";
import PageHeader from "./PageHeader";

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      {!user ? (
        <UserLogin setUser={setUser} />
      ) : (
        <>
          <PageHeader userName={user.name} setUser={setUser} />
        </>
      )}
    </>
  );
}

export default App;
