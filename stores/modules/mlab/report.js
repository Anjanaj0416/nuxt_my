// stores/report.js
import { defineStore } from 'pinia'
import axios from 'axios'

const api_call = axios.create({
  baseURL: process.env.base_url,
})

const api_call_miracle = axios.create({
  baseURL: process.env.base_url_miracle,
})

export const useReportStore = defineStore('report', {
  state: () => ({
    myaccountdetails: [],
    cashcollectionReportData: {},
    orderSummeryReportData: {
      alDayOrderCount: [],
      totalGross: 0.0,
      totalDiscount: 0.0,
      totalNet: 0.0,
      noOfTest: 0,
      alorders: [],
    },
    payment: {
      outstanding: 1500,
      duedate: '6/19/2022',
      payToBank: {
        slipImage: 'PaySlip.png',
        bankName: 'Sampath',
        accName: 'Miracle Software Solutions',
        accNumber: '1183-1401-6680',
        refNumber: 'ml0001',
        contact: '+94715321168',
      },
    },
    invoices: [
      { id: 1, invoiceNo: 'mlab001-2301', month: 5, year: 2023, description: '12 Reports * 2.50', total: 500, status: 'pending' },
      { id: 2, invoiceNo: 'mlab001-2302', month: 6, year: 2023, description: '12 Reports * 2.50', total: 500, status: 'pending' },
      { id: 3, invoiceNo: 'mlab001-2303', month: 7, year: 2023, description: '12 Reports * 2.50', total: 500, status: 'pending' },
    ],
    loading: false,
  }),
  actions: {
    setLoading(value) {
      this.loading = value
    },

    async apiHandler({ api, endpoint, req, mutation = null }) {
      this.setLoading(true)
      try {
        const { data } = await api.post(endpoint, req)
        if (data.result.resultcode === 100) {
          if (mutation) this[mutation] = data.reportdata || data.myaccountdetails
          return data
        } else {
          this.pushNotification('Failed', data.result.resultdesc)
          return null
        }
      } catch (error) {
        this.pushNotification('Failed', error.message || error)
        return null
      } finally {
        this.setLoading(false)
      }
    },

    pushNotification(type, message) {
      // You can integrate with your global notification system
      console.log(`[${type}] ${message}`)
    },

    // Reports
    async getMyAccountDetails(req) {
      const data = await this.apiHandler({
        api: api_call_miracle,
        endpoint: '/Report/getMyAccountDetails',
        req,
        mutation: 'myaccountdetails',
      })
      if (data) this.myaccountdetails = data.myaccountdetails
    },

    async getCashCollectionReportData(req) {
      await this.apiHandler({
        api: api_call,
        endpoint: '/Report/getCashCollectionReportData',
        req,
        mutation: 'cashcollectionReportData',
      })
    },

    async getOrderSummeryReportData(req) {
      await this.apiHandler({
        api: api_call,
        endpoint: '/Report/getOrderSummeryReportData',
        req,
        mutation: 'orderSummeryReportData',
      })
    },

    // Reset functions
    resetCashCollection() {
      this.cashcollectionReportData = {}
    },

    resetOrderSummery() {
      this.orderSummeryReportData = {
        alDayOrderCount: [],
        totalGross: 0.0,
        totalDiscount: 0.0,
        totalNet: 0.0,
        noOfTest: 0,
        alorders: [],
      }
    },
  },
})
