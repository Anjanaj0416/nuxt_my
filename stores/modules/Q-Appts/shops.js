import salon1 from '@/assets/img/Q-Appts/salon1.jpg'
import salon2 from '@/assets/img/Q-Appts/salon2.jpg'
import salon3 from '@/assets/img/Q-Appts/salon3.jpg'

import { defineStore } from 'pinia';

export const useSalonStore = defineStore('salon', {
state: () => ({
salons : [
  {
    id: 1,
    address: '123 Main St, Springfield',
    contact: '555-1234',
    openingHours: '9 AM - 9 PM',
    ongoingNumber: 5,
    gender: 'unisex',
    avgtime: '15 min',
    name: 'Glamour Studio',
    distance: '1.2 KM',
    rating: 4.8,
    wait: '9 min',
    image: 'https://www.vintageshopper.com/cdn/shop/files/old-west-saloon-wall-sign-3_1800x1800.png?v=1728098073'
  },
  {
    id: 2,
    address: '123 Main St, Springfield',
    contact: '555-1234',
    openingHours: '9 AM - 9 PM',
    ongoingNumber: 5,
    avgtime: '15 min',
    gender: 'male',
    name: 'Style Hub',
    distance: '1.2 KM',
    rating: 4.8,
    wait: '9 min',
    image: salon1,
  },
  {
    id: 3,
    address: '123 Main St, Springfield',
    contact: '555-1234',
    openingHours: '9 AM - 9 PM',
    ongoingNumber: 5,
    avgtime: '15 min',
    gender: 'female',
    name: 'Beauty Bar',
    distance: '1.2 KM',
    rating: 4.8,
    wait: '9 min',
    image: salon2,
  },
  {
    id: 4,
    address: '123 Main St, Springfield',
    contact: '555-1234',
    openingHours: '9 AM - 9 PM',
    ongoingNumber: 5,
    avgtime: '15 min',
    gender: 'unisex',
    name: 'Glamour Studio',
    distance: '1.2 KM',
    rating: 4.8,
    wait: '9 min',
    image: salon3,
  },
  {
    id: 5,
    address: '123 Main St, Springfield',
    contact: '555-1234',
    openingHours: '9 AM - 9 PM',
    ongoingNumber: 5,
    avgtime: '15 min',
    gender: 'unisex',
    name: 'Glamour Studio',
    distance: '1.2 KM',
    rating: 4.8,
    wait: '9 min',
    image: salon2,
  },
]
}),

actions: {
    addSalon(newSalon) {
      // Assign an ID automatically
      newSalon.id = this.salons.length ? this.salons[this.salons.length - 1].id + 1 : 1;
      this.salons.push(newSalon);
    },
    removeSalon(id) {
      this.salons = this.salons.filter((salon) => salon.id !== id);
    },
    updateSalon(updatedSalon) {
      const index = this.salons.findIndex(salon => salon.id === updatedSalon.id);
      if (index !== -1) {
        this.salons[index] = { ...this.salons[index], ...updatedSalon };
      }
    },
  },
});