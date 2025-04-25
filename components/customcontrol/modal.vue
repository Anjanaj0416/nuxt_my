<template>
    <div class="modal-overlay" v-if="isOpen" @click.self="closeModal">
      <div class="modal">
        <!-- Modal Header -->
        <div class="modal-header">
          <h2 class="modal-title">Modal Title</h2>
          <button @click="closeModal" class="close-button">&times;</button>
        </div>
  
        <!-- Modal Content (scrollable) -->
        <div class="modal-content" style="min-height:200px ; max-height: 300px;">
          <p>Scroll me!</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Curabitur luctus diam in augue tempor, et tincidunt purus fermentum.</p>
          <p>Vivamus euismod purus vitae nulla gravida, eu egestas felis maximus.</p>
          <p>Aliquam erat volutpat. Nulla lacinia dui ac orci convallis malesuada.</p>
          <p>Curabitur luctus diam in augue tempor, et tincidunt purus fermentum.</p>
          <p>Vivamus euismod purus vitae nulla gravida, eu egestas felis maximus.</p>
          <p>Aliquam erat volutpat. Nulla lacinia dui ac orci convallis malesuada.</p>
          <!-- Add more content to make it scrollable -->
        </div>
  
        <!-- Modal Footer -->
        <div class="modal-footer">
          <button @click="closeModal" class="cancel-button">Cancel</button>
          <button @click="confirmAction" class="confirm-button">Confirm</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isOpen = ref(true); // Control modal visibility
  
  const closeModal = () => {
    isOpen.value = false;
  };
  
  const confirmAction = () => {
    // Handle the confirmation action
    alert('Action confirmed!');
    closeModal();
  };
  </script>
  
  <style scoped>
  /* Modal Overlay */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  /* Modal Container */
  .modal {
    background: white;
    width: 80%;
    max-width: 600px;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  /* Modal Header */
  .modal-header {
    background: #0b2145;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
  }
  
  .modal-title {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  }
  
  .close-button {
    background: transparent;
    border: none;
    font-size: 24px;
    color: white;
    cursor: pointer;
  }
  
  /* Modal Content */
  .modal-content {
    padding: 20px;
    max-height: 300px; /* Set max height */
    overflow-y: auto;  /* Make it scrollable */
    flex-grow: 1;      /* Allow content to grow */
  }
  
  /* Modal Footer */
  .modal-footer {
    background: #f1f1f1;
    padding: 15px;
    display: flex;
    justify-content: space-between;
  }
  
  button {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    border-radius: 5px;
  }
  
  .cancel-button {
    background: #e4e4e4;
    color: #333;
  }
  
  .confirm-button {
    background: #0b2145;
    color: white;
  }
  
  button:hover {
    opacity: 0.8;
  }
  </style>
  