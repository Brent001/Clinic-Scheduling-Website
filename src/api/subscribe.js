import webPush from 'web-push';

// Access environment variables via import.meta.env
const vapidKeys = {
  publicKey: import.meta.env.VITE_VAPID_PUBLIC_KEY || '',
  privateKey: import.meta.env.VITE_VAPID_PRIVATE_KEY || '',
};

webPush.setVapidDetails('mailto:your-email@example.com', vapidKeys.publicKey, vapidKeys.privateKey);

/** @type {webPush.PushSubscription[]} */
let subscriptions = [];

/**
 * POST handler to save subscriptions
 * @param {{ request: Request }} context
 * @returns {Promise<Response>}
 */
export async function POST({ request }) {
  try {
    const subscription = await request.json();
    subscriptions.push(subscription);
    return new Response('Subscription received', { status: 201 });
  } catch (error) {
    console.error('Error handling subscription:', error);
    return new Response('Failed to save subscription', { status: 500 });
  }
}

/**
 * Function to send notifications
 * @param {string} title
 * @param {string} body
 * @returns {Promise<void>}
 */
export async function sendNotification(title, body) {
  const payload = JSON.stringify({ title, body });

  subscriptions.forEach((subscription) => {
    webPush.sendNotification(subscription, payload).catch((error) => {
      console.error('Error sending notification:', error);
    });
  });
}