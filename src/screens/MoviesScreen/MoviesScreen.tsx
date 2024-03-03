import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useMovies from './hooks/useMovies';
import Movie from './Movie';
import Colors from 'open-color';
import { Screen } from 'components/Screen';

import Lottie from 'lottie-react-native';
import { Bell } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@types';

const Separator = () => <View style={styles.separator} />;

export default function HomeScreen() {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const animationRef = React.useRef<Lottie>(null);

  const { movies, isPending, loadMore, hasNextPage, refresh } = useMovies();

  const onRefresh = () => {
    animationRef.current?.play();
    refresh();
  };

  const renderRightComponent = React.useCallback(() => {
    return (
      <View style={styles.headerRightComponent}>
        <TouchableOpacity
          style={styles.alarmButton}
          onPress={() => navigate('Reminders')}>
          <Bell color={Colors.white} />
        </TouchableOpacity>
      </View>
    );
  }, [navigate]);

  return (
    <Screen renderRightComponent={renderRightComponent}>
      {isPending ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.movieList}
          data={movies}
          renderItem={({ item: movie }) => <Movie {...movie} />}
          ItemSeparatorComponent={Separator}
          onEndReached={() => {
            if (hasNextPage) {
              loadMore();
            }
          }}
          refreshControl={
            <RefreshControl
              refreshing={isPending}
              tintColor={'black'}
              onRefresh={onRefresh}
            />
          }
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  movieList: {
    padding: 10,
  },
  separator: {
    height: 16,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRightComponent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alarmButton: {},
  alarmIcon: {
    fontSize: 24,
    color: Colors.white,
  },
  headerLeftComponent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  versionText: {
    color: Colors.white,
  },
});
