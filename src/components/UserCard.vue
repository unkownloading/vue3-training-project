<template>
    <div class="user-card">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
      <p>{{ formatDate(user.joinDate) }}</p>
      
      <button @click="incrementCount">點擊次數: {{ count }}</button>
      
      <div v-if="isLoading">載入中...</div>
      <div v-else-if="error">發生錯誤: {{ error }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed, onMounted, watch } from 'vue'
  
  // 響應式變數
  const count = ref(0)
  const isLoading = ref(false)
  const error = ref(null)
  
  // 響應式物件
  const user = reactive({
    name: '張小明',
    email: 'xiaoming@example.com',
    joinDate: new Date('2023-05-15')
  })
  
  // 計算屬性
  const userDisplayName = computed(() => {
    return `${user.name} (${user.email})`
  })
  
  // 方法
  const incrementCount = () => {
    count.value++
    console.log(`點擊次數: ${count.value}`)
  }
  
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('zh-TW').format(date)
  }
  
  // 生命週期鉤子
  onMounted(() => {
    console.log('元件已掛載')
    fetchUserData()
  })
  
  // 監聽屬性變化
  watch(count, (newValue, oldValue) => {
    console.log(`count從 ${oldValue} 變更為 ${newValue}`)
  })
  
  // 非同步獲取資料
  const fetchUserData = async () => {
    try {
      isLoading.value = true
      
      // 假設這是從後端 API 獲取資料
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 更新響應式資料
      user.name = '王大明'
      user.email = 'daming@example.com'
      
      isLoading.value = false
    } catch (err) {
      error.value = err.message
      isLoading.value = false
    }
  }
  </script>
  
  <style scoped>
  .user-card {
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 16px;
    max-width: 400px;
    margin: 0 auto;
  }
  
  button {
    margin-top: 16px;
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>