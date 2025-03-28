<template>
  <section>
    <article class="min-h-screen h-100 w-screen bg-transparent absolute top-0 left-0">
      <div class="container mx-auto h-full flex flex-1 justify-center">
        <div class="w-full max-w-lg">
          <div class="leading-loose">
            <div class="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
              <div>
                <svg class="text-blue-300 w-8 hover:bg-green rounded-full p-1 hover:text-white hover:cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <img class="cssImgbox" :src="img_url" />
            </div>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  props: ['img_url'],
}
</script>

<style>
.cssImgbox {
  height: 350px;
  width: 350px;
}
</style>
