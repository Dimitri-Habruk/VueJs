<template>
  <div>
    <div class="header">
      <h1>Welcome {{ userData && userData.name }}</h1>
      <button @click="logout" class="logout-button">Logout</button>
    </div>

    <div class="documents-container">
      <div v-if="isLoading">Loading...</div>

      <div v-for="item in data['hydra:member']" :key="item['@id']" class="document">
        <div class="empty-row"></div>
        <h1 class="document-title">{{ item.name }}</h1>
        <div class="empty-row"></div>

        <div v-if="item.notes" class="document-body">
          <div v-html="item.notes"></div>
        </div>
        <p>The document owner is - {{ item.owner }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from '../axiosConfigWithJWT/axios.js'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const data = ref([])
    const isLoading = ref(true)
    const router = useRouter()
    const userData = ref([])

    const fetchDocuments = () => {
      axios
        .get('https://api-uat.researchpool.com/documents')
        .then((response) => {
          data.value = response.data
          isLoading.value = false
          console.log(data.value)
        })
        .catch((error) => {
          console.error('The error is: ', error)
          isLoading.value = false
        })
    }

    const fetchUser = () => {
      axios
        .get('https://api-uat.researchpool.com/users/8agP4nxN4r')
        .then((response) => {
          userData.value = response.data
          isLoading.value = false
          console.log(userData.value)
        })
        .catch((error) => {
          console.error('The error is: ', error)
          isLoading.value = false
        })
    }

    const logout = () => {
      localStorage.removeItem('jwtToken')
      router.push('/')
    }

    onMounted(() => {
      fetchDocuments()
      fetchUser()
    })

    return {
      data,
      isLoading,
      logout
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin: 2% 10%;
}

.logout-button {
  width: 10vw;
  height: 5vh;
}
.documents-container {
  width: 90%;
  margin: 2% auto;
  padding: 0;
}

.document-title {
  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
  font-family: 'Raleway', sans-serif;
  text-align: left;
}

.document-body {
  font-size: 11px;
  font-family: 'Lato', sans-serif;
}

.document {
  padding: 1%;
  margin: 1%;
  background-color: rgba(120, 120, 120, 0.4);
  border-radius: 10px;
}

.empty-row {
  height: 11px;
  margin: 0;
  padding: 0;
}
</style>
