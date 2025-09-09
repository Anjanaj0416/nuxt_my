<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal-content">
      <!-- Close Button Overlay -->
      <button class="close-btn" @click="closeModal">✕</button>

      <!-- Video -->
      <iframe
        src="https://www.youtube-nocookie.com/embed/ulhRORJpuBM?autoplay=1&controls=1"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: true
    };
  },
  methods: {
    closeModal() {
      this.isOpen = false;
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  position: relative;
  width: 90%;
  max-width: 1600px;
  aspect-ratio: 16/9;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0,0,0,0.7);
}

.modal-content iframe {
  width: 100%;
  height: 100%;
}

/* Close button overlay */
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  background: rgba(255,255,255,0.7);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 20px;
  cursor: pointer;
  transition: background 0.3s;
}
.close-btn:hover {
  background: rgba(255,255,255,1);
}
</style>
