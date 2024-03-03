import * as React from 'react';
import notifee, {
  AndroidImportance,
  AndroidNotificationSetting,
  AuthorizationStatus,
  TimestampTrigger,
  TriggerNotification,
  TriggerType,
} from '@notifee/react-native';
import { Platform } from 'react-native';
import dayjs from 'dayjs';

interface AddReminderParams {
  movieId: number;
  releaseDate: string;
  title: string;
}

export default function useReminder() {
  const [channelId, setChannelId] = React.useState<string | null>(null);

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
    },
    [channelId],
  );

  const [reminders, setReminders] = React.useState<TriggerNotification[]>([]);

  const loadReminders = React.useCallback(async () => {
    return await notifee.getTriggerNotifications();
  }, []);

  React.useEffect(() => {
    (async () => {
      const notifications = await loadReminders();
      setReminders(notifications);
    })();
  }, [loadReminders]);

  return { addReminder, reminders };
}
