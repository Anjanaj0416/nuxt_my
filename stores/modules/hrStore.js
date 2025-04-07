import { defineStore } from 'pinia';
import axios from 'axios';

export const useHrStore = defineStore('hrStore', {
  state: () => ({
    loggeduser: {},
    alempdetails: [],
    empdetails: {
      isresigned : false,
      empId : "173",
      image : "abc.png",
      empname : "Thilini",
      empno : "B00253",
      epfNo : "253",
      callingname : "Thilini",
      nic : "975063780V",
      address : "No. 82/1, St.Rita's Road, Mt.lavinia",
      contact1 : "0767585568",
      email1 : "thili@abc.com",
      email2 : "thili2@abc.com",
      homePhoneNo : "0112410503",
      emergencyContact : "0112410503",
      gender : "Female",
      dob : "01/06/97",
      deptNo : "Digital Service",
      staffType : "SLTDS",
      empType : "Post-Contract",
      dateOfJoin : "02/01/23",
      category : "Employee",
      isExecutive : "No",
      isExecutive : "No",
      supervisor : "Thushara Premathilake",
      annualLeave : "14",
      casualLeave : "7",
      sickLeave : "7",
      otherLeave : "0",
      isOTAllow : "Yes",
      onTime : "08:30:00",
      offTime : "17:00:00",
      username : "B00253",
      isResign : "No",
      dateOfResign : "01/01/00",
      reasonForResign : "",
      signature : "signature.png",
    },
    attendence: {
      tot_normal_overtime: 10,
      tot_sunday_overtime: 5,
      alattendences: [
        {
          id: 5,
          empno: "B00253",
          date: "2025-04-01",
          inlocation: "SLT-SI03",
          outlocation: "SLT-SI03",
          overtime: 10,
          latemin: 10,
          daytype: 505,
          intime: '07:20',
          outtime: '05:20',
          swipesin: [
            1,
            2,
            3
          ],
          swipesout: [
            1,
            2,
            3
          ],
        },
        {
          id: 5,
          empno: "B00253",
          date: "2025-04-01",
          inlocation: "SLT-SI03",
          outlocation: "SLT-SI03",
          overtime: 10,
          latemin: 10,
          daytype: 505,
          intime: '07:20',
          outtime: '05:20',
          swipesin: [
            1,
            2,
            3
          ],
          swipesout: [
            1,
            2,
            3
          ],
        },
        {
          id: 5,
          empno: "B00253",
          date: "2025-04-01",
          inlocation: "SLT-SI03",
          outlocation: "SLT-SI03",
          overtime: 10,
          latemin: 10,
          daytype: 505,
          intime: '07:20',
          outtime: '05:20',
          swipesin: [
            1,
            2,
            3
          ],
          swipesout: [
            1,
            2,
            3
          ],
        },
      ]
    },
    timecard: {
      arrtimecard: [
        {
          emp_Name: "Thilini [B00253]",
          month_name: "January 2024",
          total_hours: 179,
          total_single_ot: 0,
          total_double_ot: 0,
          leaves: 5,
          shortLeave: 1,
          halfdays: 0,
          movement: 0,
          pendingat: "Thushara 010805",
          status: "Approved",
        },
        {
          emp_Name: "Thilini [B00253]",
          month_name: "January 2024",
          total_hours: 179,
          total_single_ot: 0,
          total_double_ot: 0,
          leaves: 5,
          shortLeave: 1,
          halfdays: 0,
          movement: 0,
          pendingat: "Thushara 010805",
          status: "Approved",
        },
        {
          emp_Name: "Thilini [B00253]",
          month_name: "January 2024",
          total_hours: 179,
          total_single_ot: 0,
          total_double_ot: 0,
          leaves: 5,
          shortLeave: 1,
          halfdays: 0,
          movement: 0,
          pendingat: "Thushara 010805",
          status: "Approved",
        },
      ]
    },
    initData: {},
    authToken: "",
    isLoading: true,
  }),

   //this.showToast('Loading successful!', 'success'); //success ,error ,warning,info

  actions: {
    async getInitEmployee() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/hr/Employee/GetInitEmployee`);   
        // console.log("response:",response);   
        if (response.data.isSuccess) {    
          this.initData = response.data.data.data || [];
          this.showToast('Loading successful!', 'success'); 
       }
       else{
        console.error('Loading error:', response.data.message);       
        // this.showToast(response.data.message, 'error'); 
       }
       
        
      } catch (error) {
        console.error('Loading error:', error);
        // this.showToast(error.response.data.Message, 'error'); 
      }
    },

    async searchEmployees(req) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/hr/Employee/SearchEmployees`, req);   
        // console.log("response:",response);   
        if (response.data.isSuccess) {    
          this.alempdetails = response.data.data.data.alpagedetails[0].alempdetails || [];
          this.showToast('Loading successful!', 'success'); 
       }
       else{
        console.error('Loading error:', response.data.message);       
        this.showToast(response.data.message, 'error'); 
       }
       
        
      } catch (error) {
        console.error('Loading error:', error);
        this.showToast(error.response.data.Message, 'error'); 
      }
      
      finally {
        this.isLoading = false; // Set loading to false after fetching
      }
    },

    async getEmployeeByID(id) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/hr/Employee/GetEmployeeByID`, {params: { id: id.empid}});   
        // console.log("response:",response.data.data.data);   
        if (response.data.isSuccess) {    
          this.empdetails = response.data.data.data || {};
          // this.showToast('Loading successful!', 'success'); 
       }
       else{
        console.error('Loading error:', response.data.message);       
        // this.showToast(response.data.message, 'error'); 
       }
       
        
      } catch (error) {
        console.error('Loading error:', error);
        this.showToast(error.response.data.Message, 'error'); 
      }
    },
    
    async showToast(message,type) {
      const Swal = (await import('sweetalert2')).default;
      Swal.fire({
        icon: type,
        title: type,
        text: message,
        timer: 3000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
      });
    },
   
  },
});
