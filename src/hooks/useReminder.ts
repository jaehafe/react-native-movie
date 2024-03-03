import * as React from 'react';
import { Platform } from 'react-native';

import dayjs from 'dayjs';
import notifee, {
  AndroidImportance,
  AndroidNotificationSetting,
  AuthorizationStatus,
  TimestampTrigger,
  TriggerNotification,
  TriggerType,
} from '@notifee/react-native';

interface AddReminderParams {
  movieId: number;
  releaseDate: string;
  title: string;
}

export default function useReminder() {
  const [channelId, setChannelId] = React.useState<string | null>(null);
  const [reminders, setReminders] = React.useState<TriggerNotification[]>([]);

  React.useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        const id = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
          importance: AndroidImportance.HIGH,
        });

        setChannelId(id);
      } else {
        setChannelId('ios-fake-channel-id');
      }
    })();
  }, []);

  const loadReminders = React.useCallback(async () => {
    const notifications = await notifee.getTriggerNotifications();
    setReminders(notifications);
  }, []);

  const addReminder = React.useCallback(
    async ({ movieId, releaseDate, title }: AddReminderParams) => {
      const settings = await notifee.requestPermission();

      if (settings.authorizationStatus < AuthorizationStatus.AUTHORIZED) {
        throw new Error('Permission is denied');
      }

      if (Platform.OS === 'android') {
        if (settings.android.alarm !== AndroidNotificationSetting.ENABLED) {
          throw new Error('Please allow alarms and reminder on settings');
        }
      }

      if (channelId == null) {
        throw new Error('Channel is not created');
      }

      // Create a time-based trigger

      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: dayjs(releaseDate).valueOf(),
        // timestamp: dayjs().add(5, 'seconds').valueOf(), // 가까운 시간으로 시간 test
      };

      // Create a trigger notification
      await notifee.createTriggerNotification(
        {
          id: `${movieId}`,
          title: '영화 개봉일 알림',
          body: title,
          android: { channelId },
        },
        trigger,
      );

      await loadReminders();
    },

    [channelId, loadReminders],
  );

  React.useEffect(() => {
    loadReminders();
  }, [loadReminders]);

  const removeReminder = React.useCallback(
    async (id: string) => {
      await notifee.cancelTriggerNotification(id);
      await loadReminders();
    },
    [loadReminders],
  );

  const hasReminder = React.useCallback(
    (id: string) => {
      const reminder = reminders.find(r => r.notification.id === id);
      return reminder != null;
    },
    [reminders],
  );

  return { reminders, addReminder, removeReminder, hasReminder };
}
