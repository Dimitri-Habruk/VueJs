<template>
  <div class="login-container">
    <form @submit.prevent="login">
      <h1>Please use your email and password</h1>
      <div>
        <label for="email">Email </label>
        <br />
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password </label>
        <br />
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
}
h1 {
  font-size: 16px;
}
button {
  margin: 2% auto;
}
</style>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = () => {
  const loginData = {
    username: email.value,
    password: password.value
  }

  axios
    .post('https://api-uat.researchpool.com/login', loginData)
    .then((response) => {
      localStorage.setItem('jwtToken', response.data.token)
      router.push('/dashboard')
    })
    .catch((error) => {
      console.error('Ошибка входа:', error)
    })
}
</script>
