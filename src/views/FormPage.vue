<template>
  <div class="form-page">
    <h1>用戶註冊</h1>

    <DynamicForm
      title="註冊表單"
      :form-fields="userFormFields"
      submit-button-text="註冊"
      @submit="handleFormSubmit"
      @validation-error="handleValidationError"
      :initial-data="somePeople"
    />

    <div v-if="submitSuccess" class="success-message">
      表單提交成功！使用者資料：{{ JSON.stringify(submittedData) }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DynamicForm from '@/components/DynamicForm.vue';

// const somePeople = {
//   username: '張三',
//   email: 'zhang@example.com',
//   age: 18,
//   role: 'user',
// };


// 表單字段配置
const userFormFields = [
  {
    id: 'username',
    label: '用戶名',
    type: 'text',
    placeholder: '請輸入用戶名',
    required: true,
  },
  {
    id: 'email',
    label: '電子郵件',
    type: 'text',
    placeholder: '請輸入電子郵件',
    required: true,
  },
  {
    id: 'age',
    label: '年齡',
    type: 'number',
    min: 18,
    max: 120,
    required: true,
  },
  {
    id: 'role',
    label: '角色',
    type: 'select',
    options: [
      { value: 'user', label: '用戶' },
      { value: 'admin', label: '管理員' },
      { value: 'editor', label: '編輯' },
    ],
    required: true,
  },
  {
    id: 'newsletter',
    label: '訂閱電子報',
    type: 'checkbox',
    defaultValue: false,
  },
];

// 提交狀態和數據
const submitSuccess = ref(false);
const submittedData = ref(null);

// 處理表單提交
const handleFormSubmit = data => {
  console.log('表單提交成功', data);
  submittedData.value = data;
  submitSuccess.value = true;

  // 在實際應用中，你可能會將數據發送到後端
  // axios.post('/api/register', data)
};

// 處理驗證錯誤
const handleValidationError = errors => {
  console.log('表單驗證失敗', errors);
  submitSuccess.value = false;
};
</script>

<style scoped>
.form-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.success-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #e8f5e9;
  border-radius: 4px;
  color: #2e7d32;
}
</style>
