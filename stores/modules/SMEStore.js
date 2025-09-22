import { defineStore } from "pinia";

import heroImg from "../../assets/img/digitalTechLabs/home.png"
import productImg1 from '../../assets/img/digitalTechLabs/s1.png'
import productImg2 from '../../assets/img/digitalTechLabs/s2.png'
import productImg3 from '../../assets/img/digitalTechLabs/s5.png'
import productImg4 from '../../assets/img/digitalTechLabs/s6.png'
import aboutImg from '../../assets/img/digitalTechLabs/About.jpg'
import OurServicesImg from '../../assets/img/digitalTechLabs/girlimage.jpg'

export const useDtlStore = defineStore("standpage", {
  state: () => ({
    pageData: {
      section1:"ddd",
      css:{
      navbarColor: "bg-purple-500",
      heroImg,
      btnColor: "purple-700", 
      productImg1,
      productImg2,
      productImg3,
      productImg4,
      aboutImg,
      OurServicesImg,
    }

    },
   
   
  }),

  

});