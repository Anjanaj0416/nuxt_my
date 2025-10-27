import { defineStore } from 'pinia';
import axios from 'axios';

export const useApptStore = defineStore('appt', {
  state: () => ({
    initData : {
    listDistrictCities: [
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 1,
                    cityName: "Akkaraipattu"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 2,
                    cityName: "Ambagahawatta"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 3,
                    cityName: "Ampara"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 4,
                    cityName: "Bakmitiyawa"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 5,
                    cityName: "Deegawapiya"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 6,
                    cityName: "Devalahinda"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 7,
                    cityName: "Digamadulla Weeragoda"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 8,
                    cityName: "Dorakumbura"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 9,
                    cityName: "Gonagolla"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 10,
                    cityName: "Hulannuge"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 11,
                    cityName: "Kalmunai"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 12,
                    cityName: "Kannakipuram"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 13,
                    cityName: "Karativu"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 14,
                    cityName: "Kekirihena"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 15,
                    cityName: "Koknahara"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 16,
                    cityName: "Kolamanthalawa"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 17,
                    cityName: "Komari"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 18,
                    cityName: "Lahugala"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 19,
                    cityName: "lmkkamam"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 20,
                    cityName: "Mahaoya"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 21,
                    cityName: "Marathamune"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 22,
                    cityName: "Namaloya"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 23,
                    cityName: "Navithanveli"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 24,
                    cityName: "Nintavur"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 25,
                    cityName: "Oluvil"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 26,
                    cityName: "Padiyatalawa"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 27,
                    cityName: "Pahalalanda"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 28,
                    cityName: "Panama"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 29,
                    cityName: "Pannalagama"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 30,
                    cityName: "Paragahakele"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 31,
                    cityName: "Periyaneelavanai"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 32,
                    cityName: "Polwaga Janapadaya"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 33,
                    cityName: "Pottuvil"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 34,
                    cityName: "Sainthamaruthu"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 35,
                    cityName: "Samanthurai"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 36,
                    cityName: "Serankada"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 37,
                    cityName: "Tempitiya"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 38,
                    cityName: "Thambiluvil"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 39,
                    cityName: "Tirukovil"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 40,
                    cityName: "Uhana"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 41,
                    cityName: "Wadinagala"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 42,
                    cityName: "Wanagamuwa"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 1008,
                    cityName: "test5"
                },
                {
                    districtId: 1,
                    districtName: "Ampara",
                    cityId: 1009,
                    cityName: "test6"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 1010,
                    cityName: "test7"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 1001,
                    cityName: "Test City 1"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 1002,
                    cityName: "test1"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 1006,
                    cityName: "test3"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 84,
                    cityName: "Kalukele Badanagala"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 85,
                    cityName: "Kapugallawa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 86,
                    cityName: "Karagahawewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 87,
                    cityName: "Kashyapapura"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 88,
                    cityName: "Kebithigollewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 89,
                    cityName: "Kekirawa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 90,
                    cityName: "Kendewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 91,
                    cityName: "Kiralogama"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 92,
                    cityName: "Kirigalwewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 93,
                    cityName: "Kirimundalama"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 94,
                    cityName: "Kitulhitiyawa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 95,
                    cityName: "Kurundankulama"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 96,
                    cityName: "Labunoruwa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 97,
                    cityName: "Ihalagama"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 98,
                    cityName: "Ipologama"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 99,
                    cityName: "Madatugama"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 100,
                    cityName: "Maha Elagamuwa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 101,
                    cityName: "Mahabulankulama"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 102,
                    cityName: "Mahailluppallama"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 103,
                    cityName: "Mahakanadarawa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 104,
                    cityName: "Mahapothana"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 105,
                    cityName: "Mahasenpura"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 106,
                    cityName: "Mahawilachchiya"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 107,
                    cityName: "Mailagaswewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 108,
                    cityName: "Malwanagama"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 109,
                    cityName: "Maneruwa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 110,
                    cityName: "Maradankadawala"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 111,
                    cityName: "Maradankalla"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 112,
                    cityName: "Medawachchiya"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 113,
                    cityName: "Megodawewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 114,
                    cityName: "Mihintale"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 115,
                    cityName: "Morakewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 116,
                    cityName: "Mulkiriyawa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 117,
                    cityName: "Muriyakadawala"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 119,
                    cityName: "Nachchaduwa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 120,
                    cityName: "Namalpura"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 121,
                    cityName: "Negampaha"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 122,
                    cityName: "Nochchiyagama"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 123,
                    cityName: "Nuwaragala"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 124,
                    cityName: "Padavi Maithripura"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 125,
                    cityName: "Padavi Parakramapura"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 126,
                    cityName: "Padavi Sripura"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 127,
                    cityName: "Padavi Sritissapura"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 128,
                    cityName: "Padaviya"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 129,
                    cityName: "Padikaramaduwa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 130,
                    cityName: "Pahala Halmillewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 131,
                    cityName: "Pahala Maragahawe"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 132,
                    cityName: "Pahalagama"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 133,
                    cityName: "Palugaswewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 134,
                    cityName: "Pandukabayapura"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 135,
                    cityName: "Pandulagama"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 136,
                    cityName: "Parakumpura"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 137,
                    cityName: "Parangiyawadiya"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 138,
                    cityName: "Parasangahawewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 139,
                    cityName: "Pelatiyawa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 140,
                    cityName: "Pemaduwa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 141,
                    cityName: "Perimiyankulama"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 142,
                    cityName: "Pihimbiyagolewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 143,
                    cityName: "Pubbogama"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 144,
                    cityName: "Punewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 145,
                    cityName: "Rajanganaya"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 146,
                    cityName: "Rambewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 147,
                    cityName: "Rampathwila"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 148,
                    cityName: "Rathmalgahawewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 149,
                    cityName: "Saliyapura"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 150,
                    cityName: "Seeppukulama"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 151,
                    cityName: "Senapura"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 152,
                    cityName: "Sivalakulama"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 153,
                    cityName: "Siyambalewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 154,
                    cityName: "Sravasthipura"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 155,
                    cityName: "Talawa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 156,
                    cityName: "Tambuttegama"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 157,
                    cityName: "Tammennawa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 158,
                    cityName: "Tantirimale"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 159,
                    cityName: "Telhiriyawa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 160,
                    cityName: "Tirappane"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 161,
                    cityName: "Tittagonewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 43,
                    cityName: "Angamuwa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 44,
                    cityName: "Anuradhapura"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 45,
                    cityName: "Awukana"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 46,
                    cityName: "Bogahawewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 47,
                    cityName: "Dematawewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 48,
                    cityName: "Dimbulagala"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 49,
                    cityName: "Dutuwewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 50,
                    cityName: "Elayapattuwa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 51,
                    cityName: "Ellewewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 52,
                    cityName: "Eppawala"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 53,
                    cityName: "Etawatunuwewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 54,
                    cityName: "Etaweeragollewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 55,
                    cityName: "Galapitagala"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 56,
                    cityName: "Galenbindunuwewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 57,
                    cityName: "Galkadawala"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 58,
                    cityName: "Galkiriyagama"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 59,
                    cityName: "Galkulama"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 60,
                    cityName: "Galnewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 61,
                    cityName: "Gambirigaswewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 62,
                    cityName: "Ganewalpola"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 63,
                    cityName: "Gemunupura"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 64,
                    cityName: "Getalawa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 65,
                    cityName: "Gnanikulama"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 66,
                    cityName: "Gonahaddenawa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 67,
                    cityName: "Habarana"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 68,
                    cityName: "Halmillawa Dambulla"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 69,
                    cityName: "Halmillawetiya"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 70,
                    cityName: "Hidogama"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 71,
                    cityName: "Horawpatana"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 72,
                    cityName: "Horiwila"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 73,
                    cityName: "Hurigaswewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 74,
                    cityName: "Hurulunikawewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 75,
                    cityName: "Ihala Puliyankulama"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 76,
                    cityName: "Kagama"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 77,
                    cityName: "Kahatagasdigiliya"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 78,
                    cityName: "Kahatagollewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 79,
                    cityName: "Kalakarambewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 80,
                    cityName: "Kalaoya"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 81,
                    cityName: "Kalawedi Ulpotha"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 82,
                    cityName: "Kallanchiya"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 83,
                    cityName: "Kalpitiya"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 162,
                    cityName: "Udunuwara Colony"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 163,
                    cityName: "Upuldeniya"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 164,
                    cityName: "Uttimaduwa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 165,
                    cityName: "Vellamanal"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 166,
                    cityName: "Viharapalugama"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 167,
                    cityName: "Wahalkada"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 168,
                    cityName: "Wahamalgollewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 169,
                    cityName: "Walagambahuwa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 170,
                    cityName: "Walahaviddawewa"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 171,
                    cityName: "Welimuwapotana"
                },
                {
                    districtId: 2,
                    districtName: "Anuradhapura",
                    cityId: 172,
                    cityName: "Welioya Project"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 173,
                    cityName: "Akkarasiyaya"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 174,
                    cityName: "Aluketiyawa"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 175,
                    cityName: "Aluttaramma"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 176,
                    cityName: "Ambadandegama"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 177,
                    cityName: "Ambagasdowa"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 178,
                    cityName: "Arawa"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 179,
                    cityName: "Arawakumbura"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 180,
                    cityName: "Arawatta"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 181,
                    cityName: "Atakiriya"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 182,
                    cityName: "Badulla"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 183,
                    cityName: "Baduluoya"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 184,
                    cityName: "Ballaketuwa"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 185,
                    cityName: "Bambarapana"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 186,
                    cityName: "Bandarawela"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 187,
                    cityName: "Beramada"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 188,
                    cityName: "Bibilegama"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 189,
                    cityName: "Boragas"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 190,
                    cityName: "Boralanda"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 191,
                    cityName: "Bowela"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 192,
                    cityName: "Central Camp"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 193,
                    cityName: "Damanewela"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 194,
                    cityName: "Dambana"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 195,
                    cityName: "Dehiattakandiya"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 196,
                    cityName: "Demodara"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 197,
                    cityName: "Diganatenna"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 198,
                    cityName: "Dikkapitiya"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 199,
                    cityName: "Dimbulana"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 200,
                    cityName: "Divulapelessa"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 201,
                    cityName: "Diyatalawa"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 202,
                    cityName: "Dulgolla"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 203,
                    cityName: "Ekiriyankumbura"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 204,
                    cityName: "Ella"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 205,
                    cityName: "Ettampitiya"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 206,
                    cityName: "Galauda"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 207,
                    cityName: "Galporuyaya"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 208,
                    cityName: "Gawarawela"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 209,
                    cityName: "Girandurukotte"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 210,
                    cityName: "Godunna"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 211,
                    cityName: "Gurutalawa"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 212,
                    cityName: "Haldummulla"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 213,
                    cityName: "Hali Ela"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 214,
                    cityName: "Hangunnawa"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 215,
                    cityName: "Haputale"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 216,
                    cityName: "Hebarawa"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 217,
                    cityName: "Heeloya"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 218,
                    cityName: "Helahalpe"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 219,
                    cityName: "Helapupula"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 220,
                    cityName: "Hopton"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 221,
                    cityName: "Idalgashinna"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 222,
                    cityName: "Kahataruppa"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 223,
                    cityName: "Kalugahakandura"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 224,
                    cityName: "Kalupahana"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 225,
                    cityName: "Kebillawela"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 226,
                    cityName: "Kendagolla"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 227,
                    cityName: "Keselpotha"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 228,
                    cityName: "Ketawatta"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 229,
                    cityName: "Kiriwanagama"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 230,
                    cityName: "Koslanda"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 231,
                    cityName: "Kuruwitenna"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 232,
                    cityName: "Kuttiyagolla"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 233,
                    cityName: "Landewela"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 234,
                    cityName: "Liyangahawela"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 235,
                    cityName: "Lunugala"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 236,
                    cityName: "Lunuwatta"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 237,
                    cityName: "Madulsima"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 238,
                    cityName: "Mahiyanganaya"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 239,
                    cityName: "Makulella"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 240,
                    cityName: "Malgoda"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 241,
                    cityName: "Mapakadawewa"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 242,
                    cityName: "Maspanna"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 243,
                    cityName: "Maussagolla"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 244,
                    cityName: "Mawanagama"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 245,
                    cityName: "Medawela Udukinda"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 246,
                    cityName: "Meegahakiula"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 247,
                    cityName: "Metigahatenna"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 248,
                    cityName: "Mirahawatta"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 249,
                    cityName: "Miriyabedda"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 250,
                    cityName: "Nawamedagama"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 251,
                    cityName: "Nelumgama"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 252,
                    cityName: "Nikapotha"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 253,
                    cityName: "Nugatalawa"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 254,
                    cityName: "Ohiya"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 255,
                    cityName: "Pahalarathkinda"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 256,
                    cityName: "Pallekiruwa"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 257,
                    cityName: "Passara"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 258,
                    cityName: "Pattiyagedara"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 259,
                    cityName: "Pelagahatenna"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 260,
                    cityName: "Perawella"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 261,
                    cityName: "Pitamaruwa"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 262,
                    cityName: "Pitapola"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 263,
                    cityName: "Puhulpola"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 264,
                    cityName: "Rajagalatenna"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 265,
                    cityName: "Ratkarawwa"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 266,
                    cityName: "Ridimaliyadda"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 267,
                    cityName: "Silmiyapura"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 268,
                    cityName: "Sirimalgoda"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 269,
                    cityName: "Siripura"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 270,
                    cityName: "Sorabora Colony"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 271,
                    cityName: "Soragune"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 272,
                    cityName: "Soranatota"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 273,
                    cityName: "Taldena"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 274,
                    cityName: "Timbirigaspitiya"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 275,
                    cityName: "Uduhawara"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 276,
                    cityName: "Uraniya"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 277,
                    cityName: "Uva Karandagolla"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 278,
                    cityName: "Uva Mawelagama"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 279,
                    cityName: "Uva Tenna"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 280,
                    cityName: "Uva Tissapura"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 281,
                    cityName: "Welimada"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 282,
                    cityName: "Werunketagoda"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 283,
                    cityName: "Wewatta"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 284,
                    cityName: "Wineethagama"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 285,
                    cityName: "Yalagamuwa"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 286,
                    cityName: "Yalwela"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 1007,
                    cityName: "test4"
                },
                {
                    districtId: 3,
                    districtName: "Badulla",
                    cityId: 1011,
                    cityName: "test8"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 1012,
                    cityName: "test9"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 1003,
                    cityName: "gtgfbb"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 1004,
                    cityName: "test2"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 1005,
                    cityName: "palliyapitiya"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 287,
                    cityName: "Addalaichenai"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 288,
                    cityName: "Ampilanthurai"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 289,
                    cityName: "Araipattai"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 290,
                    cityName: "Ayithiyamalai"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 291,
                    cityName: "Bakiella"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 292,
                    cityName: "Batticaloa"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 293,
                    cityName: "Cheddipalayam"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 294,
                    cityName: "Chenkaladi"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 295,
                    cityName: "Eravur"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 296,
                    cityName: "Kaluwanchikudi"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 297,
                    cityName: "Kaluwankemy"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 298,
                    cityName: "Kannankudah"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 299,
                    cityName: "Karadiyanaru"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 300,
                    cityName: "Kathiraveli"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 301,
                    cityName: "Kattankudi"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 302,
                    cityName: "Kiran"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 303,
                    cityName: "Kirankulam"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 304,
                    cityName: "Koddaikallar"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 305,
                    cityName: "Kokkaddichcholai"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 306,
                    cityName: "Kurukkalmadam"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 307,
                    cityName: "Mandur"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 308,
                    cityName: "Miravodai"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 309,
                    cityName: "Murakottanchanai"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 310,
                    cityName: "Navagirinagar"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 311,
                    cityName: "Navatkadu"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 312,
                    cityName: "Oddamavadi"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 313,
                    cityName: "Palamunai"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 314,
                    cityName: "Pankudavely"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 315,
                    cityName: "Periyaporativu"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 316,
                    cityName: "Periyapullumalai"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 317,
                    cityName: "Pillaiyaradi"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 318,
                    cityName: "Punanai"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 319,
                    cityName: "Thannamunai"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 320,
                    cityName: "Thettativu"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 321,
                    cityName: "Thikkodai"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 322,
                    cityName: "Thirupalugamam"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 323,
                    cityName: "Unnichchai"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 324,
                    cityName: "Vakaneri"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 325,
                    cityName: "Vakarai"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 326,
                    cityName: "Valaichenai"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 327,
                    cityName: "Vantharumoolai"
                },
                {
                    districtId: 4,
                    districtName: "Batticaloa",
                    cityId: 328,
                    cityName: "Vellavely"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 329,
                    cityName: "Akarawita"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 330,
                    cityName: "Ambalangoda"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 331,
                    cityName: "Athurugiriya"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 332,
                    cityName: "Avissawella"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 333,
                    cityName: "Batawala"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 334,
                    cityName: "Battaramulla"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 335,
                    cityName: "Biyagama"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 336,
                    cityName: "Bope"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 337,
                    cityName: "Boralesgamuwa"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 338,
                    cityName: "Colombo 8"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 339,
                    cityName: "Dedigamuwa"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 340,
                    cityName: "Dehiwala"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 341,
                    cityName: "Deltara"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 342,
                    cityName: "Habarakada"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 343,
                    cityName: "Hanwella"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 344,
                    cityName: "Hiripitya"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 345,
                    cityName: "Hokandara"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 346,
                    cityName: "Homagama"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 347,
                    cityName: "Horagala"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 348,
                    cityName: "Kaduwela"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 349,
                    cityName: "Kaluaggala"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 350,
                    cityName: "Kapugoda"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 351,
                    cityName: "Kehelwatta"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 352,
                    cityName: "Kiriwattuduwa"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 353,
                    cityName: "Kolonnawa"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 354,
                    cityName: "Kosgama"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 355,
                    cityName: "Madapatha"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 356,
                    cityName: "Maharagama"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 357,
                    cityName: "Malabe"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 358,
                    cityName: "Moratuwa"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 359,
                    cityName: "Mount Lavinia"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 360,
                    cityName: "Mullegama"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 361,
                    cityName: "Napawela"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 362,
                    cityName: "Nugegoda"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 363,
                    cityName: "Padukka"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 364,
                    cityName: "Pannipitiya"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 365,
                    cityName: "Piliyandala"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 366,
                    cityName: "Pitipana Homagama"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 367,
                    cityName: "Polgasowita"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 368,
                    cityName: "Pugoda"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 369,
                    cityName: "Ranala"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 370,
                    cityName: "Siddamulla"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 371,
                    cityName: "Siyambalagoda"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 372,
                    cityName: "Sri Jayawardenepu"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 373,
                    cityName: "Talawatugoda"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 374,
                    cityName: "Tummodara"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 375,
                    cityName: "Waga"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 376,
                    cityName: "Colombo 6"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 1013,
                    cityName: "test10"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 1014,
                    cityName: "Colombo 4"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 1015,
                    cityName: "Colombo 12"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 1016,
                    cityName: "Colombo 02"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 1017,
                    cityName: "Colombo 05"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 1018,
                    cityName: "Colombo 14"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 1019,
                    cityName: "Colombo 03"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 1020,
                    cityName: ""
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 1021,
                    cityName: "Mulleriyawa"
                },
                {
                    districtId: 5,
                    districtName: "Colombo",
                    cityId: 118,
                    cityName: "Colombo 15"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 437,
                    cityName: "Poddala"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 438,
                    cityName: "Polgampola"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 439,
                    cityName: "Porawagama"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 440,
                    cityName: "Rantotuwila"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 441,
                    cityName: "Talagampola"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 442,
                    cityName: "Talgaspe"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 443,
                    cityName: "Talpe"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 444,
                    cityName: "Tawalama"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 445,
                    cityName: "Tiranagama"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 446,
                    cityName: "Udalamatta"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 447,
                    cityName: "Udugama"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 448,
                    cityName: "Uluvitike"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 449,
                    cityName: "Unawatuna"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 450,
                    cityName: "Unenwitiya"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 451,
                    cityName: "Uragaha"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 452,
                    cityName: "Uragasmanhandiya"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 453,
                    cityName: "Wakwella"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 454,
                    cityName: "Walahanduwa"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 455,
                    cityName: "Wanchawela"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 456,
                    cityName: "Wanduramba"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 457,
                    cityName: "Warukandeniya"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 458,
                    cityName: "Watugedara"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 459,
                    cityName: "Weihena"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 460,
                    cityName: "Welikanda"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 461,
                    cityName: "Wilanagama"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 462,
                    cityName: "Yakkalamulla"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 463,
                    cityName: "Yatalamatta"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 377,
                    cityName: "Agaliya"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 378,
                    cityName: "Ahangama"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 379,
                    cityName: "Ahungalla"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 380,
                    cityName: "Akmeemana"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 381,
                    cityName: "Alawatugoda"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 382,
                    cityName: "Aluthwala"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 383,
                    cityName: "Ampegama"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 384,
                    cityName: "Amugoda"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 385,
                    cityName: "Anangoda"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 386,
                    cityName: "Angulugaha"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 387,
                    cityName: "Ankokkawala"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 388,
                    cityName: "Aselapura"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 389,
                    cityName: "Baddegama"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 390,
                    cityName: "Balapitiya"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 391,
                    cityName: "Banagala"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 392,
                    cityName: "Batapola"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 393,
                    cityName: "Bentota"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 394,
                    cityName: "Boossa"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 395,
                    cityName: "Dellawa"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 396,
                    cityName: "Dikkumbura"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 397,
                    cityName: "Dodanduwa"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 398,
                    cityName: "Ella Tanabaddegama"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 399,
                    cityName: "Elpitiya"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 400,
                    cityName: "Galle"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 401,
                    cityName: "Ginimellagaha"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 402,
                    cityName: "Gintota"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 403,
                    cityName: "Godahena"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 404,
                    cityName: "Gonamulla Junction"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 405,
                    cityName: "Gonapinuwala"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 406,
                    cityName: "Habaraduwa"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 407,
                    cityName: "Haburugala"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 408,
                    cityName: "Hikkaduwa"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 409,
                    cityName: "Hiniduma"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 410,
                    cityName: "Hiyare"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 411,
                    cityName: "Kahaduwa"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 412,
                    cityName: "Kahawa"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 413,
                    cityName: "Karagoda"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 414,
                    cityName: "Karandeniya"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 415,
                    cityName: "Kosgoda"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 416,
                    cityName: "Kottawagama"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 417,
                    cityName: "Kottegoda"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 418,
                    cityName: "Kuleegoda"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 419,
                    cityName: "Magedara"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 420,
                    cityName: "Mahawela Sinhapura"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 421,
                    cityName: "Mapalagama"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 422,
                    cityName: "Mapalagama Central"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 423,
                    cityName: "Mattaka"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 424,
                    cityName: "Meda-Keembiya"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 425,
                    cityName: "Meetiyagoda"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 426,
                    cityName: "Nagoda"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 427,
                    cityName: "Nakiyadeniya"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 428,
                    cityName: "Nawadagala"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 429,
                    cityName: "Neluwa"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 430,
                    cityName: "Nindana"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 431,
                    cityName: "Pahala Millawa"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 432,
                    cityName: "Panangala"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 433,
                    cityName: "Pannimulla Panagoda"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 434,
                    cityName: "Parana ThanaYamgoda"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 435,
                    cityName: "Patana"
                },
                {
                    districtId: 6,
                    districtName: "Galle",
                    cityId: 436,
                    cityName: "Pitigala"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 532,
                    cityName: "Makewita"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 533,
                    cityName: "Makola"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 534,
                    cityName: "Malwana"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 535,
                    cityName: "Mandawala"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 536,
                    cityName: "Marandagahamula"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 537,
                    cityName: "Mellawagedara"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 538,
                    cityName: "Minuwangoda"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 539,
                    cityName: "Mirigama"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 540,
                    cityName: "Miriswatta"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 541,
                    cityName: "Mithirigala"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 542,
                    cityName: "Muddaragama"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 543,
                    cityName: "Mudungoda"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 544,
                    cityName: "Mulleriyawa New Town"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 545,
                    cityName: "Naranwala"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 546,
                    cityName: "Nawana"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 547,
                    cityName: "Nedungamuwa"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 548,
                    cityName: "Negombo"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 549,
                    cityName: "Nikadalupotha"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 550,
                    cityName: "Nikahetikanda"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 551,
                    cityName: "Nittambuwa"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 552,
                    cityName: "Niwandama"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 553,
                    cityName: "Opatha"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 554,
                    cityName: "Pamunugama"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 555,
                    cityName: "Pamunuwatta"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 556,
                    cityName: "Panawala"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 557,
                    cityName: "Pasyala"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 558,
                    cityName: "Peliyagoda"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 559,
                    cityName: "Pepiliyawala"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 560,
                    cityName: "Pethiyagoda"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 561,
                    cityName: "Polpithimukulana"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 562,
                    cityName: "Puwakpitiya"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 563,
                    cityName: "Radawadunna"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 564,
                    cityName: "Radawana"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 565,
                    cityName: "Raddolugama"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 566,
                    cityName: "Ragama"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 567,
                    cityName: "Ruggahawila"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 568,
                    cityName: "Seeduwa"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 569,
                    cityName: "Siyambalape"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 570,
                    cityName: "Talahena"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 571,
                    cityName: "Thambagalla"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 572,
                    cityName: "Thimbirigaskatuwa"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 573,
                    cityName: "Tittapattara"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 574,
                    cityName: "Udathuthiripitiya"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 575,
                    cityName: "Udugampola"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 576,
                    cityName: "Uggalboda"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 577,
                    cityName: "Urapola"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 578,
                    cityName: "Uswetakeiyawa"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 579,
                    cityName: "Veyangoda"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 580,
                    cityName: "Walgammulla"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 581,
                    cityName: "Walpita"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 582,
                    cityName: "Walpola (WP)"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 583,
                    cityName: "Wathurugama"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 584,
                    cityName: "Watinapaha"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 585,
                    cityName: "Wattala"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 586,
                    cityName: "Weboda"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 587,
                    cityName: "Wegowwa"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 588,
                    cityName: "Weweldeniya"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 589,
                    cityName: "Yakkala"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 590,
                    cityName: "Yatiyana"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 464,
                    cityName: "Akaragama"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 465,
                    cityName: "Ambagaspitiya"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 466,
                    cityName: "Ambepussa"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 467,
                    cityName: "Andiambalama"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 468,
                    cityName: "Attanagalla"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 469,
                    cityName: "Badalgama"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 470,
                    cityName: "Banduragoda"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 471,
                    cityName: "Batuwatta"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 472,
                    cityName: "Bemmulla"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 473,
                    cityName: "Biyagama IPZ"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 474,
                    cityName: "Bokalagama"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 475,
                    cityName: "Bollete (WP)"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 476,
                    cityName: "Bopagama"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 477,
                    cityName: "Buthpitiya"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 478,
                    cityName: "Dagonna"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 479,
                    cityName: "Danowita"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 480,
                    cityName: "Debahera"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 481,
                    cityName: "Dekatana"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 482,
                    cityName: "Delgoda"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 483,
                    cityName: "Delwagura"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 484,
                    cityName: "Demalagama"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 485,
                    cityName: "Demanhandiya"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 486,
                    cityName: "Dewalapola"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 487,
                    cityName: "Divulapitiya"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 488,
                    cityName: "Divuldeniya"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 489,
                    cityName: "Dompe"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 490,
                    cityName: "Dunagaha"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 491,
                    cityName: "Ekala"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 492,
                    cityName: "Ellakkala"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 493,
                    cityName: "Essella"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 494,
                    cityName: "Galedanda"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 495,
                    cityName: "Gampaha"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 496,
                    cityName: "Ganemulla"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 497,
                    cityName: "Giriulla"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 498,
                    cityName: "Gonawala"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 499,
                    cityName: "Halpe"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 500,
                    cityName: "Hapugastenna"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 501,
                    cityName: "Heiyanthuduwa"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 502,
                    cityName: "Hinatiyana Madawala"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 503,
                    cityName: "Hiswella"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 504,
                    cityName: "Horampella"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 505,
                    cityName: "Hunumulla"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 506,
                    cityName: "Hunupola"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 507,
                    cityName: "Ihala Madampella"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 508,
                    cityName: "Imbulgoda"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 509,
                    cityName: "Ja-Ela"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 510,
                    cityName: "Kadawatha"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 511,
                    cityName: "Kahatowita"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 512,
                    cityName: "Kalagedihena"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 513,
                    cityName: "Kaleliya"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 514,
                    cityName: "Kandana"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 515,
                    cityName: "Katana"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 516,
                    cityName: "Katudeniya"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 517,
                    cityName: "Katunayake"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 518,
                    cityName: "Katunayake Air Force Camp"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 519,
                    cityName: "Katunayake(FTZ)"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 520,
                    cityName: "Katuwellegama"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 521,
                    cityName: "Kelaniya"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 522,
                    cityName: "Kimbulapitiya"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 523,
                    cityName: "Kirindiwela"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 524,
                    cityName: "Kitalawalana"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 525,
                    cityName: "Kochchikade"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 526,
                    cityName: "Kotadeniyawa"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 527,
                    cityName: "Kotugoda"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 528,
                    cityName: "Kumbaloluwa"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 529,
                    cityName: "Loluwagoda"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 530,
                    cityName: "Mabodale"
                },
                {
                    districtId: 7,
                    districtName: "Gampaha",
                    cityId: 531,
                    cityName: "Madelgamuwa"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 628,
                    cityName: "Mulkirigala"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 629,
                    cityName: "Nakulugamuwa"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 630,
                    cityName: "Netolpitiya"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 631,
                    cityName: "Nihiluwa"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 632,
                    cityName: "Padawkema"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 633,
                    cityName: "Pahala Andarawewa"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 634,
                    cityName: "Rammalawarapitiya"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 635,
                    cityName: "Ranakeliya"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 636,
                    cityName: "Ranmuduwewa"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 637,
                    cityName: "Ranna"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 638,
                    cityName: "Ratmalwala"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 639,
                    cityName: "RU/Ridiyagama"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 640,
                    cityName: "Sooriyawewa Town"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 641,
                    cityName: "Tangalla"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 642,
                    cityName: "Tissamaharama"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 643,
                    cityName: "Uda Gomadiya"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 644,
                    cityName: "Udamattala"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 645,
                    cityName: "Uswewa"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 646,
                    cityName: "Vitharandeniya"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 647,
                    cityName: "Walasmulla"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 648,
                    cityName: "Weeraketiya"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 649,
                    cityName: "Weerawila"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 650,
                    cityName: "Weerawila NewTown"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 651,
                    cityName: "Wekandawela"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 652,
                    cityName: "Weligatta"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 653,
                    cityName: "Yatigala"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 591,
                    cityName: "Ambalantota"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 592,
                    cityName: "Angunakolapelessa"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 593,
                    cityName: "Angunakolawewa"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 594,
                    cityName: "Bandagiriya Colony"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 595,
                    cityName: "Barawakumbuka"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 596,
                    cityName: "Beliatta"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 597,
                    cityName: "Beragama"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 598,
                    cityName: "Beralihela"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 599,
                    cityName: "Bundala"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 600,
                    cityName: "Ellagala"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 601,
                    cityName: "Gangulandeniya"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 602,
                    cityName: "Getamanna"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 603,
                    cityName: "Goda Koggalla"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 604,
                    cityName: "Gonagamuwa Uduwila"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 605,
                    cityName: "Gonnoruwa"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 606,
                    cityName: "Hakuruwela"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 607,
                    cityName: "Hambantota"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 608,
                    cityName: "Handugala"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 609,
                    cityName: "Hungama"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 610,
                    cityName: "Ihala Beligalla"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 611,
                    cityName: "Ittademaliya"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 612,
                    cityName: "Julampitiya"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 613,
                    cityName: "Kahandamodara"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 614,
                    cityName: "Kariyamaditta"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 615,
                    cityName: "Katuwana"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 616,
                    cityName: "Kawantissapura"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 617,
                    cityName: "Kirama"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 618,
                    cityName: "Kirinda"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 619,
                    cityName: "Lunama"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 620,
                    cityName: "Lunugamwehera"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 621,
                    cityName: "Magama"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 622,
                    cityName: "Mahagalwewa"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 623,
                    cityName: "Mamadala"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 624,
                    cityName: "Medamulana"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 625,
                    cityName: "Middeniya"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 626,
                    cityName: "Migahajandur"
                },
                {
                    districtId: 8,
                    districtName: "Hambantota",
                    cityId: 627,
                    cityName: "Modarawana"
                },
                {
                    districtId: 9,
                    districtName: "Jaffna",
                    cityId: 654,
                    cityName: "Jaffna"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 655,
                    cityName: "Agalawatta"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 656,
                    cityName: "Alubomulla"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 657,
                    cityName: "Anguruwatota"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 658,
                    cityName: "Atale"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 659,
                    cityName: "Baduraliya"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 660,
                    cityName: "Bandaragama"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 661,
                    cityName: "Batugampola"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 662,
                    cityName: "Bellana"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 663,
                    cityName: "Beruwala"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 664,
                    cityName: "Bolossagama"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 665,
                    cityName: "Bombuwala"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 666,
                    cityName: "Boralugoda"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 667,
                    cityName: "Bulathsinhala"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 668,
                    cityName: "Danawala Thiniyawala"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 669,
                    cityName: "Delmella"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 670,
                    cityName: "Dharga Town"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 671,
                    cityName: "Diwalakada"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 672,
                    cityName: "Dodangoda"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 673,
                    cityName: "Dombagoda"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 674,
                    cityName: "Ethkandura"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 675,
                    cityName: "Galpatha"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 676,
                    cityName: "Gamagoda"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 677,
                    cityName: "Gonagalpura"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 678,
                    cityName: "Gonapola Junction"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 679,
                    cityName: "Govinna"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 680,
                    cityName: "Gurulubadda"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 681,
                    cityName: "Halkandawila"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 682,
                    cityName: "Haltota"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 683,
                    cityName: "Halvitigala Colony"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 684,
                    cityName: "Halwala"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 685,
                    cityName: "Halwatura"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 686,
                    cityName: "Handapangoda"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 687,
                    cityName: "Hedigalla Colony"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 688,
                    cityName: "Henegama"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 689,
                    cityName: "Hettimulla"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 690,
                    cityName: "Horana"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 691,
                    cityName: "Ittapana"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 692,
                    cityName: "Kahawala"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 693,
                    cityName: "Kalawila Kiranthidiya"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 694,
                    cityName: "Kalutara"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 695,
                    cityName: "Kananwila"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 696,
                    cityName: "Kandanagama"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 697,
                    cityName: "Kelinkanda"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 698,
                    cityName: "Kitulgoda"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 699,
                    cityName: "Koholana"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 700,
                    cityName: "Kuda Uduwa"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 701,
                    cityName: "Labbala"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 702,
                    cityName: "lhalahewessa"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 703,
                    cityName: "lnduruwa"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 704,
                    cityName: "lngiriya"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 705,
                    cityName: "Maggona"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 706,
                    cityName: "Mahagama"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 707,
                    cityName: "Mahakalupahana"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 708,
                    cityName: "Maharangalla"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 709,
                    cityName: "Malgalla Talangalla"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 710,
                    cityName: "Matugama"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 711,
                    cityName: "Meegahatenna"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 712,
                    cityName: "Meegama"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 713,
                    cityName: "Meegoda"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 714,
                    cityName: "Millaniya"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 715,
                    cityName: "Millewa"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 716,
                    cityName: "Miwanapalana"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 717,
                    cityName: "Molkawa"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 718,
                    cityName: "Morapitiya"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 719,
                    cityName: "Morontuduwa"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 720,
                    cityName: "Nawattuduwa"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 721,
                    cityName: "Neboda"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 722,
                    cityName: "Padagoda"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 723,
                    cityName: "Pahalahewessa"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 724,
                    cityName: "Paiyagala"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 725,
                    cityName: "Panadura"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 726,
                    cityName: "Pannala"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 727,
                    cityName: "Paragastota"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 728,
                    cityName: "Paragoda"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 729,
                    cityName: "Paraigama"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 730,
                    cityName: "Pelanda"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 731,
                    cityName: "Pelawatta"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 732,
                    cityName: "Pimbura"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 733,
                    cityName: "Pitagaldeniya"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 734,
                    cityName: "Pokunuwita"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 735,
                    cityName: "Poruwedanda"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 736,
                    cityName: "Ratmale"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 737,
                    cityName: "Remunagoda"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 738,
                    cityName: "Talgaswela"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 739,
                    cityName: "Tebuwana"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 740,
                    cityName: "Uduwara"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 741,
                    cityName: "Utumgama"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 742,
                    cityName: "Veyangalla"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 743,
                    cityName: "Wadduwa"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 744,
                    cityName: "Walagedara"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 745,
                    cityName: "Walallawita"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 746,
                    cityName: "Waskaduwa"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 747,
                    cityName: "Welipenna"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 748,
                    cityName: "Weliveriya"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 749,
                    cityName: "Welmilla Junction"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 750,
                    cityName: "Weragala"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 751,
                    cityName: "Yagirala"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 752,
                    cityName: "Yatadolawatta"
                },
                {
                    districtId: 10,
                    districtName: "Kalutara",
                    cityId: 753,
                    cityName: "Yatawara Junction"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 754,
                    cityName: "Aludeniya"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 755,
                    cityName: "Ambagahapelessa"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 756,
                    cityName: "Ambagamuwa Udabulathgama"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 757,
                    cityName: "Ambatenna"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 758,
                    cityName: "Ampitiya"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 759,
                    cityName: "Ankumbura"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 760,
                    cityName: "Atabage"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 761,
                    cityName: "Balana"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 762,
                    cityName: "Bambaragahaela"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 763,
                    cityName: "Batagolladeniya"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 764,
                    cityName: "Batugoda"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 765,
                    cityName: "Batumulla"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 766,
                    cityName: "Bawlana"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 767,
                    cityName: "Bopana"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 768,
                    cityName: "Danture"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 769,
                    cityName: "Dedunupitiya"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 770,
                    cityName: "Dekinda"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 771,
                    cityName: "Deltota"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 772,
                    cityName: "Divulankadawala"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 773,
                    cityName: "Dolapihilla"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 774,
                    cityName: "Dolosbage"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 775,
                    cityName: "Dunuwila"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 776,
                    cityName: "Etulgama"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 777,
                    cityName: "Galaboda"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 778,
                    cityName: "Galagedara"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 779,
                    cityName: "Galaha"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 780,
                    cityName: "Galhinna"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 781,
                    cityName: "Gampola"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 782,
                    cityName: "Gelioya"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 783,
                    cityName: "Godamunna"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 784,
                    cityName: "Gomagoda"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 785,
                    cityName: "Gonagantenna"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 786,
                    cityName: "Gonawalapatana"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 787,
                    cityName: "Gunnepana"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 788,
                    cityName: "Gurudeniya"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 789,
                    cityName: "Hakmana"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 790,
                    cityName: "Handaganawa"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 791,
                    cityName: "Handawalapitiya"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 792,
                    cityName: "Handessa"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 793,
                    cityName: "Hanguranketha"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 794,
                    cityName: "Harangalagama"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 795,
                    cityName: "Hataraliyadda"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 796,
                    cityName: "Hindagala"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 797,
                    cityName: "Hondiyadeniya"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 798,
                    cityName: "Hunnasgiriya"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 799,
                    cityName: "Inguruwatta"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 800,
                    cityName: "Jambugahapitiya"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 801,
                    cityName: "Kadugannawa"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 802,
                    cityName: "Kahataliyadda"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 803,
                    cityName: "Kalugala"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 804,
                    cityName: "Kandy"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 805,
                    cityName: "Kapuliyadde"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 806,
                    cityName: "Katugastota"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 807,
                    cityName: "Katukitula"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 808,
                    cityName: "Kelanigama"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 809,
                    cityName: "Kengalla"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 810,
                    cityName: "Ketaboola"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 811,
                    cityName: "Ketakumbura"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 812,
                    cityName: "Kobonila"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 813,
                    cityName: "Kolabissa"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 814,
                    cityName: "Kolongoda"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 815,
                    cityName: "Kulugammana"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 816,
                    cityName: "Kumbukkandura"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 817,
                    cityName: "Kumburegama"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 818,
                    cityName: "Kundasale"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 819,
                    cityName: "Leemagahakotuwa"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 820,
                    cityName: "lhala Kobbekaduwa"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 821,
                    cityName: "Lunugama"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 822,
                    cityName: "Lunuketiya Maditta"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 823,
                    cityName: "Madawala Bazaar"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 824,
                    cityName: "Madawalalanda"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 825,
                    cityName: "Madugalla"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 826,
                    cityName: "Madulkele"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 827,
                    cityName: "Mahadoraliyadda"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 828,
                    cityName: "Mahamedagama"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 829,
                    cityName: "Mahanagapura"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 830,
                    cityName: "Mailapitiya"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 831,
                    cityName: "Makkanigama"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 832,
                    cityName: "Makuldeniya"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 833,
                    cityName: "Mangalagama"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 834,
                    cityName: "Mapakanda"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 835,
                    cityName: "Marassana"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 836,
                    cityName: "Marymount Colony"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 837,
                    cityName: "Mawatura"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 838,
                    cityName: "Medamahanuwara"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 839,
                    cityName: "Medawala Harispattuwa"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 840,
                    cityName: "Meetalawa"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 841,
                    cityName: "Megoda Kalugamuwa"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 842,
                    cityName: "Menikdiwela"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 843,
                    cityName: "Menikhinna"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 844,
                    cityName: "Mimure"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 845,
                    cityName: "Minigamuwa"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 846,
                    cityName: "Minipe"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 847,
                    cityName: "Moragahapallama"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 848,
                    cityName: "Murutalawa"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 849,
                    cityName: "Muruthagahamulla"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 850,
                    cityName: "Nanuoya"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 851,
                    cityName: "Naranpanawa"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 852,
                    cityName: "Narawelpita"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 853,
                    cityName: "Nawalapitiya"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 854,
                    cityName: "Nawathispane"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 855,
                    cityName: "Nillambe"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 856,
                    cityName: "Nugaliyadda"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 857,
                    cityName: "Ovilikanda"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 858,
                    cityName: "Pallekotuwa"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 859,
                    cityName: "Panwilatenna"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 860,
                    cityName: "Paradeka"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 861,
                    cityName: "Pasbage"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 862,
                    cityName: "Pattitalawa"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 863,
                    cityName: "Peradeniya"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 864,
                    cityName: "Pilimatalawa"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 865,
                    cityName: "Poholiyadda"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 866,
                    cityName: "Pubbiliya"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 867,
                    cityName: "Pupuressa"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 868,
                    cityName: "Pussellawa"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 869,
                    cityName: "Putuhapuwa"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 870,
                    cityName: "Rajawella"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 871,
                    cityName: "Rambukpitiya"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 872,
                    cityName: "Rambukwella"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 873,
                    cityName: "Rangala"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 874,
                    cityName: "Rantembe"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 875,
                    cityName: "Sangarajapura"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 876,
                    cityName: "Senarathwela"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 877,
                    cityName: "Talatuoya"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 878,
                    cityName: "Teldeniya"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 879,
                    cityName: "Tennekumbura"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 880,
                    cityName: "Uda Peradeniya"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 881,
                    cityName: "Udahentenna"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 882,
                    cityName: "Udatalawinna"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 883,
                    cityName: "Udispattuwa"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 884,
                    cityName: "Ududumbara"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 885,
                    cityName: "Uduwahinna"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 886,
                    cityName: "Uduwela"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 887,
                    cityName: "Ulapane"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 888,
                    cityName: "Unuwinna"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 889,
                    cityName: "Velamboda"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 890,
                    cityName: "Watagoda"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 891,
                    cityName: "Watagoda Harispattuwa"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 892,
                    cityName: "Wattappola"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 893,
                    cityName: "Weligampola"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 894,
                    cityName: "Wendaruwa"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 895,
                    cityName: "Weragantota"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 896,
                    cityName: "Werapitya"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 897,
                    cityName: "Werellagama"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 898,
                    cityName: "Wettawa"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 899,
                    cityName: "Yahalatenna"
                },
                {
                    districtId: 11,
                    districtName: "Kandy",
                    cityId: 900,
                    cityName: "Yatihalagala"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 901,
                    cityName: "Alawala"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 902,
                    cityName: "Alawatura"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 903,
                    cityName: "Alawwa"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 904,
                    cityName: "Algama"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 905,
                    cityName: "Alutnuwara"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 906,
                    cityName: "Ambalakanda"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 907,
                    cityName: "Ambulugala"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 908,
                    cityName: "Amitirigala"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 909,
                    cityName: "Ampagala"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 910,
                    cityName: "Anhandiya"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 911,
                    cityName: "Anhettigama"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 912,
                    cityName: "Aranayaka"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 913,
                    cityName: "Aruggammana"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 914,
                    cityName: "Batuwita"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 915,
                    cityName: "Beligala(Sab)"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 916,
                    cityName: "Belihuloya"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 917,
                    cityName: "Berannawa"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 918,
                    cityName: "Bopitiya"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 919,
                    cityName: "Bopitiya (SAB)"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 920,
                    cityName: "Boralankada"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 921,
                    cityName: "Bossella"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 922,
                    cityName: "Bulathkohupitiya"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 923,
                    cityName: "Damunupola"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 924,
                    cityName: "Debathgama"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 925,
                    cityName: "Dedugala"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 926,
                    cityName: "Deewala Pallegama"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 927,
                    cityName: "Dehiowita"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 928,
                    cityName: "Deldeniya"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 929,
                    cityName: "Deloluwa"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 930,
                    cityName: "Deraniyagala"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 931,
                    cityName: "Dewalegama"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 932,
                    cityName: "Dewanagala"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 933,
                    cityName: "Dombemada"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 934,
                    cityName: "Dorawaka"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 935,
                    cityName: "Dunumala"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 936,
                    cityName: "Galapitamada"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 937,
                    cityName: "Galatara"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 938,
                    cityName: "Galigamuwa Town"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 939,
                    cityName: "Gallella"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 940,
                    cityName: "Galpatha(Sab)"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 941,
                    cityName: "Gantuna"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 942,
                    cityName: "Getahetta"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 943,
                    cityName: "Godagampola"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 944,
                    cityName: "Gonagala"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 945,
                    cityName: "Hakahinna"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 946,
                    cityName: "Hakbellawaka"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 947,
                    cityName: "Halloluwa"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 948,
                    cityName: "Hedunuwewa"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 949,
                    cityName: "Hemmatagama"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 950,
                    cityName: "Hewadiwela"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 951,
                    cityName: "Hingula"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 952,
                    cityName: "Hinguralakanda"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 953,
                    cityName: "Hingurana"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 954,
                    cityName: "Hiriwadunna"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 955,
                    cityName: "Ihala Walpola"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 956,
                    cityName: "Ihalagama"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 957,
                    cityName: "Imbulana"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 958,
                    cityName: "Imbulgasdeniya"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 959,
                    cityName: "Kabagamuwa"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 960,
                    cityName: "Kahapathwala"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 961,
                    cityName: "Kandaketya"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 962,
                    cityName: "Kannattota"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 963,
                    cityName: "Karagahinna"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 964,
                    cityName: "Kegalle"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 965,
                    cityName: "Kehelpannala"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 966,
                    cityName: "Ketawala Leula"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 967,
                    cityName: "Kitulgala"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 968,
                    cityName: "Kondeniya"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 969,
                    cityName: "Kotiyakumbura"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 970,
                    cityName: "Lewangama"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 971,
                    cityName: "Mahabage"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 972,
                    cityName: "Makehelwala"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 973,
                    cityName: "Malalpola"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 974,
                    cityName: "Maldeniya"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 975,
                    cityName: "Maliboda"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 976,
                    cityName: "Maliyadda"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 977,
                    cityName: "Malmaduwa"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 978,
                    cityName: "Marapana"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 979,
                    cityName: "Mawanella"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 980,
                    cityName: "Meetanwala"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 981,
                    cityName: "Migastenna Sabara"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 982,
                    cityName: "Miyanawita"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 983,
                    cityName: "Molagoda"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 984,
                    cityName: "Morontota"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 985,
                    cityName: "Narangala"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 986,
                    cityName: "Narangoda"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 987,
                    cityName: "Nattarampotha"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 988,
                    cityName: "Nelundeniya"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 989,
                    cityName: "Niyadurupola"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 990,
                    cityName: "Noori"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 991,
                    cityName: "Pannila"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 992,
                    cityName: "Pattampitiya"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 993,
                    cityName: "Pilawala"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 994,
                    cityName: "Pothukoladeniya"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 995,
                    cityName: "Puswelitenna"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 996,
                    cityName: "Rambukkana"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 997,
                    cityName: "Rilpola"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 998,
                    cityName: "Rukmale"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 999,
                    cityName: "Ruwanwella"
                },
                {
                    districtId: 12,
                    districtName: "Kegalle",
                    cityId: 1000,
                    cityName: "Samanalawewa"
                }
            ],
            listClients: [
                {
                    id: "446fec8e-e0ca-456d-b500-8bbb0f184e70",
                    value: "Chamari Salon-Anuradhapura"
                },
                {
                    id: "ed9e296e-2f75-48f3-858f-55efbf3d9bb0",
                    value: "Chamari Salon-Anuradhapura"
                },
                {
                    id: "1fce05fd-4829-42a8-9077-d0d67dcacc43",
                    value: "Chamari Salon-Anuradhapura"
                },
                {
                    id: "053f2383-76b0-47d2-9a0b-9a1b7a7a4fef",
                    value: "Kavindi Salon-Anuradhapura"
                },
                {
                    id: "06f4ff41-e4a3-47b5-b94f-c4f5924aba54",
                    value: "Kavindi Salon-Anuradhapura"
                },
                {
                    id: "343584f8-650b-4349-a026-b762ae6c4113",
                    value: "Kavindi Salon-Anuradhapura"
                },
                {
                    id: "08d1c652-8b04-4b91-bb73-f88c9ab93ae0",
                    value: "Prasanna Salon-Anuradhapura"
                },
                {
                    id: "969a0db1-fb9c-484b-885b-a6022f0a93bf",
                    value: "Prasanna Salon-Anuradhapura"
                },
                {
                    id: "08498977-c19c-41b2-af2b-016f5bdf6a0b",
                    value: "Prasanna Salon-Anuradhapura"
                },
                {
                    id: "1e08a7d2-870e-4c79-8059-37a893b19df6",
                    value: "Saman Salon-Anuradhapura"
                },
                {
                    id: "d12c7e56-9a41-4842-9ca2-fbc7c5fab48a",
                    value: "Saman Salon-Anuradhapura"
                },
                {
                    id: "9019aabb-3102-4bc1-ba30-d428b0de97c8",
                    value: "Vishanthi Salon-Anuradhapura"
                },
                {
                    id: "9237ee5b-5b7e-4079-97a0-dd2aaea49c54",
                    value: "Vishanthi Salon-Anuradhapura"
                },
                {
                    id: "bcfd3a82-b78c-4c47-b61a-4c15cb8f7651",
                    value: "Suranga Salon-Badulla"
                },
                {
                    id: "eddd8e35-3d4c-4677-bf1e-ae08bf31e954",
                    value: "Suranga Salon-Badulla"
                },
                {
                    id: "074f11c9-fc7c-46fb-985e-cc46b9bed763",
                    value: "Suranga Salon-Badulla"
                },
                {
                    id: "3fc56214-c729-416b-a9e3-1402748c6c6c",
                    value: "Rashmi Salon-Badulla"
                },
                {
                    id: "0da79a4f-415f-4fdb-bbed-72e67dac6a95",
                    value: "Rashmi Salon-Badulla"
                },
                {
                    id: "bf0afae6-8482-4768-ad9c-73127c8ef4ae",
                    value: "Rashmi Salon-Badulla"
                },
                {
                    id: "93c5f069-1b55-4ce7-bbfb-471336072e73",
                    value: "Kasun Salon-Badulla"
                },
                {
                    id: "00425906-35c6-47c4-a14f-2e1e5963eb6a",
                    value: "Kasun Salon-Badulla"
                },
                {
                    id: "97804f77-0fee-4418-b9af-93d887eba8f4",
                    value: "Kasun Salon-Badulla"
                },
                {
                    id: "7734e0cd-051f-4ec9-909c-83a494a7021e",
                    value: "Anuradha Salon-Badulla"
                },
                {
                    id: "931f952d-8190-43c1-9590-3cada02c73ef",
                    value: "Chamara Salon-Colombo"
                },
                {
                    id: "5a41111f-fe9b-47ea-a612-6293546461bd",
                    value: "Chamara Salon-Colombo"
                },
                {
                    id: "6eeade92-72c8-49c0-8d43-786d3154e670",
                    value: "Anuradha Salon-Colombo"
                },
                {
                    id: "c4391596-c5e7-43fb-8b77-c125548c6850",
                    value: "Anuradha Salon-Colombo"
                },
                {
                    id: "89ccc576-d6b6-4dc6-93a3-2cfcf627d011",
                    value: "Nirosha Salon-Colombo"
                },
                {
                    id: "e52e5ec5-ef69-4f2a-9e00-854e751ca08d",
                    value: "Nirosha Salon-Colombo"
                },
                {
                    id: "cc2eb382-ff47-4755-9e5a-9bb174aa392c",
                    value: "Nirosha Salon-Colombo"
                },
                {
                    id: "44048a05-44cf-4aed-87b2-0948f0cb59cb",
                    value: "Ruwan Salon-Colombo"
                },
                {
                    id: "4a53011d-54cc-4c32-a0f0-f24302a6ecf4",
                    value: "Ruwan Salon-Colombo"
                },
                {
                    id: "4db8d464-1325-4f3f-908e-ff3d30cac340",
                    value: "Ruwan Salon-Colombo"
                },
                {
                    id: "0cfe08e5-edde-445e-b9c7-d1e63af4c551",
                    value: "Sanjeewa Salon-Colombo"
                },
                {
                    id: "2ef27b83-9f44-4ed1-a04c-bfb4780846d6",
                    value: "Tharindu Salon-Galle"
                },
                {
                    id: "c3e2835c-c2f8-4741-815c-7612a581256b",
                    value: "Tharindu Salon-Galle"
                },
                {
                    id: "fc90873d-d146-435a-9455-29489b57a9e8",
                    value: "Samanthi Salon-Galle"
                },
                {
                    id: "debcc4c8-8453-472f-833e-531e33e7a4b7",
                    value: "Samanthi Salon-Galle"
                },
                {
                    id: "322714aa-ca42-4c4e-83aa-683abfa243ed",
                    value: "Samanthi Salon-Galle"
                },
                {
                    id: "8826f418-159d-4344-82db-469d55f01409",
                    value: "Nadeesha Salon-Galle"
                },
                {
                    id: "f94849c2-505a-40be-a287-3006190192d4",
                    value: "Nadeesha Salon-Galle"
                },
                {
                    id: "10cce735-9331-427a-95a6-981247602dbc",
                    value: "Nadeesha Salon-Galle"
                },
                {
                    id: "b626d489-6c34-4ceb-85ca-eb1f0f25732b",
                    value: "Kusal Salon-Galle"
                },
                {
                    id: "edfabf00-e825-4dd0-a028-7364b1ab1ecb",
                    value: "Kusal Salon-Galle"
                },
                {
                    id: "2067a3ab-f69f-46dd-9e3f-d8edd90c6a5e",
                    value: "Anjali Salon-Galle"
                },
                {
                    id: "4d08e000-67aa-4c95-99d5-0a1438c48e8b",
                    value: "Anjali Salon-Galle"
                },
                {
                    id: "88169680-f8c1-436d-9fd9-84a5478c3d74",
                    value: "Anjali Salon-Galle"
                },
                {
                    id: "7969cdfc-0a3f-43dc-8e0e-4eae69097cbe",
                    value: "Dilani Salon-Gampaha"
                },
                {
                    id: "e78d998b-78bb-4fba-a5b7-7da02ec176db",
                    value: "Dilani Salon-Gampaha"
                },
                {
                    id: "0f4bedc0-727b-43a0-919d-8eabee5953f0",
                    value: "Dilani Salon-Gampaha"
                },
                {
                    id: "2f899b88-8b7b-407b-9f9d-7cc2afbbd232",
                    value: "Ishara Salon-Gampaha"
                },
                {
                    id: "2b3a58af-7a73-4e0c-9f41-3ba2bb15627f",
                    value: "Ishara Salon-Gampaha"
                },
                {
                    id: "d0bda22b-c212-4ffd-a8b3-230dcdc5a778",
                    value: "Ishara Salon-Gampaha"
                },
                {
                    id: "4cfe50c9-8c16-4a36-b66a-7a5717894a47",
                    value: "Harini Salon-Gampaha"
                },
                {
                    id: "a558db3e-0893-41ba-a91a-b857fc073b63",
                    value: "Harini Salon-Gampaha"
                },
                {
                    id: "2f29b2f4-c7aa-476d-884d-f38b9f93e767",
                    value: "Harini Salon-Gampaha"
                },
                {
                    id: "0f8b2afa-5022-4df7-a20a-701c9707b342",
                    value: "Tharindu Salon-Gampaha"
                },
                {
                    id: "3db5d9c9-179a-4299-b3f7-8d683f550d95",
                    value: "Sanjeewa Salon-Gampaha"
                },
                {
                    id: "0cac2b01-1a43-4f77-b629-2d0f394f2fa1",
                    value: "Pradeep Salon-Gampaha"
                },
                {
                    id: "b9afb803-f810-46c4-8e55-c25d1f5a2e1f",
                    value: "Pradeep Salon-Gampaha"
                },
                {
                    id: "cb78739d-513f-45da-8c7b-f5c078d67c87",
                    value: "Pradeep Salon-Gampaha"
                },
                {
                    id: "36c00a54-706f-4b8a-8f81-3b21c917858e",
                    value: "Sanjeewani Salon-Kalutara"
                },
                {
                    id: "09a4f3de-d4f6-415e-ae05-21745d7120e5",
                    value: "Sanjeewani Salon-Kalutara"
                },
                {
                    id: "0aa8f438-6f4e-41be-af3c-f927caadc3c5",
                    value: "Sanjeewani Salon-Kalutara"
                },
                {
                    id: "8f14c060-e2a8-48c3-add4-aba1c2f01572",
                    value: "Gayan Salon-Kalutara"
                },
                {
                    id: "97eea546-8366-4853-94ff-66ab3619b0f2",
                    value: "Gayan Salon-Kalutara"
                },
                {
                    id: "9b71a64f-1fb9-4303-8f60-557e5c45cbb1",
                    value: "Gayan Salon-Kalutara"
                },
                {
                    id: "a56a9b0f-c83f-45ee-add9-ce85850f19f0",
                    value: "Naveen Salon-Kalutara"
                },
                {
                    id: "559d5aa0-da46-40db-aa00-0db49b1756ba",
                    value: "Naveen Salon-Kalutara"
                },
                {
                    id: "2e6495a7-05e3-44ed-b25b-98b8972f4724",
                    value: "Menaka Salon-Kalutara"
                },
                {
                    id: "58478c15-c5eb-4eb9-85a6-e6e63fcdeb61",
                    value: "Menaka Salon-Kalutara"
                },
                {
                    id: "9d55cc64-80d6-4404-a049-e31284cfe91e",
                    value: "Menaka Salon-Kalutara"
                },
                {
                    id: "0e66cb6e-b6ea-4dfc-9c41-a227e9e0f288",
                    value: "Dilusha Salon-Kalutara"
                },
                {
                    id: "e61ce884-8369-498a-87d9-ac5598e58939",
                    value: "Dilusha Salon-Kalutara"
                },
                {
                    id: "65c6819d-0153-483f-8d0c-61b5b029d8d7",
                    value: "Dilusha Salon-Kalutara"
                },
                {
                    id: "0890fdfa-9df5-4183-97a5-89b0ca312a92",
                    value: "Arjuna Salon-Kandy"
                },
                {
                    id: "43596b82-dffd-47a5-80b3-89e759af4ec0",
                    value: "Arjuna Salon-Kandy"
                },
                {
                    id: "9669771f-2f79-49cf-a6c5-eb1dcd38a8eb",
                    value: "Arjuna Salon-Kandy"
                },
                {
                    id: "b62c876d-f5e5-4bab-a7f1-6c1730fffb0e",
                    value: "Naveen Salon-Kandy"
                },
                {
                    id: "739b17b6-6629-41c7-a35e-86aefdd19855",
                    value: "Sanduni Salon-Kandy"
                },
                {
                    id: "5fe5586d-b022-4045-bb98-728985749b48",
                    value: "Sanduni Salon-Kandy"
                },
                {
                    id: "497b22f1-0beb-4bee-ac85-665169454ff5",
                    value: "Thushari Salon-Kandy"
                },
                {
                    id: "9c5becb9-218c-411b-be17-f1be55f85122",
                    value: "Thushari Salon-Kandy"
                },
                {
                    id: "c8d9ecd9-3ff4-452b-aa0b-25a7b8fdc192",
                    value: "Ramesh Salon-Kandy"
                },
                {
                    id: "89dae397-2908-4fb6-a091-f904425442df",
                    value: "Ramesh Salon-Kandy"
                },
                {
                    id: "09274fe8-0e2e-450b-a294-f0d165bda3f0",
                    value: "Wasana Salon-Kandy"
                },
                {
                    id: "3506d3e8-6761-42ad-98f5-fcc7e60f591c",
                    value: "Wasana Salon-Kandy"
                },
                {
                    id: "2e16f731-0c00-46d0-bce7-a41124716386",
                    value: "Wasana Salon-Kandy"
                },
                {
                    id: "34e082e7-3ae2-45e1-85a0-cfbe83f6a084",
                    value: "Ramesh Salon-Kegalle"
                },
                {
                    id: "8817470d-50bb-4aa0-bf60-9262bed12834",
                    value: "Nadeeka Salon-Kegalle"
                },
                {
                    id: "30b79703-f01b-4645-ae9e-19a688f4aa55",
                    value: "Nadeeka Salon-Kegalle"
                },
                {
                    id: "ceefe232-59ba-4448-b45f-74efca905fc2",
                    value: "Nadeeka Salon-Kegalle"
                },
                {
                    id: "8610148c-2d88-4caf-b4f8-d95837e1a62b",
                    value: "Anusha Salon-Kegalle"
                },
                {
                    id: "bfd0700d-913d-4dd2-a6bd-e3e693812763",
                    value: "Anusha Salon-Kegalle"
                },
                {
                    id: "841b53b1-dcc7-4e71-bcc0-07863b5e7ef5",
                    value: "Anusha Salon-Kegalle"
                },
                {
                    id: "ebf0838e-b2c6-46b1-8fd9-5290112e4517",
                    value: "Dulani Salon-Kegalle"
                },
                {
                    id: "160376e3-ca2b-4e84-bc4b-89fcdc03f318",
                    value: "Dulani Salon-Kegalle"
                },
                {
                    id: "a636824f-b93b-43be-8eac-e96dfcf8133e",
                    value: "Dulani Salon-Kegalle"
                },
                {
                    id: "efa50490-af58-4af0-ad93-4db754ac1537",
                    value: "Chathura Salon-Kegalle"
                },
                {
                    id: "f35a21d5-dd9d-40ec-a0a5-8c64ac85e9ce",
                    value: "Chathura Salon-Kegalle"
                },
                {
                    id: "cf644026-8a8b-47cd-8b28-23f2cb5e669a",
                    value: "Chathura Salon-Kegalle"
                },
                {
                    id: "3101376f-e788-49d0-aeb2-d051bb760c51",
                    value: "Bimsara Salon-Matale"
                },
                {
                    id: "d9de30d3-dd0d-44da-a209-b6117dacc645",
                    value: "Bimsara Salon-Matale"
                },
                {
                    id: "c79c54b0-40a1-4418-80e4-ea870feba566",
                    value: "Chamila Salon-Matale"
                },
                {
                    id: "26595e8f-c848-4cb9-8f65-fa50775fbf73",
                    value: "Chamila Salon-Matale"
                },
                {
                    id: "4e006ba8-70dd-4bde-8944-22db44810488",
                    value: "Chamila Salon-Matale"
                },
                {
                    id: "7f337be4-552f-4691-a04d-6981ec572e8e",
                    value: "Niluka Salon-Matale"
                },
                {
                    id: "3e775c18-8ef2-4be3-9e7a-42990950fb05",
                    value: "Niluka Salon-Matale"
                },
                {
                    id: "51ebf668-1ae1-4a18-832b-e9d527843ebf",
                    value: "Niluka Salon-Matale"
                },
                {
                    id: "14b17677-b5e2-4cc7-9900-7450a4ac2e7b",
                    value: "Shalini Salon-Matale"
                },
                {
                    id: "b182e934-6d6f-4fd1-8712-1556814b6438",
                    value: "Shalini Salon-Matale"
                },
                {
                    id: "fcf0e73a-597b-457e-a2cb-fed8ef179c30",
                    value: "Shalini Salon-Matale"
                },
                {
                    id: "fe260c66-ad88-475e-baa8-3df893755b3c",
                    value: "Prabath Salon-Matale"
                },
                {
                    id: "fe0ccf70-d26f-4f65-b913-1394b2f9c582",
                    value: "Prabath Salon-Matale"
                },
                {
                    id: "1f20199d-c06b-49bd-b2e3-c813d14ee4ae",
                    value: "Subashini Salon-Matara"
                },
                {
                    id: "2e36ea93-80ab-4f0d-b744-15c48c3eedc6",
                    value: "Subashini Salon-Matara"
                },
                {
                    id: "5fddd729-c77e-42ef-b393-0348322eb28d",
                    value: "Subashini Salon-Matara"
                },
                {
                    id: "4f54bd9c-f47c-42ff-bc04-cd2be6b4368a",
                    value: "Ranjani Salon-Matara"
                },
                {
                    id: "72d60507-8f81-470c-b301-c27c63465c5c",
                    value: "Ranjani Salon-Matara"
                },
                {
                    id: "fd5d79d3-585c-451e-84a9-addc38d6cc7b",
                    value: "Ranjani Salon-Matara"
                },
                {
                    id: "8cbd5d4d-1a08-4c7f-89f5-ac456d15b2d4",
                    value: "Nimal Salon-Matara"
                },
                {
                    id: "66b2257e-0fdc-47ea-9ed0-a91833f05158",
                    value: "Nimal Salon-Matara"
                },
                {
                    id: "4a215e5b-3d16-4e4e-9a05-139d171ed96d",
                    value: "Nimal Salon-Matara"
                },
                {
                    id: "db128089-3ed7-49fc-8acb-ebcfe5e6b767",
                    value: "Harsha Salon-Matara"
                },
                {
                    id: "da728d7b-4439-4322-bc08-6245de8ff730",
                    value: "Harsha Salon-Matara"
                },
                {
                    id: "02f53f7e-c242-4229-9a41-2cf223e9974c",
                    value: "Mahesh Salon-Matara"
                },
                {
                    id: "19f73a5f-94cd-4c0d-a2db-b778ddcd310a",
                    value: "Mahesh Salon-Matara"
                },
                {
                    id: "9a737948-b3bd-4775-8ceb-1d614d7560e4",
                    value: "Bimsara Salon-Matara"
                },
                {
                    id: "bc2f958d-19d5-4d18-9e0f-22538bac7fd6",
                    value: "Amila Salon-Nuwara Eliya"
                },
                {
                    id: "588f5d8f-3c2a-492e-bee9-ae1cfd840109",
                    value: "Amila Salon-Nuwara Eliya"
                },
                {
                    id: "8cc98d5a-c390-4b3b-b02b-babed22255ea",
                    value: "Amila Salon-Nuwara Eliya"
                },
                {
                    id: "1b1cdea8-652a-420c-9cb6-65568bbcf711",
                    value: "Chathurika Salon-Nuwara Eliya"
                },
                {
                    id: "5366d9d4-38bd-4657-9779-9c366f44f172",
                    value: "Chathurika Salon-Nuwara Eliya"
                },
                {
                    id: "ea72535b-1d05-4631-b60a-5e82edb31e78",
                    value: "Dileesha Salon-Nuwara Eliya"
                },
                {
                    id: "77f83193-76b6-4ff2-9681-5d367f414e4f",
                    value: "Prabath Salon-Nuwara Eliya"
                },
                {
                    id: "1438a19c-dfb5-4558-8913-f41a1deaf1f9",
                    value: "Shanika Salon-Nuwara Eliya"
                },
                {
                    id: "1174f3dc-332b-4ffc-8350-b27685ae503c",
                    value: "Shanika Salon-Nuwara Eliya"
                },
                {
                    id: "5465f3db-7750-43be-bf1f-a0ce628403c5",
                    value: "Shanika Salon-Nuwara Eliya"
                },
                {
                    id: "22905ee1-2b42-490a-b47b-c7a7fa6c1d73",
                    value: "Udara Salon-Nuwara Eliya"
                },
                {
                    id: "603f8c22-9504-4b5a-9379-b1d64942f0cf",
                    value: "Udara Salon-Nuwara Eliya"
                },
                {
                    id: "25d266e4-5fad-4de0-8657-9d5c4db2ffe0",
                    value: "Udara Salon-Nuwara Eliya"
                }
            ],
            resourceBaseUrl: "https://assets.dtl.lk/web/assets"
        },
  }),

  persist: true,

   //this.showToast('Loading successful!', 'success'); //success ,error ,warning,info
  actions: {/* 
    async sampleCall(req,showLoading) {
      const loadingAlert = showLoading('');    
      try {
        
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/Auxx/Lxx`, req);      
        loadingAlert.close();  
        
        if (response.data.isSuccess) {       
          this.showToast('Loading successful!', 'success'); 
       }
       else{
        console.error('Loading error:', response.data.message);       
        this.showToast('Loading Error!', 'error'); 
       }
       
        
      } catch (error) {
        console.error('Loading error:', error);
        this.showToast('Loading Error!', 'error'); 
      }
    }, */
    
    
   
  },
  showToast(message,type) {
    Swal.fire({
      icon: type,
      title: type,
      text: message,
      timer: 5000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
    })
  },
 
});
