<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">Upload Proposal</h2>
        <button @click="closeModal" class="close-btn">&times;</button>
      </div>

      {{ id }}

      <!-- Modal Content -->
      <div class="modal-content space-y-6">
        <div class="flex justify-end">
          <a 
            href="/assets/img/proposal-template.pdf" 
            download
            class="inline-flex items-center gap-2 text-sm font-medium text-[#0b2145] underline underline-offset-2 hover:text-[#07306d] hover:underline-offset-4 transition"
          >
            <!-- Download Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                stroke="currentColor" 
                class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
            </svg>
            <span class="italic">Click to download proposal template</span>
          </a>
        </div>

        <!-- Final Proposal -->
        <div class="p-4 border rounded-lg shadow-sm bg-white">
          <label class="block text-sm font-bold text-gray-700 mb-2">
            Final Proposal Document
          </label>

          <!-- Existing final proposal -->
          <div v-if="proposales.final && !editingFinal" class="flex items-center gap-2 mb-2">
            <a 
              :href="proposales.final" 
              target="_blank"
              class="text-sm text-blue-600 underline hover:text-blue-800"
            >
              View Final Proposal
            </a>
            <button 
              @click="startEditFinal()"
              class="px-2 py-1 text-xs text-white bg-blue-800 rounded hover:bg-gray-700 ml-auto rounded-lg"
            >
              Edit
            </button>
          </div>


          <!-- File input for new or editing -->
          <div v-else class="flex items-center gap-2 mb-2">
            <input 
              type="file"
              ref="finalProposal"
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none"
              @change="handleFinalProposal"
            />
            <div v-if="editingFinal" class="flex gap-2">
              <button 
                @click="cancelEditFinal()"
                class="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>

          <!-- Error message -->
          <!-- <p v-if="err.approvedImage" class="mt-2 text-sm text-red-600">{{ err.approvedImage }}</p> -->
        </div>



        <!-- Other Proposals -->
        <div class="p-4 border rounded-lg shadow-sm bg-white">
          <div class="flex justify-between items-center mb-3">
            <h3 class="font-bold text-gray-700">Other Proposal Documents</h3>
            <button 
              type="button"
              @click="addOtherProposal"
              class="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              + Add Document
            </button>
          </div>

          <!-- Existing versions (view only) -->
          <div v-for="(proposal, index) in proposales.versions" :key="'existing-'+index" 
              class="flex justify-between items-center mb-2 p-2 border rounded-lg bg-gray-50">

            <!-- Proposal Name -->
            <div class="flex items-center gap-2">
              <span class="text-sm font-semibold text-gray-700">{{ proposal.name }}</span>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2">
              <input 
                v-if="proposal.editing"
                type="file"
                class="text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white"
                @change="updateExistingProposal($event, index)"
              />
              
              <template v-if="proposal.editing">
                <button 
                  @click="cancelEditProposal(index)"
                  class="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600 rounded-lg"
                >
                  Cancel
                </button>
              </template>

              <template v-else>
                <a 
                  :href="proposal.url"
                  target="_blank"
                  class="text-xs text-blue-600 underline hover:text-blue-800 mr-12"
                >
                  View PDF
                </a>
                <a 
                  href="#"
                  @click.prevent="startEditProposal(index)"
                  class="px-2 py-1 text-xs text-white bg-blue-800 rounded hover:bg-gray-700 ml-auto rounded-lg"
                >
                  Edit PDF
                </a>
              </template>
            </div>
          </div>


          <!-- New uploads -->
          <div v-for="(file, index) in otherProposals" :key="'new-'+index" 
              class="flex items-center gap-2 mb-2 p-2 border rounded-lg bg-white shadow-sm">
            <span class="text-sm font-semibold text-gray-700">
              Version {{ proposales.versions.length + index + 1 }}
            </span>
            
            <input 
              type="file"
              class="flex-1 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white"
              @change="updateOtherProposal($event, index)"
            />

            <button 
              @click="removeOtherProposal(index)" 
              class="px-2 py-1 text-xs font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
            >
              ✕ Remove
            </button>
          </div>
        </div>

      </div>

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button @click="closeModal" class="cancel-button">Cancel</button>
        <button @click="SetApprove" class="confirm-button">upload</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useOrderStore } from "~/stores/modules/orderStore";

