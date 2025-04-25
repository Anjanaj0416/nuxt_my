import { defineStore } from "pinia";

import navImg from "../../assets/img/digitalTechLabs/standard/home2.png"
import navImg1 from "../../assets/img/digitalTechLabs/standard/home.png"
import navImg2 from "../../assets/img/digitalTechLabs/home.png"



import productImg1 from '../../assets/img/digitalTechLabs/standard/s1.png'
import productImg2 from '../../assets/img/digitalTechLabs/standard/s2.png'
import productImg3 from '../../assets/img/digitalTechLabs/standard/s5.png'
import productImg4 from '../../assets/img/digitalTechLabs/standard/s6.png'
import aboutImg from '../../assets/img/digitalTechLabs/standard/About.jpg'
import OurServicesImg from '../../assets/img/digitalTechLabs/standard/girlimage.jpg'

export const useStandpageStore = defineStore("standpage", {
  state: () => ({
    pageData: {
      standard:{
          // section1
          btnColor: "purple-700",
          logo: "Logo",
          navbar:{
            navbarColor: "purple-700",
            navImg1,
            navTitle: "Discover the Latest in Fashion",
            navSubTitle: "From timeless essentials to bold statement pieces, explore our curated collection of clothing designed to fit every style and occasion.",
          },
          // section2
          services:{
            title: "Our Services",
            subTitle: "We provide high-quality furniture solutions.",
            OurServicesImg,
            paragraph1: "At [Your Brand Name], we are dedicated to providing a personalized shopping experience that caters to your unique style. Our extensive collection includes the latest fashion trends, curated to ensure that you always look your best. Whether you're updating your wardrobe with the season's must-have pieces or searching for that perfect outfit for a special occasion, we've got you covered.",
            paragraph2: "From timeless classics to bold, contemporary designs, our clothing is crafted with premium fabrics and impeccable craftsmanship. We focus on delivering fashion that is both stylish and comfortable, making it easy to express yourself through your wardrobe.",
            paragraph3: "Explore our collections, enjoy exclusive discounts, and experience the convenience of shopping from the comfort of your home. With new arrivals every season and a constantly evolving selection, you can count on [Your Brand Name] to keep your style fresh, fun, and ahead of the curve.",
          },
          // section3
          product:{
            section2Title: "Blouses & Shirts",
            products: [
              {
                image: productImg1,
                alt: "Black T-shirt",
                title: "Comfort Fit Crew Neck T-shirt – Black",
                price: "Rs.990.00",
              },
              {
                image: productImg2,
                alt: "Space Blue T-shirt",
                title: "Comfort Fit Crew Neck T-shirt – Space Blue",
                price: "Rs.990.00",
              },
              {
                image: productImg3,
                alt: "Sky Blue T-shirt",
                title: "Comfort Fit Crew Neck T-shirt – Sky Blue",
                price: "Rs.990.00",
              },
              {
                image: productImg4,
                alt: "Muted Green T-shirt",
                title: "Comfort Fit Crew Neck T-shirt – Muted Green",
                price: "Rs.990.00",
              },
              {
                image: productImg1,
                alt: "Sapphire Blue T-shirt",
                title: "Comfort Fit Crew Neck T-shirt – Sapphire Blue",
                price: "Rs.990.00",
              },
            ],
          },
          // section4
          aboutParagraph: {
            title:"About Us",
            aboutImg,
            Paragraph1:"We are a passionate and innovative company committed to delivering high-quality products and services. Our mission is to provide transformative solutions that make a lasting impact.",
            Paragraph2:"At our core, we believe in building strong relationships with our customers, pushing the boundaries of creativity, and constantly evolving to meet the demands of the future.",
          },
          // section5
          contactSection: {
            title:"Contact Us",
            Paragraph1:"Have questions? We're here to help. Reach out to us anytime!",
            address: "123 Purple Street, Bambalapitiya, Colombo",
            bgImg:"https://img.freepik.com/premium-photo/fashionable-adult-customer-exploring-boutique-studio-with-modern-wardrobe-display_634278-45040.jpg?w=996",
            phone:"+1 234 567 890",
            email:"info@example.com",
            Paragraph2:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, aspernatur facilis molestiae deserunt expedita voluptatum amet vero quae quasi sunt hic officiis illo velit est necessitatibus doloremque quas nemo et.",
          },
          // section6
          brand: [
            {
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfdbmcwxOGNJpIncH4RuLgWzQjNGnXJgzFzsSyRxFfIUzdgQCwHDbLbfeWlIc_3D70KmE&usqp=CAUg",
            },
            {
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSRUrkrNkGAgreGVdPun-upZiPRcpZzf_oyA&s",
            },
            {
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKCSXc039TSXrlop1Qlx6XLaTfL7aGz49NzA&s",
            },
            {
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzauVhVXcdXcwh82ID82C50vvf1106Sm9Ogg&s",
            },
            {
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsoGXzWn6B9Wf0Cu0EEXVActiShg8jfG1QaA&s",
            },
            {
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlnlbQKyeZnutwavifhGkk3NJinRyqzB3BGw&s",
            },
          ]          
        },
      premium:{
        // section1
        btnColor: "bg-gray-800",
        logo: "Premium Logo",
        navbar: {
          navbarColor: "gray-900",
        },
        // section2
        sliders: [
          { img: navImg2 },
          { img: navImg },
        ],
        // section3
        first:{
          firstTitle: "Shop for Women's",
          firstTitleDataSlider: [
            {
              image: productImg1,
              alt: "Black T-shirt",
              title: "Comfort Fit Crew Neck T-shirt – Black",
              price: "Rs.990.00",
            },
            {
              image: productImg2,
              alt: "Space Blue T-shirt",
              title: "Comfort Fit Crew Neck T-shirt – Space Blue",
              price: "Rs.990.00",
            },
            {
              image: productImg3,
              alt: "Sky Blue T-shirt",
              title: "Comfort Fit Crew Neck T-shirt – Sky Blue",
              price: "Rs.990.00",
            },
            {
              image: productImg4,
              alt: "Muted Green T-shirt",
              title: "Comfort Fit Crew Neck T-shirt – Muted Green",
              price: "Rs.990.00",
            },
            {
              image: productImg1,
              alt: "Sapphire Blue T-shirt",
              title: "Comfort Fit Crew Neck T-shirt – Sapphire Blue",
              price: "Rs.990.00",
            },
          ], 
        },
        // section4
        second:{
          title:"New Year Clothing",
          subTitle: "Celebrate in style with our exclusive New Year collection",
          secondDataProduct: [
            {
              image: productImg1,
              promo: true,
              alt: "Black T-shirt",
              title: "Comfort Fit Crew Neck T-shirt – Black",
              price: "Rs.990.00",
            },
            {
              image: productImg2,
              alt: "Space Blue T-shirt",
              title: "Comfort Fit Crew Neck T-shirt – Space Blue",
              price: "Rs.990.00",
            },
            {
              image: productImg3,
              alt: "Sky Blue T-shirt",
              title: "Comfort Fit Crew Neck T-shirt – Sky Blue",
              price: "Rs.990.00",
            },
            {
              image: productImg4,
              alt: "Muted Green T-shirt",
              title: "Comfort Fit Crew Neck T-shirt – Muted Green",
              price: "Rs.990.00",
            },
            {
              image: productImg1,
              alt: "Sapphire Blue T-shirt",
              title: "Comfort Fit Crew Neck T-shirt – Sapphire Blue",
              price: "Rs.990.00",
            },
          ], 
        }
      },
      enterprise: {
        // section1
        btnColor: "bg-blue-900",
        color:"g-blue-900",
        logo: "Logo",
        navbar: {
          navbarColor: "bg-blue-900",
          navTitle: "Discover the Latest in Fashion",
          navSubTitle:
            "From timeless essentials to bold statement pieces, explore our curated collection of clothing designed to fit every style and occasion.",
        },
        // section2
        sliders: [
          { img: navImg2 },
          { img: navImg },
        ],
        // section3
        first:{
          firstTitle: 'POPULAR RIGHT NOW',
          firstTitleDataSlider: [
            {
              image: productImg1,
              alt: "Black T-shirt",
              title: "Comfort Fit Crew Neck T-shirt – Black",
              price: "Rs.990.00",
            },
            {
              image: productImg2,
              alt: "Space Blue T-shirt",
              title: "Comfort Fit Crew Neck T-shirt – Space Blue",
              price: "Rs.990.00",
            },
            {
              image: productImg3,
              alt: "Sky Blue T-shirt",
              title: "Comfort Fit Crew Neck T-shirt – Sky Blue",
              price: "Rs.990.00",
            },
            {
              image: productImg4,
              alt: "Muted Green T-shirt",
              title: "Comfort Fit Crew Neck T-shirt – Muted Green",
              price: "Rs.990.00",
            },
            {
              image: productImg1,
              alt: "Sapphire Blue T-shirt",
              title: "Comfort Fit Crew Neck T-shirt – Sapphire Blue",
              price: "Rs.990.00",
            },
          ],
          firstTitleImg:'https://cdn.shopify.com/s/files/1/0095/7602/2078/files/ban2_600x600.jpg?v=1618478010',
        },
        // section4
        second:{
          secondTitle: 'Shop by Category',
          secondTitleLeftSideTitle: 'Sale',
          secondTitleLeftSideSubTitle: 'Your fashion choice',
          secondTitleLeftSideBgColor:'bg-orange-50',
          secondTitleLeftSide: [
            { name: 'Ring', price: 'LKR278.03', oldPrice: 'LKR559.04', rating: '⭐ 4.8 • 5,000+ sold', image: 'https://www.shutterstock.com/image-photo/beautiful-brunette-woman-natural-makeup-600nw-1709294872.jpg' },
            { name: 'Bracelet', price: 'LKR7,174.84', oldPrice: 'LKR18,002.87', rating: '⭐ 4.7 • 3,000+ sold', image: 'https://www.nolimit.lk/_next/image?url=https%3A%2F%2Fcdn.greencloudpos.com%2Fnolimit.lk%2Fv2-Shop%20For%20Kids%20Banners%2Fstatic%20banner-1722853444066.jpeg%3Fwidth%3D600&w=750&q=75' },
            { name: 'Dress', price: 'LKR4,758.09', oldPrice: 'LKR13,594.52', rating: '⭐ 5.0 • 130 sold', image: 'https://media.istockphoto.com/id/1404894296/photo/woman-with-stylish-bag-on-grey-background-closeup.jpg?s=612x612&w=0&k=20&c=I3PMzjMTCF-DNmewuEt-lvjddg8Fg1Y9xnh2hurB12k=' },
            { name: 'Sneakers', price: 'LKR9,258.33', oldPrice: 'LKR15,599.00', rating: '⭐ 4.9 • 1,200+ sold', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_4lDlPV-XEoeCjTYafRGCzW4vkugs7cWoVPu8c11OL-0Swh7lIwx1K6efaYpfA_JXvKU&usqp=CAU' }
          ],
          secondTitleRightSide: [
            { name: 'Luggages & Bags', image: 'https://thilakawardhana.com/cdn/shop/files/BAGS-_--SHOES_1570x.png?v=1723445392',slug: 'luggages-bags' },
            { name: 'Home & Life Style', image: 'https://thilakawardhana.com/cdn/shop/files/HOME-_-LIFE-STYLE_1570x.png?v=1723446093',slug: 'home-garden' },
            { name: 'Mother Baby Care', image: 'https://thilakawardhana.com/cdn/shop/files/MOTHER-_-BABY-CARE_1570x.png?v=1723445792',slug: 'home-garden' },
            { name: "Men's Clothing", image: 'https://thilakawardhana.com/cdn/shop/files/MENS_da71f2fd-ad52-4bec-88a8-5eb6b727c321_1570x.png?v=1723446204',slug: 'home-garden' },
            { name: "Women's Clothing", image: 'https://thilakawardhana.com/cdn/shop/files/WOMENS_18c1fd44-5cad-4756-8e59-0493a0af82a5_1570x.png?v=1723446146',slug: 'home-garden' },
            { name: 'Kids', image: 'https://thilakawardhana.com/cdn/shop/files/KIDS_b9b1fc65-1840-4def-ac4c-1c02b0a61e25_1570x.png?v=1723445838',slug: 'home-garden' }
          ],
          firstTitleImg:'https://cdn.shopify.com/s/files/1/0095/7602/2078/files/ban2_600x600.jpg?v=1618478010',

        },
        // section5
        third:{
          thirdTitle: "Shop for Women's",
          thirdTitleDataSlider: [
            {
              image: productImg1,
              alt: "Black T-shirt",
              title: "Comfort Fit Crew Neck T-shirt – Black",
              price: "Rs.990.00",
            },
            {
              image: productImg2,
              alt: "Space Blue T-shirt",
              title: "Comfort Fit Crew Neck T-shirt – Space Blue",
              price: "Rs.990.00",
            },
            {
              image: productImg3,
              alt: "Sky Blue T-shirt",
              title: "Comfort Fit Crew Neck T-shirt – Sky Blue",
              price: "Rs.990.00",
            },
            {
              image: productImg4,
              alt: "Muted Green T-shirt",
              title: "Comfort Fit Crew Neck T-shirt – Muted Green",
              price: "Rs.990.00",
            },
            {
              image: productImg1,
              alt: "Sapphire Blue T-shirt",
              title: "Comfort Fit Crew Neck T-shirt – Sapphire Blue",
              price: "Rs.990.00",
            },
          ],
          
        },
        fourth:{

        },
        logos: [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfdbmcwxOGNJpIncH4RuLgWzQjNGnXJgzFzsSyRxFfIUzdgQCwHDbLbfeWlIc_3D70KmE&usqp=CAUg',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSRUrkrNkGAgreGVdPun-upZiPRcpZzf_oyA&s',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKCSXc039TSXrlop1Qlx6XLaTfL7aGz49NzA&s',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzauVhVXcdXcwh82ID82C50vvf1106Sm9Ogg&s',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsoGXzWn6B9Wf0Cu0EEXVActiShg8jfG1QaA&s',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlnlbQKyeZnutwavifhGkk3NJinRyqzB3BGw&s',
          'https://thilakawardhana.com/cdn/shop/files/bella_370x.png?v=1722712079',
          'https://thilakawardhana.com/cdn/shop/files/Trafford_570x.png?v=1722744665',
          'https://thilakawardhana.com/cdn/shop/files/engage1_370x.png?v=1722711253',
          'https://thilakawardhana.com/cdn/shop/files/Knot2_370x.png?v=1722711253',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsoGXzWn6B9Wf0Cu0EEXVActiShg8jfG1QaA&s',
          'https://thilakawardhana.com/cdn/shop/files/Trafford_570x.png?v=1722744665'
        ],
        branches: [
          {
            img: 'https://www.distinctdestinations.in/DistinctDestinationsBackEndImg/downloads/Galle-Fort-2.jpg',
            location: 'Matara  ',
            address: '354, Dharmadhasa Mawatha, Matara',
            email: 'matara@gmail.com',
            contactNumber: '123456789',
          },
          {
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkyF4EZc3XW45Mc6rAz2dONdIhpDwDQJB6uQ&s',
            location: 'Colombo  ',
            address: '354, Dharmadhasa Mawatha, Matara',
            email: 'matara@gmail.com',
            contactNumber: '123456789',
          },
          {
            img: 'https://d1bv4heaa2n05k.cloudfront.net/posts%2FSk4PxXgmKabAJWWzo%2F1462960950058-12485884_505689259610041_4744438127116937100_o_.jpg',
            location: 'Galle',
            address: '354, Dharmadhasa Mawatha, Matara',
            email: 'matara@gmail.com',
            contactNumber: '123456789',
          },
          {
            img: 'https://www.distinctdestinations.in/DistinctDestinationsBackEndImg/downloads/Pedlar-Street-2.jpg',
            location: 'Mirissa',
            address: '354, Dharmadhasa Mawatha, Matara',
            email: 'matara@gmail.com',
            contactNumber: '123456789',
          },
        ],
        lastBanner: [
          'https://coolplanet.lk/cdn/shop/files/HADA_web_banner_2160_x_720.png?v=1744181616&width=2000'
        ],
      }
    },
   
   
  }),

  

});