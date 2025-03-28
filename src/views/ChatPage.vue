<template>
  <!-- <MessageBox /> -->
  <div class="chat-page">
    <h1>聊天頁面</h1>
    <!-- 使用子組件並傳遞 props -->
    <MessageBox
      title="歡迎訊息"
      content="歡迎使用我們的聊天應用"
      button-text="了解更多"
      :is-important="true"
      @confirm="handleConfirm"
      @read-message="markAsRead"
    />
    <!-- 再次使用子組件但傳遞不同的 props -->
    <MessageBox
      title="系統通知"
      content="系統將於下週進行維護，請提前完成重要工作。"
      @confirm="handleConfirm"
    />

    <div v-if="confirmationStatus" class="status-message">
      用戶確認了訊息 ID: {{ lastConfirmation.messageId }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MessageBox from '@/components/MessageBox.vue';

// 用於儲存確認狀態的反應式變數
const confirmationStatus = ref(false);
const lastConfirmation = ref(null);

// 處理子組件發出的確認事件
function handleConfirm(data) {
  console.log('接收到確認事件:', data);
  confirmationStatus.value = true;
  lastConfirmation.value = data;

  // 3秒後重置確認狀態
  setTimeout(() => {
    confirmationStatus.value = false;
  }, 3000);
}

// 處理訊息已讀事件
function markAsRead() {
    console.log('訊息已被用戶閱讀')
    // 可以在這裡執行其他邏輯，如更新數據庫等
}
</script>

<style scoped>
.chat-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.status-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #e8f5e9;
  border-radius: 4px;
  color: #2e7d32;
}
</style>