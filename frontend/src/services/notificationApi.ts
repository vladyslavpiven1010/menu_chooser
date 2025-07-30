const notificationsUrl = "http://192.168.1.224:3000";

export async function fetchNotifications() {
  const res = await fetch(`${notificationsUrl}/notifications`);
  return await res.json();
}

export async function clearNotifications() {
  await fetch(`${notificationsUrl}/notifications`, {
    method: "DELETE",
  });
}

export async function markAllNotificationsAsRead() {
  await fetch(`${notificationsUrl}/notifications/read-all`, {
    method: "PATCH",
  });
}