import { useId, useRef } from "react";

/* eslint-disable react/prop-types */
export const AddUser = ({ setState }) => {
  const id = useId();

  const nameRef = useRef();
  const emailRef = useRef();

  const addUser = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;

    const newUser = { id, name, email };

    setState((prev) => [newUser, ...prev]);

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
