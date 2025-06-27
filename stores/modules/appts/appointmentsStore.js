// stores/appointmentsStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppointmentsStore = defineStore('appointments', () => {
  const appointments = ref([
    {
      id: 1,
      name: 'Urban Cuts',
      city: 'Homagama',
      district: 'Colombo',
      rating: 4.8,
      services: ['Haircut', 'Beard Trim'],
      phone: '+94 71 123 4567',
      bookings: 6,
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg'
    },
    {
      id: 2,
      name: 'Royal Salon',
      city: 'Peradeniya',
      district: 'Kandy',
      rating: 4.6,
      services: ['Facial', 'Hair Spa'],
      phone: '+94 71 123 4567',
      bookings: 7,
      image: 'https://images.pexels.com/photos/3993446/pexels-photo-3993446.jpeg'
    },
    {
      id: 3,
      name: "Gentleman's Choice",
      city: 'Negombo',
      district: 'Gampaha',
      rating: 4.7,
      services: ['Shave', 'Hair Color'],
      phone: '+94 71 123 4567',
      bookings: 3,
      image: 'https://images.pexels.com/photos/3993447/pexels-photo-3993447.jpeg'
    },
    {
      id: 4,
      name: 'Modern Styles',
      city: 'Weligama',
      district: 'Matara',
      rating: 4.5,
      services: ['Haircut', 'Shave'],
      phone: '+94 71 123 4567',
      bookings: 2,
      image: 'https://images.pexels.com/photos/3993460/pexels-photo-3993460.jpeg'
    },
    {
      id: 5,
      name: 'Classic Look',
      city: 'Nallur',
      district: 'Jaffna',
      rating: 4.9,
      services: ['Haircut', 'Facial'],
      phone: '+94 71 123 4567',
      bookings: 8,
      image: 'https://images.pexels.com/photos/3993456/pexels-photo-3993456.jpeg'
    },
    {
      id: 6,
      name: 'Trendy Touch',
      city: 'Unawatuna',
      district: 'Galle',
      rating: 4.3,
      services: ['Beard Trim', 'Hair Spa'],
      phone: '+94 71 123 4567',
      bookings: 6,
      image: 'https://images.pexels.com/photos/3993461/pexels-photo-3993461.jpeg'
    },
  ])

  return {
    appointments
  }
})
