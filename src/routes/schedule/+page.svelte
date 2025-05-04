<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';

  interface Schedule {
    id: string;
    purpose: string;
    date: string; // Expected format: YYYY-MM-DD
    time: string; // Expected format: HH:mm (24-hour format)
    message: string;
  }

  let schedules: Schedule[] = [];
  let loading = true; // Loading state
  let notifiedScheduleIds: Set<string> = new Set(); // Track notified schedules
  let vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY || ''; // Use Vite's env variable
  let pollingInterval: number | undefined; // To store the polling interval ID
  let initialLoad = true; // Track initial load

  // Load notified schedule IDs from localStorage
  function loadNotifiedScheduleIds() {
    const storedIds = localStorage.getItem('notifiedScheduleIds');
    if (storedIds) {
      notifiedScheduleIds = new Set(JSON.parse(storedIds));
    }
  }

  // Save notified schedule IDs to localStorage
  function saveNotifiedScheduleIds() {
    localStorage.setItem('notifiedScheduleIds', JSON.stringify([...notifiedScheduleIds]));
  }

  // Helper function to format time to AM/PM
  function formatTimeToAmPm(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  // Helper function to format date with day of the week and month name
  function formatDateWithDay(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString('en-US', options);
  }

  // Show a notification
  function showNotification(title: string, body: string) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  }

  // Check for reminders based on date and time
  function checkForReminders(newSchedules: Schedule[]) {
    const now = new Date();
    const today = now.toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    newSchedules.forEach((schedule) => {
      const scheduleDate = schedule.date;
      const scheduleTime = new Date(`${schedule.date}T${schedule.time}`);
      const formattedTime = formatTimeToAmPm(schedule.time); // Format the time to AM/PM

      // Notify if the schedule is for today
      if (scheduleDate === today && !notifiedScheduleIds.has(`${schedule.id}-date`)) {
        showNotification(
          `Today's Schedule: ${schedule.purpose}`,
          `Reminder: "${schedule.purpose}" is scheduled for today at ${formattedTime}.`
        );
        notifiedScheduleIds.add(`${schedule.id}-date`); // Mark the date notification as sent
      }

      // Notify if the schedule time has been reached or passed
      if (scheduleTime <= now && !notifiedScheduleIds.has(`${schedule.id}-time`)) {
        showNotification(
          `Schedule Reminder: ${schedule.purpose}`,
          `The schedule "${schedule.purpose}" is happening now (at ${formattedTime}).`
        );
        notifiedScheduleIds.add(`${schedule.id}-time`); // Mark the time notification as sent
      }
    });

    // Save the updated notified schedule IDs to localStorage
    saveNotifiedScheduleIds();
  }

  // Fetch schedules from the backend and sort them
  async function fetchSchedules(isAutoRefresh = false) {
    if (!isAutoRefresh) {
        loading = true; // Show loading spinner only if not auto-refresh
    }
    try {
        const response = await fetch('/api/schedules');
        if (response.ok) {
            const newSchedules = await response.json();

            // Sort schedules by date and time in descending order
            newSchedules.sort((a: Schedule, b: Schedule) => {
                const dateA = new Date(`${a.date}T${a.time}`);
                const dateB = new Date(`${b.date}T${b.time}`);
                return dateB.getTime() - dateA.getTime();
            });

            // Check for reminders and update the schedules array
            checkForReminders(newSchedules);
            schedules = newSchedules; // Update the schedules array
        } else {
            console.error('Failed to fetch schedules');
        }
    } catch (error) {
        console.error('Error fetching schedules:', error);
    } finally {
        if (!isAutoRefresh) {
            loading = false; // Hide loading spinner only if not auto-refresh
        }
        initialLoad = false; // Mark initial load as complete
    }
  }

  function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
  }

  async function registerServiceWorker() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        console.log('Service Worker registered:', registration);

        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
        });

        console.log('Push subscription:', subscription);

        // Send subscription to the server
        await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subscription),
        });
      } catch (error) {
        console.error('Error registering service worker or subscribing to push notifications:', error);
      }
    } else {
      console.warn('Push notifications are not supported in this browser.');
    }
  }

  onMount(() => {
    // Load previously notified schedule IDs
    loadNotifiedScheduleIds();

    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        } else {
            console.warn('Notification permission denied.');
        }
    });

    fetchSchedules(); // Fetch schedules once when the component is mounted
    registerServiceWorker(); // Register service worker for push notifications
  });

  onDestroy(() => {});
</script>

<svelte:head>
  <title>Clinic Schedule - Metro Dagupan Colleges</title>
  <meta name="description" content="View the clinic schedule for Metro Dagupan Colleges. Find the best time to visit and access quality healthcare services for students, faculty, and staff." />
  <meta name="keywords" content="Clinic, Metro Dagupan Colleges, Healthcare, Medical Services, Students, Faculty, Staff" />
  <meta name="author" content="Metro Dagupan Colleges Clinic" />
</svelte:head>

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
        {#if loading}
          <!-- Loading Spinner -->
          <div role="status" class="flex justify-center items-center py-8">
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        {:else}
          {#if schedules.length > 0}
            <!-- Schedule Table -->
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
                      <!-- Nested Table for Schedule -->
                      <table class="w-full border-collapse">
                        <tbody>
                          <!-- Schedule Row -->
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
        {/if}
      </div>
    </div>
  </section>

  <!-- Footer -->
  <Footer />
</main>