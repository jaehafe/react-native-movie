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

const Separator = () => <View style={styles.separator} />;

export default function HomeScreen() {
  const { movies, isPending, loadMore, hasNextPage, refresh } = useMovies();

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
              tintColor={Colors.white}
              refreshing={isPending}
              onRefresh={refresh}
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
