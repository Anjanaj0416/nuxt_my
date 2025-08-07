import salon1 from '@/assets/img/Q-Appts/salon1.jpg'
import salon2 from '@/assets/img/Q-Appts/salon2.jpg'
import salon3 from '@/assets/img/Q-Appts/salon3.jpg'

import { defineStore } from 'pinia';

export const useSalonStore = defineStore('salon', {
state: () => ({
salons : [
  {
    id: 1,
    name: 'Glamour Studio',
    distance: '1.2 KM',
    rating: 4.8,
    wait: '9 min',
    image: 'https://www.vintageshopper.com/cdn/shop/files/old-west-saloon-wall-sign-3_1800x1800.png?v=1728098073'
  },
  {
    id: 2,
    name: 'Style Hub',
    distance: '1.2 KM',
    rating: 4.8,
    wait: '9 min',
    image: salon1,
  },
  {
    id: 3,
    name: 'Beauty Bar',
    distance: '1.2 KM',
    rating: 4.8,
    wait: '9 min',
    image: salon2,
  },
  {
    id: 4,
    name: 'Glamour Studio',
    distance: '1.2 KM',
    rating: 4.8,
    wait: '9 min',
    image: salon3,
  },
  {
    id: 5,
    name: 'Glamour Studio',
    distance: '1.2 KM',
    rating: 4.8,
    wait: '9 min',
    image: salon2,
  }
]
})
});