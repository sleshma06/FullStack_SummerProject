function daysAgo(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().slice(0, 10)
}

// Dates are generated relative to "today" so the dashboard's Today /
// Yesterday labelling always looks correct, whenever this is actually run.
export const MOCK_EXPENSES = [
  { id: 1, title: 'Chicken Momo', amount: 180, category: 'Food', date: daysAgo(0), note: 'Lunch with roommates' },
  { id: 2, title: 'Bus Fare', amount: 40, category: 'Transport', date: daysAgo(0), note: '' },
  { id: 3, title: 'Cappuccino', amount: 150, category: 'Food', date: daysAgo(0), note: 'Coffee run' },
  { id: 4, title: 'Photocopy & Printing', amount: 50, category: 'Education', date: daysAgo(1), note: 'Assignment' },
  { id: 5, title: 'Movie Ticket', amount: 350, category: 'Entertainment', date: daysAgo(1), note: 'Weekend movie' },
  { id: 6, title: 'New Notebook', amount: 220, category: 'Shopping', date: daysAgo(2), note: '' },
  { id: 7, title: 'Thukpa', amount: 160, category: 'Food', date: daysAgo(2), note: 'Dinner' },
  { id: 8, title: 'Electricity Bill', amount: 600, category: 'Bills', date: daysAgo(3), note: 'Hostel share' },
  { id: 9, title: 'Taxi Home', amount: 300, category: 'Transport', date: daysAgo(3), note: 'Late night' },
  { id: 10, title: 'Course Reading PDF', amount: 250, category: 'Education', date: daysAgo(4), note: '' },
  { id: 11, title: 'Graphic Tee', amount: 680, category: 'Shopping', date: daysAgo(5), note: 'End of season sale' },
  { id: 12, title: 'Game Top-up', amount: 500, category: 'Entertainment', date: daysAgo(6), note: '' },
  { id: 13, title: 'Paracetamol', amount: 90, category: 'Health', date: daysAgo(7), note: 'Cold' },
  { id: 14, title: 'Thali Set', amount: 220, category: 'Food', date: daysAgo(8), note: 'Dinner with roommates' },
  { id: 15, title: 'Monthly Bus Pass', amount: 800, category: 'Transport', date: daysAgo(9), note: '' },
  { id: 16, title: 'Stationery Set', amount: 150, category: 'Education', date: daysAgo(10), note: '' },
  { id: 17, title: 'Grocery Run', amount: 340, category: 'Food', date: daysAgo(11), note: 'Instant noodles, eggs' },
  { id: 18, title: 'Concert Entry', amount: 400, category: 'Entertainment', date: daysAgo(14), note: '' },
  { id: 19, title: 'Phone Case', amount: 350, category: 'Shopping', date: daysAgo(17), note: '' },
  { id: 20, title: 'Doctor Visit', amount: 500, category: 'Health', date: daysAgo(19), note: 'Checkup' },
]

export const DEFAULT_BUDGET = 15000
