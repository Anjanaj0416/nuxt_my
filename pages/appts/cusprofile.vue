<template>
  <section class="flex flex-col items-center justify-start w-full min-h-screen px-4 py-8 bg-gray-50 dark:bg-gray-900">
    <!-- Profile Header -->
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-3xl">
      <div class="flex items-center space-x-6">
        <img
          :src="user.image"
          alt="User Avatar"
          class="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
        />
        <div>
          <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">{{ user.name }}</h2>
          <p class="text-gray-500 dark:text-gray-300">{{ user.email }}</p>
          <p class="text-gray-500 dark:text-gray-300">{{ user.phone }}</p>
        </div>
      </div>

      <!-- Appointment Info -->
      <div class="mt-6">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">Appointments</h3>
        <div
          v-for="appt in user.appointments"
          :key="appt.id"
          class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-3"
        >
          <p class="text-gray-800 dark:text-white font-medium">Salon: {{ appt.salon }}</p>
          <p class="text-gray-600 dark:text-gray-300">Appointment #: {{ appt.appointmentNumber }}</p>
          <p class="text-gray-600 dark:text-gray-300">Date: {{ appt.date }}</p>
        </div>
      </div>

      <!-- More Details -->
      <div class="mt-6">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">More Information</h3>
        <ul class="list-disc ml-5 text-gray-600 dark:text-gray-300">
          <li>Registered on: {{ user.registeredDate }}</li>
          <li>Preferred District: {{ user.preferredDistrict }}</li>
          <li>Preferred City: {{ user.preferredCity }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>

definePageMeta({
  layout: 'false',
});


const user = {
  name: 'Indipa Ayomal',
  email: 'indipa@example.com',
  phone: '+94 77 123 4567',
  image: 'https://i.pravatar.cc/150?img=12',
  registeredDate: '2024-11-20',
  preferredDistrict: 'Colombo',
  preferredCity: 'Nugegoda',
  appointments: [
    {
      id: 1,
      salon: 'Urban Cuts',
      appointmentNumber: 'UC-2025-001',
      date: '2025-07-02',
    },
    {
      id: 2,
      salon: 'Modern Styles',
      appointmentNumber: 'MS-2025-014',
      date: '2025-06-15',
    },
  ],
}
</script>
