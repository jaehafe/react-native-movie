import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from 'open-color';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@types';
import { ChevronLeft } from 'lucide-react-native';

interface ScreenProp {
  children?: React.ReactNode;
  title?: string;
  headerVisible?: boolean;
  renderLeftComponent?: () => JSX.Element;
  renderRightComponent?: () => JSX.Element;
}

export function Screen({
  children,
  title,
  headerVisible = true,
  renderLeftComponent,
  renderRightComponent,
}: ScreenProp) {
  const { goBack, canGoBack } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const onPressBackButton = () => goBack();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'}
      />
      {headerVisible && (
        <View style={styles.header}>
          <View style={styles.left}>
            {canGoBack() && (
              <TouchableOpacity
                onPress={onPressBackButton}
                style={styles.goBack}>
                <ChevronLeft size={26} color={Colors.white} />
              </TouchableOpacity>
            )}
            {renderLeftComponent != null && renderLeftComponent()}
          </View>
          <View style={styles.center}>
            <Text style={styles.headerTitle}>{title}</Text>
          </View>
          <View style={styles.right}>
            {renderRightComponent != null && renderRightComponent()}
          </View>
        </View>
      )}

      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[8],
  },
  header: {
    height: 48,
    flexDirection: 'row',
  },
  left: {
    flex: 1,
    justifyContent: 'center',
  },
  center: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
  content: {
    flex: 1,
  },
  subscription: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingVertical: 10,
  },
  subscriptionText: {
    color: Colors.black,
  },
  goBack: {
    marginLeft: 20,
  },
});
