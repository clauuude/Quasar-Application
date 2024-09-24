<template>
  <q-page class="flex flex-center q-pa-md">
    <div class="button-container">
      <AddUser />
    </div>
    <div class="card-container">
      <div class="card" v-for="user in store.allUsers" :key="user.id">
        <div class="card-title">Name: {{ user.name }}</div>
        <div class="card-content">Email: {{ user.email }}</div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useUserStore } from '../stores/api/UserStore.js';
import AddUser from '../components/AddUser.vue';

const store = useUserStore();

onMounted(async () => {
  await store.getAllUsers();
});

defineOptions({
  name: 'IndexPage',
  components: {
    AddUser
  }
});

</script>

<style scoped>
.button-container {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  margin-top: 20px;
}

.card {
  flex: 1 1 calc(33.33% - 16px);
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  border-radius: 12px;
}

.card-title {
  font-weight: bold;
  margin-bottom: 8px;
}

.card-content {
  text-align: center;
}
</style>
