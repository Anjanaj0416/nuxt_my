<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">
          Emplayee Details
        </h2>
        <closebtn @close="closeModal" />
      </div>

      <!-- Modal Content (scrollable) -->
      <div class="modal-content">
        <div class="form-content">
          <h3 class="font-bold">General Information</h3>
          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            
          </div>

          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Employee Name <span class="text-red-500">*</span>
              </label>
              <input type="text" v-model="curEmp.Name" placeholder="Enter company Name" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.Name" class="mt-2 text-sm text-red-600">
                {{ err.Name }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                NIC Number <span class="text-red-500">*</span>
              </label>
              <input type="text" v-model="curEmp.NIC" placeholder="Enter NIC Number" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.NIC" class="mt-2 text-sm text-red-600">
                {{ err.NIC }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Address <span class="text-red-500">*</span>
              </label>
              <input type="text" v-model="curEmp.Address" placeholder="Enter Address Line 2" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.Address" class="mt-2 text-sm text-red-600">
                {{ err.Address }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Contact Number 1<span class="text-red-500">*</span>
              </label>
              <input type="tel" v-model="curEmp.Contact1" placeholder="Enter Contact Number 1" maxlength="10"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.Contact1" class="mt-2 text-sm text-red-600">
                {{ err.Contact1 }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Contact Number 2</label>
              <input type="text" v-model="curEmp.Contact2" :maxlength="10" placeholder="Enter Contact Number 2"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
              <p v-if="err.Contact2" class="mt-2 text-sm text-red-600">
                {{ err.Contact2 }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Email 1<span class="text-red-500">*</span>
              </label>
              <input type="Email" v-model="curEmp.Email1" placeholder="Enter Email 1"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
              <p v-if="err.Email1" class="mt-2 text-sm text-red-600">
                {{ err.Email1 }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Email 2<span class="text-red-500">*</span>
              </label>
              <input type="Email" v-model="curEmp.Email2" placeholder="Enter Email 2"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
              <p v-if="err.Email2" class="mt-2 text-sm text-red-600">
                {{ err.Email2 }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Emergency Contact Number</label>
              <input type="text" v-model="curEmp.EmergencyContact" :maxlength="10" placeholder="Enter Emergency Contact Number"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.EmergencyContact" class="mt-2 text-sm text-red-600">
                {{ err.EmergencyContact }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Department <span class="text-red-500">*</span>
              </label>
              <serach_Input
                :arrItems="useEmployee.initEmployee.arrDepartments"
                ref="refDepartment"
                label=""
                v-model="curEmp.Department"
                @selectItem="GetSelectDepartment"
              />
              <p v-if="err.Department" class="mt-2 text-sm text-red-600">
                {{ err.Department }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Designation <span class="text-red-500">*</span>
              </label>
              <input type="text" v-model="curEmp.Designation" placeholder="Enter Designation"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
              <p v-if="err.Designation" class="mt-2 text-sm text-red-600">
                {{ err.Designation }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                EPF No
              </label>
              <input type="text" v-model="curEmp.EPFNo" placeholder="Enter EPF No"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
              <p v-if="err.EPFNo" class="mt-2 text-sm text-red-600">
                {{ err.EPFNo }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-600 mb-2">Gender</label>
              <selectinput
                :selections="useEmployee.initEmployee.arrGender"
                v-model="curEmp.Gender"
                label=""
              />

              <p v-if="err.Gender" class="mt-2 text-sm text-red-600">
                {{ err.Gender }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Staff Type</label>
              <serach_Input
                :arrItems="useEmployee.initEmployee.arrStaffTypes"
                ref="refStaffType"
                label=""
                v-model="curEmp.StaffType"
                @selectItem="GetSelectStaffType"
              />

              <p v-if="err.StaffType" class="mt-2 text-sm text-red-600">
                {{ err.StaffType }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">DOB</label>
              <input type="Date" v-model="curEmp.DOB" placeholder="Enter DOB" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.DOB" class="mt-2 text-sm text-red-600">
                {{ err.DOB }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Emp Type</label>
              <input type="text" v-model="curEmp.EmpType" placeholder="Enter Emp Type" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.EmpType" class="mt-2 text-sm text-red-600">
                {{ err.EmpType }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Date Of Join</label>
              <input type="date" v-model="curEmp.DateOfJoin" placeholder="Enter Date Of Join" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.DateOfJoin" class="mt-2 text-sm text-red-600">
                {{ err.DateOfJoin }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Manager Emp No</label>

              <serach_Input
                :arrItems="useEmployee.initEmployee.arrManagers"
                ref="refManager"
                label=""
                v-model="curEmp.Department"
                @selectItem="GetSelectManager"
              />
              <p v-if="err.Designation" class="mt-2 text-sm text-red-600">
                {{ err.Designation }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Calling Name</label>
              <input type="text" v-model="curEmp.callingname" placeholder="Enter Calling Name"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.callingname" class="mt-2 text-sm text-red-600">
                {{ err.callingname }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">On Time</label>
              <input type="text" v-model="curEmp.ontime"  placeholder="Enter On Time"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.ontime" class="mt-2 text-sm text-red-600">
                {{ err.ontime }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Off Time</label>
              <input type="text" v-model="curEmp.offtime"  placeholder="Enter Off Time"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.offtime" class="mt-2 text-sm text-red-600">
                {{ err.offtime }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Granted</label>
              <input type="text" v-model="curEmp.Granted" placeholder="Enter Granted"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.Granted" class="mt-2 text-sm text-red-600">
                {{ err.Granted }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">User Group</label>
              <input type="text" v-model="curEmp.UserGroup" placeholder="Enter User Group"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.UserGroup" class="mt-2 text-sm text-red-600">
                {{ err.UserGroup }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Role</label>
              <serach_Input
                :arrItems="useEmployee.initEmployee.arrRoles"
                ref="refRoles"
                label=""
                v-model="curEmp.Role"
                @selectItem="GetSelectRole"
              />

              <p v-if="err.Role" class="mt-2 text-sm text-red-600">
                {{ err.Role }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">User Type</label>
              <input type="text" v-model="curEmp.UserType" placeholder="Enter User Type"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.UserType" class="mt-2 text-sm text-red-600">
                {{ err.UserType }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">User Code</label>
              <input type="text" v-model="curEmp.UserCode" placeholder="Enter User Code"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.UserCode" class="mt-2 text-sm text-red-600">
                {{ err.UserCode }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Secret Code</label>
              <input type="text" v-model="curEmp.SecretCode" placeholder="Enter Secret Code"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.SecretCode" class="mt-2 text-sm text-red-600">
                {{ err.SecretCode }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">CSO No</label>
              <input type="text" v-model="curEmp.CSONo" placeholder="Enter CSO No"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.CSONo" class="mt-2 text-sm text-red-600">
                {{ err.CSONo }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Emp Category</label>

              <serach_Input
                :arrItems="useEmployee.initEmployee.arrEmpCategories"
                ref="refEmpCategory"
                label=""
                v-model="curEmp.Category"
                @selectItem="GetSelectEmpCategories"
              />

              <p v-if="err.Category" class="mt-2 text-sm text-red-600">
                {{ err.Category }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Privilege Level</label>
              <input type="text" v-model="curEmp.PrivilegeLevel" placeholder="Enter Privilege Level"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-600">Transport</label>
              <select v-model="curEmp.IsTransport"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                <option :value="false" selected>No Transport</option>
                <option :value="true">Yes Transport</option>
              </select>
            </div>
            
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold mb-2 text-gray-600">Image</label>
              <imagepicker1 />
            </div>
             <div class="">
              <label class="block text-sm font-bold mb-2 text-gray-600">Signature</label>
              <imagepicker1 />
              <p v-if="err.signature" class="mt-2 text-sm text-red-600">
                {{ err.signature }}
              </p>
            </div>
          </div>

          <!-- Resingnation Details -->
          <hr class="my-4" />
          <h3 class="mt-4 mb-8 font-bold">Leave Details</h3>
          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Annual Leave <span class="text-red-500">*</span>
              </label>
              <input type="number" v-model="curEmp.AnnualLeave" placeholder="Enter Annual Leave" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.AnnualLeave" class="mt-2 text-sm text-red-600">
                {{ err.AnnualLeave }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Casual Leave <span class="text-red-500">*</span>
              </label>
              <input type="number" v-model="curEmp.CasualLeave" placeholder="Enter Casual Leave " required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.CasualLeave" class="mt-2 text-sm text-red-600">
                {{ err.CasualLeave }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Sick Leave <span class="text-red-500">*</span>
              </label>
              <input type="number" v-model="curEmp.SickLeave" placeholder="Enter Sick Leave" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.SickLeave" class="mt-2 text-sm text-red-600">
                {{ err.SickLeave }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Other Leave <span class="text-red-500">*</span>
              </label>
              <input type="number" v-model="curEmp.OtherLeave" placeholder="Enter Sick Leave" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.OtherLeave" class="mt-2 text-sm text-red-600">
                {{ err.OtherLeave }}
              </p>
            </div>
          </div>

          <!-- OT Details -->
          <hr class="my-4" />
          <h3 class="mt-4 mb-8 font-bold">OT Details</h3>
          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-3">
            <div>
              <label class="block text-sm font-bold text-gray-600">OT</label>
              <select v-model="curEmp.IsOTAllow" required class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                <option :value="false" selected>No OT</option>
                <option :value="true">Yes OT</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-600">Morning OT</label>
              <select v-model="curEmp.isMorningOTAllowed" required class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                <option :value="false" selected>No Morning OT</option>
                <option :value="true">Yes Morning OT</option>
              </select>
            </div>
          </div>

          <!-- Resingnation Details -->
          <hr class="my-4" />
          <h3 class="mt-4 mb-8 font-bold">Resingnation Details</h3>
          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-3">
            <div>
              <label class="block text-sm font-bold text-gray-600">
                Are You Resign
              </label>
              <select v-model="curEmp.IsResign" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                <option :value="false">No Resign</option>
                <option :value="true">Yes Resign</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-600">
                Date Of Resign 
              </label>
              <input type="text" v-model="curEmp.DateOfResign" placeholder="Enter Date Of Resign" required
                :disabled="!curEmp.IsResign"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50" />
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-600">
                Reason For Resign 
              </label>
              <textarea v-model="curEmp.ReasonForResign" placeholder="Enter Reason For Resign" required
                :disabled="!curEmp.IsResign"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
                rows="4"></textarea>
            </div>
          </div>

        </div>
      </div>

      <div class=" modal-footer">
        <button @click="cancel" class="cancel-button">Cancel</button>
        <button @click="SetVendorLead()" class="confirm-button">
          Save Leads Details
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useLeadStore } from "~/stores/modules/hr/employee";
import closebtn from "~/components/customcontrol/modal_close_button";
import imagecomp from "~/components/customcontrol/imagepicker";
import ImageLable from "~/components/customcontrol/ImageLable";
import toggleoption from "~/components/customcontrol/toggleoption";
import imagepicker1 from "../customcontrol/imagepicker1.vue";
import serach_Input from "~/components/customcontrol/SearchInput.vue";
import selectinput from "../customcontrol/selectinput2.vue";

definePageMeta({
  layout: "default",
});
export default {
  components: { closebtn, serach_Input, ImageLable, imagecomp, toggleoption, imagepicker1, selectinput },
  data() {
    return {
      isOpen: true,
      curEmp: {
        EmpNo: "",
        EPFNo: "",
        NIC: "",
        Name: "",
        Address: "",
        Contact1: "",
        Contact2: "",
        Email1: "",
        Email2: "",
        EmergencyContact: "",
        Department: "",
        Designation: "",
        Gender: "",
        StaffType: "",
        DOB: "",
        EmpType: "",
        DateOfJoin: "",
        IsResign: false,
        IsTransport: false,
        EmployeeStatus: "",
        DateOfResign: "",
        ReasonForResign: "",
        Image: "",
        Category: "",
        PrivilegeLevel: "",
        ManagerEmpNo: "",
        AnnualLeave: 0,
        CasualLeave: 0,
        SickLeave: 0,
        OtherLeave: 0,
        IsOTAllow: false,
        HomePhone: "",
        callingname: "",
        signature: "",
        ontime: "",
        offtime: "",
        isMorningOTAllowed: false,
        isExecutive: false,
        IsActive: true,
        Granted: "",
        UserGroup: "",
        Role: "",
        UserType: "",
        UserCode: "",
        SecretCode: "",
        CSONo: "",
      },
      err: {
        EmpNo: "",
        EPFNo: "",
        Name: "",
        NIC: "",
        Address: "",
        Contact1: "",
        Contact2: "",
        Email1: "",
        Email2: "",
        EmergencyContact: "",
        Department: "",
        Designation: "",
        Gender: "",
        StaffType: "",
        DOB: "",
        EmpType: "",
        DateOfJoin: "",
        IsResign: false,
        IsTransport: false,
        EmployeeStatus: "",
        DateOfResign: "",
        ReasonForResign: "",
        Image: "",
        Category: "",
        PrivilegeLevel: "",
        ManagerEmpNo: "",
        AnnualLeave: 0,
        CasualLeave: 0,
        SickLeave: 0,
        OtherLeave: 0,
        IsOTAllow: false,
        HomePhone: "",
        callingname: "",
        signature: "",
        ontime: "",
        offtime: "",
        isMorningOTAllowed: false,
        isExecutive: false,
        IsActive: true,
        Granted: "",
        UserGroup: "",
        Role: "",
        UserType: "",
        UserCode: "",
        SecretCode: "",
        CSONo: "",
      },
      imageroot: "",
      showLoading: null,
      showAlert: null,
    };
  },
  computed: {
    isEditing() {
      // return (
      //   this.curEmp &&
      //   this.curEmp.id !== "00000000-0000-0000-0000-000000000000"
      // );
    },

  },
  async created() {
    this.useEmployee = useLeadStore(); 
    this.showLoading = this.$showLoading;
    this.showAlert = this.$showAlert;

    await this.useEmployee.loadInitEmployee(this.showLoading);
    console.log("Initial Employee Data:", this.useEmployee.initEmployee);


  },
  mounted() {
    // this.$refs.refCity.initItem(this.curEmp.city);
    // this.$refs.refDistrict.initItem(this.curEmp.district);
  },
  methods: {
    closeModal() {
      this.isOpen = false;
      this.$emit("close");
    },

    cancel() {
      this.clearErr();
      this.closeModal();
    },

    async GetSelectManager(managerObj) {
      this.curEmp.Department = managerObj.id;
      this.curEmp.ManagerName = managerObj.value;
    },

    async GetSelectDepartment(deptObj) {
      this.curEmp.Department = deptObj.id;
      this.curEmp.DepartmentName = deptObj.value;

      console.log("Department ID:", this.curEmp.Department);
    },

    async GetSelectEmpCategories(empObj) {
      this.curEmp.EmpCategory = empObj.id;
      this.curEmp.EmpCategoryName = empObj.value;

      console.log("EmpCategory ID:", this.curEmp.Category);
    },

    async GetSelectRole(roleObj) {
      this.curEmp.Role = roleObj.id;
      this.curEmp.RoleName = roleObj.value;

      console.log("Role ID:", this.curEmp.Role);
    },

    async GetSelectStaffType(staffObj) {
      this.curEmp.StaffType = staffObj.id;
      this.curEmp.StaffTypeName = staffObj.value;

      console.log("Staff Type ID:", this.curEmp.StaffType);
    },

    async GetSelectGender(gender) {
      this.curEmp.Gender = gender;
      this.curEmp.GenderName = gender;

      console.log("Selected Gender:", this.curEmp.Gender);
    },





    SetVendorLead() {
      console.log(this.curEmp);
      if (this.IsValidate()) {
        console.log("All fields validated! Now save...");
        // Add your save logic here, e.g., API call or store update
      } else {
        console.log("Validation failed.");
      }
    },



    IsValidate() {
      this.clearErr();

      let IsValidate = true;

      if (!this.curEmp.Gender) {
        this.err.Gender = "Please Enter Gender!";
        IsValidate = false;
      }

      if (!this.curEmp.Department) {
        this.err.Department = "Please Enter Business Registration Number!";
        IsValidate = false;
      }

      if (!this.curEmp.Email1) {
        this.err.Email1 = "Please Enter an Email 1!";
        IsValidate = false;
      } else {
        const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!EmailRegex.test(this.curEmp.Email1)) {
          this.err.Email1 = "Please Enter a valid Email address!";
          IsValidate = false;
        }
      }

      if (!this.curEmp.Email1) {
        this.err.Email2 = "Please Enter an Email 2!";
        IsValidate = false;
      } else {
        const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!EmailRegex.test(this.curEmp.Email1)) {
          this.err.Email2 = "Please Enter a valid Email address!";
          IsValidate = false;
        }
      }

      if (!this.curEmp.Name) {
        this.err.Name = "Please Enter emp Name!";
        IsValidate = false;
      }

      if (!this.curEmp.Contact1) {
        this.err.Contact1 = "Please Enter Contact Number 1!";
        IsValidate = false;
      } else {
        const contactNoRegex = /^[0-9]{10}$/;
        if (!contactNoRegex.test(this.curEmp.Contact1)) {
          this.err.Contact1 =
            "Please Enter a valid 10-digit contact number!";
          IsValidate = false;
        }
      }

      if (!this.curEmp.NIC) {
        this.err.NIC = "Please Enter NIC Number";
        IsValidate = false;
      }

      if (!this.curEmp.Address) {
        this.err.Address = "Please Enter Address!";
        IsValidate = false;
      }

      if (!this.curEmp.DOB) {
        this.err.DOB = "Please Enter DOB!";
        IsValidate = false;
      }

      if (!this.curEmp.Contact2) {
        this.err.Contact2 = "Please Enter Contact Number 2!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.curEmp.Contact2)) {
          this.err.Contact2 = "Please Enter a valid 10-digit Mobile Number!";
          IsValidate = false;
        }
      }

      if (!this.curEmp.Department) {
        this.err.Department = "Please Enter Website!";
        IsValidate = false;
      }

      if (!this.curEmp.EPFNo) {
        this.err.EPFNo = "Please Enter EPF No!";
        IsValidate = false;
      }

      if (!this.curEmp.StaffType) {
        this.err.StaffType = "Please Enter Staff Type!";
        IsValidate = false;
      }

      // // Other information validation
      if (!this.curEmp.EmpType) {
        this.err.EmpType = "Please Enter Emp Type!";
        IsValidate = false;
      }

      if (!this.curEmp.DateOfJoin) {
        this.err.DateOfJoin = "Please Enter Date Of Join!";
        IsValidate = false;
      }

      if (!this.curEmp.Designation) {
        this.err.Designation = "Please Enter Designation!";
        IsValidate = false;
      }

      if (!this.curEmp.EmergencyContact) {
        this.err.EmergencyContact = "Please Enter Contact Number!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.curEmp.EmergencyContact)) {
          this.err.EmergencyContact = "Please Enter a valid 10-digit Contact Number!";
          IsValidate = false;
        }
      }



      if (!this.curEmp.callingname) {
        this.err.callingname = "Please Enter Calling Name!";
        IsValidate = false;
      }

      if (!this.curEmp.ContactEmail) {
        this.err.ContactEmail = "Please Enter an Email!";
        IsValidate = false;
      } else {
        const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!EmailRegex.test(this.curEmp.ContactEmail)) {
          this.err.ContactEmail = "Please Enter a valid Email address!";
          IsValidate = false;
        }
      }

      if (!this.curEmp.signature) {
        this.err.signature = "Please Enter Signature!";
        IsValidate = false;
      }

      if (!this.curEmp.ontime) {
        this.err.ontime = "Please Enter On Time!";
        IsValidate = false;
      }
      if (!this.curEmp.offtime) {
        this.err.offtime = "Please Enter Off Time!";
        IsValidate = false;
      }

      if (!this.curEmp.Granted) {
        this.err.Granted = "Please Enter Granted!";
        IsValidate = false;
      }


      if (!this.curEmp.Role) {
        this.err.Role = "Please Enter Role!";
        IsValidate = false;
      }
      
      if (!this.curEmp.UserType) {
        this.err.UserType = "Please Enter User Type!";
        IsValidate = false;
      }
      if (!this.curEmp.UserCode) {
        this.err.UserCode = "Please Enter User Code!";
        IsValidate = false;
      }

      if (!this.curEmp.SecretCode) {
        this.err.SecretCode = "Please Enter Secret Code!";
        IsValidate = false;
      }

      if (!this.curEmp.UserGroup) {
        this.err.UserGroup = "Please Enter UserGroup!";
        IsValidate = false;
      }
      if (!this.curEmp.CSONo) {
        this.err.CSONo = "Please Enter CSONo!";
        IsValidate = false;
      }

      ///////////////
      if (!this.curEmp.AnnualLeave) {
        this.err.AnnualLeave = "Please Enter Annual Leave!";
        IsValidate = false;
      }
      if (!this.curEmp.CasualLeave) {
        this.err.CasualLeave = "Please Enter Casual Leave !";
        IsValidate = false;
      }

      if (!this.curEmp.SickLeave) {
        this.err.SickLeave = "Please Enter Sick Leave!";
        IsValidate = false;
      }

      if (!this.curEmp.OtherLeave) {
        this.err.OtherLeave = "Please Enter Other Leave!";
        IsValidate = false;
      }



      return IsValidate;
    },

    clearErr() {
      Object.keys(this.err).forEach((key) => {
        this.err[key] = "";
      });
    },
  },
};
</script>

<style scoped>
/* Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: cEnter;
  align-items: cEnter;
  z-index: 9999;
}

.modal {
  background: white;
  width: 80%;
  max-width: 800px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 90%;
  position: relative;
}

.modal-header {
  background: #0b2145;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: cEnter;
  color: white;
}

.modal-title {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.modal-content {
  padding: 20px;
  max-height: 80%;
  overflow-y: auto;
  flex-grow: 1;
}

.modal-footer {
  background: #f1f1f1;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100%;
}

button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
}

.cancel-button {
  background: #e4e4e4;
  color: #333;
}

.confirm-button {
  background: #0b2145;
  color: white;
}

button:hover {
  opaCity: 0.8;
}

@media (max-width: 768px) {
  .modal {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  .modal-header {
    padding: 10px;
  }

  .modal-content {
    padding: 10px;
    max-height: none;
  }

  .modal-footer {
    padding: 10px;
  }
}
</style>