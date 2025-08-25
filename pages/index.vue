<template>
<article>
  <!-- header -->
  <header class="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
    <nav class="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
      <!-- Logo -->
      <div class="flex items-center">
        <NuxtLink to="/" class="flex items-center text-2xl font-bold transition duration-300 hover:opacity-90">
          <!-- <img
            src="/assets/img/digitalTechLabs/DigitalTechLabsLogo.jpg"
            alt="Digital Tech Labs Logo"
            class="px-2 rounded-full w-44"
          /> -->
        </NuxtLink>
      </div>

      <!-- Desktop Navigation -->
      <div
        class="items-center hidden px-4 py-2 space-x-4 text-sm text-white bg-blue-900 rounded-full shadow-lg md:flex">
        <a href="#services" class="transition duration-300 hover:text-gray-300">Service</a>
        <a href="#Product" class="transition duration-300 hover:text-gray-300">Product</a>
        <a href="#" class="transition duration-300 hover:text-gray-300">Projects</a>
        <NuxtLink to="/aboutUs" class="transition duration-300 hover:text-gray-300">About us</NuxtLink>
        <NuxtLink to="/contactUs" class="transition duration-300 hover:text-gray-300">Contact</NuxtLink>
        <NuxtLink to="/user/login" class="transition duration-300 hover:text-gray-300">Intranet</NuxtLink>
        <!-- Dropdown -->
        <div class="relative">
          <button @click="toggleDropdown" class="transition duration-300 hover:text-gray-300">
            Packages
          </button>
          <div v-if="showDropdown" class="absolute left-0 z-50 w-40 mt-2 text-blue-900 bg-white rounded shadow-md">
            <NuxtLink @click="closeDropdown" to="/portfoliotemplates/standard"
              class="block px-4 py-2 hover:bg-blue-100">Standard</NuxtLink>
            <NuxtLink @click="closeDropdown" to="/portfoliotemplates/premium" class="block px-4 py-2 hover:bg-blue-100">
              Premium</NuxtLink>
            <NuxtLink @click="closeDropdown" to="/portfoliotemplates/enterprise"
              class="block px-4 py-2 hover:bg-blue-100">Enterprise</NuxtLink>
          </div>
        </div>
        <a href="tel:+011 222 3 222"
          class="px-4 py-2 ml-4 font-semibold text-blue-900 transition-transform transform bg-white rounded-full shadow-md hover:scale-105 hover:bg-blue-100">
          Talk to Us
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="toggleMenu" class="md:hidden focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </nav>

    <!-- Mobile Sidebar -->
    <transition name="slide">
      <div v-if="menuOpen" class="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden" @click="toggleMenu">
        <div class="fixed top-0 left-0 w-64 h-full p-6 overflow-y-auto text-white bg-blue-900 shadow-lg" @click.stop>
          <!-- Header Row with Logo Left and Close Button Right -->
          <div class="flex items-center justify-between mb-6">
            <!-- Logo on the Left -->
            <NuxtLink to="/" class="flex items-center text-2xl font-bold transition duration-300 hover:opacity-90">
              <img src="/assets/img/digitalTechLabs/DigitalTechLabsLogo.jpg" alt="Digital Tech Labs Logo"
                class="w-24 px-2 rounded-full" />
            </NuxtLink>

            <!-- Close Button on the Right -->
            <button class="text-xl font-bold text-white transition hover:text-gray-300" @click="toggleMenu">
              ✕
            </button>
          </div>


          <!-- Navigation Links -->
          <nav class="flex flex-col mt-6 space-y-4">
            <a href="#services" class="hover:text-gray-300">Service</a>
            <a href="#Product" class="hover:text-gray-300">Product</a>
            <a href="#" class="hover:text-gray-300">Projects</a>
            <NuxtLink to="/aboutUs" class="hover:text-gray-300">About us</NuxtLink>
            <NuxtLink to="/contactUs" class="hover:text-gray-300">Contact</NuxtLink>
            <NuxtLink to="/user/login" class="hover:text-gray-300">Intranet</NuxtLink>

            <!-- Dropdown in Sidebar -->
            <div class="relative pl-3">
              <button @click="toggleDropdown" class="w-full text-left transition hover:text-gray-300">
                Packages
              </button>
              <div v-if="showDropdown" class="p-2 mt-2 ml-2 space-y-1 text-blue-900 bg-white rounded shadow">
                <NuxtLink @click="closeDropdown" to="/portfoliotemplates/standard"
                  class="block px-2 py-1 rounded hover:bg-blue-100">Standard</NuxtLink>
                <NuxtLink @click="closeDropdown" to="/portfoliotemplates/premium"
                  class="block px-2 py-1 rounded hover:bg-blue-100">Premium</NuxtLink>
                <NuxtLink @click="closeDropdown" to="/portfoliotemplates/enterprise"
                  class="block px-2 py-1 rounded hover:bg-blue-100">Enterprise</NuxtLink>
              </div>
            </div>

            <!-- CTA Button -->
            <a href="tel:+011 222 3 222"
              class="px-4 py-2 mt-6 font-semibold text-center text-blue-900 bg-white rounded-full shadow-md hover:bg-blue-100">
              Talk to Us
            </a>
          </nav>
        </div>
      </div>
    </transition>

  </header>

  <!-- section 1 -->
  <section class="pt-20 bg-gradient-to-r from-blue-900 to-blue-500 sm:pt-24 md:pt-28">
    <div class="absolute inset-x-0 overflow-hidden -top-10 -z-10 transform-gpu blur-3xl sm:-top-80" aria-hidden="true">
      <div
        class="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
      </div>
    </div>
    <div class="max-w-3xl py-12 mx-auto sm:py-12 lg:py-16">
      <div class="hidden sm:mb-8 sm:flex sm:justify-center">
        <div
          class="relative px-3 py-1 text-white rounded-full text-sm/6 ring-1 ring-white-900/10 hover:ring-gray-900/20">
          Announcing our next round of funding. <a href="#" class="font-semibold text-white"><span
              class="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
      <div class="text-center">
        <h1 class="text-5xl font-semibold tracking-tight text-white text-balance sm:text-7xl">Empowering Businesses with
          Cutting-Edge Tech Solutions!</h1>
        <p class="mt-8 text-lg font-medium text-white text-pretty sm:text-xl/8">We help SMEs, e-commerce platforms, and
          multivendor marketplaces scale with innovative software solutions.
          Meet Our Team Section</p>
        <div class="flex items-center justify-center mt-10 gap-x-6">
          <a href="#"
            class=" bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-900 shadow-xs rounded-full hover:bg-blue-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get
            started</a>
          <a href="#" class="font-semibold text-white text-sm/6">Learn more <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </div>
    <div
      class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      aria-hidden="true">
      <div
        class="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
      </div>
    </div>
  </section>

  <!-- section 2 -->
  <section id="services" class="px-6 py-16 mx-auto max-w-7xl">
    <div class="grid gap-12 md:grid-cols-2">
      <!-- Text Section -->
      <div class="max-w-xl">
        <!-- <span class="px-8 py-1 text-sm font-medium border-2 border-indigo-600 rounded-full">Services</span> -->
        <h2 class="text-4xl font-extrabold text-gray-900">Our Service</h2>
        <p class="mt-4 text-lg text-gray-700">
          At Digital TechLab, we specialize in delivering cutting-edge digital solutions that empower businesses to
          thrive in a fast-paced digital landscape. Our team of passionate developers, designers, and strategists work
          together to craft high-performance software solutions tailored to your needs.
        </p>
        <p class="mt-4 text-lg text-gray-700">
          Our expertise spans across web and mobile application development, cloud solutions, AI-driven analytics, and
          digital transformation services. We focus on innovation, ensuring that your business stays ahead with scalable
          and future-ready technology.
        </p>
        <button type="button"
          class="px-3 py-2 mt-4 text-sm font-medium text-center text-white bg-blue-900 rounded-full hover:bg-blue-800 hover:shadow-xl dark:bg-blue-900 dark:hover:bg-blue-700">
          See our Service →
        </button>
      </div>

      <!-- Images Grid with Scroll Animation -->
      <div class="grid grid-cols-2 gap-4" ref="imageGridSection1">
        <div class="overflow-hidden transition shadow-lg rounded-xl hover:shadow-xl">
          <img src="/assets/img/digitalTechLabs/1image.jpg" alt="Team" class="object-cover w-full h-40 md:h-60" />
        </div>
        <div class="overflow-hidden transition shadow-lg rounded-xl hover:shadow-xl">
          <img src="/assets/img/digitalTechLabs/2image.jpg" alt="Work Culture"
            class="object-cover w-full h-40 md:h-60" />
        </div>
        <div class="col-span-2 overflow-hidden transition shadow-lg rounded-xl hover:shadow-xl">
          <img src="/assets/img/digitalTechLabs/3image.jpg" alt="Collaboration" class="object-cover w-full h-60" />
        </div>
      </div>
    </div>
  </section>

  <!-- section 3 -->
  <section id="Product" class="px-6 py-16 mx-auto max-w-7xl">
    <div class="grid items-center gap-12 md:grid-cols-2">
      <!-- Images Grid -->
      <div class="grid grid-cols-2 gap-4" ref="imageGridSection2">
        <div class="overflow-hidden transition shadow-lg rounded-xl hover:shadow-xl">
          <img
            src="https://img.freepik.com/free-photo/modern-equipped-computer-lab_23-2149241233.jpg?t=st=1743143493~exp=1743147093~hmac=2d571855b02ce2dee7ca8da15162d849bfb3ba8f84f8fb1b356ec5b83eabda90&w=996"
            alt="Team" class="object-cover w-full h-40 md:h-60">
        </div>
        <div class="overflow-hidden transition shadow-lg rounded-xl hover:shadow-xl">
          <img
            src="https://img.freepik.com/free-photo/modern-equipped-computer-lab_23-2149241219.jpg?t=st=1743143562~exp=1743147162~hmac=d13c40a25fc80cebc1d91c07e2ee2d75c9ccc03be27956e1b79180f3027f5395&w=900"
            alt="Work Culture" class="object-cover w-full h-40 md:h-60">
        </div>
        <!-- <div class="col-span-2 overflow-hidden transition shadow-lg rounded-xl hover:shadow-xl">
                <img src="https://source.unsplash.com/600x300/?startup,collaboration" alt="Collaboration" class="object-cover w-full h-52">
            </div> -->
      </div>
      <!-- Text Section -->
      <div class="max-w-xl">
        <!-- <span class="px-8 py-1 text-sm font-medium border-2 border-indigo-600 rounded-full">Product</span> -->
        <h2 class="text-4xl font-extrabold text-gray-900">How to Product </h2>
        <p class="mt-4 text-lg text-gray-700">
          At Digital TechLab, we develop innovative and high-quality digital products that enhance business efficiency
          and customer experiences. Our solutions are designed to be scalable, secure, and tailored to meet the evolving
          needs of various industries.
        </p>
        <!-- <p class="mt-4 text-gray-600">
                Whether you're looking to collaborate or join us, we welcome creative minds and diverse talents.
            </p> -->
        <button type="button"
          class="px-3 py-2 mt-4 text-sm font-medium text-center text-white bg-blue-900 rounded-full hover:bg-blue-800 hover:shadow-xl dark:bg-blue-900 dark:hover:bg-blue-700">
          Join our team →
        </button>
      </div>
    </div>
  </section>

  <!-- section 4 -->
  <section class="px-6 bg-gray-100">
    <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
      <div class="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
        <h2 class="mb-4 text-4xl font-bold tracking-tight text-gray-900 ">Powering innovation at <span
            class="font-extrabold">200,000+</span> companies worldwide with Digital TechLab</h2>
        <p class="mb-4 font-light">Digital TechLab is driving technological innovation by enabling companies to enhance
          their operations, optimize workflows, and accelerate digital transformation. By integrating cutting-edge tools
          and methodologies, it empowers businesses to deliver exceptional service experiences and innovate faster than
          ever before.</p>
        <p class="mb-4 font-medium">In the context of Digital TechLab, a company or department could be leveraging such
          a platform to innovate and accelerate their development processes. Here are some key concepts related to this
          kind of digital transformation.</p>
        <a href="#"
          class="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 ">
          Learn more
          <svg class="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"></path>
          </svg>
        </a>
      </div>
    </div>
  </section>

  <!-- section 5 -->
  <section class="py-6 antialiased bg-white  md:py-16">

    <div
      class="grid max-w-screen-xl grid-cols-2 gap-8 px-4 mx-auto text-gray-500 sm:grid-cols-3 sm:gap-12 lg:grid-cols-6">
      <a href="#" class="flex items-center md:justify-center">
        <svg class="h-10 hover:text-gray-900 dark:hover:text-white" viewBox="0 0 106 48" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1005_171562)">
            <path
              d="M92.1288 21.0435C90.3398 21.4564 85.6148 21.6858 85.6148 21.6858L85.0337 23.5513C85.0337 23.5513 87.3732 23.3525 89.0859 23.5207C89.0859 23.5207 89.6364 23.4748 89.6975 24.1324C89.7281 24.8052 89.6516 25.5086 89.6516 25.5086C89.6516 25.5086 89.6058 25.9214 89.04 26.0285C88.3825 26.1355 83.948 26.3343 83.948 26.3343L83.2293 28.7503C83.2293 28.7503 82.9694 29.3008 83.5657 29.1479C84.1162 28.995 88.7648 28.1081 89.3764 28.2304C90.0186 28.3833 90.7526 29.2702 90.5385 30.0654C90.2939 31.0287 85.6453 33.9952 82.8317 33.7964C82.8317 33.7964 81.3485 33.8882 80.1099 31.885C78.9172 29.9736 80.5228 26.3802 80.5228 26.3802C80.5228 26.3802 79.8041 24.6981 80.3393 24.0865C80.3393 24.0865 80.6451 23.8265 81.5626 23.7501L82.7094 21.3952C82.7094 21.3952 81.4097 21.4717 80.6451 20.5236C79.9417 19.6062 79.8805 19.2086 80.431 18.9639C81.0121 18.6581 86.3946 17.6947 90.0951 17.8171C90.0951 17.8171 91.3949 17.6642 92.5417 19.912C92.5417 19.912 93.0616 20.8295 92.1441 21.0435M78.1832 30.096C77.7245 31.2122 76.4553 32.3896 74.9262 31.671C73.3665 30.937 70.9046 25.9214 70.9046 25.9214C70.9046 25.9214 69.9871 24.0559 69.8036 24.1171C69.8036 24.1171 69.6048 23.7501 69.4978 25.7991C69.3449 27.8328 69.5284 31.7933 68.6873 32.4202C67.9228 33.0319 67.0053 32.7719 66.4854 32.0532C66.0572 31.3345 65.8737 29.6066 66.1184 26.5943C66.3937 23.5819 67.0818 20.3707 67.9534 19.3768C68.8708 18.3676 69.6048 19.1015 69.8801 19.3768C69.8801 19.3768 71.0575 20.4472 73.0453 23.6125L73.3818 24.1935C73.3818 24.1935 75.1861 27.2059 75.3696 27.1906C75.3696 27.1906 75.5225 27.3435 75.6449 27.2212C75.8284 27.1753 75.7672 26.1967 75.7672 26.1967C75.7672 26.1967 75.4308 22.9396 73.7487 17.4348C73.7487 17.4348 73.5041 16.7314 73.6723 16.0586C73.8252 15.4469 74.4827 15.7528 74.4827 15.7528C74.4827 15.7528 77.0211 16.9761 78.2597 21.1047C79.483 25.2333 78.6572 28.9797 78.1985 30.096M65.7361 19.4991C65.4915 19.9273 65.3844 20.5236 64.3293 20.6918C64.3293 20.6918 54.0842 21.4105 53.5796 22.1292C53.5796 22.1292 53.2432 22.5574 53.7937 22.6644C54.3747 22.7867 56.699 23.0926 57.8 23.1537C58.9927 23.1537 62.999 23.1843 64.467 24.9887C64.467 24.9887 65.308 25.845 65.2774 27.787C65.2468 29.7748 64.8951 30.4782 64.1153 31.1969C63.3048 31.8697 56.3626 34.9892 51.8823 30.2183C51.8823 30.2183 49.8332 27.9246 52.6009 26.1814C52.6009 26.1814 54.5888 24.9581 59.6808 26.3802C59.6808 26.3802 61.2099 26.9307 61.1488 27.4964C61.057 28.1081 59.8796 28.7197 58.167 28.6892C56.5155 28.6433 55.2922 27.8481 55.5369 27.9858C55.7662 28.0622 53.7478 27.0071 53.1208 27.7258C52.5092 28.3986 52.6621 28.7962 53.2738 29.2091C54.8029 30.096 60.8123 29.7748 62.6014 27.7717C62.6014 27.7717 63.3201 26.9612 62.2344 26.3037C61.164 25.6921 58.0446 25.3098 56.8366 25.2639C55.6898 25.2028 51.3929 25.2639 50.7507 24.1477C50.7507 24.1477 50.1391 23.3525 50.8119 21.1812C51.5153 18.8875 56.5155 18.0006 58.6869 17.8171C58.6869 17.8171 64.6504 17.5724 65.7667 18.7957C65.7667 18.7957 65.9196 19.071 65.7361 19.4838M48.824 32.9401C48.1053 33.4753 46.5762 33.246 46.1327 32.6343C45.7046 32.0991 45.5517 29.9889 45.6281 26.6707C45.7352 23.2761 45.781 19.1168 46.5456 18.444C47.3102 17.7865 47.7689 18.3676 48.0747 18.811C48.3806 19.2697 48.7781 19.7744 48.8393 20.8295C48.931 21.8998 49.191 27.4047 49.191 27.4047C49.191 27.4047 49.5274 32.4202 48.8393 32.9401M50.3531 15.0494C48.2429 15.7681 46.8056 15.5387 45.5823 15.0035C45.0471 15.9668 44.7259 16.2574 44.3284 16.3185C43.7167 16.3797 43.1815 15.4011 43.1051 15.0952C42.9827 14.8659 42.6922 14.453 43.0439 13.5202C41.8512 12.4498 41.7594 11.0125 41.9735 10.0491C42.2488 8.91757 44.2672 4.6666 50.3837 4.16199C50.3837 4.16199 53.3808 3.94791 53.9007 5.5382H53.9924C53.9924 5.5382 56.8978 5.5382 56.8366 8.13771C56.8366 10.7372 53.6255 13.979 50.3531 15.0952M53.075 7.64839C51.1483 7.95422 48.1818 10.5231 46.7597 12.6486C48.9463 13.0462 52.7691 12.8933 54.4818 9.43747C54.4818 9.43747 55.2922 7.26611 53.075 7.64839ZM44.6189 9.33043C44.0073 10.3244 43.9767 10.9207 44.2672 11.3183C44.9859 10.2479 46.2551 8.56587 48.1665 7.25082C46.6985 7.40373 45.4599 8.01538 44.6189 9.33043ZM96.7162 32.8331C95.3094 36.2889 94.1167 39.7906 93.4286 45.0355C93.4286 45.0355 93.2757 46.06 92.4347 45.7236C91.5936 45.4178 90.2174 44.0416 89.9116 42.0996C89.6058 39.5612 90.7373 35.2797 93.0463 30.3559C92.3735 29.2855 91.8995 27.6952 92.2817 25.4627C92.2817 25.4627 92.8934 21.3341 97.022 17.603C97.022 17.603 97.5114 17.1901 97.7866 17.3278C98.123 17.4807 97.9854 18.7957 97.7101 19.4685C97.4655 20.1108 95.6305 23.2913 95.6305 23.2913C95.6305 23.2913 94.4837 25.4627 94.8048 27.16C96.9762 23.8265 101.915 17.0678 104.973 19.2086C106.915 20.5848 106.915 25.0193 105.463 27.5882C104.316 29.6219 101.074 33.827 96.7468 32.8484M103.108 22.4503C101.976 23.6736 99.9579 25.9979 98.3677 29.1479C100.05 28.9644 101.686 28.0316 102.19 27.5576C103.001 26.8389 104.866 24.8969 104.576 22.328C104.576 22.328 104.392 20.9824 103.108 22.4503ZM34.6031 34.6375C29.19 36.2889 24.0828 35.5244 21.2998 34.7904C21.2233 35.9219 21.101 36.396 20.9175 36.5794C20.7034 36.8241 18.9296 37.8333 17.951 36.396C17.5228 35.7078 17.3087 34.4693 17.1864 33.3377C10.917 30.4935 8.01165 26.3037 7.91991 26.1508C7.76699 25.9979 6.34491 24.5146 7.76699 22.6797C9.09733 21.0282 13.5012 19.3615 17.4464 18.704C17.5993 15.3399 17.9663 12.7404 18.4403 11.5935C19.0061 10.2173 19.7248 11.4406 20.367 12.3581C20.8869 13.0462 21.208 15.9974 21.2386 18.3523C23.8075 18.2299 25.3672 18.4134 28.2267 18.9639C31.9883 19.6062 34.4961 21.5329 34.2973 23.7042C34.1138 25.845 32.1565 26.7319 31.392 26.793C30.6274 26.8542 29.4041 26.2884 29.4041 26.2884C28.5478 25.8909 29.3277 25.5239 30.3216 25.0957C31.4226 24.5605 31.1779 24.0253 31.1779 24.0253C30.7803 22.802 25.9024 21.9916 21.0551 21.9916C21.0551 24.6676 21.1621 29.102 21.2386 31.6862C24.6332 32.3285 27.1716 32.1909 27.1716 32.1909C27.1716 32.1909 39.5575 31.8392 39.9092 23.9336C40.2915 16.0127 27.5233 8.42825 18.1192 6.04281C8.73034 3.58092 3.40899 5.32412 2.95025 5.55349C2.44564 5.79815 2.90438 5.8899 2.90438 5.8899C2.90438 5.8899 3.40899 5.96636 4.32646 6.27218C5.24394 6.57801 4.50996 7.03674 4.50996 7.03674C2.90438 7.58723 1.1153 7.26611 0.763601 6.53213C0.411903 5.81344 0.99297 5.15592 1.68108 4.19257C2.32331 3.19864 3.05729 3.22922 3.05729 3.22922C14.6786 -0.822962 28.8689 6.44038 28.8689 6.44038C42.1417 13.138 44.4048 21.0129 44.1602 24.0712C43.9461 27.0836 42.784 32.1756 34.6031 34.6528M9.06675 23.7042C7.7517 24.3159 8.66918 25.2945 8.66918 25.2945C11.1464 27.9399 14.174 29.6066 17.0794 30.6464C17.4158 26.0591 17.3852 24.4229 17.3852 22.1139C12.8896 22.4197 10.2901 23.1537 9.06675 23.7042Z"
              fill="currentColor" />
          </g>
        </svg>
      </a>
      <a href="#" class="flex items-center md:justify-center">
        <svg class="h-8 hover:text-gray-900 dark:hover:text-white" viewBox="0 0 210 33" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M198.522 14.8868V19.2429H201.583V23.5649C201.593 23.9511 201.572 24.3676 201.505 24.7009C201.384 25.507 200.618 26.8797 198.445 26.8797C196.285 26.8797 195.533 25.507 195.402 24.7009C195.347 24.3676 195.324 23.9511 195.324 23.5649V9.91396C195.324 9.4311 195.356 8.9026 195.459 8.50258C195.607 7.77503 196.252 6.34025 198.429 6.34025C200.713 6.34025 201.283 7.85289 201.414 8.50258C201.5 8.9329 201.505 9.6547 201.505 9.6547V11.3123H209.027V10.3324C209.027 10.3324 209.061 9.30991 208.97 8.35569C208.405 2.75274 203.788 0.980072 198.495 0.980072C193.192 0.980072 188.669 2.76923 188.01 8.35569C187.951 8.86655 187.86 9.78548 187.86 10.3324V22.8898C187.86 23.4368 187.877 23.8602 187.979 24.8596C188.469 30.3084 193.192 32.2399 198.474 32.2399C203.788 32.2399 208.478 30.3084 208.977 24.8596C209.066 23.8602 209.075 23.4368 209.087 22.8898V14.8868H198.522ZM146.655 1.78356H139.101V23.8797C139.113 24.2648 139.101 24.6974 139.035 25.0146C138.877 25.7563 138.249 27.1838 136.165 27.1838C134.108 27.1838 133.462 25.7563 133.317 25.0146C133.241 24.6974 133.232 24.2648 133.241 23.8797V1.78356H125.689V23.194C125.68 23.7459 125.723 24.8735 125.756 25.1688C126.277 30.7479 130.674 32.5593 136.165 32.5593C141.666 32.5593 146.061 30.7479 146.591 25.1688C146.633 24.8735 146.688 23.7459 146.655 23.194V1.78356ZM77.2484 1.78356L73.4803 25.1312L69.7144 1.78356H57.5294L56.8831 31.6519H64.3481L64.5502 4.00188L69.6864 31.6519H77.2603L82.4011 4.00188L82.604 31.6519H90.0878L89.4197 1.78356H77.2484ZM32.1337 1.78356L26.6009 31.6519H34.6692L38.8385 4.00188L42.9078 31.6519H50.92L45.4103 1.78356H32.1337ZM173.055 25.8311L166.021 1.78356H154.937V31.3405H162.27L161.844 6.52358L169.398 31.3405H180.028V1.78356H172.648L173.055 25.8311ZM105.233 9.5569C105.1 8.96703 105.139 8.34035 105.207 8.01282C105.421 7.05668 106.063 6.01387 107.914 6.01387C109.639 6.01387 110.651 7.08928 110.651 8.70317V10.5295H118.014V8.44774C118.014 2.01214 112.245 1.00117 108.067 1.00117C102.806 1.00117 98.5093 2.73548 97.7246 7.5779C97.5171 8.8957 97.4657 10.0655 97.7959 11.5581C99.0754 17.596 109.587 19.3476 111.112 23.166C111.382 23.8893 111.305 24.8117 111.167 25.3552C110.939 26.3489 110.27 27.3484 108.288 27.3484C106.43 27.3484 105.311 26.2798 105.311 24.6694L105.309 21.8029H97.3829V24.0815C97.3829 30.6839 102.554 32.6759 108.124 32.6759C113.459 32.6759 117.865 30.853 118.572 25.9117C118.909 23.3585 118.654 21.6955 118.519 21.0692C117.284 14.8764 106.081 13.0136 105.233 9.5569ZM8.09575 9.48364C7.95116 8.88151 7.98491 8.246 8.06545 7.91463C8.26948 6.9631 8.91572 5.90188 10.7992 5.90188C12.5462 5.90188 13.5748 6.98765 13.5748 8.61457V10.4632H21.0248V8.3649C21.0248 1.86756 15.1668 0.832031 10.9438 0.832031C5.63849 0.832031 1.30348 2.59319 0.510349 7.47051C0.293273 8.8094 0.256059 9.98722 0.569784 11.4964C1.86304 17.6029 12.4783 19.3687 14.0228 23.2327C14.312 23.9511 14.2245 24.8735 14.0811 25.438C13.836 26.4421 13.1621 27.4557 11.164 27.4557C9.29811 27.4557 8.18204 26.3688 8.18204 24.7361L8.17169 21.862H0.156738V24.1459C0.156738 30.8239 5.40147 32.832 11.0148 32.832C16.4114 32.832 20.843 30.993 21.566 25.9945C21.9254 23.418 21.6557 21.7412 21.5346 21.1053C20.2739 14.8365 8.94603 12.9799 8.09575 9.48364Z"
            fill="currentColor" />
        </svg>
      </a>
      <a href="#" class="flex items-center md:justify-center">
        <svg class="h-8 hover:text-gray-900 dark:hover:text-white" viewBox="0 0 76 33" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.6169 0.936016C11.6169 0.988007 9.32937 7.38281 6.5219 15.1553C3.71442 22.9279 1.1409 30.1025 0.802966 31.0644L0.205078 32.832L3.61044 32.754L6.98981 32.6761L7.45772 31.5063C7.69168 30.8564 9.04342 27.1391 10.4472 23.2398C11.8509 19.3406 13.0207 16.1952 13.0467 16.2211C13.0987 16.2731 12.9167 19.5745 12.6308 23.5778C12.3708 27.581 12.1368 31.2983 12.1368 31.8182V32.806H15.4902C18.4277 32.806 18.8696 32.754 19.0256 32.3381C19.1035 32.1042 21.6511 25.0595 24.6405 16.7411C27.6559 8.39662 30.1775 1.40393 30.2555 1.19597C30.3854 0.884026 29.8655 0.832035 26.9541 0.884026L23.5227 0.962011L22.249 4.47135C21.5471 6.39499 20.2473 10.0083 19.3635 12.4778C18.5057 14.9474 17.7258 16.923 17.6738 16.845C17.5698 16.7411 18.1677 6.49897 18.5316 2.57371L18.6876 0.832035H15.1523C13.2026 0.832035 11.6169 0.884026 11.6169 0.936016Z"
            fill="currentColor" />
          <path
            d="M31.5031 1.27401C31.4252 1.53396 28.9036 8.52665 25.9142 16.8191C22.9247 25.1115 20.4032 32.1042 20.3252 32.3382C20.1433 32.7801 20.4292 32.8061 24.2505 32.8061H28.3837L33.9207 17.391C36.9621 8.94257 39.5096 1.74192 39.6136 1.40398L39.7436 0.832088H35.7143C32.127 0.832088 31.6591 0.884079 31.5031 1.27401Z"
            fill="currentColor" />
          <path
            d="M40.9654 1.53396C39.9256 4.23745 29.8135 32.4422 29.8135 32.6501C29.8135 32.7281 31.6331 32.7801 33.8947 32.7541L37.9499 32.6761L40.1855 26.4373C41.4073 23.0059 42.4471 20.4324 42.4991 20.7184C42.5251 21.0043 42.3431 23.8378 42.0832 27.0092L41.6153 32.8061H45.6965H49.7517L49.9337 31.2984C50.0117 30.4925 50.3236 26.5413 50.6356 22.538L51.1815 15.2594L55.4967 8.7606C57.8622 5.17327 60.0198 1.94988 60.3057 1.53396L60.7737 0.832088H57.0564H53.3391L49.3358 6.81097C47.1262 10.1123 45.2806 12.7379 45.2286 12.7119C45.1766 12.6599 46.0864 10.0084 47.2302 6.83696C48.374 3.66556 49.3098 1.01406 49.3098 0.962065C49.3098 0.884079 47.4902 0.832088 45.2806 0.832088H41.2513L40.9654 1.53396Z"
            fill="currentColor" />
          <path
            d="M60.6698 3.35356C60.1499 4.7573 57.6284 11.75 55.0548 18.8986C52.4813 26.0473 50.2977 32.1042 50.2197 32.3641C50.0378 32.78 50.4277 32.806 57.1344 32.754L64.2311 32.6761L65.2189 29.9466C65.7648 28.4389 66.2847 27.0351 66.3627 26.7752C66.4667 26.4112 66.1808 26.3592 63.6852 26.3852C62.1515 26.3852 60.8777 26.2813 60.8258 26.1513C60.7738 26.0213 61.2417 24.5136 61.8656 22.7979L63.0093 19.6785L65.7388 19.6005L68.4943 19.5225L69.5601 16.5331C70.158 14.8954 70.6259 13.4137 70.6259 13.2837C70.6259 13.1537 69.4561 13.0497 68.0264 13.0497C66.5967 13.0497 65.4269 12.9977 65.4269 12.9458C65.4269 12.8938 65.7128 12.0359 66.0768 11.0741C66.4407 10.0863 66.9086 8.78654 67.1426 8.16266L67.5585 7.07086H70.5219C72.1596 7.07086 73.4854 7.04487 73.4854 6.99288C73.4854 6.94089 73.9533 5.64113 74.5252 4.05543C75.0971 2.49572 75.565 1.14397 75.565 1.014C75.565 0.910017 72.4196 0.832033 68.5723 0.832033H61.5796L60.6698 3.35356Z"
            fill="currentColor" />
        </svg>
      </a>
      <a href="#" class="flex items-center md:justify-center">
        <svg class="h-8 hover:text-gray-900 dark:hover:text-white" viewBox="0 0 97 33" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M23.3087 17.7422C23.2945 15.1203 24.4766 13.1414 26.8694 11.684C25.5306 9.76222 23.5081 8.70489 20.8376 8.49771C18.3094 8.29767 15.5463 9.97655 14.5351 9.97655C13.4668 9.97655 11.0171 8.56915 9.09427 8.56915C5.12049 8.63345 0.897461 11.7483 0.897461 18.0852C0.897461 19.9569 1.23929 21.8906 1.92295 23.8862C2.8345 26.5081 6.12462 32.9379 9.55716 32.8307C11.3518 32.7878 12.6194 31.5519 14.9552 31.5519C17.2199 31.5519 18.3949 32.8307 20.396 32.8307C23.8571 32.7807 26.8338 26.9368 27.7027 24.3077C23.0595 22.1145 23.3087 17.878 23.3087 17.7422ZM19.278 6.01154C21.2221 3.69684 21.0441 1.58931 20.9871 0.832031C19.2708 0.932049 17.284 2.00367 16.1516 3.32534C14.9054 4.73988 14.1719 6.4902 14.3285 8.46199C16.1872 8.60487 17.8822 7.64755 19.278 6.01154Z"
            fill="currentColor" />
          <path
            d="M38.6162 21.8529L36.7504 27.5318H34.3521L40.4587 9.48436H43.2574L49.3874 27.5318H46.9074L44.9872 21.8529H38.6162ZM44.5091 20.0302L42.7521 14.8354C42.3517 13.6567 42.0874 12.5872 41.8192 11.5412H41.7687C41.5005 12.6107 41.2089 13.7074 40.863 14.808L39.106 20.0263L44.5091 20.0302ZM51.2066 18.8008C51.2066 17.142 51.156 15.7994 51.0977 14.5699H53.2046L53.3134 16.7946H53.3639C54.324 15.2139 55.8439 14.2772 57.9507 14.2772C61.0721 14.2772 63.416 16.9274 63.416 20.8655C63.416 25.5256 60.5901 27.8245 57.5504 27.8245C55.8439 27.8245 54.3513 27.0751 53.5777 25.791H53.5272V32.832H51.2066V18.8008ZM53.5233 22.2549C53.5233 22.6062 53.5738 22.9223 53.6321 23.219C54.0597 24.8504 55.4707 25.9784 57.1539 25.9784C59.6338 25.9784 61.076 23.9449 61.076 20.9708C61.076 18.3715 59.7155 16.1546 57.2355 16.1546C55.6379 16.1546 54.1452 17.3059 53.6866 19.074C53.6049 19.3667 53.5272 19.718 53.5272 20.038L53.5233 22.2549ZM65.8416 18.8008C65.8416 17.142 65.791 15.7994 65.7327 14.5699H67.8395L67.9484 16.7946H67.9989C68.959 15.2139 70.4789 14.2772 72.5857 14.2772C75.7071 14.2772 78.051 16.9274 78.051 20.8655C78.051 25.5256 75.2251 27.8245 72.1853 27.8245C70.4789 27.8245 68.9862 27.0751 68.2127 25.791H68.1622V32.832H65.8416V18.8008ZM68.1622 22.2549C68.1622 22.6062 68.2127 22.9223 68.271 23.219C68.6986 24.8504 70.1096 25.9784 71.7927 25.9784C74.2727 25.9784 75.7148 23.9449 75.7148 20.9708C75.7148 18.3715 74.3544 16.1546 71.8744 16.1546C70.2768 16.1546 68.7841 17.3059 68.3254 19.074C68.2438 19.3667 68.1661 19.718 68.1661 20.038L68.1622 22.2549ZM80.4804 8.52032H82.8283V27.5279H80.4804V8.52032ZM87.5472 21.4782C87.5978 24.6631 89.6268 25.9784 91.9708 25.9784C93.65 25.9784 94.6645 25.6856 95.543 25.311L95.9434 26.997C95.1193 27.3717 93.7044 27.8011 91.652 27.8011C87.6794 27.8011 85.3044 25.1783 85.3044 21.2675C85.3044 17.3567 87.5978 14.2772 91.3566 14.2772C95.5702 14.2772 96.6897 17.9968 96.6897 20.3815C96.6897 20.8655 96.6392 21.2362 96.6081 21.4782H87.5472ZM94.4274 19.7921C94.4546 18.2934 93.8133 15.9633 91.1739 15.9633C88.7989 15.9633 87.761 18.1607 87.5744 19.7921H94.4274Z"
            fill="currentColor" />
        </svg>
      </a>
      <a href="#" class="flex items-center md:justify-center">
        <svg class="h-8 hover:text-gray-900 dark:hover:text-white" viewBox="0 0 74 33" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.3881 32.832C25.2243 32.832 32.4008 25.6767 32.4008 16.8356C32.4008 7.99401 25.2243 0.832031 16.3881 0.832031C7.5383 0.832031 0.375488 7.99401 0.375488 16.8356C0.375488 25.6767 7.5383 32.832 16.3881 32.832Z"
            fill="currentColor" />
          <path d="M15.7439 9.81238V23.8517H20.2071V22.5893H17.0303V9.81238H15.7439Z" fill="white" />
          <path
            d="M11.2749 13.643C12.3367 13.643 13.1926 12.7796 13.1926 11.7252C13.1926 10.67 12.3367 9.80327 11.2749 9.80327C10.213 9.80327 9.35707 10.67 9.35707 11.7252C9.35707 12.7804 10.213 13.643 11.2749 13.643Z"
            fill="white" />
          <path
            d="M17.0299 3.44376C16.8625 3.43547 16.5443 3.42511 16.3923 3.42511C9.00118 3.42511 2.98598 9.44239 2.98598 16.8289C2.98598 20.4167 4.3801 23.7796 6.90525 26.3085C9.44075 28.8316 12.8053 30.2257 16.3923 30.2257C19.9656 30.2257 23.3293 28.8316 25.8602 26.3085C28.3916 23.7796 29.7923 20.4167 29.7923 16.8289V16.2327H20.2196V17.4665H28.5155C28.5155 17.4935 28.5155 17.6244 28.5097 17.6583C28.0879 23.9731 22.8139 28.9745 16.3923 28.9745C13.1417 28.9745 10.0937 27.7105 7.79972 25.4148C5.49829 23.1287 4.23012 20.0832 4.23012 16.8285C4.23012 13.5924 5.49829 10.5312 7.79972 8.23802C10.0937 5.94695 13.1417 4.68292 16.3923 4.68292C16.5323 4.68292 16.8729 4.68292 17.0299 4.69121V3.44376Z"
            fill="white" />
          <path
            d="M44.4432 6.21874H39.6315V27.0488H54.4104V22.9941H44.4432V6.21874ZM64.9953 19.1109H68.9141V22.753C68.1916 23.0281 66.7826 23.3023 65.4419 23.3023C61.1112 23.3023 59.6687 21.1028 59.6687 16.6354C59.6687 12.3752 61.0425 9.86333 65.3731 9.86333C67.7798 9.86333 69.1544 10.6198 70.2871 12.0637L73.2788 9.31314C71.4567 6.70306 68.2595 5.91257 65.2704 5.91257C58.5322 5.91257 54.9929 9.58989 54.9929 16.6006C54.9929 23.5774 58.1892 27.3579 65.2364 27.3579C68.4667 27.3579 71.629 26.5335 73.3467 25.3307V15.226H64.9953V19.1109Z"
            fill="currentColor" />
        </svg>
      </a>
      <a href="#" class="flex items-center md:justify-center">
        <svg class="h-6 hover:text-gray-900 dark:hover:text-white" viewBox="0 0 181 33" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M137.412 2.62108V6.17719H140.849C142.351 6.17719 143.337 7.13358 143.899 7.75176C144.349 8.26084 154.249 19.5992 154.487 19.8974C154.724 20.1956 154.724 20.199 154.724 20.3881V26.0068C154.723 26.2643 154.698 26.5212 154.648 26.7738C154.578 26.9369 154.473 27.0826 154.341 27.2007C154.21 27.3188 154.054 27.4065 153.885 27.4577C153.56 27.499 153.233 27.5196 152.906 27.5196L149.465 27.5153V31.0714H168.768V27.5153H165.135C164.81 27.5169 164.485 27.496 164.163 27.4528C163.995 27.4021 163.839 27.3146 163.708 27.1965C163.577 27.0784 163.473 26.9327 163.404 26.7695C163.353 26.517 163.327 26.2601 163.325 26.0025V20.3874C163.303 20.2028 163.349 20.0167 163.454 19.864L174.164 7.52235C175.147 6.41689 175.658 6.17647 176.947 6.17647H180.5V2.62036H164.592V6.16936H166.993C167.122 6.16155 167.25 6.19122 167.362 6.25483C167.475 6.31844 167.567 6.41331 167.627 6.5282C167.688 6.64308 167.715 6.77314 167.704 6.90291C167.694 7.03268 167.647 7.15672 167.569 7.26027C167.519 7.33298 160.909 15.1839 160.826 15.2603C160.743 15.3367 160.69 15.3183 160.628 15.2347C160.567 15.151 154.037 7.26029 154.037 7.26029C153.576 6.68938 153.936 6.16937 154.476 6.16937H156.816V2.62038L137.412 2.62108Z"
            fill="currentColor" />
          <path
            d="M90.0683 2.62109V6.1772H93.1494C95.3742 6.1772 95.5259 7.42864 95.5259 8.51955V25.163C95.5259 26.1594 95.5831 27.5266 94.1647 27.5266H90.3629V31.0792H106.596V27.5266H102.636C101.055 27.5266 100.983 26.796 100.965 25.2433V10.9847L123.26 31.0792H128.93L128.631 8.38459C128.66 6.72641 128.761 6.17365 130.46 6.17365H134.013V2.62109H117.453V6.17365H121.089C122.76 6.17365 123.04 6.8246 123.062 8.38459L123.26 20.261L103.907 2.62109H90.0683Z"
            fill="currentColor" />
          <path
            d="M16.97 0.832031C13.4816 0.832031 9.518 1.49384 6.17001 3.01385C3.0452 4.42475 0.500023 6.69001 0.500023 10.4464C0.495274 12.4136 1.23591 14.308 2.57002 15.7411C3.47362 16.5848 4.93185 18.0175 8.74065 18.8612C10.4434 19.2248 14.0831 19.8102 17.7083 20.1957C21.3335 20.5811 24.8471 20.9231 26.2871 21.3122C27.4319 21.6067 29.3577 22.0068 29.3577 24.1886C29.3577 26.3704 27.3311 27.0247 26.9783 27.1666C26.6255 27.3084 24.1916 28.4357 19.8212 28.4357C16.9255 28.3545 14.0562 27.8561 11.3 26.9556C9.6692 26.3666 7.95958 25.5919 6.36478 23.6247C5.72099 22.6983 5.36373 21.5999 5.33821 20.4684H1.3782V31.6687H5.77765V30.1523C5.77693 30.0398 5.80595 29.9292 5.86167 29.8317C5.91739 29.7343 5.9978 29.6537 6.09465 29.5981C6.1915 29.5425 6.30128 29.5141 6.41266 29.5156C6.52403 29.5172 6.633 29.5487 6.7283 29.6069C8.80079 30.5178 10.9565 31.2216 13.1647 31.7084C15.4759 32.1957 16.9702 32.5487 19.843 32.5487C22.8743 32.6069 25.8954 32.176 28.7923 31.2724C30.716 30.7396 32.5209 29.8397 34.1094 28.6211C35.0028 27.9279 35.725 27.0348 36.2191 26.0121C36.7132 24.9894 36.9658 23.8649 36.9571 22.7269C36.9723 20.5648 36.1464 18.4831 34.6571 16.93C33.8289 16.1184 32.8693 15.4556 31.82 14.9705C30.692 14.4557 29.5209 14.0431 28.3206 13.7376C26.0382 13.1739 20.9122 12.4685 18.4606 12.2212C15.8902 11.9521 11.4297 11.5773 9.64767 11.021C9.10767 10.8501 8.00588 10.3232 8.00588 9.03231C8.00588 8.11231 8.50994 7.334 9.50354 6.70491C11.0839 5.7049 14.2736 5.08273 17.6 5.08273C20.8198 5.04343 24.0132 5.67344 26.9818 6.93359C27.7792 7.2847 28.5292 7.73697 29.2135 8.27948C30.3291 9.24195 31.1016 10.5472 31.4129 11.9954H34.9665V2.24681H31.0065V3.37749C31.0065 3.74112 30.6465 4.22129 29.9265 3.82493C28.1409 2.88675 23.1224 0.857484 16.97 0.832031Z"
            fill="currentColor" />
          <path
            d="M64.6271 0.832031C58.3883 0.832031 51.764 3.01358 48.02 6.44994C46.5927 7.7626 45.4533 9.36256 44.6752 11.1469C43.897 12.9312 43.4972 14.8603 43.5017 16.81C43.4794 18.7678 43.871 20.7079 44.6501 22.5007C45.4293 24.2935 46.5781 25.8978 48.02 27.2063C52.052 30.8681 58.1003 32.832 64.6271 32.832C71.1647 32.832 77.3423 30.89 81.2771 27.2063C82.6762 25.867 83.7924 24.2554 84.5583 22.4687C85.3242 20.6819 85.7239 18.757 85.7335 16.81C85.7528 14.865 85.3659 12.9377 84.598 11.1539C83.8302 9.37015 82.6986 7.76995 81.2771 6.45774C77.0543 2.58865 71.5283 0.832031 64.6271 0.832031ZM64.6271 4.99183C68.0399 4.99183 71.3266 6.23219 73.5406 8.43219C75.6826 10.5631 76.8017 13.574 76.8017 16.7958C76.8017 20.1704 75.7834 22.9049 73.5406 25.1595C71.2978 27.414 68.0867 28.6211 64.6271 28.6211C61.1927 28.6211 57.9128 27.3886 55.6988 25.1595C54.6399 24.0497 53.8086 22.7395 53.2526 21.3042C52.6965 19.8689 52.4268 18.3368 52.4588 16.7958C52.4588 13.5885 53.564 10.5667 55.6988 8.43219C57.9128 6.22128 61.2143 4.99183 64.6271 4.99183Z"
            fill="currentColor" />
        </svg>
      </a>
    </div>
  </section>

  <section class="px-6 py-16 mx-auto max-w-7xl">
    <div class="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
      <div>
        <h2 class="mb-4 text-3xl font-bold md:text-4xl">Digital TechLab's Role in Revolutionizing Technology Solutions
        </h2>
        <p class="mb-4 text-gray-400">
          A Digital TechLab could be a department or initiative within a company that explores and implements
          cutting-edge technologies, like these ITSM platforms, to solve business challenges. In this context, a Digital
          TechLab might focus on
        </p>
        <a href="#" class="text-blue-500 hover:underline">Learn what makes Flowbite different &rarr;</a>
      </div>

      <div>
        <div class="flex items-center justify-between p-4 bg-blue-900 rounded-xl">
          <div>
            <p class="text-sm text-gray-400">Innovation</p>
            <h3 class="text-lg font-semibold text-white">Exploring new technologies to enhance IT service management and
              improve overall business processes.</h3>
          </div>
          <span class="text-xl text-blue-400">&rarr;</span>
        </div>

        <div class="flex items-center justify-between p-4 mt-4 bg-blue-900 rounded-xl">
          <div>
            <p class="text-sm text-gray-400">Efficiency</p>
            <h3 class="text-lg font-semibold text-white">Implementing solutions that help teams collaborate more
              effectively and reduce manual efforts.</h3>
          </div>
          <span class="text-xl text-purple-400">&rarr;</span>
        </div>

        <div class="flex items-center justify-between p-4 mt-4 bg-blue-900 rounded-xl">
          <div>
            <p class="text-sm text-gray-400">Customization</p>
            <h3 class="text-lg font-semibold text-white">Developing tailor-made solutions to fit the specific needs of
              the organization, such as integrating multiple tools or creating custom workflows.</h3>
          </div>
          <span class="text-xl text-teal-400">&rarr;</span>
        </div>
      </div>
    </div>
  </section>


  <!-- section 6 -->
  <section class="bg-white ">
    <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
      <Swiper :modules="[Pagination, Autoplay]" :slides-per-view="1" :space-between="30"
        :pagination="{ clickable: true }" :autoplay="{ delay: 3000, disableOnInteraction: false }"
        class="max-w-screen-md mx-auto">
        <SwiperSlide v-for="(testimonial, index) in testimonials" :key="index">
          <figure class="flex flex-col items-center">
            <svg class="h-12 mx-auto mb-3 text-gray-400 " viewBox="0 0 24 27" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                fill="currentColor" />
            </svg>
            <blockquote>
              <p class="text-2xl font-medium text-gray-900 ">
                "{{ testimonial.text }}"
              </p>
            </blockquote>
            <figcaption class="flex items-center justify-center mt-6 space-x-3">
              <!-- <img
                class="w-6 h-6 rounded-full"
                :src="testimonial.image"
                alt="profile picture"
              /> -->
              <div class="flex items-center divide-x-2 divide-gray-500 ">
                <div class="pr-3 font-medium text-gray-900 ">
                  {{ testimonial.name }}
                </div>
                <div class="pl-3 text-sm font-light text-gray-500 ">
                  {{ testimonial.position }}
                </div>
              </div>
            </figcaption>
          </figure>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>

  <!-- section 7 -->
  <section class="px-6 py-2 mx-auto bg-gradient-to-r from-blue-900 to-blue-500 rounded-3xl max-w-7xl">
    <div class="mx-auto text-center lg:py-16 lg:px-2">
      <h1 class="text-4xl font-semibold text-white sm:text-5xl">Get Started with Digital TechLab</h1>
      <button type="button"
        class="px-3 py-2 mt-4 text-sm font-medium text-center text-blue-900 bg-white rounded-full hover:bg-blue-800 hover:shadow-xl ">
        Contact Us →
      </button>
    </div>
  </section>


  <!-- footer -->
  <section class="p-4 mt-12 bg-white sm:p-6 ">
      <div class="max-w-screen-xl mx-auto">
          <div class="md:flex md:justify-between">
          <div class="mb-6 md:mb-0">
              <a href="/" class="flex items-center">
              <img
                  src="/assets/img/digitalTechLabs/DigitalTechLabsLogo.jpg"
                  alt="Digital Tech Labs Logo"
                  class="w-40 px-2 rounded-full"
              />
              </a>
              <p class="mt-4 text-sm text-gray-600  max-w-sm">
              Digital TechLabs is a forward-thinking tech company providing innovative digital products and business solutions to help you succeed in a rapidly evolving digital world.
              </p>
          </div>
          <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase ">Products</h2>
              <ul class="text-gray-600">
                  <li class="mb-4">
                  <a href="https://prep.btob.lk" target="_blank" class="hover:underline">B2B.lk</a>
                  </li>
                  <li>
                  <!-- <a href="" class="hover:underline">Automobile.lk</a> -->
                  </li>
              </ul>
              </div>
              <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase ">Company</h2>
              <ul class="text-gray-600 ">
                  <li class="mb-4">
                  <a href="/aboutUs" class="hover:underline">About Us</a>
                  </li>
                  <li>
                  <a href="/contact" class="hover:underline">Contact</a>
                  </li>
              </ul>
              </div>
              <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase ">Legal</h2>
              <ul class="text-gray-600 ">
                  <li class="mb-4">
                  <a href="/privacy-policy" class="hover:underline">Privacy Policy</a>
                  </li>
                  <li>
                  <a href="/terms" class="hover:underline">Terms & Conditions</a>
                  </li>
              </ul>
              </div>
          </div>
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
          <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-gray-500 sm:text-center">
              © 2025 <a href="/" class="hover:underline">Digital TechLabs™</a>. All rights reserved.
          </span>
          <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
              <!-- Existing social icons remain unchanged -->
              <!-- Add links to your actual social media profiles -->
              <!-- Facebook / Instagram / LinkedIn / etc. -->
          </div>
          </div>
      </div>
  </section>

