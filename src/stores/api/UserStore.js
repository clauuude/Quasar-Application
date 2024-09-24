  import { defineStore } from 'pinia';
  import axios from 'axios';

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
          const response = await axios.get("http://localhost:8081/api/auth");
          this.users = response.data;
        } catch (error) {
          console.error("error fetching..", error);
          throw error;
        }
      },

      async addUser(userData) {
        try {
          const response = await axios.post("http://localhost:8081/api/auth", userData);
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
