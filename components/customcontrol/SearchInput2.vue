<template>
  <div ref="root" class="relative w-full">
    <!-- Input -->
    <input
      type="text"
      v-model="inputValue"
      @focus="openDropdown"
      @keydown="onKeydown"
      placeholder="Search..."
      class="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
    />

    <!-- Dropdown -->
    <div
      v-if="dropdownOpen && filtered.length > 0"
      class="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
    >
      <div
        v-for="(item, index) in filtered"
        :key="item"
        :class="[
          'cursor-pointer px-4 py-2 text-sm hover:bg-indigo-600 hover:text-white',
          highlightedIndex === index ? 'bg-indigo-500 text-white' : ''
        ]"
        @mousedown.prevent="selectItem(item)"
        @mouseover="highlightedIndex = index"
      >
        {{ item }}
      </div>
    </div>

    <!-- No results -->
    <div
      v-if="dropdownOpen && filtered.length === 0"
      class="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg px-4 py-2 text-sm text-gray-500"
    >
      No results found
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchInput2",
  props: {
    arrItems: { type: Array, required: true },
    modelValue: { type: String, default: "" },
  },
  emits: ["update:modelValue", "selectItem"],
  data() {
    return {
      inputValue: this.modelValue,
      dropdownOpen: false,
      filtered: [],
      highlightedIndex: -1,
    };
  },
  watch: {
    modelValue(newVal) {
      this.inputValue = newVal;
    },
    inputValue(val) {
      this.filterList();
      this.$emit("update:modelValue", val);
    },
    arrItems: {
      handler() {
        this.filterList();
      },
      deep: true,
    },
  },
  methods: {
    filterList() {
      const val = this.inputValue.trim().toLowerCase();
      this.filtered = val
        ? this.arrItems.filter((item) =>
            item.toLowerCase().includes(val)
          )
        : [...this.arrItems];
      this.highlightedIndex = -1;
    },
    openDropdown() {
      this.dropdownOpen = true;
      this.filterList();
    },
    closeDropdown() {
      this.dropdownOpen = false;
    },
    selectItem(item) {
      this.inputValue = item;
      this.$emit("selectItem", item);
      this.closeDropdown();
    },
    onKeydown(event) {
      if (!this.dropdownOpen) {
        if (event.key === "ArrowDown") {
          this.openDropdown();
          event.preventDefault();
        }
        return;
      }

      if (event.key === "ArrowDown") {
        if (this.highlightedIndex < this.filtered.length - 1) {
          this.highlightedIndex++;
        }
        event.preventDefault();
      } else if (event.key === "ArrowUp") {
        if (this.highlightedIndex > 0) {
          this.highlightedIndex--;
        }
        event.preventDefault();
      } else if (event.key === "Enter") {
        if (this.highlightedIndex >= 0) {
          this.selectItem(this.filtered[this.highlightedIndex]);
        }
        event.preventDefault();
      } else if (event.key === "Escape" || event.key === "Tab") {
        this.closeDropdown();
      }
    },
    handleClickOutside(event) {
      if (!this.$refs.root.contains(event.target)) {
        this.closeDropdown();
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
/* Optional: smooth hover highlight */
</style>
