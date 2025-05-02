<script lang="ts">
  import { onMount } from 'svelte';
  import Navbar from '$lib/components/Navbar.svelte'; // Import the Navbar component
  import Footer from '$lib/components/Footer.svelte'; // Import the Footer component

  interface Schedule {
    id: string;
    purpose: string;
    date: string; // Expected format: YYYY-MM-DD
    time: string;
    message: string;
  }

  let schedules: Schedule[] = []; // Array to store fetched schedules

  // Helper function to format time to AM/PM
  function formatTimeToAmPm(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  // Helper function to format date with day of the week and month name
  function formatDateWithDay(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', // Full name of the day (e.g., Monday)
      year: 'numeric',
      month: 'long', // Full name of the month (e.g., January)
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString('en-US', options);
  }

  // Fetch schedules from the backend
  onMount(async () => {
    try {
      const response = await fetch('/api/schedules');
      if (response.ok) {
        schedules = await response.json();
      } else {
        console.error('Failed to fetch schedules');
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  });
</script>

<style>
  /* Table container for horizontal scrolling */
  .overflow-x-auto {
    overflow-x: auto;
  }

  /* Table styling */
  table {
    width: 100%;
    border-collapse: collapse; /* Remove gaps between table cells */
    border: 1px solid #d1d5db; /* Light gray border */
    text-align: left;
    font-size: 0.875rem; /* Small font size */
  }

  /* Table header styling */
  thead tr {
    background-color: #d1fae5; /* Light green background */
  }

  th {
    border: 1px solid #d1d5db; /* Light gray border */
    padding: 0.5rem 1rem; /* Padding for header cells */
    color: #047857; /* Dark green text */
    text-transform: uppercase; /* Uppercase text */
    font-weight: bold;
  }

  /* Table body styling */
  td {
    border: 1px solid #d1d5db; /* Light gray border */
    padding: 0.5rem 1rem; /* Padding for body cells */
    color: #374151; /* Dark gray text */
  }

  /* Hover effect for table rows */
  tbody tr:hover {
    background-color: #f0fdf4; /* Very light green background */
  }

  /* Alternating row colors */
  tbody tr:nth-child(even) {
    background-color: #f9fafb; /* Light gray background for even rows */
  }

  /* Message row styling */
  td[colspan="3"] {
    color: #4b5563; /* Medium gray text */
    white-space: pre-wrap; /* Preserve whitespace and line breaks */
    word-wrap: break-word; /* Break long words if necessary */
  }
</style>

<main class="bg-green-50 min-h-screen text-gray-800 flex flex-col">
  <!-- Navbar -->
  <Navbar />

  <!-- Page Header -->
  <section class="bg-gradient-to-r from-green-500 via-white to-yellow-400 text-center py-8 px-4 sm:py-12 sm:px-6">
    <h1 class="text-3xl sm:text-4xl font-bold text-green-800 mb-4">Clinic Schedule</h1>
    <p class="text-base sm:text-lg text-gray-700">
      Find the best time to visit the Metro Dagupan Colleges Clinic.
    </p>
  </section>

  <!-- Schedule Section -->
  <section class="py-8 px-2 sm:py-12 sm:px-6">
    <div class="max-w-full sm:max-w-6xl mx-auto bg-white rounded-lg shadow-md p-2 sm:p-6">
      <h2 class="text-xl sm:text-2xl font-semibold text-green-800 mb-4">Operating Hours</h2>
      <div class="overflow-x-auto">
        {#if schedules.length > 0}
          <table class="w-full border-collapse border border-gray-300 text-left text-sm sm:text-base">
            <thead>
              <tr class="bg-green-100">
                <th class="border border-gray-300 px-2 sm:px-4 py-2 text-green-700">Purpose</th>
                <th class="border border-gray-300 px-2 sm:px-4 py-2 text-green-700">Date</th>
                <th class="border border-gray-300 px-2 sm:px-4 py-2 text-green-700">Time</th>
              </tr>
            </thead>
            <tbody>
              {#each schedules as schedule}
                <!-- Schedule Group -->
                <tr class="border border-black">
                  <td colspan="3" class="p-0">
                    <!-- Schedule Row -->
                    <table class="w-full border-collapse">
                      <tbody>
                        <tr class="hover:bg-green-50 even:bg-gray-50">
                          <td class="border border-gray-300 px-2 sm:px-4 py-2">{schedule.purpose}</td>
                          <td class="border border-gray-300 px-2 sm:px-4 py-2">{formatDateWithDay(schedule.date)}</td>
                          <td class="border border-gray-300 px-2 sm:px-4 py-2">{formatTimeToAmPm(schedule.time)}</td>
                        </tr>
                        <!-- Message Row -->
                        <tr class="bg-gray-100">
                          <td colspan="3" class="border border-gray-300 px-2 sm:px-4 py-4 text-gray-700">
                            <strong>Message:</strong> {schedule.message}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        {:else}
          <p class="text-center text-gray-700 text-sm sm:text-base py-4">
            No schedules available at the moment. Please check back later.
          </p>
        {/if}
      </div>
    </div>
  </section>

  <!-- Additional Information -->
  <section class="py-8 px-4 sm:py-12 sm:px-6">
    <div class="max-w-6xl mx-auto bg-green-100 rounded-lg shadow-md p-4 sm:p-6">
      <h2 class="text-xl sm:text-2xl font-semibold text-green-800 mb-4">Important Reminders</h2>
      <ul class="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-2">
        <li>Please bring your student or faculty ID for verification.</li>
        <li>Walk-ins are welcome, but appointments are encouraged for faster service.</li>
        <li>Follow health protocols, including wearing a mask and maintaining social distancing.</li>
        <li>Emergency cases will be prioritized.</li>
      </ul>
    </div>
  </section>

  <!-- Footer -->
  <Footer />
</main>