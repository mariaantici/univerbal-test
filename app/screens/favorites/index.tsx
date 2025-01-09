import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MovieScreen from '@/screens/movie';
import TvSeriesScreen from '@/screens/tv-series';

const FavoritesStack = createNativeStackNavigator();

export default function FavoritesScreen(): ReactNode {
  return (
    <FavoritesStack.Navigator
      initialRouteName="FavoritesHome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <FavoritesStack.Screen
        name="FavoritesHome"
        component={FavoritesHomeScreen}
      />
      <FavoritesStack.Screen name="FavoritesMovies" component={MovieScreen} />
      <FavoritesStack.Screen
        name="FavoritesTvSeries"
        component={TvSeriesScreen}
      />
    </FavoritesStack.Navigator>
  );
}

function FavoritesHomeScreen(): ReactNode {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Movies</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
