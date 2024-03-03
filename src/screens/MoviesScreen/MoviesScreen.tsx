import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import useMovies from './hooks/useMovies';
import Movie from './Movie';
import Colors from 'open-color';
import { Screen } from 'components/Screen';

import Lottie from 'lottie-react-native';

const Separator = () => <View style={styles.separator} />;

export default function HomeScreen() {
  const animationRef = React.useRef<Lottie>(null);

  const { movies, isPending, loadMore, hasNextPage, refresh } = useMovies();

  const onRefresh = () => {
    animationRef.current?.play();
    refresh();
  };

  return (
    <Screen headerVisible={false}>
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
});
