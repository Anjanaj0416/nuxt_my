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

    async GetProjectInit(showLoading, langCode = 100) {
      // langCode: 100 = Sinhala (default/draft), 200 = English
      const loadingAlert = showLoading ? showLoading("") : null;
      try {

        console.log("🔑 [Step 1] Fetching access token...");
        const token = await getAccessToken();
        console.log("🔑 [Step 1] Token result:", token ? `OK (${token.substring(0, 30)}...)` : "FAILED - token is null");

        if (!token) {
          console.error("❌ Could not get access token - stopping");
          if (loadingAlert) loadingAlert.close();
          return;
        }

        const apiUrl = `${import.meta.env.VITE_API_URL}/wf/WelfareProjects/GetNewBuildingProjectDetails?langCode=${langCode}`;
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
            .map((item, index) => ({
              id:              `section_${item.sortOrder ?? index}`,
              name:            item.section,
              cost:            item.estimatedCost,
              sharesNeeded:    item.sharesNeeded,
              collectedShares: item.sharesCollected,
              remainingShares: item.remainingShares,
            }));

          // Build name→id lookup from sections (works for any language)
          const sectionById = {};
          this.projectInit.sections.forEach(s => { sectionById[s.name] = s.id; });

          // ── Donors ──────────────────────────────────────────────────
          this.projectInit.donors = (d.donors || []).map((donor, idx) => ({
            id:               idx + 1,
            name:             donor.name,
            commitmentShares: donor.noOfSharesCommitted,
            totalShareValue:  donor.totalShareValue,
            payments: (donor.breakdowns || []).map((b) => ({
              date:      b.date ? b.date.split("T")[0] : "",
              sectionId: sectionById[b.section] || `section_0`,
              section:   b.section,
              shares:    b.noOfShares,
              amount:    b.amount,
              note:      b.note,
            })),
          }));

          console.log("✅ [Step 4] Store updated:");
          console.log("   welfareName:", this.projectInit.welfareName);
          console.log("   langCode used:", langCode);
          console.log("   sections count:", this.projectInit.sections.length);
          console.log("   donors count:", this.projectInit.donors.length);

        } else {
          console.warn("⚠️ [Step 3] API isSuccess=false:", response.data.message);
        }

      } catch (error) {
        if (loadingAlert) loadingAlert.close();
        console.error("❌ [ERROR] GetProjectInit failed:", error.message);
        console.error("❌ [ERROR] Full error:", error);
      }
    },

    async syncFromGoogleSheet(showLoading) {
      const loadingAlert = showLoading ? showLoading("") : null;
      try {
        const token = await getAccessToken();
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/wf/WelfareProjects/SetProcessNewBuildingProjectDetails`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (loadingAlert) loadingAlert.close();
        if (response.data.isSuccess) {
          this.showToast(response.data.message || "Data synced successfully!", "success");
          return true;
        } else {
          this.showToast(response.data.message || "Sync failed", "error");
          return false;
        }
      } catch (error) {
        if (loadingAlert) loadingAlert.close();
        console.error("[projectStore] syncFromGoogleSheet error:", error);
        this.showToast("Failed to sync data", "error");
        return false;
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

    async SendDonorNotificationEmail(donorName, fromMobile, noOfShares, section) {
      try {
        const token = await getAccessToken();
        const params = new URLSearchParams({
          dornorName: donorName,
          fromMobile: fromMobile,
          noOfShares: noOfShares,
          section:    section || 'general',
        });
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/wf/WelfareProjects/GetSendDonorContributeNotificationEmail?${params}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("📧 [Email] Notification sent:", response.data.isSuccess, response.data.message);
        if (response.data.isSuccess) {
          this.showToast(response.data.message || "Donation request submitted!", "success");
          return true;
        } else {
          this.showToast(response.data.message || "Submission failed", "error");
          return false;
        }
      } catch (error) {
        console.error("❌ [Email] SendDonorNotificationEmail failed:", error.message);
        this.showToast("Failed to submit donation request", "error");
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