<template>
  <section class="w-screen -mt-16  bg-gray-500 opacity-50" style="height:100vh">
    <div class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
      <div class="bounce3"></div>
      <div class="bounce3"></div>

    </div>
  </section>
</template>

<style  scoped>
section {
  /* background-color:rgb(238, 231, 231); */
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  left: 0;
  position: absolute;
}

.spinner {
  position: absolute;
  top: 50vh;
  left: 45vw;
}

.spinner > div {
  width: 30px;
  height: 30px;
  @apply bg-white;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
