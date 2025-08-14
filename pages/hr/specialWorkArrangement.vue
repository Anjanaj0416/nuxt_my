<template>
    <section>
        <div>
            <special_work_arrangement />
        </div>
    </section>
</template>

<script>
import special_work_arrangement from '~/components/hr/special_work_arrangement'

definePageMeta({
    layout: 'default',
    middleware: 'auth',
});

export default {
    layout: 'default',
    middleware: 'auth',
    components: {
        special_work_arrangement
    }
}

</script>