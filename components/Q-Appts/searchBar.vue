<template>
    <div class="px-0 py-0 flex flex-col gap-0 items-center bg-blue-50">
        <input
      v-model="store.searchTerm"
      type="text"
      placeholder="Search by salon name.........."
      class="w-full max-w-6xl p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring- focus:ring-blue-500"
    />
    </div>
</template>
<script setup>
    /* const searchTerm = ref('');

    defineProps({
        modelValue: {
        type: String,
        default: ''
        }
    }); */
    import { useSalonStore } from '@/stores/modules/Q-Appts/shops'
    const store = useSalonStore()

</script>
<style scoped>
</style>