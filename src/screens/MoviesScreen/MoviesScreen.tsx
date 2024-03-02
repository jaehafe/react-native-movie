import * as React from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import useMovies from './hooks/useMovies';
import Movie from './Movie';
import Colors from 'open-color';

export default function HomeScreen() {
  const { movies } = useMovies();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'}
      />
      <FlatList
        contentContainerStyle={styles.movieList}
        data={movies}
        renderItem={({ item: movie }) => {
          const { title, originalTitle, releaseDate, overview, posterUrl } =
            movie;
          return <Movie {...movie} />;
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
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
});
