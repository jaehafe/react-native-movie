import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from 'open-color';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@types';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import MovieDetailModal from './MovieDetailModal';

interface MovieProps {
  id: number;
  title: string;
  originalTitle: string;
  releaseDate: string;
  overview: string;
  posterUrl?: string | null;
}

export default function Movie({
  id,
  title,
  originalTitle,
  releaseDate,
  overview,
  posterUrl,
}: MovieProps) {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const sharedBottomSheetRef = React.useRef<null | any>(null);
  const snapPointsShared = ['75%'];

  const onPress = () => navigate('Movie', { id });

  const onPresentShared = () => {
    sharedBottomSheetRef.current?.present();
  };

  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.poster}>
          {posterUrl !== null && (
            <Image style={styles.posterImage} source={{ uri: posterUrl }} />
          )}
        </View>
        <View style={styles.info}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.originalTitleText}>{originalTitle}</Text>
          <Text style={styles.releaseDateText}>{releaseDate}</Text>
          <Text style={styles.overViewText}>{overview}</Text>
        </View>
      </TouchableOpacity>

      <BottomSheetModal
        ref={sharedBottomSheetRef}
        snapPoints={snapPointsShared}
        backgroundStyle={{ borderRadius: 50 }}>
        {/* <View>
          <Text>123</Text>
        </View> */}
        <MovieDetailModal />
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    borderColor: Colors.gray[6],
  },
  poster: {
    width: 100,
    height: 150,
    backgroundColor: Colors.gray[3],
  },
  posterImage: {
    width: 100,
    height: 150,
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  titleText: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: 'bold',
  },
  originalTitleText: {
    marginTop: 2,
    fontSize: 16,
    color: Colors.white,
  },
  releaseDateText: {
    marginTop: 2,
    fontSize: 14,
    color: Colors.white,
  },
  overViewText: {
    marginTop: 8,
    fontSize: 12,
    color: Colors.white,
  },
});
