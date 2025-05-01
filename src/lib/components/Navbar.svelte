<script>
  import { slide } from 'svelte/transition';
  import { onMount } from 'svelte';

  let isMenuOpen = false;
  let isDesktop = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  onMount(() => {
    // Check if the screen width is >= 640px
    isDesktop = window.innerWidth >= 640;

    // Optional: Add a resize listener to update `isDesktop` dynamically
    const handleResize = () => {
      isDesktop = window.innerWidth >= 640;
    };
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component is destroyed
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<div class="flex justify-center">
  <header class="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white/20 backdrop-blur-md text-sm py-3 rounded-lg shadow-md m-4">
    <nav class="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
      <div class="flex items-center justify-between">
        <!-- Updated Logo -->
        <a class="flex-none text-xl font-semibold focus:outline-hidden focus:opacity-80" href="/" aria-label="Brand">
          <img src="/logo/logo.png" alt="Logo" class="w-10 h-10" />
        </a>
        <div class="sm:hidden">
          <button
            type="button"
            class="relative size-9 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
            on:click={toggleMenu}
          >
            <svg class={!isMenuOpen ? 'block' : 'hidden'} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
            <svg class={isMenuOpen ? 'block' : 'hidden'} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            <span class="sr-only">Toggle navigation</span>
          </button>
        </div>
      </div>
      <div
        id="hs-navbar-example"
        class="overflow-hidden transition-all duration-300 basis-full grow sm:block"
      >
        {#if isMenuOpen || isDesktop}
          <div
            class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5"
            transition:slide
          >
            <a class="font-medium text-gray-600 hover:text-blue-500 transition-colors duration-300 focus:outline-hidden focus:text-blue-500" href="/" aria-current="page">
              <span class="relative group">
                Home
                <span class="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </a>
            <a class="font-medium text-gray-600 hover:text-blue-500 transition-colors duration-300 focus:outline-hidden focus:text-blue-500" href="/schedule">
              <span class="relative group">
                Schedule
                <span class="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </a>
            <a class="font-medium text-gray-600 hover:text-blue-500 transition-colors duration-300 focus:outline-hidden focus:text-blue-500" href="#about">
              <span class="relative group">
                About
                <span class="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </a>
          </div>
        {/if}
      </div>
    </nav>
  </header>
</div>