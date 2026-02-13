// stores/systemdata.js
import { defineStore } from 'pinia'
import axios from 'axios'

const api_call = axios.create({
  baseURL: process.env.base_url,
})

export const useSystemDataStore = defineStore('systemdata', {
  state: () => ({
    loading: false,

    systemdata: {
      id: 0,
      createddate: '1900-01-01',
      updateddate: '1900-01-01',
      createdby: '',
      updatedby: '',
      dtype: '',
      dvalue: '',
      status: 1,
    },

    systemdataresult: {},
    alsystemdata: [],
    initData: {},
    companyprofile: {},

    mlabSettings: {
      sendReportsVia: {
        viaSMS: false,
        viaWhatsApp: false,
        viaEmail: false,
      },
    },

    iseditmode: false,
  }),

  actions: {
    setLoading(value) {
      this.loading = value
    },

    pushNotification(type, message) {
      console.log(`[${type}] ${message}`)
      // Replace with your notification system if available
    },

    // --- API Actions ---
    async getCompanyProfile(req) {
      this.setLoading(true)
      try {
        const { data } = await api_call.post('/Systemdata/getCompanyProfile', req)
        if (data.result.resultcode === 100) {
          this.companyprofile = data.companyprofile
        } else {
          this.pushNotification('Failed', data.result.resultdesc)
        }
      } catch (error) {
        this.pushNotification('Failed', error.message || error)
      } finally {
        this.setLoading(false)
      }
    },

    async getInitData(req) {
      this.setLoading(true)
      try {
        const { data } = await api_call.post('/Systemdata/getInitData', req)
        if (data.result.resultcode === 100) {
          this.initData = data.initData
        } else {
          this.pushNotification('Failed', data.result.resultdesc)
        }
      } catch (error) {
        this.pushNotification('Failed', error.message || error)
      } finally {
        this.setLoading(false)
      }
    },

    async getSearch(req) {
      console.log(JSON.stringify(req))
      this.setLoading(true)
      try {
        const { data } = await api_call.post('/Systemdata/getSearch', req)
        if (data.result.resultcode === 100) {
          if (data.systemdataresult.totalpages === 0) {
            this.pushNotification('Success', 'No Result Found')
          }
          this.systemdataresult = data.systemdataresult
          this.alsystemdata =
            data.systemdataresult.totalpages > 0
              ? data.systemdataresult.alpagedetails[0].alsystemdata
              : []
        } else {
          this.pushNotification('Failed', data.result.resultdesc)
        }
      } catch (error) {
        this.pushNotification('Failed', error.message || error)
      } finally {
        this.setLoading(false)
      }
    },

    async getSave(req) {
      this.setLoading(true)
      try {
        const { data } = await api_call.post('/Systemdata/getSave', req)
        if (data.result.resultcode === 100) {
          if (req.systemdata.id === 0 && data.updated_systemdata.id > 0) {
            this.alsystemdata.unshift(data.updated_systemdata)
          } else {
            const index = this.alsystemdata.findIndex(
              (a) => a.id === data.updated_systemdata.id
            )
            if (index !== -1) this.alsystemdata[index] = data.updated_systemdata
          }
          this.pushNotification('Success', data.result.resultdesc)
          this.iseditmode = false
        } else {
          this.pushNotification('Failed', data.result.resultdesc)
        }
      } catch (error) {
        this.pushNotification('Failed', error.message || error)
      } finally {
        this.setLoading(false)
      }
    },

    async getSaveImage(Uploading_image_details) {
      this.setLoading(true)
      try {
        const { data } = await api_call.post('/Systemdata/Upload', Uploading_image_details)
        if (data.result.resultcode === 100) {
          this.systemdata.image = data.uploaded_image_name
          this.pushNotification('Success', data.result.resultdesc)
        } else {
          this.pushNotification('Failed', data.result.resultdesc)
        }
      } catch (error) {
        this.pushNotification('Failed', error.message || error)
      } finally {
        this.setLoading(false)
      }
    },

    async getDelete(systemdata) {
      this.setLoading(true)
      try {
        const { data } = await api_call.post('/Systemdata/getDelete', systemdata)
        if (data.result.resultcode === 100) {
          this.alsystemdata = this.alsystemdata.filter((a) => a.id !== data.updated_systemdata.id)
          this.pushNotification('Success', data.result.resultdesc)
        } else {
          this.pushNotification('Failed', data.result.resultdesc)
        }
      } catch (error) {
        this.pushNotification('Failed', error.message || error)
      } finally {
        this.setLoading(false)
      }
    },

    async setSaveSettings(req) {
      this.setLoading(true)
      try {
        const { data } = await api_call.post('/Systemdata/setSaveSettings', req)
        if (data.result.resultcode === 100) {
          this.mlabSettings = data.mlabSettings
          this.pushNotification('Success', 'Mlab Settings Saved..')
        } else {
          this.pushNotification('Failed', data.result.resultdesc)
        }
      } catch (error) {
        this.pushNotification('Failed', error.message || error)
      } finally {
        this.setLoading(false)
      }
    },

    async getMlabSettings(req) {
      this.setLoading(true)
      try {
        const { data } = await api_call.post('/Systemdata/getMlabSettings', req)
        if (data.result.resultcode === 100) {
          this.mlabSettings = data.mlabSettings
        } else {
          this.pushNotification('Failed', data.result.resultdesc)
        }
      } catch (error) {
        this.pushNotification('Failed', error.message || error)
      } finally {
        this.setLoading(false)
      }
    },

    // --- Helpers / Pagination ---
    setPage(pagenumber) {
      if (
        this.systemdataresult.alpagedetails &&
        this.systemdataresult.alpagedetails[pagenumber - 1]
      ) {
        this.alsystemdata = this.systemdataresult.alpagedetails[pagenumber - 1].alsystemdata
      }
    },

    setEditMode(flag) {
      this.iseditmode = flag
    },

    clearSystemData() {
      this.systemdata = {
        id: 0,
        createddate: '1900-01-01',
        updateddate: '1900-01-01',
        createdby: '',
        updatedby: '',
        dtype: '',
        dvalue: '',
        status: 1,
      }
    },

    clearAllSystemData() {
      this.alsystemdata = []
    },
  },
})
