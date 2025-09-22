<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">Upload Proposal</h2>
        <button @click="closeModal" class="close-btn">&times;</button>
      </div>
<!-- {{ id }} -->
<!-- {{ proposales.listVersions }} -->
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
          <h3 class="font-bold text-gray-700 mb-4">Final Proposal Documents</h3>
          <div 
            v-if="proposales.final && proposales.final.quotationId !== '00000000-0000-0000-0000-000000000000' && !editingFinal" 
            class="flex items-center gap-2 mb-2"
          >
            <a 
              :href="proposales.final.url" 
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

          <div 
            v-else 
            class="flex items-center gap-2 mb-2"
          >
            <input 
              type="file"
              ref="finalProposal"
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none"
              @change="handleUpdateFinalProposal"
            />
            <div class="flex gap-2">
              <button 
                @click="updateFinalProposal"
                class="px-2 py-1 text-xs text-white bg-blue-900 rounded hover:bg-blue-800"
              >
                Upload
              </button>
            </div>
            <div v-if="editingFinal" class="flex gap-2">
              <button 
                @click="cancelEditFinal"
                class="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
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
          <div v-for="(proposal, index) in proposales.listVersions" :key="'existing-'+index" 
              class="flex justify-between items-center mb-2 p-2 border rounded-lg bg-gray-50">

            <!-- Proposal Name -->
            <div class="flex items-center gap-2">
              <span class="text-sm font-semibold text-gray-700">{{ proposal.versionName }}</span>
            </div>

            <div class="flex items-center gap-2">
              <template v-if="proposal.editing">
                <input 
                  type="file"
                  @change="onEditOtherProposalFileChange($event, index)"
                  class="text-sm text-gray-900 border border-red-300 rounded-lg cursor-pointer bg-white"
                />
                <button 
                  @click="cancelEditProposal(index)"
                  class="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  @click="updateOtherProposal(index)"
                  class="px-2 py-1 text-xs text-white bg-blue-900 rounded hover:bg-blue-800 rounded-lg"
                >
                  Upload
                </button>
              </template>

              <!-- VIEW EXISTING PROPOSAL -->
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
          <div v-for="(file, index) in otherProposals" :key="'new-'+ index" 
              class="flex items-center gap-2 mb-2 p-2 border rounded-lg bg-white shadow-sm">
            
            <span class="text-sm font-semibold text-gray-700">
              {{ file.version }}
            </span>

            <input 
              type="file"
              class="flex-1 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white"
              @change="onNewOtherProposalFileChange($event, index)"
            />

            <button 
              @click="removeOtherProposal(index)" 
              class="px-2 py-1 text-xs font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
            >
              ✕ Remove
            </button>
            <button 
              @click="updateNewOtherProposal(index)" 
              class="px-2 py-1 text-xs font-medium text-white bg-blue-900 rounded-lg hover:bg-blue-800 transition"
            >
              Upload
            </button>
          </div>


        </div>

      </div>

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button @click="closeModal" class="cancel-button">Cancel</button>
        <!-- <button @click="SetApprove" class="confirm-button">upload</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { useOrderStore } from "~/stores/modules/orderStore";
