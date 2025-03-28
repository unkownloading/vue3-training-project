<template>
    <div class="users-container">
      <h1>用戶列表</h1>
      
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>載入中...</p>
      </div>
      
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <button @click="fetchUsers">重新嘗試</button>
      </div>
      
      <div v-else>
        <div class="filters">
          <input v-model="searchTerm" placeholder="搜尋用戶..." @input="filterUsers" />
          <select v-model="sortBy" @change="sortUsers">
            <option value="name">按名稱排序</option>
            <option value="email">按郵箱排序</option>
          </select>
        </div>
        
        <ul class="user-list">
          <li v-for="user in filteredUsers" :key="user.id" class="user-item">
            <img :src="user.avatar" :alt="user.name" class="avatar" />
            <div class="user-info">
              <h3>{{ user.name }}</h3>
              <p>{{ user.email }}</p>
            </div>
            <button @click="viewUserDetails(user.id)">查看詳情</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'
  
  // 響應式狀態
  const users = ref([])
  const filteredUsers = ref([])
  const loading = ref(false)
  const error = ref(null)
  const searchTerm = ref('')
  const sortBy = ref('name')
  
  // API 請求函數
  const fetchUsers = async () => {
    loading.value = true
    error.value = null
    
    try {
      // 使用 axios 發送 GET 請求
      const response = await axios.get('https://reqres.in/api/users?per_page=10')
      
      // 從回應中獲取用戶資料
      users.value = response.data.data.map(user => ({
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        avatar: user.avatar
      }))
      
      // 初始化過濾後的用戶列表
      filteredUsers.value = [...users.value]
      
      // 應用排序
      sortUsers()
    } catch (err) {
      console.error('獲取用戶資料時出錯:', err)
      error.value = '無法載入用戶資料。請檢查您的網絡連接並重試。'
    } finally {
      loading.value = false
    }
  }
  
  // 過濾用戶
  const filterUsers = () => {
    if (!searchTerm.value.trim()) {
      filteredUsers.value = [...users.value]
    } else {
      const term = searchTerm.value.toLowerCase()
      filteredUsers.value = users.value.filter(user => 
        user.name.toLowerCase().includes(term) || 
        user.email.toLowerCase().includes(term)
      )
    }
    
    // 保持排序
    sortUsers()
  }
  
  // 排序用戶
  const sortUsers = () => {
    filteredUsers.value.sort((a, b) => {
      if (sortBy.value === 'name') {
        return a.name.localeCompare(b.name)
      } else if (sortBy.value === 'email') {
        return a.email.localeCompare(b.email)
      }
      return 0
    })
  }
  
  // 查看用戶詳情 (將在 props/emit 示例中使用)
  const viewUserDetails = (userId) => {
    console.log(`查看用戶 ID: ${userId} 的詳情`)
    // 在真實應用中，可能會導航到詳情頁面或顯示模
  }
  
 
  onMounted(() => {
    fetchUsers()
  })
  </script>
  
  <style scoped>
  .users-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px 0;
  }
  
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid #3498db;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin-bottom: 10px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .error {
    color: #e74c3c;
    text-align: center;
    margin: 40px 0;
  }
  
  .filters {
    display: flex;
    margin-bottom: 20px;
    gap: 10px;
  }
  
  .filters input, .filters select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .filters input {
    flex-grow: 1;
  }
  
  .user-list {
    list-style: none;
    padding: 0;
  }
  
  .user-item {
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #eee;
  }
  
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }
  
  .user-info {
    flex-grow: 1;
  }
  
  .user-info h3 {
    margin: 0 0 5px 0;
  }
  
  .user-info p {
    margin: 0;
    color: #666;
  }
  
  button {
    padding: 8px 12px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  </style>