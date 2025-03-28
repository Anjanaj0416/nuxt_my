import { defineStore } from 'pinia';
import axios from 'axios';

export const useHrStore = defineStore('hr', {
  state: () => ({
    loggeduser: {},
    alempdetails: [{
        isresigned : false,
        empname : "Thilini",
        empno : "B00253",
        contact : "0767585568",
        email : "thili@abc.com",
        designation : "Software Developer",
        supervisor : "Thushara Premathilake",
        department : "Digital Service",
        designation : "Software Developer",
    }],
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
    initData: {},
  }),

   //this.showToast('Loading successful!', 'success'); //success ,error ,warning,info
  actions: {
    async searchEmployees(req) {
      try {
        
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/Auxx/Lxx`, req);      
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
    },
    
    showToast(message,type) {
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
