<!--
Usage :
  <textInput
                  ctrltype="text"
                   textcase="uppercase"
                  label="Name"
                  v-model="obj.name"
                  :err="err.name"
                  @changeValidation="changeValidation"
                  @KeyDownEvt = "findByBarcode"
                  @KeyDownEnter="KeyDownEnter"
                  maxlength="10"
                  cssclass="cssbarcode"
                />
-------------------------
import textInput from '~/components/customcontrol/textinput'
-------------------------
components: { textInput },
-------------------------
data()
  {
    return
      {
      obj: {
        name: '',
           },
      err: {
        name: '',
           },
      }
   },
-------------------------
 changeValidation(lbl) {
      switch (lbl) {
        case 'Name': {
          this.err.name =
            (this.obj.name == '' || this.obj.name == null)
              ? 'Name cannot be empty'
              : ''
          break
        }
       }
      },
-------------------------
   formValidate()
   {
      var isformvalid = true;
      if (this.obj.name == '' || this.obj.name == null)
      {
        isformvalid = false;
        this.err.name = 'Name cannot be empty';
      } else this.err.name = '';
      return isformvalid;
    }
-------------------------
-------------------------

-->
<template>
  <article>
    <div class>

      <label v-if="label.indexOf('#') != -1"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ label.substring(0, label.indexOf('#')) }}<span
          class="underline font-bold text-blue-300">{{ label.charAt(label.indexOf('#') + 1) }}</span>{{ label.substring(label.indexOf('#') + 2, label.length) }}</label>
      <label v-if="label.indexOf('#') == -1"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ label }}</label>
      <input :class="cssclass" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
         focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
         dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :type="ctrltype" ref="textinputelement"
        @focus="$event.target.select()" :placeholder="label" @keyup="changevalidate($event.target.value)"
        @blur="changevalidate($event.target.value)" :value="getvalue(value)" @input="updateValue($event.target.value)"
        @keydown="KeyDownEvt($event)" @keydown.enter="KeyDownEnter()" :maxlength="maxlength" />

      <p class="text-xs ml-1 text-red-700 italic">{{ err }}</p>
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
    'textcase',
    'maxlength',
    'cssclass',
    'disabled',

  ],
  data() {
    return {}
  },

  methods: {
    updateValue: function (value) {
      this.$emit('input', value.trim())
    },
    changevalidate: function () {
      this.$emit('changeValidation', this.label)
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

.floating-input:focus~label,
.floating-input:not(:placeholder-shown)~label {
  top: -18px;
  font-size: 14px;
  @apply text-orange-500;
}

.floating-select:focus~label,
.floating-select:not([value='']):valid~label {
  top: -18px;
  font-size: 14px;
  color: #5264ae;
}

.floating-input:focus~.bar:before,
.floating-input:focus~.bar:after,
.floating-select:focus~.bar:before,
.floating-select:focus~.bar:after {
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
</style>
