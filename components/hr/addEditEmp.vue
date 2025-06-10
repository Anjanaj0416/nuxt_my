<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">Emplayee Details</h2>
        <closebtn @close="closeModal" />
      </div>

      <!-- Modal Content (scrollable) -->
      <div class="modal-content">
        <div class="form-content">
          <h3 class="text-blue-600 font-bold">General Information</h3>
          <hr class="mb-4" />
          <!-- {{ hrStore.initEmployee }}
          <hr />
          {{ hrStore.empdetails }}
          <hr /> -->
          <!-- <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            
          </div> -->

          <div
            class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3"
          >
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Employee Name <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                v-model="hrStore.empdetails.empName"
                placeholder="Enter company Name"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.empName" class="mt-2 text-sm text-red-600">
                {{ err.empName }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                NIC Number <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                v-model="hrStore.empdetails.nic"
                placeholder="Enter NIC Number"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.NIC" class="mt-2 text-sm text-red-600">
                {{ err.NIC }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Address <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                v-model="hrStore.empdetails.address"
                placeholder="Enter Address Line 2"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.Address" class="mt-2 text-sm text-red-600">
                {{ err.Address }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Contact Number 1<span class="text-red-500">*</span>
              </label>
              <input
                type="tel"
                v-model="hrStore.empdetails.contact1"
                placeholder="Enter Contact Number 1"
                maxlength="10"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.Contact1" class="mt-2 text-sm text-red-600">
                {{ err.Contact1 }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600"
                >Contact Number 2</label
              >
              <input
                type="text"
                v-model="hrStore.empdetails.Contact2"
                :maxlength="10"
                placeholder="Enter Contact Number 2"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <p v-if="err.Contact2" class="mt-2 text-sm text-red-600">
                {{ err.Contact2 }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Email 1<span class="text-red-500">*</span>
              </label>
              <input
                type="Email"
                v-model="hrStore.empdetails.Email1"
                placeholder="Enter Email 1"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <p v-if="err.Email1" class="mt-2 text-sm text-red-600">
                {{ err.Email1 }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Email 2<span class="text-red-500">*</span>
              </label>
              <input
                type="Email"
                v-model="hrStore.empdetails.Email2"
                placeholder="Enter Email 2"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <p v-if="err.Email2" class="mt-2 text-sm text-red-600">
                {{ err.Email2 }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600"
                >Emergency Contact Number</label
              >

              <input
                type="text"
                v-model="hrStore.empdetails.EmergencyContact"
                :maxlength="10"
                placeholder="Enter Emergency Contact Number"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.EmergencyContact" class="mt-2 text-sm text-red-600">
                {{ err.EmergencyContact }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Department <span class="text-red-500">*</span>
              </label>

              <serach_Input
                :arrItems="hrStore.initEmployee.arrDepartments"
                ref="refDepartment"
                label=""
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
              <input
                type="text"
                v-model="hrStore.empdetails.designation"
                placeholder="Enter Designation"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <p v-if="err.Designation" class="mt-2 text-sm text-red-600">
                {{ err.Designation }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                EPF No
              </label>
              <input
                type="text"
                v-model="hrStore.empdetails.epfNo"
                placeholder="Enter EPF No"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <p v-if="err.EPFNo" class="mt-2 text-sm text-red-600">
                {{ err.EPFNo }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-600 mb-2"
                >Gender</label
              >
              <selectinput
                :selections="hrStore.initEmployee.arrGender"
                v-model="hrStore.empdetails.Gender"
                label=""
              />

              <p v-if="err.Gender" class="mt-2 text-sm text-red-600">
                {{ err.Gender }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600"
                >Staff Type</label
              >
              <serach_Input
                :arrItems="hrStore.initEmployee.arrStaffTypes"
                ref="refStaffType"
                label=""
                @selectItem="GetSelectStaffType"
              />

              <p v-if="err.StaffType" class="mt-2 text-sm text-red-600">
                {{ err.StaffType }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">DOB</label>
              <input
                type="Date"
                v-model="hrStore.empdetails.DOB"
                placeholder="Enter DOB"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.DOB" class="mt-2 text-sm text-red-600">
                {{ err.DOB }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600"
                >Emp Type</label
              >

              <serach_Input
                :arrItems="hrStore.initEmployee.arrEmployeeStatus"
                ref="refEmpType"
                label=""
                @selectItem="GetSelectEmpType"
              />
              <p v-if="err.EmpType" class="mt-2 text-sm text-red-600">
                {{ err.EmpType }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600"
                >Date Of Join</label
              >
              <input
                type="date"
                v-model="hrStore.empdetails.dateOfJoin"
                placeholder="Enter Date Of Join"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.DateOfJoin" class="mt-2 text-sm text-red-600">
                {{ err.DateOfJoin }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600"
                >Manager Emp No</label
              >

              <serach_Input
                :arrItems="hrStore.initEmployee.arrManagers"
                ref="refManager"
                label=""
                @selectItem="GetSelectManager"
              />
              <p v-if="err.ManagerEmpNo" class="mt-2 text-sm text-red-600">
                {{ err.ManagerEmpNo }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600"
                >Calling Name</label
              >
              <input
                type="text"
                v-model="hrStore.empdetails.callingName"
                placeholder="Enter Calling Name"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.callingName" class="mt-2 text-sm text-red-600">
                {{ err.callingName }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600"
                >On Time</label
              >
              <input
                type="time"
                v-model="hrStore.empdetails.onTime"
                placeholder="Enter On Time"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.ontime" class="mt-2 text-sm text-red-600">
                {{ err.ontime }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600"
                >Off Time</label
              >
              <input
                type="time"
                v-model="hrStore.empdetails.offTime"
                placeholder="Enter Off Time"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.offtime" class="mt-2 text-sm text-red-600">
                {{ err.offtime }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600"
                >Granted</label
              >
              <input
                type="text"
                v-model="hrStore.empdetails.granted"
                placeholder="Enter Granted"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.Granted" class="mt-2 text-sm text-red-600">
                {{ err.Granted }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600"
                >User Group</label
              >
              <input
                type="text"
                v-model="hrStore.empdetails.UserGroup"
                placeholder="Enter User Group"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.UserGroup" class="mt-2 text-sm text-red-600">
                {{ err.UserGroup }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Role</label>
              <serach_Input
                :arrItems="hrStore.initEmployee.arrRoles"
                ref="refRoles"
                label=""
                @selectItem="GetSelectRole"
              />

              <p v-if="err.Role" class="mt-2 text-sm text-red-600">
                {{ err.Role }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600"
                >User Type</label
              >
              <input
                type="text"
                v-model="hrStore.empdetails.userType"
                placeholder="Enter User Type"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.UserType" class="mt-2 text-sm text-red-600">
                {{ err.UserType }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600"
                >CSO No</label
              >
              <input
                type="text"
                v-model="hrStore.empdetails.csoNo"
                placeholder="Enter CSO No"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.CSONo" class="mt-2 text-sm text-red-600">
                {{ err.CSONo }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600"
                >Emp Category</label
              >

              <serach_Input
                :arrItems="hrStore.initEmployee.arrEmpCategories"
                ref="refEmpCategory"
                label=""
                @selectItem="GetSelectEmpCategories"
              />

              <p v-if="err.Category" class="mt-2 text-sm text-red-600">
                {{ err.Category }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600"
                >Privilege Level</label
              >
              <input
                type="text"
                v-model="hrStore.empdetails.privilegeLevel"
                placeholder="Enter Privilege Level"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-600"
                >Transport</label
              >

              <toggleoption v-model="hrStore.empdetails.isTransport" />
              <div class="text-sm font-medium text-gray-600">
                {{ hrStore.empdetails.isTransport ? "Transport" : "Private" }}
              </div>
            </div>
          </div>

          <div
            class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-3"
          >
            <div class="">
              <label class="block text-sm font-bold mb-2 text-gray-600"
                >Photo</label
              >

              <imagepicker1
                :existingImagePath="imageroot + hrStore.empdetails.imageUrl"
                @deleteExistingImage="hrStore.empdetails.image = null"
                @GetSelectedImage="GetSelectedImageFile"
                ref="refImage"
              />
            </div>
            <div class="">
              <label class="block text-sm font-bold mb-2 text-gray-600"
                >Signature</label
              >
              <imagepicker1
                :existingImagePath="imageroot + hrStore.empdetails.signatureUrl"
                @deleteExistingImage="hrStore.empdetails.signature = null"
                @GetSelectedImage="GetSelectedSignature"
                ref="refSignature"
              />
              <p v-if="err.signature" class="mt-2 text-sm text-red-600">
                {{ err.signature }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold mb-2 text-gray-600"
                >NIC</label
              >
              <imagepicker1
                :existingImagePath="imageroot + hrStore.empdetails.nicUrl"
                @deleteExistingImage="hrStore.empdetails.nicImage = null"
                @GetSelectedImage="GetSelectedNic"
                ref="refNICImage"
              />
              <p v-if="err.NIC" class="mt-2 text-sm text-red-600">
                {{ err.NIC }}
              </p>
            </div>
          </div>

          <!-- Resingnation Details -->
          <h3 class="mt-12 text-blue-600 font-bold">Leave Details</h3>
          <hr class="mb-4" />

          <div
            class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-3"
          >
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Annual Leave <span class="text-red-500">*</span>
              </label>
              <input
                type="number"
                v-model="hrStore.empdetails.annualLeave"
                placeholder="Enter Annual Leave"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.AnnualLeave" class="mt-2 text-sm text-red-600">
                {{ err.AnnualLeave }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Casual Leave <span class="text-red-500">*</span>
              </label>
              <input
                type="number"
                v-model="hrStore.empdetails.casualLeave"
                placeholder="Enter Casual Leave "
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.CasualLeave" class="mt-2 text-sm text-red-600">
                {{ err.CasualLeave }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Sick Leave <span class="text-red-500">*</span>
              </label>
              <input
                type="number"
                v-model="hrStore.empdetails.sickLeave"
                placeholder="Enter Sick Leave"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.SickLeave" class="mt-2 text-sm text-red-600">
                {{ err.SickLeave }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Other Leave <span class="text-red-500">*</span>
              </label>
              <input
                type="number"
                v-model="hrStore.empdetails.otherLeave"
                placeholder="Enter Sick Leave"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.OtherLeave" class="mt-2 text-sm text-red-600">
                {{ err.OtherLeave }}
              </p>
            </div>
          </div>

          <!-- OT Details -->

          <h3 class="mt-12 text-blue-600 font-bold">OT Details</h3>
          <hr class="mb-4" />
          <div
            class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-3"
          >
            <div>
              <label class="block text-sm font-bold text-gray-600"
                >OT Allowed</label
              >

              <toggleoption v-model="hrStore.empdetails.isOTAllow" />
              <div class="text-sm font-medium text-gray-600">
                {{
                  hrStore.empdetails.isOTAllow
                    ? "OT Entitled"
                    : "No OT Recomanded"
                }}
              </div>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-600"
                >Morning OT Allowed</label
              >

              <toggleoption v-model="hrStore.empdetails.isMorningOTAllowed" />
              <div class="text-sm font-medium text-gray-600">
                {{
                  hrStore.empdetails.isMorningOTAllowed
                    ? "OT Entitled"
                    : "No OT Recomanded"
                }}
              </div>
            </div>
          </div>

          <!-- Resingnation Details -->
          <h3 class="mt-12 text-blue-600 font-bold">Resingnation Details</h3>
          <hr class="mb-4" />

          <div
            class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-3"
          >
            <div>
              <label class="block text-sm font-bold text-gray-600">
                Are You Resigned?
              </label>

              <toggleoption v-model="hrStore.empdetails.isResign" />
              <div class="text-sm font-medium text-gray-600">
                {{ hrStore.empdetails.isResign ? "Resigned" : "Working" }}
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-600">
                Date Of Resign
              </label>
              <input
                type="date"
                v-model="hrStore.empdetails.dateOfResign"
                placeholder="Enter Date Of Resign"
                required
                :disabled="!hrStore.empdetails.isResign"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
              />
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-600">
                Reason For Resign
              </label>
              <textarea
                v-model="hrStore.empdetails.reasonForResign"
                placeholder="Enter Reason For Resign"
                required
                :disabled="!hrStore.empdetails.isResign"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
                rows="4"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-600">
                Status
              </label>
              <toggleoption
                v-model="hrStore.empdetails.isActive"
              ></toggleoption>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button @click="cancel" class="cancel-button">Cancel</button>
        <button @click="SaveEmployee()" class="confirm-button">
          Save Leads Details
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useHrStore } from "~/stores/modules/hrStore";
import { useUserStore } from "~/stores/modules/userStore";

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
  components: {
    closebtn,
    serach_Input,
    ImageLable,
    imagecomp,
    toggleoption,
    imagepicker1,
    selectinput,
  },
  data() {
    return {
      isOpen: true,
      imageroot: "",
      err: {
        EmpNo: "",
        EPFNo: "",
        empName: "",
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
        callingName: "",
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

        CSONo: "",
      },

      showLoading: null,
    };
  },
  computed: {},
  async created() {
    this.hrStore = useHrStore();
    this.userStore = useUserStore();
    this.showLoading = this.$showLoading;
    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
  },
  mounted() {
    this.$refs.refDepartment.initItem(this.hrStore.empdetails.department.id);
    this.$refs.refStaffType.initItem(this.hrStore.empdetails.staffType.id);
    this.$refs.refEmpType.initItem(this.hrStore.empdetails.empType.id);
    this.$refs.refManager.initItem(this.hrStore.empdetails.managerEmployee.id);
    this.$refs.refRoles.initItem(this.hrStore.empdetails.role.id);
    this.$refs.refEmpCategory.initItem(this.hrStore.empdetails.category.id);
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

    async SaveEmployee() {
      //if (this.IsValidate()) {
      if (true) {
        // console.log(JSON.stringify(this.hrStore.empdetails));
        const formData = this.convertToFormData(this.hrStore.empdetails);
        await this.hrStore.AddEdiEmployee(formData, this.showLoading);
        this.closeModal();
      } else {
        console.log("Validation failed.");
      }
    },

    convertToFormData(formObject) {
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
      formData.append("EmployeeStatus", formObject.employeeStatus || "");
      formData.append("Email1", formObject.email1 || "");
      formData.append("Email2", formObject.email2 || "");
      formData.append("EmergencyContact", formObject.emergencyContact || "");
      formData.append("Gender", formObject.gender || "");
      formData.append("EpfNo", formObject.epfNo || "");
      formData.append("Granted", formObject.granted || "");

      // Files
      if (formObject.image) {
        formData.append("Image", formObject.image);
      }

      formData.append("IsActive", formObject.isActive);
      formData.append("IsExecutive", formObject.isExecutive);
      formData.append("IsMorningOTAllowed", formObject.isMorningOTAllowed);
      formData.append("IsTransport", formObject.isTransport ?? false);
      formData.append("IsOTAllow", formObject.isOTAllow);
      formData.append("IsResigned", formObject.isResigned);
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
      formData.append("PrivilegeLevel", formObject.privilegeLevel || "");
      formData.append("ReasonForResign", formObject.reasonForResign || "");
      formData.append("RoleId", formObject.role.id);
      formData.append("SickLeave", formObject.sickLeave || 0);

      if (formObject.signature) {
        formData.append("Signature", formObject.signature);
      }

      formData.append("StaffTypeId", formObject.staffType.id ?? 0);
      formData.append("UserType", formObject.userType || "");

      return formData;
    },

    GetSelectDepartment(item) {
      this.hrStore.empdetails.department = item;
    },

    GetSelectStaffType(item) {
      this.hrStore.empdetails.staffType = item;
    },

    GetSelectManager(item) {
      this.hrStore.empdetails.managerEmployee = item;
    },

    GetSelectRole(item) {
      this.hrStore.empdetails.role = item;
    },

    GetSelectEmpCategories(item) {
      this.hrStore.empdetails.category = item;
    },

    GetSelectedImageFile(file) {
      this.hrStore.empdetails.image = file;
    },

    GetSelectedSignature(file) {
      this.hrStore.empdetails.signature = file;
    },

    GetSelectedNic(file) {
      this.hrStore.empdetails.nicImage = file;
    },

    IsValidate() {
      this.clearErr();

      let IsValidate = true;

      if (!this.hrStore.empdetails.gender) {
        this.err.Gender = "Please Enter Gender!";
        IsValidate = false;
      }

      if (!this.hrStore.empdetails.department) {
        this.err.Department = "Please Enter Business Registration Number!";
        IsValidate = false;
      }

      if (!this.hrStore.empdetails.email1) {
        this.err.Email1 = "Please Enter an Email 1!";
        IsValidate = false;
      } else {
        const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!EmailRegex.test(this.hrStore.empdetails.Email1)) {
          this.err.Email1 = "Please Enter a valid Email address!";
          IsValidate = false;
        }
      }

      if (!this.hrStore.empdetails.Email1) {
        this.err.Email2 = "Please Enter an Email 2!";
        IsValidate = false;
      } else {
        const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!EmailRegex.test(this.hrStore.empdetails.Email1)) {
          this.err.Email2 = "Please Enter a valid Email address!";
          IsValidate = false;
        }
      }

      if (!this.hrStore.empdetails.empName) {
        this.err.empName = "Please Enter emp Name!";
        IsValidate = false;
      }

      if (!this.hrStore.empdetails.Contact1) {
        this.err.Contact1 = "Please Enter Contact Number 1!";
        IsValidate = false;
      } else {
        const contactNoRegex = /^[0-9]{10}$/;
        if (!contactNoRegex.test(this.hrStore.empdetails.Contact1)) {
          this.err.Contact1 = "Please Enter a valid 10-digit contact number!";
          IsValidate = false;
        }
      }

      if (!this.hrStore.empdetails.nic) {
        this.err.NIC = "Please Enter NIC Number";
        IsValidate = false;
      }

      if (!this.hrStore.empdetails.Address) {
        this.err.Address = "Please Enter Address!";
        IsValidate = false;
      }

      if (!this.hrStore.empdetails.DOB) {
        this.err.DOB = "Please Enter DOB!";
        IsValidate = false;
      }

      if (!this.hrStore.empdetails.Contact2) {
        this.err.Contact2 = "Please Enter Contact Number 2!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.curEmp.Contact2)) {
          this.err.Contact2 = "Please Enter a valid 10-digit Mobile Number!";
          IsValidate = false;
        }
      }

      if (!this.hrStore.empdetails.Department) {
        this.err.Department = "Please Enter Website!";
        IsValidate = false;
      }

      if (!this.hrStore.empdetails.EPFNo) {
        this.err.EPFNo = "Please Enter EPF No!";
        IsValidate = false;
      }

      if (!this.hrStore.empdetails.StaffType) {
        this.err.StaffType = "Please Enter Staff Type!";
        IsValidate = false;
      }

      // // Other information validation
      if (!this.hrStore.empdetails.EmpType) {
        this.err.EmpType = "Please Enter Emp Type!";
        IsValidate = false;
      }

      if (!this.hrStore.empdetails.DateOfJoin) {
        this.err.DateOfJoin = "Please Enter Date Of Join!";
        IsValidate = false;
      }

      if (!this.hrStore.empdetails.Designation) {
        this.err.Designation = "Please Enter Designation!";
        IsValidate = false;
      }

      if (!this.hrStore.empdetails.EmergencyContact) {
        this.err.EmergencyContact = "Please Enter Contact Number!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.hrStore.empdetails.EmergencyContact)) {
          this.err.EmergencyContact =
            "Please Enter a valid 10-digit Contact Number!";
          IsValidate = false;
        }
      }

      if (!this.hrStore.empdetails.callingName) {
        this.err.callingName = "Please Enter Calling Name!";
        IsValidate = false;
      }

      if (!this.hrStore.empdetails.ContactEmail) {
        this.err.ContactEmail = "Please Enter an Email!";
        IsValidate = false;
      } else {
        const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!EmailRegex.test(this.hrStore.empdetails.ContactEmail)) {
          this.err.ContactEmail = "Please Enter a valid Email address!";
          IsValidate = false;
        }
      }

      if (!this.hrStore.empdetails.signature) {
        this.err.signature = "Please Enter Signature!";
        IsValidate = false;
      }

      if (!this.hrStore.empdetails.ontime) {
        this.err.ontime = "Please Enter On Time!";
        IsValidate = false;
      }
      if (!this.hrStore.empdetails.offtime) {
        this.err.offtime = "Please Enter Off Time!";
        IsValidate = false;
      }

      if (!this.hrStore.empdetails.Granted) {
        this.err.Granted = "Please Enter Granted!";
        IsValidate = false;
      }

      if (!this.hrStore.empdetails.Role) {
        this.err.Role = "Please Enter Role!";
        IsValidate = false;
      }

      if (!this.hrStore.empdetails.UserType) {
        this.err.UserType = "Please Enter User Type!";
        IsValidate = false;
      }

      if (!this.hrStore.empdetails.UserGroup) {
        this.err.UserGroup = "Please Enter UserGroup!";
        IsValidate = false;
      }
      if (!this.hrStore.empdetails.CSONo) {
        this.err.CSONo = "Please Enter CSONo!";
        IsValidate = false;
      }

      ///////////////
      if (!this.hrStore.empdetails.AnnualLeave) {
        this.err.AnnualLeave = "Please Enter Annual Leave!";
        IsValidate = false;
      }
      if (!this.hrStore.empdetails.CasualLeave) {
        this.err.CasualLeave = "Please Enter Casual Leave !";
        IsValidate = false;
      }

      if (!this.hrStore.empdetails.SickLeave) {
        this.err.SickLeave = "Please Enter Sick Leave!";
        IsValidate = false;
      }

      if (!this.hrStore.empdetails.OtherLeave) {
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
