import Vuex from "vuex";

//import usermodule from "./modules/usercontroller";

const createstore = () => {

  
    return new Vuex.Store({
      namespaced: true,
      state,
      getters,
      mutations,
      actions,
      modules: {       
        user: usermodule,                 
      }
  
    });
  }
  
  
  export default createstore
  