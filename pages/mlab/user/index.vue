<template>
  <section class="relative">
    <!-- Header -->
    <div class="mt-10 px-2 fixed top-0 z-30 bg-SID-green-600 w-full">
      <div class="flex justify-between gap-3 mt-2 mb-4">
        <div class="text-sm text-white lg:text-base">User Details</div>

        <div class="flex gap-2 lg:justify-end">
          <input
            class="border-2 p-1 w-32 rounded-lg text-sm lg:text-base"
            type="text"
            v-model="search_val"
            placeholder="Keyword Search"
          />

          <appbutton_1 text="New" title="Add New User" @click="setNewUser" />
          <appbutton_1 text="Refresh" title="Refresh" @click="getRefresh" />
        </div>
      </div>
    </div>

    <!-- User List -->
    <div class="px-2 pt-32">
      <div
        v-for="user in alfiltered"
        :key="user.id"
        @mouseleave="selectedrow=-1"
        class="bg-SID-green-300 hover:bg-SID-green-600 mt-1 rounded-md cursor-pointer"
        :class="{ cssRowInactive: user.status == 0 }"
      >
        <div class="text-SID-blue hover:text-white">
          <div class="flex gap-2 justify-between">
            <div
              class="cssdatarow grid grid-cols-3 lg:grid-cols-7 gap-2 px-4"
              @mouseover="selectedrow=user.id"
            >
              <!-- Name -->
              <div class="border-white pt-2 relative font-semibold">
                <div class="cursor-pointer text-SID-green text-sm" @click="sort_col('name')">Name</div>
                {{ user.name }}
              </div>

              <!-- Email -->
              <div class="border-white pt-2 relative font-semibold">
                <div class="cursor-pointer text-SID-green text-sm" @click="sort_col('email')">Email</div>
                <input type="text" class="w-full focus:outline-none border-none bg-transparent" :value="user.email" disabled />
              </div>

              <!-- Mobile -->
              <div class="border-white pt-2 relative font-semibold">
                <div class="cursor-pointer text-SID-green text-sm" @click="sort_col('mobile')">Mobile</div>
                {{ user.mobile }}
              </div>

              <!-- Additional fields shown on hover -->
              <div class="border-white p-2 relative font-semibold" v-show="selectedrow == user.id">
                <div class="cursor-pointer text-SID-green text-sm" @click="sort_col('username')">User Name</div>
                {{ user.username }}
              </div>

              <div class="border-white p-2 relative font-semibold">
                <div class="cursor-pointer text-SID-green text-sm" @click="sort_col('usergroup')">UserGroup</div>
                {{ user.usergroup }}
              </div>

              <div class="border-white p-2 relative font-semibold" v-show="selectedrow == user.id">
                <div class="cursor-pointer text-SID-green text-sm" @click="sort_col('granted')">Granted</div>
                <input type="text" class="w-full focus:outline-none border-none bg-transparent" :value="user.granted" disabled />
              </div>

              <div class="border-white p-2 relative font-semibold" v-show="selectedrow == user.id">
                <div class="cursor-pointer text-SID-green text-sm" @click="sort_col('image')">Image</div>
                <img class="w-20 h-20 object-center mx-auto" :src="imageroot + '/user/' + user.image" />
              </div>

              <div class="border-white p-2 relative font-semibold" v-show="selectedrow == user.id">
                <div class="cursor-pointer text-SID-green text-sm" @click="sort_col('identificationcode')">Identification Code</div>
                {{ user.identificationcode }}
              </div>

              <div class="border-white p-2 relative font-semibold">
                <div class="cursor-pointer text-SID-green text-sm" @click="sort_col('status')">Status</div>
                <span v-if="user.status">Active</span>
                <span v-else>Inactive</span>
              </div>

              <div class="border-white p-2 relative font-semibold" v-show="selectedrow == user.id">
                <div class="cursor-pointer text-SID-green text-sm" @click="sort_col('createddate')">Created Date</div>
                {{$options.filters.toInputTypeDate(user.createddate)}}
              </div>

              <div class="border-white p-2 relative font-semibold" v-show="selectedrow == user.id">
                <div class="cursor-pointer text-SID-green text-sm" @click="sort_col('updateddate')">Updated Date</div>
                {{$options.filters.toInputTypeDate(user.updateddate)}}
              </div>
            </div>

            <!-- Edit/Delete buttons -->
            <div class="flex gap-0 lg:gap-2 mt-4" @mouseover="selectedrow=user.id">
              <div class="border-white lg:border-0 p-2" title="Edit" @click="setEdit(user.id)">
                <svg class="w-6 font-bold mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </div>
              <div class="border-white lg:border-0 p-2" title="Delete" @click="setDelete(user.id)" v-if="user.status == 1">
                <svg class="w-6 font-bold sm:text-center text-red-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Form -->
    <article class="min-h-screen cssForm w-screen bg-SID-green-300 pt-24 absolute top-0 left-0" v-show="iseditmode">
      <div class="container mx-auto flex flex-1 justify-center">
        <div class="w-full max-w-2xl">
          <div class="leading-loose">
            <div class="max-w-2xl m-4 p-10 bg-white rounded border-2 border-SID-blue shadow-xl">
              <p class="text-gray-800 text-center text-lg font-bold uppercase">User</p>

              <div class="grid grid-cols-2 lg:grid-cols-3 gap-1">
                <textInput ctrltype="text" label="Name" v-model="user.name" :err="err.name" @changeValidation="changeValidation" maxlength="50"/>
                <textInput ctrltype="text" label="Email" v-model="user.email" :err="err.email" @changeValidation="changeValidation" maxlength="100"/>
                <textInput ctrltype="text" label="Mobile" v-model="user.mobile" :err="err.mobile" @changeValidation="changeValidation" maxlength="12"/>
                <textInput ctrltype="text" label="User Name" v-model="user.username" :err="err.username" @changeValidation="changeValidation" maxlength="15"/>
                <selectinput2 v-model="user.usergroup" :cur_item="user.usergroup" :selections="InitData.alUserGroup" :err="err.usergroup" label="UserGroup"/>
                <textInput ctrltype="text" label="Granted" v-model="user.granted" :err="err.granted" @changeValidation="changeValidation" maxlength="100"/>
                <imagepicker v-model="Uploading_image_details.image_file" caption="Image" :image_file="'SLTDS/user/' + user.image" @ImageChanged="ImageChanged" ref="refImg"/>
                <textInput ctrltype="text" label="Identification Code" v-model="user.identificationcode" :err="err.identificationcode" @changeValidation="changeValidation" maxlength="15"/>
                <toggleoption v-model="user.status" label="Status"/>
              </div>

              <div class="mt-4 flex gap-3">
                <appbutton_1 text="Save" title="Save User" @click="Save"/>
                <appbutton_1 text="Cancel" title="Cancel User" @click="Cancel"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import textInput from '~/components/customcontrol/textinput'
