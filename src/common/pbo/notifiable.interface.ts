// Abstraction: pemakai cukup bergantung pada kontrak notifikasi.
export interface Notifiable {
  sendNotification(message: string): Promise<void>;
}
