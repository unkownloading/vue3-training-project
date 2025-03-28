<template>
  <div class="message-box" :class="{ important: isImportant }">
    <h3>{{ title }}</h3>
    <p>{{ content }}</p>
    <div class="actions">
      <button @click="handleClick">{{ buttonText }}</button>
    </div>
  </div>
</template>

<script setup>
// 在子組件定義props
const props = defineProps({
  title: {
    type: String,
    default: '預設標題',
    require: true,
  },
  content: {
    type: String,
    default: '預設內容',
    require: true,
  },
  buttonText: {
    type: String,
    default: '確認',
  },
  isImportant: {
    type: Boolean,
    default: false,
  },
});

// 定義可以發出的事件
const emit = defineEmits(['confirm', 'readMessage']);

// 處理按鈕點擊事件
function handleClick() {
  // 向父組件發送確認事件，並傳送數據。
  emit('confirm', {
    messageId: Date.now(),
    confirmed: true,
  });

  // 也可以發送其它事件
  emit('readMessage');
}
</script>

<style scoped>
.message-box {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #f9f9f9;
}

.important {
  border-color: #ff4500;
  background-color: #fff8f6;
}

.actions {
  margin-top: 16px;
}

button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
