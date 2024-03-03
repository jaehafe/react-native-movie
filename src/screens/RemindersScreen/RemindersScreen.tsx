import { Screen } from 'components/Screen';
import useReminder from 'hooks/useReminder';
import * as React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from 'open-color';
import dayjs from 'dayjs';
import { BellOff } from 'lucide-react-native';

function Separator() {
  return <View style={styles.separator} />;
}

export default function ReminderScreen() {
  const { reminders, removeReminder } = useReminder();

  console.log('reminders::', reminders);

  const onRemoveReminder = (reminderId: string | undefined) => {
    if (reminderId != null) {
      removeReminder(reminderId);
    }
  };

  return (
    <Screen>
      <FlatList
        contentContainerStyle={styles.reminderList}
        data={reminders}
        renderItem={({ item: reminder }) => {
          return (
            <View style={styles.reminderItem}>
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>
                  {reminder.notification.body}
                </Text>
                {'timestamp' in reminder.trigger && (
                  <Text style={styles.timestampText}>
                    {dayjs(reminder.trigger.timestamp).format('YYYY-MM-DD')}
                  </Text>
                )}
              </View>
              <View style={styles.removeReminderContainer}>
                <TouchableOpacity
                  onPress={() => onRemoveReminder(reminder.notification.id)}>
                  <BellOff color={Colors.white} />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        ItemSeparatorComponent={Separator}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  reminderList: {
    padding: 20,
  },
  reminderItem: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    borderColor: Colors.gray[6],
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: 'bold',
  },
  bodyText: {
    marginTop: 2,
    fontSize: 14,
    color: Colors.white,
  },
  timestampText: {
    marginTop: 2,
    fontSize: 14,
    color: Colors.white,
  },
  separator: {
    height: 8,
  },
  removeReminderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeReminderIcon: {
    color: Colors.white,
    fontSize: 24,
  },
});