import { useUserStore } from "~/stores/modules/userStore";

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
      editingOther: false,
      proposales: {
        final: {
          quotationId: "00000000-0000-0000-0000-000000000000",
          url: null
        },
        listVersions: []
      }
    };
  },
  async created() {
    this.userStore = useUserStore();
    this.orderStore = useOrderStore();
    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    this.showLoading = this.$showLoading;

    await this.orderStore.loadProposal(this.id, this.showLoading);
    // this.proposales = this.orderStore.listProposal;
    this.proposales = this.orderStore.listProposal.data || this.orderStore.listProposal;

  },
  methods: {

    startEditFinal() {
      this.editingFinal = true;
    },
    cancelEditFinal() {
      this.editingFinal = false;
      this.$refs.finalProposal.value = null;
      this.finalFile = null;
    },

    startEditProposal(index) {
      this.proposales.listVersions[index].editing = true;
    },
    cancelEditProposal(index) {
      this.proposales.listVersions[index].editing = false;
    },

    addOtherProposal() {
      // Find the highest version number from backend
      let maxVersion = 0;
      if (this.proposales.listVersions?.length) {
        maxVersion = Math.max(
          ...this.proposales.listVersions.map(p => {
            // Extract number from "Version X"
            const match = p.versionName?.match(/(\d+)/);
            return match ? parseInt(match[1], 10) : 0;
          })
        );
      }

      // Next version continues from highest
      const nextVersion = maxVersion + this.otherProposals.length + 1;

      this.otherProposals.push({ file: null, version: `Version ${nextVersion}` });
    },


    // ============ Final Proposal ============
    handleUpdateFinalProposal(e) {
      const file = e.target.files[0];
      if (file) {
        this.finalProposalFile = file;
        console.log("Selected final proposal:", file);
      }
    },

    async updateFinalProposal() {
      if (!this.finalProposalFile) return;
      const result = await this.$showConfirm("Confirm: Upload proposal?", "warning");
      if (!result.isConfirmed) return;

      const formData = new FormData();
      formData.append("File", this.finalProposalFile);
      formData.append("IsFinal", "true");
      formData.append("QuotationId", this.proposales.final?.quotationId || this.quotationId || '');
      formData.append("OrderId", this.id);

      await this.orderStore.GetPraposalDocument(formData, this.showLoading);

      // Update local final proposal
      this.proposales.final.url = URL.createObjectURL(this.finalProposalFile);
      this.proposales.final.quotationId = "TEMP-" + Date.now(); // temporary ID
      this.editingFinal = false;
      this.finalProposalFile = null;
    },

    // ============ Existing Other Proposals ============
    onEditOtherProposalFileChange(e, index) {
      const file = e.target.files[0];
      if (file) {
        this.proposales.listVersions[index].file = file; 
        console.log("Selected existing proposal:", file);
      }
    },

    async updateOtherProposal(index) {
      const proposal = this.proposales.listVersions[index];
      if (!proposal.file) {
        console.warn("No file selected for this proposal!");
        return;
      }

      const result = await this.$showConfirm("Confirm: Upload proposal?", "warning");
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("File", proposal.file);
        formData.append("IsFinal", "false");
        formData.append("QuotationId", proposal.quotationId || this.quotationId || '');
        formData.append("OrderId", this.id);

        await this.orderStore.GetPraposalDocument(formData, this.showLoading);

        // Update proposal locally
        proposal.url = URL.createObjectURL(proposal.file);
        proposal.editing = false;
        proposal.file = null;
      }
    },

    // ============ New Other Proposals ============
    onNewOtherProposalFileChange(e, index) {
      const file = e.target.files[0];
      if (file) {
        this.otherProposals[index].file = file; 
        console.log("Selected new proposal:", file);
      }
    },

    async updateNewOtherProposal(index) {
      const newProposal = this.otherProposals[index];
      if (!newProposal.file) {
        console.warn("No file selected for new proposal!");
        return;
      }

      const result = await this.$showConfirm("Confirm: Upload proposal?", "warning");
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("File", newProposal.file);
        formData.append("IsFinal", "false");
        formData.append("QuotationId", '');
        formData.append("OrderId", this.id);

        await this.orderStore.GetPraposalDocument(formData, this.showLoading);
        
        // Add the new file directly to listVersions
        this.proposales.listVersions.push({
          quotationId: "TEMP-" + Date.now(), // temporary ID
          versionName: newProposal.version,
          url: URL.createObjectURL(newProposal.file),
          editing: false
        });

        this.otherProposals.splice(index, 1); // remove from newProposal
      }
    },

    removeOtherProposal(index) {
      this.otherProposals.splice(index, 1);
    },

    closeModal() {
      this.isOpen = false;
      this.$emit("close");
    }
    
  }
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
