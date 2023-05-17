export const UserList = ({ users }) => {
  return (
    <div>
      <h1>List of Users</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
