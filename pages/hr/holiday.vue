<template>
    <section>
        <div>
            <holidaylist />
        </div>
    </section>
</template>

<script>
import holidaylist from '~/components/hr/holidaylist'

definePageMeta({
    layout: 'default',
    middleware: 'auth',
});

export default {
    layout: 'default',
    middleware: 'auth',
    components: {
        holidaylist
    }
}

</script>
