<template>
  <div>
    <q-btn
      color="primary"
      label="Add User"
      @click="visible = true"
    />

    <q-dialog v-model="visible" persistent>
      <q-card class="form-card">
        <q-card-section>
          <div class="text-h6">Add User</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="submitForm">
            <q-input standout="bg-teal text-white" v-model="user.name" label="Name" class="q-mb-md" />
            <q-input standout="bg-teal text-white" v-model="user.email" label="Email" type="email" class="q-mb-md" />
            <q-input standout="bg-teal text-white" v-model="user.password" label="Password" type="password" class="q-mb-md" />
            <q-select standout="bg-teal text-white" v-model="user.role" :options="options" label="Role" />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="close" />
          <q-btn flat label="Submit" color="primary" @click="submitForm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { useUserStore } from '../stores/api/UserStore.js';

export default {

  data() {
    return {
      visible: false,
      user: {
        name: '',
        email: '',
        password: '',
        role: '',
      },
      options: ['USER', 'ADMIN', 'SUPER_ADMIN']
    };
  },

  methods: {
    async submitForm() {
      const userStore = useUserStore();
      try {
        await userStore.addUser(this.user);
        this.close();
      } catch (error) {
        console.error(error);
      }
    },

    close() {
      this.visible = false;
      this.resetForm();
    },

    resetForm() {
      this.user.name = '';
      this.user.email = '';
      this.user.password = '';
      this.user.role = '';
    },

    addUser() {
      console.log("User added:");
      this.close();
    }
  }
};
</script>

<style scoped>
.form-card {
  width: 400px;
  max-width: 60%;
  border-radius: 5%
}

.q-mb-md {
  margin-bottom: 16px;
}
</style>
