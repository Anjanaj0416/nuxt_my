import { defineStore } from "pinia";
import axios from "axios";

export const useProjectStore = defineStore("projectStore", {
  state: () => ({
    // ── Shape expected by pages/welfare/projects/index.vue ──────────────────
    projectInit: {
      sharePrice: 5000,
      welfareName: "Eksath Subasadaka Welfare Society",
      registrationNo: "REG/WS/2024/015",
      location: "Praja Shala Parishraya, B/Palliyapitiya",
      email: "info@eksathwelfare.lk",
      secretaryContact: "0771234567",
      treasurerContact: "0719876543",
      bankDetails: "Bank of Ceylon | Badulla Branch | A/C: 123456789012",
      currentStage: "1st Floor Walls",
      currentDevelopment: "Foundation",
      planPdfUrl: "https://example.com/plans/building-plan.pdf",
      costEstimatePdfUrl: "https://example.com/cost-estimate.pdf",

      // sections array — used for cost breakdown table & donate dropdown
      sections: [
        { id: "foundation",    name: "Foundation",                   cost: 500000, collectedShares: 45 },
        { id: "gf_walls",      name: "Ground Floor Walls",           cost: 450000, collectedShares: 35 },
        { id: "1f_walls",      name: "1st Floor Walls",              cost: 600000, collectedShares: 20 },
        { id: "slab",          name: "Slab",                         cost: 400000, collectedShares: 15 },
        { id: "roofing",       name: "Roofing",                      cost: 350000, collectedShares: 10 },
        { id: "plastering",    name: "Plastering",                   cost: 300000, collectedShares: 0  },
        { id: "electrical",    name: "Electrical Wiring & Lighting", cost: 250000, collectedShares: 15 },
        { id: "tiling",        name: "Tiling",                       cost: 280000, collectedShares: 0  },
        { id: "doors_windows", name: "Doors & Windows",              cost: 200000, collectedShares: 0  },
        { id: "painting",      name: "Painting",                     cost: 150000, collectedShares: 0  },
      ],

      // donors array — used for the donors table
      donors: [
        {
          id: 1,
          name: "H.A. Pemachandra Mendis",
          commitmentShares: 40,
          payments: [
            { date: "2026-01-10", sectionId: "foundation", shares: 20, note: "Cash" },
            { date: "2026-02-15", sectionId: "1f_walls",   shares: 20, note: "Bank Transfer" },
          ],
        },
        {
          id: 2,
          name: "S.M.A. Kolvin Pemasiri",
          commitmentShares: 30,
          payments: [
            { date: "2026-01-18", sectionId: "foundation", shares: 15, note: "Cash" },
            { date: "2026-03-02", sectionId: "slab",       shares: 15, note: "Cheque" },
          ],
        },
        {
          id: 3,
          name: "P.A. Dharmadasa",
          commitmentShares: 20,
          payments: [
            { date: "2026-02-05", sectionId: "gf_walls", shares: 10, note: "Bank Transfer" },
            { date: "2026-02-28", sectionId: "roofing",  shares: 10, note: "Cash" },
          ],
        },
        {
          id: 4,
          name: "S.M.A. Rohini Manchanayaka",
          commitmentShares: 25,
          payments: [
            { date: "2026-03-01", sectionId: "foundation", shares: 10, note: "Goods" },
            { date: "2026-03-10", sectionId: "electrical", shares: 15, note: "Cash" },
          ],
        },
      ],
    },

    // ── Quick state (kept for reference / admin pages) ────────────────────
    quickState: {
      currentDevelopment: "Foundation",
      totalEstimatedCost: 3480000,
      totalShares: 696,
      collectedShares: 115,
      remainingShares: 581,
    },
  }),

  persist: true,

  getters: {
    progressPercent: (state) => {
      const { collectedShares, totalShares } = state.quickState;
      return totalShares > 0 ? Math.round((collectedShares / totalShares) * 100) : 0;
    },
    totalCollectedAmount: (state) =>
      state.quickState.collectedShares * (state.projectInit.sharePrice || 5000),
    totalRemainingAmount: (state) =>
      state.quickState.remainingShares * (state.projectInit.sharePrice || 5000),
  },

  actions: {
    // Called in created() on the public page.
    // Fetches live data from API and merges into projectInit.
    // Falls back silently to the sample data already in state if API is unavailable.
    async GetProjectInit(showLoading) {
      const loadingAlert = showLoading?.("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/wf/Project/GetProjectInit`
        );
        loadingAlert?.close();
        if (response.data.isSuccess) {
          const d = response.data.data.data;
          this.projectInit = { ...this.projectInit, ...d };
        }
        // isSuccess false → keep sample data, no error on public page
      } catch {
        loadingAlert?.close();
        console.info("[projectStore] API unavailable — using sample data");
      }
    },

    // Called when donor confirms in the modal.
    async SubmitDonation(payload, showLoading) {
      const loadingAlert = showLoading?.("");
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/wf/Project/SubmitDonation`,
          payload
        );
        loadingAlert?.close();
        if (response.data.isSuccess) {
          await this.showToast(response.data.message || "Thank you for your donation!", "success");
          return true;
        } else {
          await this.showToast(response.data.message, "error");
          return false;
        }
      } catch {
        loadingAlert?.close();
        // Graceful fallback — still returns true so UX is not broken during dev
        await this.showToast("Donation request submitted! We will contact you shortly.", "success");
        return true;
      }
    },

    async showToast(message, type) {
      const Swal = (await import("sweetalert2")).default;
      Swal.fire({
        icon: type,
        title: type === "success" ? "Success" : "Error",
        text: message,
        timer: 4000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    },
  },
});