<template>
  <div class="modal-overlay" v-if="employeeStore.isModalOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title"> Employee Details {{ isEditing ? "- Edit" : "- Add" }}</h2>
        <closebtn @close="closeModal" />
      </div>

      <!-- Modal Content (scrollable) -->
      <div class="modal-content">
        <div class="form-content">
          <h3 class="text-blue-600 font-bold">General Information</h3>
          <hr class="mb-4" />
          <!-- {{ employeeStore.initEmployee }}
          <hr /> -->
          <!-- {{ employeeStore.empdetails }}
          <hr /> -->
          <!-- <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            
          </div> -->

          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Employee No <span class="text-red-500">*</span>
              </label>
              <input type="text" v-model="employeeStore.empdetails.empNo" placeholder="Enter Employee No" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.empNo" class="mt-2 text-sm text-red-600">
                {{ err.empNo }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Employee Name <span class="text-red-500">*</span>
              </label>
              <input type="text" v-model="employeeStore.empdetails.empName" placeholder="Enter company Name" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.empName" class="mt-2 text-sm text-red-600">
                {{ err.empName }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Address <span class="text-red-500">*</span>
              </label>
              <input type="text" v-model="employeeStore.empdetails.address" placeholder="Enter Address Line 2" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.Address" class="mt-2 text-sm text-red-600">
                {{ err.Address }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Contact Number 1<span class="text-red-500">*</span>
              </label>
              <input type="tel" v-model="employeeStore.empdetails.contact1" placeholder="Enter Contact Number 1"
                maxlength="10"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.Contact1" class="mt-2 text-sm text-red-600">
                {{ err.Contact1 }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Contact Number 2</label>
              <input type="text" v-model="employeeStore.empdetails.Contact2" :maxlength="10"
                placeholder="Enter Contact Number 2"
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
              <input type="Email" v-model="employeeStore.empdetails.email1" placeholder="Enter Email 1"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
              <p v-if="err.Email1" class="mt-2 text-sm text-red-600">
                {{ err.Email1 }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Email 2
              </label>
              <input type="Email" v-model="employeeStore.empdetails.email2" placeholder="Enter Email 2"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
              <p v-if="err.Email2" class="mt-2 text-sm text-red-600">
                {{ err.Email2 }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Emergency Contact Number</label>

              <input type="text" v-model="employeeStore.empdetails.emergencyContact" :maxlength="10"
                placeholder="Enter Emergency Contact Number" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.EmergencyContact" class="mt-2 text-sm text-red-600">
                {{ err.EmergencyContact }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Department <span class="text-red-500">*</span>
              </label>

              <serach_Input :arrItems="employeeStore.initEmployee.arrDepartments" ref="refDepartment" label=""
                @selectItem="GetSelectDepartment" />
              <p v-if="err.Department" class="mt-2 text-sm text-red-600">
                {{ err.Department }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Designation <span class="text-red-500">*</span>
              </label>
              <input type="text" v-model="employeeStore.empdetails.designation" placeholder="Enter Designation"
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
              <input type="text" v-model="employeeStore.empdetails.epfNo" placeholder="Enter EPF No"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
              <p v-if="err.EPFNo" class="mt-2 text-sm text-red-600">
                {{ err.EPFNo }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-600 mb-2">Gender<span
                  class="text-red-500">*</span></label>
              <selectinput :selections="employeeStore.initEmployee.arrGender" v-model="employeeStore.empdetails.gender"
                label="" />

              <p v-if="err.Gender" class="mt-2 text-sm text-red-600">
                {{ err.Gender }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Staff Type</label>
              <serach_Input :arrItems="employeeStore.initEmployee.arrStaffTypes" ref="refStaffType" label=""
                @selectItem="GetSelectStaffType" />

              <p v-if="err.StaffType" class="mt-2 text-sm text-red-600">
                {{ err.StaffType }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">DOB<span class="text-red-500">*</span></label>
              <input type="Date" v-model="employeeStore.empdetails.dob" placeholder="Enter DOB" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.DOB" class="mt-2 text-sm text-red-600">
                {{ err.DOB }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Employee Type<span
                  class="text-red-500">*</span></label>
              <serach_Input :arrItems="employeeStore.initEmployee.arrEmployeeStatus" ref="refEmpType" label=""
                @selectItem="GetSelectEmpType" />
              <p v-if="err.EmpType" class="mt-2 text-sm text-red-600">
                {{ err.EmpType }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Date Of Join<span
                  class="text-red-500">*</span></label>
              <input type="date" v-model="employeeStore.empdetails.dateOfJoin" placeholder="Enter Date Of Join" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.DateOfJoin" class="mt-2 text-sm text-red-600">
                {{ err.DateOfJoin }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Manager Employee<span
                  class="text-red-500">*</span></label>
              <serach_Input :arrItems="employeeStore.initEmployee.arrManagers" ref="refManager" label=""
                @selectItem="GetSelectManager" />
              <p v-if="err.ManagerEmpNo" class="mt-2 text-sm text-red-600">
                {{ err.ManagerEmpNo }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Calling Name<span
                  class="text-red-500">*</span></label>
              <input type="text" v-model="employeeStore.empdetails.callingName" placeholder="Enter Calling Name"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.callingName" class="mt-2 text-sm text-red-600">
                {{ err.callingName }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">On Time<span class="text-red-500">*</span></label>
              <input type="time" v-model="employeeStore.empdetails.onTime" placeholder="Enter On Time" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.ontime" class="mt-2 text-sm text-red-600">
                {{ err.ontime }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Off Time<span class="text-red-500">*</span></label>
              <input type="time" v-model="employeeStore.empdetails.offTime" placeholder="Enter Off Time" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.offtime" class="mt-2 text-sm text-red-600">
                {{ err.offtime }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">User Group</label>
              <input type="text" v-model="employeeStore.empdetails.UserGroup" placeholder="Enter User Group" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.UserGroup" class="mt-2 text-sm text-red-600">
                {{ err.UserGroup }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">User Type<span class="text-red-500">*</span></label>
              <input type="text" v-model="employeeStore.empdetails.userType" placeholder="Enter User Type" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.UserType" class="mt-2 text-sm text-red-600">
                {{ err.UserType }}
              </p>
            </div>

            <!-- <div class="">
              <label class="block text-sm font-bold text-gray-600">Employee ststus<span class="text-red-500">*</span></label>
              <input
                type="text"
                v-model="employeeStore.empdetails.employeeStatus"
                placeholder="Enter User Type"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.employeeStatus" class="mt-2 text-sm text-red-600">
                {{ err.employeeStatus }}
              </p>
            </div> -->

            <div class="">
              <label class="block text-sm font-bold text-gray-600">CSO No</label>
              <input type="text" v-model="employeeStore.empdetails.csoNo" placeholder="Enter CSO No" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.CSONo" class="mt-2 text-sm text-red-600">
                {{ err.CSONo }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Emp Category<span
                  class="text-red-500">*</span></label>

              <serach_Input :arrItems="employeeStore.initEmployee.arrEmpCategories" ref="refEmpCategory" label=""
                @selectItem="GetSelectEmpCategories" />

              <p v-if="err.empCategory" class="mt-2 text-sm text-red-600">
                {{ err.empCategory }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                NIC Number <span class="text-red-500">*</span>
              </label>
              <input type="text" v-model="employeeStore.empdetails.nic" placeholder="Enter Nic Number" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.nic" class="mt-2 text-sm text-red-600">
                {{ err.nic }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-600">Transport</label>
              <toggleoption v-model="employeeStore.empdetails.isTransport" />
              <div class="text-sm font-medium text-gray-600">
                {{ employeeStore.empdetails.isTransport ? "Transport" : "Private" }}
              </div>
            </div>
          </div>

          <!-- <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold mb-2 text-gray-600">Photo</label>
              <imagepicker1 :existingImagePath="imageroot + employeeStore.empdetails.imageUrl"
                @deleteExistingImage="employeeStore.empdetails.image = null" @GetSelectedImage="GetSelectedImageFile"
                ref="refImage" />
            </div>
            <div class="">
              <label class="block text-sm font-bold mb-2 text-gray-600">Signature</label>
              <imagepicker1 :existingImagePath="imageroot + employeeStore.empdetails.signatureUrl"
                @deleteExistingImage="employeeStore.empdetails.signature = null" @GetSelectedImage="GetSelectedSignature"
                ref="refSignature" />
              <p v-if="err.signature" class="mt-2 text-sm text-red-600">
                {{ err.signature }}
              </p>
            </div>
          </div> -->

          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-2">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                NIC Number <span class="text-red-500">*</span>
              </label>
              <input type="text" v-model="employeeStore.empdetails.nic" placeholder="Enter Nic Number" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.nic" class="mt-2 text-sm text-red-600">
                {{ err.nic }}
              </p>
            </div>
            <!-- <div class="">
              <label class="block text-sm font-bold mb-2 text-gray-600">NIC image Upload</label>
              <imagepicker1 :existingImagePath="imageroot + employeeStore.empdetails.nicUrl"
                @deleteExistingImage="employeeStore.empdetails.nicImage = null" @GetSelectedImage="GetSelectedNic"
                ref="refNICImage" />
              <p v-if="err.NIC" class="mt-2 text-sm text-red-600">
                {{ err.NIC }}
              </p>
            </div> -->
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Granted</label>
              <inputtags_search class="" :arrItems="employeeStore.initEmployee.arrGrantRoles"
                :arrExistingGrants="employeeStore.empdetails.granted" @GetSelectedIds="GetSelectedGrants"
                ref="refGrant" />
              <p v-if="err.Granted" class="mt-2 text-sm text-red-600">
                {{ err.Granted }}
              </p>
            </div>
          </div>

          <!-- Resingnation Details -->
          <h3 class="mt-12 text-blue-600 font-bold">Leave Details</h3>
          <hr class="mb-4" />

          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Annual Leave <span class="text-red-500">*</span>
              </label>
              <input type="number" v-model="employeeStore.empdetails.annualLeave" placeholder="Enter Annual Leave"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.AnnualLeave" class="mt-2 text-sm text-red-600">
                {{ err.AnnualLeave }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Casual Leave <span class="text-red-500">*</span>
              </label>
              <input type="number" v-model="employeeStore.empdetails.casualLeave" placeholder="Enter Casual Leave "
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.CasualLeave" class="mt-2 text-sm text-red-600">
                {{ err.CasualLeave }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Sick Leave <span class="text-red-500">*</span>
              </label>
              <input type="number" v-model="employeeStore.empdetails.sickLeave" placeholder="Enter Sick Leave" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.SickLeave" class="mt-2 text-sm text-red-600">
                {{ err.SickLeave }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Other Leave <span class="text-red-500">*</span>
              </label>
              <input type="number" v-model="employeeStore.empdetails.otherLeave" placeholder="Enter Sick Leave" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.OtherLeave" class="mt-2 text-sm text-red-600">
                {{ err.OtherLeave }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Short Leave <span class="text-red-500">*</span>
              </label>
              <input type="number" v-model="employeeStore.empdetails.noOfShortLeavePerMonth"
                placeholder="Enter Short Leave" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.NoOfShortLeavePerMonth" class="mt-2 text-sm text-red-600">
                {{ err.NoOfShortLeavePerMonth }}
              </p>
            </div>
          </div>

          <!-- OT Details -->

          <h3 class="mt-12 text-blue-600 font-bold">OT Details</h3>
          <hr class="mb-4" />
          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-3">
            <div>
              <label class="block text-sm font-bold text-gray-600">OT Allowed</label>

              <toggleoption v-model="employeeStore.empdetails.isOTAllow" />
              <div class="text-sm font-medium text-gray-600">
                {{
                  employeeStore.empdetails.isOTAllow
                    ? "OT Entitled"
                    : "No OT Recomanded"
                }}
              </div>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-600">Morning OT Allowed</label>

              <toggleoption v-model="employeeStore.empdetails.isMorningOTAllowed" />
              <div class="text-sm font-medium text-gray-600">
                {{
                  employeeStore.empdetails.isMorningOTAllowed
                    ? "OT Entitled"
                    : "No OT Recomanded"
                }}
              </div>
            </div>
          </div>

          <!-- Resingnation Details -->
          <h3 class="mt-12 text-blue-600 font-bold">Resingnation Details</h3>
          <hr class="mb-4" />

          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-3">
            <div>
              <label class="block text-sm font-bold text-gray-600">
                Are You Resigned?
              </label>

              <toggleoption v-model="employeeStore.empdetails.isResign" />
              <div class="text-sm font-medium text-gray-600">
                {{ employeeStore.empdetails.isResign ? "Resigned" : "Working" }}
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-600">
                Date Of Resign
              </label>
              <input type="date" v-model="employeeStore.empdetails.dateOfResign" placeholder="Enter Date Of Resign"
                required :disabled="!employeeStore.empdetails.isResign"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50" />
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-600 mb-2">
                Reason For Resign
              </label>
              <textarea v-model="employeeStore.empdetails.reasonForResign" placeholder="Enter Reason For Resign"
                required :disabled="!employeeStore.empdetails.isResign"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
                rows="4"></textarea>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-600 mb-2">
                Status
              </label>
              <toggleoption v-model="employeeStore.empdetails.isActive"></toggleoption>
            </div>
          </div>
        </div>
      </div>
      <!-- 
      <div class="modal-footer">
        <button @click="cancel" class="cancel-button">Cancel</button>
        <button @click="SaveEmployee" class="confirm-button">
          Save Details
        </button>
      </div> -->
      <div class=" modal-footer">
        <button @click="cancel"
          class="px-12 py-2 text-xs  font-semibold transition bg-white text-gray-600 rounded-full shadow">Cancel</button>
        <button @click="SaveEmployee" class="px-12 py-2 text-xs  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                font-semibold transition text-white rounded-full shadow  focus:ring-2 focus:ring-blue-400">
          Save Details
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useEmployeeStore } from "~/stores/modules/hr/employeeStore";
import { useUserStore } from "~/stores/modules/userStore";

import closebtn from "~/components/customcontrol/modal_close_button";
import imagecomp from "~/components/customcontrol/imagepicker";
import ImageLable from "~/components/customcontrol/ImageLable";
import toggleoption from "~/components/customcontrol/toggleoption";
import imagepicker1 from "~/components/customcontrol/imagepicker1";
import serach_Input from "~/components/customcontrol/SearchInput.vue";
import selectinput from "../customcontrol/selectinput2.vue";
import inputtags_search from '~/components/hr/inputtags_search'

definePageMeta({
  layout: "default",
});
export default {
  components: {
    closebtn,
    serach_Input,
    ImageLable,
    imagecomp,
    toggleoption,
    imagepicker1,
    selectinput,
    inputtags_search,
  },
  data() {
    return {
      isOpen: true,
      imageroot: "",
      listGrants: [],
      err: {
        EmpNo: "",
        EPFNo: "",
        EmpName: "",
        NIC: "",
        nicImage: "",
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
        // EmployeeStatus: "",
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
        NoOfShortLeavePerMonth: 0,
        IsOTAllow: false,
        callingName: "",
        signature: "",
        ontime: "",
        offtime: "",
        isMorningOTAllowed: false,
        isExecutive: false,
        IsActive: true,
        Granted: "",
        UserGroup: "",
        UserType: "",

        CSONo: "",
      },

      showLoading: null,
    };
  },
  computed: {
    isEditing() {

      return (
        this.employeeStore.empdetails.id !== "00000000-0000-0000-0000-000000000000"
      );
    },
  },
  async created() {
    this.employeeStore = useEmployeeStore();
    this.userStore = useUserStore();
    this.showLoading = this.$showLoading;
    this.imageroot = this.userStore.loggedUser.resourceURLRoot;

    await this.employeeStore.getInitEmployee();

    if (!this.employeeStore.isModalOpen) {
      this.employeeStore.closeModal();
    }

  },
  mounted() {
    this.$refs.refDepartment.initItem(this.employeeStore.empdetails.department.id);
    this.$refs.refStaffType.initItem(this.employeeStore.empdetails.staffType.id);
    this.$refs.refEmpType.initItem(this.employeeStore.empdetails.empType.id);
    this.$refs.refManager.initItem(this.employeeStore.empdetails.managerEmployee.id);
    this.$refs.refEmpCategory.initItem(this.employeeStore.empdetails.category.id);
    // this.$refs.refGrant.initItem(this.employeeStore.empdetails.category.id);
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

    GetSelectedGrants(list) {
      this.listGrants = list
    },

    async SaveEmployee() {

      if (this.IsValidate()) {
        this.$showConfirm("Sure to add this new employee?", "warning")
          .then(async (result) => {
            if (result.isConfirmed) {
              console.log("employeeStore.empdetails:", this.employeeStore.empdetails);

              const formData = this.convertToFormData(this.employeeStore.empdetails);

              // / Log FormData contents
              // console.log("FormData contents in SaveEmployee:");
              // for (const [key, value] of formData.entries()) {
              //   console.log(`${key}: ${value}`);
              // }

              await this.employeeStore.AddEdiEmployee(formData, this.showLoading);
              await this.closeModal();
            }
          });
      }
    },

    convertToFormData(formObject) {
      console.log("formObject:", formObject);
      const formData = new FormData();

      // Append basic fields
      formData.append(
        "Id",
        formObject.id || "00000000-0000-0000-0000-000000000000"
      );
      formData.append("Address", formObject.address || "");
      formData.append("AnnualLeave", formObject.annualLeave || 0);
      formData.append("CallingName", formObject.callingName || "");
      formData.append("CasualLeave", formObject.casualLeave || 0);
      formData.append("CategoryId", formObject.category.id || 0);
      formData.append("Contact1", formObject.contact1 || "");
      formData.append("Contact2", formObject.contact2 || "");
      formData.append("CsoNo", formObject.csoNo || "");
      formData.append("DateOfJoin", formObject.dateOfJoin);
      formData.append("DateOfResign", formObject.dateOfResign || "");
      formData.append("DepartmentId", formObject.department.id || 0);
      formData.append("Dob", formObject.dob);
      formData.append("Designation", formObject.designation || "");
      formData.append("EmpName", formObject.empName || "");
      formData.append("EmpNo", formObject.empNo || "");
      formData.append("EmpTypeId", formObject.empType.id || 0);
      // formData.append("EmployeeStatus", formObject.employeeStatus || "");
      formData.append("Email1", formObject.email1 || "");
      formData.append("Email2", formObject.email2 || "");
      formData.append("EmergencyContact", formObject.emergencyContact || "");
      formData.append("Gender", formObject.gender || "");
      formData.append("EpfNo", formObject.epfNo || "");
      formData.append("Granted", this.listGrants.length > 0 ? this.listGrants : formObject.granted || "");

      // Files
      if (formObject.image) {
        formData.append("Image", formObject.image);
      }

      formData.append("IsActive", formObject.isActive);
      formData.append("IsExecutive", formObject.isExecutive);
      formData.append("IsMorningOTAllowed", formObject.isMorningOTAllowed ?? false);
      formData.append("IsTransport", formObject.isTransport ?? false);
      formData.append("IsOTAllow", formObject.isOTAllow ?? false);
      formData.append("IsResigned", formObject.isResigned ?? false);
      formData.append(
        "ManagerEmployeeId",
        formObject.managerEmployee.id || "00000000-0000-0000-0000-000000000000"
      );

      formData.append("Nic", formObject.nic || "");
      if (formObject.nicImage) {
        formData.append("NICImage", formObject.nicImage);
      }

      formData.append("OffTime", formObject.offTime); // Expected format: "HH:mm:ss"
      formData.append("OnTime", formObject.onTime); // Expected format: "HH:mm:ss"
      formData.append("OtherLeave", formObject.otherLeave || 0);
      formData.append("NoOfShortLeavePerMonth", formObject.noOfShortLeavePerMonth || 0);
      formData.append("PrivilegeLevel", formObject.privilegeLevel || "");
      formData.append("ReasonForResign", formObject.reasonForResign || "");
      formData.append("SickLeave", formObject.sickLeave || 0);

      if (formObject.signature) {
        formData.append("Signature", formObject.signature);
      }

      formData.append("StaffTypeId", formObject.staffType.id ?? 0);
      formData.append("UserType", formObject.userType || "");

      return formData;
    },

    GetSelectDepartment(item) {
      this.employeeStore.empdetails.department = item;
    },

    GetSelectStaffType(item) {
      this.employeeStore.empdetails.staffType = item;
    },

    GetSelectManager(item) {
      this.employeeStore.empdetails.managerEmployee = item;
    },

    GetSelectEmpCategories(item) {
      this.employeeStore.empdetails.category = item;
    },

    GetSelectEmpType(item) {
      this.employeeStore.empdetails.empType = item;
    },

    GetSelectedImageFile(file) {
      this.employeeStore.empdetails.image = file;
    },

    GetSelectedSignature(file) {
      this.employeeStore.empdetails.signature = file;
    },

    GetSelectedNic(file) {
      this.employeeStore.empdetails.nicImage = file;
    },

    IsValidate() {
      this.clearErr();

      let IsValidate = true;

      if (!this.employeeStore.empdetails.empType || !this.employeeStore.empdetails.empType.id) {
        this.err.EmpType = "Please Enter Employee Type!";
        IsValidate = false;
      }

      if (!this.employeeStore.empdetails.category || !this.employeeStore.empdetails.category.id) {
        this.err.empCategory = "Please Enter Employee Catagory!";
        IsValidate = false;
      }

      if (!this.employeeStore.empdetails.managerEmployee || !this.employeeStore.empdetails.managerEmployee.id) {
        this.err.ManagerEmpNo = "Please Enter Enter Manager!!";
        IsValidate = false;
      }

      if (!this.employeeStore.empdetails.department || !this.employeeStore.empdetails.department.id) {
        this.err.Department = "Please Enter Enter Department!!";
        IsValidate = false;
      }


      if (!this.employeeStore.empdetails.empNo) {
        this.err.empNo = "Please Enter Employee No!";
        IsValidate = false;
      }

      if (!this.employeeStore.empdetails.gender) {
        this.err.Gender = "Please Enter Gender!";
        IsValidate = false;
      }

      if (!this.employeeStore.empdetails.email1) {
        this.err.Email1 = "Please Enter an Email 1!";
        IsValidate = false;
      } else {
        const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!EmailRegex.test(this.employeeStore.empdetails.email1)) {
          this.err.Email1 = "Please Enter a valid Email address!";
          IsValidate = false;
        }
      }



      if (!this.employeeStore.empdetails.onTime) {
        this.err.ontime = "Please Enter On Time!";
        IsValidate = false;
      }
      if (!this.employeeStore.empdetails.offTime) {
        this.err.offtime = "Please Enter Off Time!";
        IsValidate = false;
      }

      if (!this.employeeStore.empdetails.empName) {
        this.err.empName = "Please Enter emp Name!";
        IsValidate = false;
      }

      if (!this.employeeStore.empdetails.contact1) {
        this.err.Contact1 = "Please Enter Contact Number 1!";
        IsValidate = false;
      } else {
        const contactNoRegex = /^[0-9]{10}$/;
        if (!contactNoRegex.test(this.employeeStore.empdetails.contact1)) {
          this.err.Contact1 = "Please Enter a valid 10-digit contact number!";
          IsValidate = false;
        }

      }

      if (!this.employeeStore.empdetails.nic) {
        this.err.nic = "Please Enter NIC Number";
        IsValidate = false;
      }

      if (!this.employeeStore.empdetails.staffType || !this.employeeStore.empdetails.staffType.id) {
        this.err.StaffType = "Please Enter staff type";
        IsValidate = false;
      }

      if (!this.employeeStore.empdetails.address) {
        this.err.Address = "Please Enter Address!";
        IsValidate = false;
      }

      if (!this.employeeStore.empdetails.dob) {
        this.err.DOB = "Please Enter DOB!";
        IsValidate = false;
      }


      if (!this.employeeStore.empdetails.callingName) {
        this.err.callingName = "Please Enter Calling Name!";
        IsValidate = false;
      }

      if (!this.employeeStore.empdetails.designation) {
        this.err.Designation = "Please Enter Designation!";
        IsValidate = false;
      }

      if (!this.employeeStore.empdetails.annualLeave && this.employeeStore.empdetails.annualLeave !== 0) {
        this.err.AnnualLeave = "Please Enter Annual Leave!";
        IsValidate = false;
      }

      if (!this.employeeStore.empdetails.casualLeave && this.employeeStore.empdetails.casualLeave !== 0) {
        this.err.CasualLeave = "Please Enter Casual Leave !";
        IsValidate = false;
      }

      if (!this.employeeStore.empdetails.sickLeave && this.employeeStore.empdetails.sickLeave !== 0) {
        this.err.SickLeave = "Please Enter Sick Leave!";
        IsValidate = false;
      }

      if (!this.employeeStore.empdetails.otherLeave && this.employeeStore.empdetails.otherLeave !== 0) {
        this.err.OtherLeave = "Please Enter Other Leave!";
        IsValidate = false;
      }

      if (!this.employeeStore.empdetails.noOfShortLeavePerMonth && this.employeeStore.empdetails.noOfShortLeavePerMonth !== 0) {
        this.err.NoOfShortLeavePerMonth = "Please Enter Short Leave!";
        IsValidate = false;
      }

      if (!this.employeeStore.empdetails.dateOfJoin) {
        this.err.DateOfJoin = "Please Enter Date Of Join!";
        IsValidate = false;
      }

      // if (!this.employeeStore.empdetails.employeeStatus) {
      //   this.err.employeeStatus = "Please Enter employeeStatus!";
      //   IsValidate = false;
      // }









      /////////////////////////////////

      // if (!this.employeeStore.empdetails.Email2) {
      //   this.err.Email2 = "Please Enter an Email 2!";
      //   IsValidate = false;
      // } else {
      //   const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      //   if (!EmailRegex.test(this.employeeStore.empdetails.Email2)) {
      //     this.err.Email2 = "Please Enter a valid Email address!";
      //     IsValidate = false;
      //   }
      // }



      // if (!this.employeeStore.empdetails.Contact2) {
      //   this.err.Contact2 = "Please Enter Contact Number 2!";
      //   IsValidate = false;
      // } else {
      //   const contactNoRegex1 = /^[0-9]{10}$/;
      //   if (!contactNoRegex1.test(this.curEmp.Contact2)) {
      //     this.err.Contact2 = "Please Enter a valid 10-digit Mobile Number!";
      //     IsValidate = false;
      //   }
      // }



      // if (!this.employeeStore.empdetails.EPFNo) {
      //   this.err.EPFNo = "Please Enter EPF No!";
      //   IsValidate = false;
      // }

      // if (!this.employeeStore.empdetails.StaffType) {
      //   this.err.StaffType = "Please Enter Staff Type!";
      //   IsValidate = false;
      // }

      // // Other information validation
      // if (!this.employeeStore.empdetails.EmergencyContact) {
      //   this.err.EmergencyContact = "Please Enter Contact Number!";
      //   IsValidate = false;
      // } else {
      //   const contactNoRegex1 = /^[0-9]{10}$/;
      //   if (!contactNoRegex1.test(this.employeeStore.empdetails.EmergencyContact)) {
      //     this.err.EmergencyContact =
      //       "Please Enter a valid 10-digit Contact Number!";
      //     IsValidate = false;
      //   }
      // }


      // if (!this.employeeStore.empdetails.ContactEmail) {
      //   this.err.ContactEmail = "Please Enter an Email!";
      //   IsValidate = false;
      // } else {
      //   const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      //   if (!EmailRegex.test(this.employeeStore.empdetails.ContactEmail)) {
      //     this.err.ContactEmail = "Please Enter a valid Email address!";
      //     IsValidate = false;
      //   }
      // }

      // if (!this.employeeStore.empdetails.signature) {
      //   this.err.signature = "Please Enter Signature!";
      //   IsValidate = false;
      // }


      // if (!this.employeeStore.empdetails.Granted) {
      //   this.err.Granted = "Please Enter Granted!";
      //   IsValidate = false;
      // }



      // if (!this.employeeStore.empdetails.UserType) {
      //   this.err.UserType = "Please Enter User Type!";
      //   IsValidate = false;
      // }

      // if (!this.employeeStore.empdetails.UserGroup) {
      //   this.err.UserGroup = "Please Enter UserGroup!";
      //   IsValidate = false;
      // }
      // if (!this.employeeStore.empdetails.CSONo) {
      //   this.err.CSONo = "Please Enter CSONo!";
      //   IsValidate = false;
      // }

      ///////////////


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
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 90%;
  position: relative;
}

.modal-header {
  background: linear-gradient(to right, #1048c2, #0b2c88, #08236b);
  /* from-blue-600, via-blue-700, to-blue-900 */
  backdrop-filter: blur(12px);
  /* backdrop-blur-md */
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
  opacity: 0.8;
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
