import * as React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import useMovies from './hooks/useMovies';
import Movie from './Movie';

export default function HomeScreen() {
  const { movies } = useMovies();

  return (
    <SafeAreaView>
      <FlatList
        style={styles.movieList}
        data={movies}
        renderItem={({ item: movie }) => {
          const { title, originalTitle, releaseDate, overview, posterUrl } =
            movie;
          return <Movie {...movie} />;
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  movieList: {},
});
