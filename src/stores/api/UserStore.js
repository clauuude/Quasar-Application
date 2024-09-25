  import { defineStore } from 'pinia';
  import axios from 'axios';

  const api = axios.create();

  export const useUserStore = defineStore({
    id: 'users',
    state: () => ({
      users: [],
    }),

    getters: {
      allUsers: (state) => state.users,
    },

    actions: {
      async getAllUsers() {
        try {
          const response = await api.get('/auth');
          // const res = await api({method: 'GET', url: '/auth'});
          this.users = response.data;
        } catch (error) {
          console.error("error fetching..", error);
          throw error;
        }
      },

      async addUser(userData) {
        try {
          const response = await api.post('/auth');
          this.users.push(response.data);
        } catch (error) {
          if (error.response && error.response.status === 409) {
            alert("User already exists");
          } else {
            throw error;
          }
        }
      }

    }

  });
