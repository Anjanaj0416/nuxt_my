import { defineStore } from "pinia";
import axios from "axios";

export const dtlStore = defineStore("dtlStore", {
    state: () => ({
        contact: [], 
    }),
});
