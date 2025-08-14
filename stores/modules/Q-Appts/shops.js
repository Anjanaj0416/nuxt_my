
import { defineStore } from 'pinia';

const districtsCities = {
  Colombo: ['Colombo', 'Dehiwala', 'Nugegoda', 'Mount Lavinia'],
  Gampaha: ['Negombo', 'Wattala', 'Katunayake'],
  Kalutara: ['Kalutara', 'Panadura', 'Beruwala'],
  Kandy: ['Kandy', 'Nawalapitiya', 'Gampola'],
  Matale: ['Matale', 'Dambulla', 'Ukuwela'],
  NuwaraEliya: ['Nuwara Eliya', 'Hatton', 'Talawakelle'],
  Galle: ['Galle', 'Hikkaduwa', 'Unawatuna'],
  Matara: ['Matara', 'Weligama', 'Dickwella'],
  Hambantota: ['Hambantota', 'Tangalle', 'Tissamaharama'],
  // add others if needed
}

export const useSalonStore = defineStore('salon', {
state: () => ({
salons : [
  {
    id: 1,
    address: '123 Main St, Springfield',
    district: 'Colombo',
    city: 'Colombo',
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
    district: 'Colombo',
    city: 'Colombo',
    contact: '555-1234',
    openingHours: '9 AM - 9 PM',
    ongoingNumber: 5,
    avgtime: '15 min',
    gender: 'male',
    name: 'Style Hub',
    distance: '1.2 KM',
    rating: 4.8,
    wait: '9 min',
    image: 'https://media.istockphoto.com/id/872361244/photo/man-getting-his-beard-trimmed-with-electric-razor.jpg?s=612x612&w=0&k=20&c=_IjZcrY0Gp-2z6AWTQederZCA9BLdl-iqWkH0hGMTgg=',
  },
  {
    id: 3,
    address: '123 Main St, Springfield',
    district: 'Colombo',
    city: 'Colombo',
    contact: '555-1234',
    openingHours: '9 AM - 9 PM',
    ongoingNumber: 5,
    avgtime: '15 min',
    gender: 'female',
    name: 'Beauty Bar',
    distance: '1.2 KM',
    rating: 4.8,
    wait: '9 min',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnjLPDi52kkS8B18Th2kPnvge1PKz3jMAqQA&s',
  },
  {
    id: 4,
    address: '123 Main St, Springfield',
    district: 'Colombo',
    city: 'Colombo',
    contact: '555-1234',
    openingHours: '9 AM - 9 PM',
    ongoingNumber: 5,
    avgtime: '15 min',
    gender: 'unisex',
    name: 'Glamour Studio',
    distance: '1.2 KM',
    rating: 4.8,
    wait: '9 min',
    image: 'https://media.istockphoto.com/id/134052142/photo/hair-salon-situation.jpg?s=612x612&w=0&k=20&c=HM4Tl3ATijpIS1Rv097UHwmZ3OfmqGXkniNLuTCqB0A=',
  },
  {
    id: 5,
    address: '123 Main St, Springfield',
    district: 'Colombo',
    city: 'Colombo',
    contact: '555-1234',
    openingHours: '9 AM - 9 PM',
    ongoingNumber: 5,
    avgtime: '15 min',
    gender: 'unisex',
    name: 'Glamour Studio',
    distance: '1.2 KM',
    rating: 4.8,
    wait: '9 min',
    image: 'https://plus.unsplash.com/premium_photo-1669675936121-6d3d42244ab5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2Fsb258ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 6,
    address: '123 Main St, Springfield',
    district: 'Colombo',
    city: 'Colombo',
    contact: '555-1234',
    openingHours: '9 AM - 9 PM',
    ongoingNumber: 5,
    gender: 'unisex',
    avgtime: '15 min',
    name: 'Glamour Studio',
    distance: '1.2 KM',
    rating: 4.8,
    wait: '9 min',
    image: 'https://img.freepik.com/free-psd/beauty-salon-cosmetic-surgery-social-media-template_505751-7339.jpg?semt=ais_hybrid&w=740&q=80'
  },
  {
    id: 7,
    address: '123 Main St, Springfield',
    district: 'Colombo',
    city: 'Colombo',
    contact: '555-1234',
    openingHours: '9 AM - 9 PM',
    ongoingNumber: 5,
    avgtime: '15 min',
    gender: 'male',
    name: 'Style Hub',
    distance: '1.2 KM',
    rating: 4.8,
    wait: '9 min',
    image: 'https://img.freepik.com/premium-photo/professional-male-hairdresser-cutting-hair-woman-beauty-salon-haircut-hair-care_362389-7783.jpg',
  },
  {
    id: 8,
    address: '123 Main St, Springfield',
    district: 'Colombo',
    city: 'Colombo',
    contact: '555-1234',
    openingHours: '9 AM - 9 PM',
    ongoingNumber: 5,
    avgtime: '15 min',
    gender: 'female',
    name: 'Beauty Bar',
    distance: '0.2 KM',
    rating: 4.8,
    wait: '9 min',
    image: 'https://media.istockphoto.com/id/872361244/photo/man-getting-his-beard-trimmed-with-electric-razor.jpg?s=612x612&w=0&k=20&c=_IjZcrY0Gp-2z6AWTQederZCA9BLdl-iqWkH0hGMTgg=',
  },
  {
    id: 9,
    address: '123 Main St, Springfield',
    district: 'Colombo',
    city: 'Colombo',
    contact: '555-1234',
    openingHours: '9 AM - 9 PM',
    ongoingNumber: 5,
    avgtime: '15 min',
    gender: 'unisex',
    name: 'Glamour Studio',
    distance: '1.2 KM',
    rating: 4.8,
    wait: '9 min',
    image: 'https://t4.ftcdn.net/jpg/01/01/75/99/360_F_101759983_umTprjVtO6sJb8fn4lHPMnMi5WXjUoeE.jpg',
  },
  {
    id: 10,
    address: '123 Main St, Springfield',
    district: 'Gampaha',
    city: 'Negombo',
    contact: '555-1234',
    openingHours: '9 AM - 9 PM',
    ongoingNumber: 5,
    avgtime: '15 min',
    gender: 'unisex',
    name: 'Glamour Studio',
    distance: '1.2 KM',
    rating: 4.8,
    wait: '120 min',
    image: 'https://media.gettyimages.com/id/1187559464/photo/beautiful-woman-with-voluminous-curly-hairstyle.jpg?s=612x612&w=gi&k=20&c=VEvRW70aISqMhEDE3F-SCtBZdTGXUnRxyXGyi-z9QBk=',
  },
],



  total: 0,
  searchTerm: '',
  selectedFilter: 'All',
  selectedDistance: '',  // e.g. 'Nearby (< 1KM)'
  selectedAvailability: '', // e.g. 'Available in 30 min'
  selectedGenders: [],
  selectedDistrict: "", // <-- make sure this starts empty
  selectedCity: "",
  loading: false,
  lat: null,
  lng: null
}),

getters: {
    filteredSalons: (state) => {
      let result = state.salons;

      // Filter by search term
      if (state.searchTerm) {
        const term = state.searchTerm.toLowerCase();
        result = result.filter(salon => salon.name.toLowerCase().includes(term));
      }

      // Filter by distance
    if(state.selectedDistance) {
      switch(state.selectedDistance) {
        case 'Nearby (< 1KM)':
          result = result.filter(s => parseFloat(s.distance) < 1);
          break;
        case 'Nearby (< 5KM)':
          result = result.filter(s => parseFloat(s.distance) < 5);
          break;
        case 'Farther (> 5KM)':
          result = result.filter(s => parseFloat(s.distance) > 5);
          break;
      }
    }

    // Filter by availability (wait)
    if(state.selectedAvailability) {
      switch(state.selectedAvailability) {
        case 'Available in 30 min':
          result = result.filter(s => parseFloat(s.wait) <= 30);
          break;
        case 'Available in 1 hour':
          result = result.filter(s => parseFloat(s.wait) <= 60);
          break;
        case 'Available more than 1 hour':
          result = result.filter(s => parseFloat(s.wait) > 60);
          break;
      }
    }

     if (state.selectedDistrict) {
        result = result.filter(salon => {
          // Assuming your salon address or another field includes district info
          // For this example, let's assume salon.address or salon.district property
          // You can add district info in salons data for testing
          return salon.district === state.selectedDistrict;
        });
      }

      if (state.selectedCity) {
        result = result.filter(salon => {
          // Assume salon.city property added to salons for this filter
          return salon.city === state.selectedCity;
        });
      }


    // Filter by gender (multiple can be selected)
    if(state.selectedGenders.length > 0) {
      result = result.filter(s => state.selectedGenders.includes(s.gender.toLowerCase()));
    }

      return result;
    }
    
  },


actions: {
    /* resetFilters() {
      this.selectedDistrict = ''
      this.selectedCity = ''
      this.searchTerm = ''
      this.localSearchTerm = ''
    }, */

    setSelectedDistrict(district) {
      this.selectedDistrict = district;
      this.selectedCity = ''; // reset city when district changes
    },

    setSelectedCity(city) {
      this.selectedCity = city;
    },
    setSearchTerm(term) {
      this.searchTerm = term;
    },
    /* setSelectedFilter(filter) {
      this.selectedFilter = filter;
    }, */
    setSelectedDistance(distance) {
      this.selectedDistance = distance;
    },
    setSelectedAvailability(availability) {
      this.selectedAvailability = availability;
    },
    setSelectedGenders(genders) {
    this.selectedGenders = genders;
    },
    toggleGender(gender) {
      const index = this.selectedGenders.indexOf(gender.toLowerCase());
        if(index === -1) {
          this.selectedGenders.push(gender.toLowerCase());
        } else {
          this.selectedGenders.splice(index, 1);
        }
    },
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

    // fetch nearby shops when page loading
    async fetchNearbyShops(lat, lng, reset = false) {
      try {
        this.loading = true
        if (reset) {
          this.page = 0
          this.salons = []
        }

        const { data } = await axios.get('/api/shops/nearby', {
          params: {
            lat,
            lng,
            //limit: this.limit,
            //offset: this.page * this.limit
          }
        })

        this.total = data.total
        this.salons = reset ? data.shops : [...this.salons, ...data.shops]
        this.page++
      } catch (error) {
        console.error('Error fetching shops', error)
      } finally {
        this.loading = false
      }
    } 

  },
});