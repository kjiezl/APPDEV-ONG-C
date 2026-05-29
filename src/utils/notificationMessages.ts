export function getBookingNotificationText(
  status: string | null | undefined,
  photographerName?: string,
): { title: string; body: string } {
  const name = photographerName || 'Your photographer';
  switch (status?.toUpperCase()) {
    case 'CONFIRMED':
      return { title: 'Booking Confirmed! 🎉', body: `${name} has confirmed your booking.` };
    case 'REJECTED':
      return { title: 'Booking Rejected', body: `${name} has rejected your booking request.` };
    case 'COMPLETED':
      return { title: 'Session Completed ✅', body: `Your session with ${name} has been marked complete.` };
    case 'CANCELLED':
      return { title: 'Booking Cancelled', body: `Your booking with ${name} has been cancelled.` };
    case 'REQUESTED':
      return { title: 'Booking Requested', body: `Your booking request has been sent to ${name}.` };
    default:
      return { title: 'Booking Updated', body: `Your booking status changed to ${status ?? 'unknown'}.` };
  }
}