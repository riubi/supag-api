export interface INotification {
  id: number;
  title: string;
  body: string;
  isRead: boolean;
  date: Date;
}

export interface INotificationSubscription {
  exporterId: number;
  name: string;
  isSubscribed: boolean;
}
