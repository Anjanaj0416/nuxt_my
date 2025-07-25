<template>
    <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-60">
        <div class="text-2xl uppercase">Employee Attendance Correction</div>
        <attendanceCorrection />
    </section>
</template>


<script>

import attendanceCorrection from '~/components/hr/attendanceCorrection'

definePageMeta({
    layout: 'default',
    middleware: 'auth',
});

export default {
    components: {
        attendanceCorrection
    },
}

</script>