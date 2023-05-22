import { useRef } from "react";

export const UserForm = ({ onUserAdd }) => {
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
    <div>
      <h1>Add User</h1>
      <form onSubmit={addUser}>
        <label htmlFor="name">Name</label>
        <input ref={nameRef} type="text" id="name" />
        <label htmlFor="email">Email</label>
        <input ref={emailRef} type="email" id="email" />
        <button>Submit</button>
      </form>
    </div>
  );
};
