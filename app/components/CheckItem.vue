<template>
  <div class="form-check mb-2">
    <input
      type="checkbox"
      class="form-check-input"
      :id="uid"
      :checked="modelValue === 1"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked ? 1 : 0)"
    />
    <label class="form-check-label" :for="uid">
      {{ label }}
      <span v-if="description" class="d-block small text-muted mt-1">{{ description }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
const uid = `chk-${Math.random().toString(36).slice(2)}`

defineProps<{
  modelValue: number
  label: string
  description?: string
}>()
defineEmits<{ 'update:modelValue': [value: number] }>()
</script>