import toggleoption from '~/components/customcontrol/toggleoption'
import imagepicker from '~/components/customcontrol/imagepicker'
import selectinput2 from '~/components/customcontrol/selectinput2'
import appbutton_1 from '~/components/customcontrol/button_type1'
import * as Global from '@/assets/js/Global'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  layout: 'default',
  components: { textInput, toggleoption, imagepicker, selectinput2, appbutton_1 },
  data() {
    return {
      search_val: '',
      selectedrow: -1,
      imagechanged: false,
      imageroot: process.env.Assets_83,
      Uploading_image_details: { image_file: '', destpath:'', height:64, width:64 },
      err: { name:'', email:'', mobile:'', username:'', usergroup:'', granted:'', image:'', identificationcode:'', password:'', status:'' },
      sort_Desc_Settings: { name:true, email:true, mobile:true, username:true, usergroup:true, granted:true, image:true, identificationcode:true, password:true, status:true, createddate:true }
    }
  },
  computed: {
    ...mapState({
      loggeduser: state => state.loggeduser,
      alusers: state => state.user.alusers,
      alorganizeddetails: state => state.user.alorganizeddetails,
      alfiltered: state => state.user.alfiltered,
      iseditmode: state => state.user.iseditmode,
      user: state => state.user.user,
      InitData: state => state.user.InitData
    })
  },
  watch: {
    search_val(val) {
      if(val.indexOf('#')==0){
        this.setFiltered(this.alorganizeddetails.filter(u=>u.id==val.replace('#','')))
      } else if(val===''){
        this.setFiltered(this.alorganizeddetails)
      } else {
        this.setFiltered(this.alorganizeddetails.filter(u=>{
          for(let key in u){
            if(key==='image') continue
            try{ if(u[key].toString().toLowerCase().includes(val.toLowerCase())) return u }catch{}
          }
        }))
      }
    }
  },
  methods: {
    ...mapActions({ getInitData:'user/getInitData', getSave:'user/getSave', getDelete:'user/getDelete', getAll:'user/getAll', getSaveImage:'user/getSaveImage' }),
    ...mapMutations({ showMessage:'PUSH_NOTIFICATION', setEditMode:'user/SET_EDITMODE', setUser:'user/SET_USER', clearUser:'user/CLEAR_USER', setFiltered:'user/SET_FILTERED', setorganizedlistdata:'user/SET_ORGANIZEDLISTDATA' }),

    async getRefresh() { await this.getAll(); await this.organizelistdata(); this.search_val='' },
    organizelistdata(){ let clone=JSON.parse(JSON.stringify(this.alusers)); this.setorganizedlistdata(clone) },
    ImageChanged(val){ this.imagechanged = val },
    sort_col(col){ this.setFiltered(this.alfiltered.sort(Global.compareValues(col,this.sort_Desc_Settings[col]?'desc':'asc'))); this.sort_Desc_Settings[col]=!this.sort_Desc_Settings[col] },
    clearErrlabels(){ Object.keys(this.err).forEach(k=>this.err[k]='') },

    async Save(){
      if(this.formValidate() && confirm('Sure to save this record?')){
        if(this.imagechanged){ 
          this.user.image = this.user.mobile+'.png'
          this.Uploading_image_details.destpath = process.env.assets_root+'/User/'+this.user.image
          await this.getSaveImage(this.Uploading_image_details)
        }
        await this.getSave(this.user)
        this.organizelistdata()
        this.search_val = '#'+this.user.id
      }
    },
    setNewUser(){ this.clearUser(); this.setEditMode(true); this.$refs.refImg.initImage(); this.clearErrlabels(); this.scrollToTop(); this.imagechanged=false },
    setEdit(id){ let u=this.alusers.find(u=>u.id==id); this.setUser(u); this.setEditMode(true); this.$refs.refImg.initImage(); this.clearErrlabels(); this.scrollToTop(); this.imagechanged=false },
    async setDelete(id){ if(confirm('Sure to delete this record?')){ let u=this.alusers.find(u=>u.id==id); u.status=0; await this.getDelete(u); this.getRefresh() } },
    Cancel(){ this.setEditMode(false) },
    changeValidation(lbl){ 
      switch(lbl){
        case 'Name': this.err.name = !this.user.name?'Invalid Name':''; break;
        case 'Email': this.err.email = (!this.user.email.includes('@'))?'Invalid Email':''; break;
        case 'Mobile': this.err.mobile = (isNaN(this.user.mobile)||this.user.mobile.length!=10)?'Invalid Mobile':''; break;
        case 'User Name': this.err.username = !this.user.username?'Invalid User Name':''; break;
        case 'UserGroup': this.err.usergroup = !this.user.usergroup?'Invalid UserGroup':''; break;
        case 'Granted': this.err.granted = !this.user.granted?'Invalid Granted':''; break;
        case 'Idetification Code Ex: NIC': this.err.identificationcode = !this.user.identificationcode?'Invalid Identificationcode':''; break;
      }
    },
    formValidate(){
      let valid = true
      if(!this.user.name){ this.err.name='Invalid Name'; valid=false } else this.err.name=''
      if(!this.user.username){ this.err.username='Invalid Username'; valid=false } else this.err.username=''
      if(!this.user.usergroup){ this.err.usergroup='Invalid Usergroup'; valid=false } else this.err.usergroup=''
      if(!this.user.granted){ this.err.granted='Invalid Granted'; valid=false } else this.err.granted=''
      if(!this.user.identificationcode){ this.err.identificationcode='Invalid Identificationcode'; valid=false } else this.err.identificationcode=''
      return valid
    },
    scrollToTop(){ window.scrollTo(0,0) }
  },
  async beforeMount(){
    if(this.loggeduser.granted.includes('all')){ await this.getInitData(); await this.getAll(); await this.organizelistdata() }
    else { this.showMessage({type:'Failed', message:'Not Allowed to access this page'}); this.$router.push('/user/login') }
  },
  head(){ return { title:'User' } }
}
</script>

<style scoped>
.cssRowInactive { @apply bg-gray-500; }
.cssForm { height: 100%; }

@media (min-width: 640px){
  table { display:inline-table !important }
  thead tr:not(:first-child){ display:none }
  th { @apply text-center }
}
td:not(:last-child){ border-bottom:0 }
th:not(:last-child){ border-bottom:2px solid rgba(0,0,0,.1) }
th:hover{ cursor:pointer; color:white }
tr{ @apply text-left }
th{ @apply p-3 }
</style>
