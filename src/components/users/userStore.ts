import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist } from 'zustand/middleware';

export interface User {
  id: number;
  username: string;
}

export interface UsersState {
  users: User[];
  isLoading: boolean;
  errors: string[];
  addUser: (user: string) => void;
  fetchUsers: () => Promise<void>;
}

export const useUsersStore = create<UsersState>()(
  persist(
    devtools(
      immer((set) => ({
        users: [],
        isLoading: false,
        errors: [],
        // addUser: (username: string) =>
        //   set((state) => ({ users: [...state.users, { id: Date.now(), username }] })),

        addUser: (username: string) =>
          set((state) => {
            state.users.push({ id: Date.now(), username });
          }),

        fetchUsers: async () => {
          const result = await fetch(
            'https://jsonplaceholder.typicode.com/users'
          );
          const json = (await result.json()) as User[];
          set({ users: json });
        },

        //*With Axios
        // fetchUsers: async () => {
        //   set({ isLoading: true, errors: [] });
        //   try {
        //     const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        //     const users = response.data as User[];
        //     set({ users, isLoading: false });
        //   } catch (error) {
        //     set({ isLoading: false, errors: ['Error fetching users'] });
        //   }
      }))
    ),
    { name: 'usersStore', version: 1 }
  )
);
