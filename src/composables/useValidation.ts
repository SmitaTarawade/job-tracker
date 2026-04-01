interface FormData {
  role?: string;
  company?: string;
}

interface Errors {
  [key: string]: string;
}

import {ref} from 'vue'
export function useValidation(formData: FormData) {
    const errors = ref<{ [key: string]: string }>({})
  if (!formData.role) {
    errors.value.role = "Job Role is required"
  }

  if (!formData.company) {
    errors.value.company = "Company name is required"
  } 

  return errors
}