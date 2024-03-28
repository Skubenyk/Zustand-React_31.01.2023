import { useEffect } from 'react';
import { useUsersStore } from './userStore';
import { UsersState, User } from './userStore';

const Users = () => {
  const users = useUsersStore((state: UsersState) => state.users);
  const addUser = useUsersStore((state: UsersState) => state.addUser);
  const fetchUsers = useUsersStore((state: UsersState) => state.fetchUsers);

  useEffect(() => {
    fetchUsers();
  }, []);

  const onBtnClick = () => {
    addUser('new user');
  };

  return (
    <div className='User'>
      {users.map((user: User) => (
        <div key={user.id}>
          {user.id}. {user.username}
        </div>
      ))}
      <button onClick={onBtnClick}>Create</button>
    </div>
  );
};

export default Users;
