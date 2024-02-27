import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MovieProps {
  title: string;
  originalTitle: string;
  releaseDate: string;
  overview: string;
  postUrl?: string;
}

export default function Movie({
  title,
  originalTitle,
  releaseDate,
  overview,
  postUrl,
}: MovieProps) {
  return (
    <View style={styles.container}>
      <View style={styles.poster}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  poster: {},
});
