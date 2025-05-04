<script>
  import Navbar from '$lib/components/Navbar.svelte'; // Import Navbar component
  import Footer from '$lib/components/Footer.svelte'; // Import Footer component
</script>

<svelte:head>
  <title>About Us - Metro Dagupan Colleges Clinic</title>
  <meta name="description" content="Learn more about the Metro Dagupan Colleges Clinic and the services we provide to students, faculty, and staff. Discover our mission, services, and how to contact us." />
  <meta name="keywords" content="Metro Dagupan Colleges, Clinic, Healthcare, Medical Services, Students, Faculty, Staff" />
  <meta name="author" content="Metro Dagupan Colleges Clinic" />
</svelte:head>

<main class="bg-green-50 min-h-screen text-gray-800 flex flex-col">
  <!-- Navbar -->
  <Navbar />

  <!-- Hero Section -->
  <section class="bg-gradient-to-r from-green-500 to-green-700 text-white py-16 px-6 text-center">
    <h1 class="text-3xl sm:text-5xl font-bold mb-4">About Metro Dagupan Colleges Clinic</h1>
    <p class="text-base sm:text-xl max-w-3xl mx-auto">
      Dedicated to providing quality healthcare services to students, faculty, and staff with professionalism and compassion.
    </p>
  </section>

  <!-- About Section -->
  <section class="py-12 px-6 bg-white">
    <div class="max-w-5xl mx-auto text-center">
      <h2 class="text-2xl sm:text-4xl font-semibold text-green-800 mb-6">Who We Are</h2>
      <p class="text-base sm:text-xl text-gray-700">
        At Metro Dagupan Colleges Clinic, we strive to create a safe and healthy environment for our community. Our team of healthcare professionals is committed to delivering accessible and reliable medical services to ensure the well-being of everyone we serve.
      </p>
    </div>
  </section>

  <!-- Services Section -->
  <section class="py-12 px-6 bg-gray-100">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-2xl sm:text-4xl font-semibold text-green-800 mb-6 text-center">Our Services</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div class="p-6 bg-green-100 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
          <h3 class="text-lg sm:text-xl font-bold text-green-700 mb-2">Medical Consultations</h3>
          <p class="text-sm sm:text-base text-gray-700">
            Get professional advice and treatment for common illnesses and health concerns.
          </p>
        </div>
        <div class="p-6 bg-yellow-100 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
          <h3 class="text-lg sm:text-xl font-bold text-yellow-700 mb-2">First Aid Services</h3>
          <p class="text-sm sm:text-base text-gray-700">
            Immediate care for minor injuries and emergencies.
          </p>
        </div>
        <div class="p-6 bg-green-100 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
          <h3 class="text-lg sm:text-xl font-bold text-green-700 mb-2">Health Education</h3>
          <p class="text-sm sm:text-base text-gray-700">
            Learn about maintaining a healthy lifestyle through our workshops and resources.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="py-12 px-6 bg-gray-100">
    <div class="max-w-5xl mx-auto text-center">
      <h2 class="text-2xl sm:text-4xl font-semibold text-green-800 mb-6">Get in Touch</h2>
      <p class="text-base sm:text-xl text-gray-700 mb-8">
        Have questions or need assistance? Reach out to us through the following contact details:
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <!-- Phone -->
        <div class="flex items-center justify-center bg-green-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div class="text-green-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 sm:w-12 sm:h-12 mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 10l1.5 1.5a2 2 0 002.828 0L9 9m6 6l1.5 1.5a2 2 0 002.828 0L21 15m-9-9l1.5 1.5a2 2 0 010 2.828L9 9m6 6l1.5 1.5a2 2 0 010 2.828L15 21" />
            </svg>
            <h3 class="text-lg sm:text-xl font-bold mb-2">Phone</h3>
            <p class="text-sm sm:text-base text-gray-700">
              <a href="tel:+63755226367" class="text-green-600 underline hover:text-green-800">(075) 522 6367</a>
            </p>
          </div>
        </div>
        <!-- Email -->
        <div class="flex items-center justify-center bg-yellow-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div class="text-yellow-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 sm:w-12 sm:h-12 mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 12h2a2 2 0 002-2V7a2 2 0 00-2-2h-2m-4 0H8a2 2 0 00-2 2v3a2 2 0 002 2h4m0 0v6m0-6H8m4 0h4" />
            </svg>
            <h3 class="text-lg sm:text-xl font-bold mb-2">Email</h3>
            <p class="text-sm sm:text-base text-gray-700">
              <a href="mailto:inquiries@metrodagupancolleges.edu.ph" class="text-yellow-600 underline hover:text-yellow-800">inquiries@metrodagupancolleges.edu.ph</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <Footer />
</main>