</article>

</template>

<script setup>
import { useLoading } from "~/composables/useLoading";
import LoadingSpinner from "~/components/LoadingSpinner.vue"

import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import gsap from 'gsap';



// Mobile Menu Toggle
const menuOpen = ref(false);
const isLoading = useLoading();



const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// testimonials
const testimonials = ref([
  {
    text: "Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application.",
    name: "Micheal Gough",
    position: "CEO at Google",
  },
  {
    text: "Using Flowbite has significantly improved our development speed. The UI components are elegant, responsive, and easy to customize.",
    name: "Sarah Thompson",
    position: "Lead Developer at Facebook",
  },
  {
    text: "Flowbite’s prebuilt UI components saved us a lot of time. We were able to build a professional-looking UI in no time!",
    name: "David Johnson",
    position: "CTO at Amazon",
  },

]);

const imageGrid = ref(null)
</script>

<script>

definePageMeta({
  layout: 'bst',
});

export default {
  data() {
    return {
      imageroot: process.env.Assets_83,
      showDropdown: false,
    };
  },
  mounted() {
    

    console.log("Component mounted!");
    document.addEventListener('click', this.handleClickOutside);

    // gsap animations
    if (this.$refs.imageGridSection1) {
      gsap.fromTo(
        this.$refs.imageGridSection1.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 1.5, ease: 'power4.out' }
      );
    }
    if (this.$refs.imageGridSection2) {
      gsap.fromTo(
        this.$refs.imageGridSection2.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 1.5, ease: 'power4.out' }
      );
    }
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    closeDropdown() {
      this.showDropdown = false;
    },
    handleClickOutside(event) {
      const dropdown = this.$refs.dropdownRef;
      if (dropdown && !dropdown.contains(event.target)) {
        this.closeDropdown();
      }
    }
  },
  head() {
    return {
      title: 'Intranet - Digital Tech Labs',
    };
  }
};

</script>

<style scoped>
/* Utility Classes */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-enter-to {
  transform: translateX(0%);
}

.slide-leave-from {
  transform: translateX(0%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.html {
  scroll-behavior: smooth;
}

.csscmd {
  @apply p-2 text-center bg-blue-200 rounded;
}

.csscmd:hover {
  @apply bg-blue-300 cursor-pointer;
}

.cssBox {
  border: 1px solid;
  @apply border-gray-500 rounded p-2;
}

/* Navbar Specific */
nav a {
  @apply px-3 py-2 rounded-lg transition-colors;
}

nav a:hover {
  @apply bg-white text-black;
}
</style>
