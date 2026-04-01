<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { Job } from "@/types/jobs";
import type { FormData } from "@/types/form";
import { useJobStore } from '@/stores/useJobStore';
import { useValidation } from '@/composables/useValidation';
const emit = defineEmits<{
  (e: 'close'): void
}>()
const touched = ref<{ [key: string]: boolean }>({})

const jobStore = useJobStore()
const formData = ref<FormData>({
  company: '',
  role: '',
  notes: ''
})
const errors = ref<{ [key: string]: string }>({})

const handleCloseForm = () => {
  resetForm();
  emit('close')
}

const handleSubmit = () => {
  touched.value = {
    role: true,
    company: true,
  }

  errors.value = useValidation(formData.value).value
  let validatedForm = Object.keys(errors.value).length === 0
  if (validatedForm) {
    if (jobStore.editJobItem) {
      jobStore.updateJob(formData.value)
    } else {
      const newJob: Job = {
        id: Date.now(),
        company: formData.value.company,
        role: formData.value.role,
        status: 'applied',
        notes: formData.value.notes
      }

      jobStore.addJob(newJob)

    }

    resetForm()

  }
}

const resetForm = () => {
  errors.value = {}
  touched.value = {}
  formData.value = {
    company: '',
    role: '',
    notes: ''
  }

  jobStore.editJobItem = jobStore.editJobItem ? null : jobStore.editJobItem
}

watch(() => jobStore.editJobItem, (newJob) => {
  if (newJob) {
    errors.value = {}
  touched.value = {}
    formData.value = { ...newJob }
  }
}, { immediate: true })

</script>

<template>
  <div class="card p-4 shadow-sm bg-light h-100 position-relative" :class="{ 'focus': jobStore.editJobItem }">
    <i class="bi bi-x position-absolute" @click="handleCloseForm"></i>
    <h5 v-show="!jobStore.editJobItem"> <i class="bi bi-plus-circle me-2"></i> Add Job
    </h5>
    <h5 v-show="jobStore.editJobItem"> <i class="bi bi-pencil-square me-2"></i> Edit Job
    </h5>

    <hr>
    <div v-if="Object.keys(errors).length" class="alert alert-danger p-2 d-flex align-items-center" role="alert">
      <i class="bi bi-exclamation-triangle me-2"></i>
      <span>Please fill in all required fields</span>
    </div>

    <div class="mb-3">
      <label class="form-label required">Company</label>
      <input v-model="formData.company" @blur="touched.company = true" class="form-control" :class="{
        'is-invalid': errors.company && touched.company,
        'is-valid': !errors.company && touched.company
      }" placeholder="e.g. Google" />
    </div>

    <div class="mb-3">
      <label class="form-label required">Role</label>
      <input v-model="formData.role" @blur="touched.role = true" class="form-control" :class="{
        'is-invalid': errors.role && touched.role,
        'is-valid': !errors.role && touched.role
      }" placeholder="e.g. Front-end Developer" />
    </div>

    <div class="mb-3">
      <label class="form-label">Notes</label>
      <textarea v-model="formData.notes" class="form-control" rows="3"
        placeholder="How did this application feel? Any notes?"></textarea>
    </div>

    <div class="d-flex gap-3">
      <button class="btn btn-primary w-100" @click="handleSubmit">
        <i class="bi bi-check-all"></i> {{ jobStore.editJobItem ? 'Update Job' : 'Save Job' }}
      </button>
    </div>


  </div>
</template>

<style>
.required::after {
  content: '*';
  color: red;
  margin-left: 5px;
}

.card.focus {
  border: 2px solid lightblue;
}

hr {
  color: #ced4da;
  ;
}

.card .bi.bi-x {
  top: 15px;
  right: 15px;
  cursor: pointer;
}
</style>