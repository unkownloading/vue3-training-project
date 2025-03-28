<template>
    <div class="dynamic-form">
      <h2>{{ title }}</h2>
      <form @submit.prevent="submitForm">
        <div v-for="field in formFields" :key="field.id" class="form-group">
          <label :for="field.id">{{ field.label }}</label>
          
          <!-- 文本輸入框 -->
          <input 
            v-if="field.type === 'text'" 
            :type="field.type" 
            :id="field.id" 
            v-model="formData[field.id]" 
            :placeholder="field.placeholder || ''"
            :required="field.required"
          />
          
          <!-- 數字輸入框 -->
          <input 
            v-else-if="field.type === 'number'" 
            type="number" 
            :id="field.id" 
            v-model.number="formData[field.id]" 
            :min="field.min" 
            :max="field.max"
            :required="field.required"
          />
          
          <!-- 下拉選單 -->
          <select 
            v-else-if="field.type === 'select'" 
            :id="field.id" 
            v-model="formData[field.id]"
            :required="field.required"
          >
            <option value="" disabled>請選擇</option>
            <option 
              v-for="option in field.options" 
              :key="option.value" 
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
          
          <!-- 複選框 -->
          <div v-else-if="field.type === 'checkbox'" class="checkbox-group">
            <input 
              type="checkbox" 
              :id="field.id" 
              v-model="formData[field.id]"
            />
          </div>
          
          <!-- 錯誤提示 -->
          <div class="error-message" v-if="errors[field.id]">
            {{ errors[field.id] }}
          </div>
        </div>
        
        <button type="submit" :disabled="isSubmitting">{{ submitButtonText }}</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed, watch } from 'vue'
  
  // 定義 props
  const props = defineProps({
    title: {
      type: String,
      default: '表單'
    },
    formFields: {
      type: Array,
      required: true
    },
    submitButtonText: {
      type: String,
      default: '提交'
    },
    initialData: {
      type: Object,
      default: () => ({})
    }
  })
  
  // 定義 emits
  const emit = defineEmits(['submit', 'validation-error'])
  
  // 表單數據
  const formData = reactive({...props.initialData})
  
  // 表單驗證錯誤
  const errors = reactive({})
  
  // 提交狀態
  const isSubmitting = ref(false)
  
  // 驗證表單
  const validateForm = () => {
    let isValid = true
    Object.keys(errors).forEach(key => {
      errors[key] = null
    })
    
    props.formFields.forEach(field => {
      // 檢查必填字段
      if (field.required && !formData[field.id]) {
        errors[field.id] = `${field.label}是必填的`
        isValid = false
      }
      
      // 檢查數字範圍
      if (field.type === 'number' && formData[field.id]) {
        if (field.min !== undefined && formData[field.id] < field.min) {
          errors[field.id] = `${field.label}不能小於${field.min}`
          isValid = false
        }
        if (field.max !== undefined && formData[field.id] > field.max) {
          errors[field.id] = `${field.label}不能大於${field.max}`
          isValid = false
        }
      }
      
      // 可以加入更多的驗證規則...
    })
    
    return isValid
  }
  
  // 提交表單
  const submitForm = async () => {
    if (!validateForm()) {
      emit('validation-error', errors)
      return
    }
    
    isSubmitting.value = true
    
    try {
      // 這裡可以添加實際的提交邏輯
      await new Promise(resolve => setTimeout(resolve, 1000)) // 模擬請求延遲
      
      // 提交成功
      emit('submit', {...formData})
      
      // 可以在這裡重置表單
      // Object.keys(formData).forEach(key => {
      //   formData[key] = ''
      // })
    } catch (error) {
      console.error('表單提交錯誤', error)
    } finally {
      isSubmitting.value = false
    }
  }
  
  // 初始化表單字段
  watch(
    () => props.formFields,
    (newFields) => {
      newFields.forEach(field => {
        if (!(field.id in formData)) {
          formData[field.id] = field.defaultValue || ''
        }
      })
    },
    { immediate: true }
  )
  </script>

<style scoped>
.dynamic-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input[type="text"],
input[type="number"],
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 4px;
}
</style>