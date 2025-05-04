<script>
  import Navbar from '$lib/components/Navbar.svelte'; // Import the Navbar component
  import Footer from '$lib/components/Footer.svelte'; // Import the Footer component
</script>

<svelte:head>
  <title>Clinic Schedule - Metro Dagupan Colleges</title>
  <meta name="description" content="Welcome to Metro Dagupan Colleges Clinic. Providing quality healthcare services to students, faculty, and staff with professionalism and care." />
  <meta name="keywords" content="Clinic, Metro Dagupan Colleges, Healthcare, Medical Services, Students, Faculty, Staff" />
  <meta name="author" content="Metro Dagupan Colleges Clinic" />
</svelte:head>

<main class="bg-green-50 min-h-screen text-gray-800 flex flex-col">
  <!-- Navbar -->
  <Navbar />

  <!-- Hero Section -->
  <section class="bg-gradient-to-r from-green-500 via-white to-yellow-400 text-center py-12 px-4 sm:py-16 sm:px-6">
    <h1 class="text-3xl sm:text-5xl font-bold text-green-800 mb-4">Welcome to Metro Dagupan Colleges Clinic</h1>
    <p class="text-base sm:text-xl text-gray-700 mb-6">
      Providing quality healthcare services to students, faculty, and staff.
    </p>
    <a href="/schedule" class="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300">
      View Schedule
    </a>
  </section>

  <!-- Decorative Section -->
  <section class="py-8 px-4 sm:py-12 sm:px-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div class="p-6 bg-green-100 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
        <h3 class="text-lg sm:text-2xl font-bold text-green-700 mb-2">Health is Wealth</h3>
        <p class="text-sm sm:text-base text-gray-700">
          Stay healthy and productive with our clinic's support.
        </p>
      </div>
      <div class="p-6 bg-yellow-100 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
        <h3 class="text-lg sm:text-2xl font-bold text-yellow-700 mb-2">Your Safety Matters</h3>
        <p class="text-sm sm:text-base text-gray-700">
          We prioritize your well-being with quality care.
        </p>
      </div>
      <div class="p-6 bg-white rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
        <h3 class="text-lg sm:text-2xl font-bold text-green-700 mb-2">Accessible Care</h3>
        <p class="text-sm sm:text-base text-gray-700">
          Conveniently located on campus for all your health needs.
        </p>
      </div>
    </div>
  </section>

  <!-- Visual Divider -->
  <div class="h-1 bg-gradient-to-r from-green-500 via-yellow-400 to-green-500 my-8"></div>

  <!-- Informative Section -->
  <section class="py-8 px-4 sm:py-12 sm:px-6">
    <h2 class="text-2xl sm:text-4xl font-semibold text-green-800 mb-6 text-center">Why Choose Us?</h2>
    <ul class="list-disc list-inside text-gray-700 space-y-4 text-sm sm:text-base">
      <li>Experienced healthcare professionals ready to assist you.</li>
      <li>State-of-the-art facilities for consultations and first aid.</li>
      <li>Committed to promoting health and wellness in the college community.</li>
      <li>Convenient operating hours to fit your busy schedule.</li>
    </ul>
  </section>

  <!-- Footer -->
  <Footer />
</main>
