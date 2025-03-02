<!-- usage
 


-->

<template>
    <button 
        @click="onClick"
        :type="type"
        :class="[
            'inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium transition-all duration-300',
            'rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2',
            buttonStyles
        ]"
    >
        <slot name="iconLeft"></slot>
        <span class="mx-2">{{ label }}</span>
        <slot name="iconRight"></slot>
    </button>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'button'
        },
        variant: {
            type: String,
            default: 'primary', // primary, secondary, danger
        }
    },
    computed: {
        buttonStyles() {
            switch (this.variant) {
                case 'primary':
                    return 'px-4 py-2 font-semibold transition duration-300 ease-in-out border-2 rounded-lg text-btn border-btn hover:bg-blue-900 hover:text-white focus:ring-2 focus:ring-blue-600 focus:outline-none';
                case 'secondary':
                    return 'px-4 py-2 font-semibold transition duration-300 ease-in-out border-2 rounded-lg text-btn border-btn hover:bg-blue-900 hover:text-white focus:ring-2 focus:ring-green-600 focus:outline-none';
                case 'danger':
                    return 'px-4 py-2 font-semibold transition duration-300 ease-in-out border-2 rounded-lg text-btn border-btn hover:bg-blue-900 hover:text-white focus:ring-2 focus:ring-red-600 focus:outline-none';
                default:
                    return 'px-4 py-2 font-semibold transition duration-300 ease-in-out border-2 rounded-lg text-btn border-btn hover:bg-blue-900 hover:text-white focus:ring-2 focus:ring-gray-600 focus:outline-none';
            }
        }
    },
    methods: {
        onClick() {
            this.$emit('onClick')
        }
    }
}
</script>

<style scoped>
/* All styles managed via Tailwind CSS */
</style>
