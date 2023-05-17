import { useState } from "react";
import "./App.css";
import { UserForm } from "./components/UserForm";
import { UserList } from "./components/UserList";

function App() {
  const [users, setUsers] = useState([]);

  return (
    <div className="App">
      <UserForm setState={setUsers} />
      <UserList users={users} />
    </div>
  );
}

export default App;