export default {
  props: ["id"],
  data() {
    return {
      isOpen: true,
      imageroot: "",
      ApprovalMemo: "",
      otherProposals: [], 
      err: { approvedImage: "" },
      editingFinal: false,
      proposales:{
        final: "",
        versions: [
          { name: "Version 1", url: "/assets/img/proposal-template-v1.pdf" },
          { name: "Version 2", url: "/assets/img/proposal-template-v2.pdf" },
        ]
      }
       
    };
  },
  methods: {
    startEditFinal() {
      this.editingFinal = true;
    },
    cancelEditFinal() {
      this.editingFinal = false;
      this.$refs.finalProposal.value = null;
    },
    handleFinalProposal(event) {
      const file = event.target.files[0];
      console.log("Selected final proposal file:", file);
      this.finalFile = file;
    },
    startEditProposal(index) {
      this.proposales.versions[index].editing = true;
    },
    cancelEditProposal(index) {
      const proposal = this.proposales.versions[index];
      proposal.editing = false;
      proposal.tempName = proposal.name; 
    },
    addOtherProposal() {
      this.otherProposals.push({ file: null });
    },
    updateExistingProposal(event, index) {
      const file = event.target.files[0];
      if (file) {
        this.proposales.versions[index].file = file;
        console.log(`Updated existing proposal ${index}:`, file);
      }
    },
    updateOtherProposal(e, index) {
      const file = e.target.files[0];
      if (file) {
        this.otherProposals[index] = { file };
        console.log(`Selected file for new proposal ${index}:`, file);
      }
    },
    removeOtherProposal(index) {
      this.otherProposals.splice(index, 1);
    },
    closeModal() {
      this.isOpen = false;
      this.$emit("close");
    },

    async SetApprove() {
      if (!this.IsValidate()) return;

      const finalProposalObj = {
        QuotationId: this.id,
        VersionName: "Final-Version",
        Url: this.finalFile ? this.finalFile.name : this.proposales.final 
      };

      const otherVersions = [
        // Existing proposals
        ...this.proposales.versions.map((p, idx) => ({
          QuotationId: this.id,
          VersionName: p.name,
          Url: p.file ? p.file.name : p.url
        })),
        // Newly added proposals
        ...this.otherProposals.map((p, idx) => ({
          QuotationId: this.id,
          VersionName: `Version ${this.proposales.versions.length + idx + 1}`,
          Url: p.file ? p.file.name : ""
        }))
      ];

      const payload = {
        Final: finalProposalObj,
        listVersions: otherVersions
      };

      console.log("Payload to send to store:", payload);

      return

      try {
        const result = await useOrderStore().GetPraposalDocument(payload);
        if (result.success) {
          this.closeModal();
        }
      } catch (error) {
        console.error("Approval failed:", error);
      }
    },
    IsValidate() {
      let isSuccess = true;
      // if (this.ApprovalMemo && this.ApprovalMemo.size > 0) {
      //   this.err.approvedImage = "";
      // } else {
      //   this.err.approvedImage = "Attach the final proposal document.";
      //   isSuccess = false;
      // }
      return isSuccess;
    },
  },
};
</script>

<style scoped>
/* Modal Overlay */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex; justify-content: center; align-items: center;
  z-index: 50;
}
/* Modal */
.modal {
  background: white;
  width: 90%; max-width: 650px;
  border-radius: 1rem;
  overflow: hidden;
  display: flex; flex-direction: column;
  max-height: 90vh;
}
/* Header */
.modal-header {
  background: #0b2145;
  color: white;
  padding: 1rem;
  display: flex; justify-content: space-between; align-items: center;
}
.modal-title { font-size: 18px; font-weight: bold; }
.close-btn {
  background: transparent;
  border: none;
  font-size: 22px;
  color: white;
  cursor: pointer;
}
/* Content */
.modal-content { padding: 1.5rem; overflow-y: auto; }
/* Modal Footer */
.modal-footer {
  background: #f1f1f1;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  /* Sticky footer */
  bottom: 0;
  width: 100%;
}
.cancel-button {
  background: #e5e7eb;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  color: #374151;
}
.confirm-button {
  background: #0b2145;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  color: white;
}
</style>
