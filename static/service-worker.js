self.addEventListener('push', (event) => {
  try {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/logo/logo.png', // Optional: Path to your app's icon
    });
  } catch (error) {
    console.error('Error handling push event:', error);
  }
});