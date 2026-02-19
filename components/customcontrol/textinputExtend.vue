
<template>
  <article>
    <div class>
      <div @click="Sort()" :title="'Sort By ' +label">
          <label v-if="label.indexOf('#')!=-1" class="block text-sm text-gray-00 cursor-pointer">{{label.substring(0,label.indexOf('#'))}}<span class="underline font-bold text-blue-300">{{label.charAt(label.indexOf('#')+1)}}</span>{{label.substring(label.indexOf('#')+2,label.length)}}</label>
    <label v-if="label.indexOf('#')==-1" class="block text-sm text-gray-00  cursor-pointer">{{label}}</label>
    </div>
      <input
        class="w-full  p-1 mb-2 text-gray-700 bg-gray-400 rounded"
        :type="ctrltype"
        ref="textinputelement"
        @focus="$event.target.select()"
        :placeholder="label"
        :title="getvalue(value)"
        @keyup="changeValidation($event.target.value)"
        @blur="changeValidation($event.target.value)"
        :value="getvalue(value)"
        @input="updateValue($event.target.value)"
        @keydown="KeyDownEvt($event)"
        @keydown.enter="KeyDownEnter()"
        :maxlength="maxlength"
        :class="(mode=='view')?'cssview':'cssedit'"
      />
      <!-- :disabled="(mode=='view')?'disabled':''" -->

      <p class="text-xs ml-1 text-white-700 italic bg-transparent text-white rounded px-2 bg-red-400"  v-show="err!=''">{{err}}</p>

    </div>
  </article>
</template>

<script>
export default {
  props: [
    'label',
    'value',
    'err',
    'ctrltype',
    'maxlength',
    'mode',
  ],
  data() {
    return {}
  },

  methods: {
    updateValue: function (value) {
      this.$emit('input', value.trim())
    },

    changeValidation(val) {
      this.$emit('changeValidation', { label:this.label,value: val})
    },
    KeyDownEvt: function (evt) {
      this.$emit('KeyDownEvt', evt)
    },
    setfocus() {
      this.$refs.textinputelement.focus()
    },
    KeyDownEnter() {
      this.$emit('KeyDownEnter')
    },
    Sort(){
      this.$emit('Sort',this.label)
    }
  },
  computed: {
    getvalue() {
      return (value) => {
        if (this.ctrltype == 'date') {
          try {
            //return value.toISOString().split('T')[0]
            return value.split('T')[0]
          } catch {
            return new Date(value).toISOString().split('T')[0]
          }
        } else return value
      }
    },
  },
}
</script>

<style>
.floating-label {
  position: relative;
  margin-bottom: 20px;
}

.floating-input {
  font-size: 14px;
  padding: 4px 4px;
  display: block;
  width: 95%;
  height: 30px;
  background-color: transparent;
  @apply border-b-2;
  @apply border-orange-400;
}

.floating-input:focus,
.floating-select:focus {
  outline: none;
  /* border-bottom:2px solid #5264AE;  */
}

.input_label {
  color: #999;
  font-size: 14px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 5px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

.floating-input:focus ~ label,
.floating-input:not(:placeholder-shown) ~ label {
  top: -18px;
  font-size: 14px;
  @apply text-orange-500;
}

.floating-select:focus ~ label,
.floating-select:not([value='']):valid ~ label {
  top: -18px;
  font-size: 14px;
  color: #5264ae;
}

.floating-input:focus ~ .bar:before,
.floating-input:focus ~ .bar:after,
.floating-select:focus ~ .bar:before,
.floating-select:focus ~ .bar:after {
  width: 50%;
}

*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.floating-textarea {
  min-height: 30px;
  max-height: 260px;
  overflow: hidden;
  overflow-x: hidden;
}

.cssbarcode {
  font-family: 'barcodefont';
}
.cssview{
 @apply bg-transparent text-white;
}
.cssedit{
  @apply bg-white;
}

</style>
