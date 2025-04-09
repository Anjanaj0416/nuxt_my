import { defineStore } from "pinia";

import navImg from "../../assets/img/digitalTechLabs/home.png"
import productImg1 from '../../assets/img/digitalTechLabs/s1.png'
import productImg2 from '../../assets/img/digitalTechLabs/s2.png'
import productImg3 from '../../assets/img/digitalTechLabs/s5.png'
import productImg4 from '../../assets/img/digitalTechLabs/s6.png'
import aboutImg from '../../assets/img/digitalTechLabs/About.jpg'
import OurServicesImg from '../../assets/img/digitalTechLabs/girlimage.jpg'

export const useStandpageStore = defineStore("standpage", {
  state: () => ({
    pageData: {
      css:{
          // section1
          btnColor: "purple-700",
          logo: "Logo",
          navbar:{
            navbarColor: "purple-700",
            navImg,
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
            productDetails:{
              productBgColor:"purple-700",
              product1:{
                name: "WOMENS CARGO PANT",
                productImg1,
                discount: " Up to 5% off",
                price: "4,300",
              },
              product2:{
                name: "ETHNIC FUSION KURTHI SET",
                productImg2,
                discount: " Up to 15% off",
                price: "2,599",
              },
              product3:{
                name: "WOMENS WIDE LEG PANT",
                productImg3,
                discount: " ",
                price: "3,900",
              },
              product4:{
                name: "AMANI RIBBED CO - ORD SET",
                productImg4,
                discount: " ",
                price: "6,990",
              },
            },
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
        }

    },
   
   
  }),

  

});