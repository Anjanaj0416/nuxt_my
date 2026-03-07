import { defineStore } from "pinia";
import axios from "axios";
import { getAccessToken } from "~/composables/getAccessToken";

export const useProjectStore = defineStore("projectStore", {
  state: () => ({
    projectInit: {
      sharePrice: 5000,
      welfareName: "",
      registrationNo: "",
      location: "",
      email: "",
      secretaryContact: "",
      treasurerContact: "",
      bankDetails: "",
      currentDevelopment: "",
      planPdfUrl: "",
      costEstimatePdfUrl: "",
      sections: [],
      donors: [],
    },
  }),

  actions: {

    async GetProjectInit(showLoading) {
      const loadingAlert = showLoading ? showLoading("") : null;
      try {

        // ── STEP 1: Get token ───────────────────────────────────────────
        console.log("🔑 [Step 1] Fetching access token...");
        const token = await getAccessToken();
        console.log("🔑 [Step 1] Token result:", token ? `OK (${token.substring(0, 30)}...)` : "FAILED - token is null");

        if (!token) {
          console.error("❌ Could not get access token - stopping");
          if (loadingAlert) loadingAlert.close();
          return;
        }

        // ── STEP 2: Call API ────────────────────────────────────────────
        const apiUrl = `${import.meta.env.VITE_API_URL}/wf/WelfareProjects/GetNewBuildingProjectDetails`;
        console.log("🌐 [Step 2] Calling API:", apiUrl);

        const response = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (loadingAlert) loadingAlert.close();

        console.log("📦 [Step 3] Response status:", response.status);
        console.log("📦 [Step 3] isSuccess:", response.data.isSuccess);
        console.log("📦 [Step 3] Full response data:", JSON.stringify(response.data, null, 2));

        if (response.data.isSuccess) {
          const d = response.data.data.data;

          // ── Welfare details ─────────────────────────────────────────
          this.projectInit.welfareName      = d.welfareDetails?.welfareName        || "";
          this.projectInit.registrationNo   = d.welfareDetails?.registrationNo     || "";
          this.projectInit.location         = d.welfareDetails?.address            || "";
          this.projectInit.email            = d.welfareDetails?.email              || "";
          this.projectInit.secretaryContact = d.welfareDetails?.secretaryContactNo || "";
          this.projectInit.treasurerContact = d.welfareDetails?.treasurerContactNo || "";

          // ── Project details ─────────────────────────────────────────
          this.projectInit.currentDevelopment = d.project?.currentDevelopment || "";
          this.projectInit.planPdfUrl         = d.project?.planPdfUrl          || "";
          this.projectInit.costEstimatePdfUrl = d.project?.costEstimatePdfUrl  || "";
          this.projectInit.sharePrice         = d.project?.perShareCost        || 5000;

          // ── Bank details ────────────────────────────────────────────
          if (d.bankDetails) {
            this.projectInit.bankDetails =
              `${d.bankDetails.bankName} | ${d.bankDetails.branch} | A/C: ${d.bankDetails.accountNo}`;
          }

          // ── Sections ────────────────────────────────────────────────
          this.projectInit.sections = (d.costBreakdown || [])
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((item) => ({
              id:              item.section.toLowerCase().replace(/[\s&\/]+/g, "_").replace(/[^a-z0-9_]/g, ""),
              name:            item.section,
              cost:            item.estimatedCost,
              sharesNeeded:    item.sharesNeeded,
              collectedShares: item.sharesCollected,
              remainingShares: item.remainingShares,
            }));

          // ── Donors ──────────────────────────────────────────────────
          this.projectInit.donors = (d.donors || []).map((donor, idx) => ({
            id:               idx + 1,
            name:             donor.name,
            commitmentShares: donor.noOfSharesCommitted,
            totalShareValue:  donor.totalShareValue,
            payments: (donor.breakdowns || []).map((b) => ({
              date:      b.date ? b.date.split("T")[0] : "",
              sectionId: b.section.toLowerCase().replace(/[\s&\/]+/g, "_").replace(/[^a-z0-9_]/g, ""),
              section:   b.section,
              shares:    b.noOfShares,
              amount:    b.amount,
              note:      b.note,
            })),
          }));

          console.log("✅ [Step 4] Store updated:");
          console.log("   welfareName:", this.projectInit.welfareName);
          console.log("   sections count:", this.projectInit.sections.length);
          console.log("   donors count:", this.projectInit.donors.length);
          console.log("   totalCost:", this.projectInit.sections.reduce((a, s) => a + s.cost, 0));

        } else {
          console.warn("⚠️ [Step 3] API isSuccess=false:", response.data.message);
        }

      } catch (error) {
        if (loadingAlert) loadingAlert.close();
        console.error("❌ [ERROR] GetProjectInit failed:", error.message);
        console.error("❌ [ERROR] Full error:", error);
      }
    },

    async SubmitDonation(req, showLoading) {
      const loadingAlert = showLoading ? showLoading("") : null;
      try {
        const token = await getAccessToken();
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/wf/WelfareProjects/SubmitDonation`,
          req,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (loadingAlert) loadingAlert.close();
        if (response.data.isSuccess) {
          this.showToast(response.data.message, "success");
          return true;
        } else {
          this.showToast(response.data.message, "error");
          return false;
        }
      } catch (error) {
        if (loadingAlert) loadingAlert.close();
        console.error("[projectStore] SubmitDonation error:", error);
        this.showToast("Failed to submit donation", "error");
        return false;
      }
    },

    showToast(message, type = "info") {
      import("sweetalert2").then(({ default: Swal }) => {
        Swal.fire({
          icon: type,
          title: type,
          text: message,
          timer: 5000,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
      });
    },
  },
});