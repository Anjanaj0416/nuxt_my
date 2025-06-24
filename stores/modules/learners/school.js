import { defineStore } from 'pinia'

export const useSchoolsStore = defineStore('schools', () => {
  const schools = ref([
    {
      id: 1,
      name: 'Elite Driving Academy',
      rating: 4.8,
      reviewCount: 156,
      price: 45,
      location: 'Downtown',
      distance: '2.5 km',
      image: 'https://images.pexels.com/photos/3354648/pexels-photo-3354648.jpeg?auto=compress&cs=tinysrgb&w=400',
      services: ['Manual', 'Automatic', 'Intensive Courses'],
      description: 'Professional driving instruction with experienced instructors and modern vehicles.',
      instructor: 'Sarah Johnson',
      phone: '+1 (555) 123-4567',
      email: 'info@elitedriving.com',
      address: '123 Main Street, Downtown',
      features: ['Dual Controls', 'Modern Fleet', 'Flexible Scheduling', 'Theory Support'],
      reviews: [
        {
          id: 1,
          name: 'John Doe',
          rating: 5,
          comment: 'Excellent instructor, passed first time!',
          date: '2024-01-15'
        },
        {
          id: 2,
          name: 'Jane Smith',
          rating: 4,
          comment: 'Very professional and patient. Highly recommended.',
          date: '2024-01-20'
        }
      ]
    },
    {
      id: 2,
      name: 'Safe Drive School',
      rating: 4.6,
      reviewCount: 89,
      price: 38,
      location: 'Westside',
      distance: '4.2 km',
      image: 'https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=400',
      services: ['Manual', 'Automatic', 'Refresher Courses'],
      description: 'Affordable driving lessons with qualified instructors and high pass rates.',
      instructor: 'Mike Wilson',
      phone: '+1 (555) 987-6543',
      email: 'contact@safedriving.com',
      address: '456 Oak Avenue, Westside',
      features: ['Affordable Rates', 'Patient Instructors', 'Flexible Hours', 'Mock Tests'],
      reviews: [
        {
          id: 1,
          name: 'Emily Davis',
          rating: 5,
          comment: 'Great value for money, very patient instructor.',
          date: '2024-01-10'
        }
      ]
    },
    {
      id: 3,
      name: 'Quick Pass Driving',
      rating: 4.9,
      reviewCount: 203,
      price: 52,
      location: 'City Center',
      distance: '1.8 km',
      image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400',
      services: ['Manual', 'Automatic', 'Intensive Courses', 'Pass Plus'],
      description: 'Premium driving school with the highest pass rates in the city.',
      instructor: 'David Brown',
      phone: '+1 (555) 456-7890',
      email: 'hello@quickpass.com',
      address: '789 Central Plaza, City Center',
      features: ['High Pass Rate', 'Premium Vehicles', 'Expert Instructors', 'Online Theory'],
      reviews: [
        {
          id: 1,
          name: 'Alex Thompson',
          rating: 5,
          comment: 'Passed on first attempt! Excellent teaching methods.',
          date: '2024-01-25'
        },
        {
          id: 2,
          name: 'Lisa Chen',
          rating: 5,
          comment: 'Professional service, modern cars, highly recommend.',
          date: '2024-01-22'
        }
      ]
    }
  ])

  const searchQuery = ref('')
  const selectedLocation = ref('')
  const priceRange = ref([0, 100])

  const filteredSchools = computed(() => {
    return schools.value.filter(school => {
      const matchesSearch = school.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          school.location.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesLocation = !selectedLocation.value || school.location === selectedLocation.value
      const matchesPrice = school.price >= priceRange.value[0] && school.price <= priceRange.value[1]
      
      return matchesSearch && matchesLocation && matchesPrice
    })
  })

  const getSchoolById = (id) => {
    return schools.value.find(school => school.id === parseInt(id))
  }

  return {
    schools: readonly(schools),
    searchQuery,
    selectedLocation,
    priceRange,
    filteredSchools,
    getSchoolById
  }
})