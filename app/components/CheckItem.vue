<template>
  <label class="check-item">
    <input
      type="checkbox"
      :checked="modelValue === 1"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked ? 1 : 0)"
    />
    <span class="check-label">
      {{ label }}
      <span v-if="description" class="check-description">{{ description }}</span>
    </span>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: number
  label: string
  description?: string
}>()
defineEmits<{ 'update:modelValue': [value: number] }>()
</script>

<style scoped>
.check-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
}
.check-item input[type='checkbox'] {
  margin-top: 0.2rem;
  flex-shrink: 0;
  width: 1.1em;
  height: 1.1em;
  cursor: pointer;
}
.check-label {
  display: flex;
  flex-direction: column;
}
.check-description {
  font-size: 0.82em;
  color: #555;
  margin-top: 0.15rem;
}
</style>
