import { useState } from "react";
import "./App.css";
import { AddUser } from "./components/AddUser";
import { UserList } from "./components/UserList";

function App() {
  const [users, setUsers] = useState([]);

  return (
    <div>
      <AddUser setState={setUsers} />
      <UserList users={users} />
    </div>
  );
}

export default App;
