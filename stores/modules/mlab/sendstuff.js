// stores/sendstuff.js
import { defineStore } from 'pinia'
import axios from 'axios'

const api_call = axios.create({
  baseURL: process.env.base_url,
})

const api_call_miracle = axios.create({
  baseURL: process.env.base_url_miracle,
})

export const useSendStuffStore = defineStore('sendstuff', {
  state: () => ({
    arrBusinessTypes: ['MedicalLabs', 'serviceCenter'],
    arrDistricts: ['Gampaha', 'Colombo', 'Kalutara'],

    company: {
      id: 1,
      companyName: 'TestLab',
      companyLogo: 'test_medical_labs.png',
      companyAddress: 'No 16,W/Palliyapitiya,Dunagaha',
      companyEmail: 'testlab@gmail.com',
      companyPhone: '+94 71 532 1168',
      city: 'Dunagaha',
      district: 'Gampaha',
      companySMSNumber: '',
      companyWeb: '',
      ownerName: '',
      ownerPhone: '',
      companyFb: '',
      companyTweeter: '',
      companyLinkedIn: '',
      products: [],
      businessType: 'MedicalLabs',
      companyBR: 'br.png',
      geolocation: { lat: 0.0, lng: 0.0 },
    },

    landingpageresult: {
      companyId: 1,
      companyName: 'TestLab',
      companyLogo: 'logo.png',
      billNo: 'A012254',
      companyAddress: 'No 16,W/Palliyapitiya,Dunagaha',
      companyEmail: 'testlab@gmail.com',
      companyPhone: '+94 71 532 1168',
      city: 'Dunagaha',
      clientSalutation: 'Dear Mr.Thushara',
      itemHeading1: 'kindly collect your attached reports',
      itemHeading2:
        'Should you require any clarification about this reports, please contact us.',
      listItmes: ['Date - 02 Aug 2023', 'Bill No - 0211522'],
      date: '01 August 2023',
      listFiles: [
        {
          name: 'FBS/US',
          url: 'https://drive.google.com/file/d/1Hcd6MnCpuQaJhrPHGvvrQVFruyaIoE7v/view?usp=share_link',
        },
      ],
      products: [
        { id: 1, filename: 'edirectory-web-banner.jpg', redirectUrl: 'https://rainbowpages.lk/ebook/', filedata: '', isuploaded: true },
        { id: 2, filename: 'wedding-banne1r.jpg', redirectUrl: 'https://weddingdirectory.lk/', filedata: '', isuploaded: true },
        { id: 3, filename: 'tourqist.jpg', redirectUrl: 'http://touristdirectory.lk/', filedata: '', isuploaded: true },
        { id: 4, filename: 'am_1.jpg', redirectUrl: 'https://automobile.lk/', filedata: '', isuploaded: true },
        { id: 5, filename: 'cb.jpg', redirectUrl: 'https://www.careerhub.lk/', filedata: '', isuploaded: true },
      ],
      miracleProductLogo: 'mlab_logo1.png',
      miracleProductEmail: 'miraclesoft@sltnet.lk',
      miracleProductHotline: '070-505-2425',
      companyFb: 'https://www.facebook.com/SLTDigitalServices',
      companyTweeter: 'https://twitter.com/rainbowpageslk ',
      companyLinkedIn: 'https://www.linkedin.com/company/rainbowpages',
      geolocations: [{ lat: 6.927079, lng: 79.861244 }],
    },

    loading: false,
  }),

  actions: {
    setLoading(value) {
      this.loading = value
    },

    pushNotification(type, message) {
      console.log(`[${type}] ${message}`)
      // Replace with your notification system if available
    },

    async uploadFile(req) {
      this.setLoading(true)
      try {
        const { data } = await api_call_miracle.post('/Miracle/SaveAnyFile', req)
        if (data.result.resultcode === 100) {
          this.company.companyLogo = data.filename
          this.landingpageresult.companyLogo = data.filename
        } else {
          this.pushNotification('Failed', data.result.resultdesc)
        }
      } catch (error) {
        this.pushNotification('Failed', error.message || error)
      } finally {
        this.setLoading(false)
      }
    },

    setBusinessType(type) {
      this.company.businessType = type
    },
  },
})
