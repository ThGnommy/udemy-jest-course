import { useRef } from "react";

export const UserForm = ({ users, onUserAdd }) => {
  const nameRef = useRef();
  const emailRef = useRef();

  const addUser = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;

    const newUser = { name, email };

    onUserAdd(newUser);

    // reset fields
    nameRef.current.value = "";
    emailRef.current.value = "";
  };

  return (
    <div onSubmit={addUser}>
      <h1>Add User</h1>
      <form>
        <label>Name</label>
        <input ref={nameRef} type="text" name="" id="" />
        <label>Email</label>
        <input ref={emailRef} type="email" name="" id="" />
        <button>Submit</button>
      </form>
    </div>
  );
};
