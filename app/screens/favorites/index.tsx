import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type ReactNode, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
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
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching favorite movies and TV series
    const fetchFavorites = async () => {
      const favoriteData = [
        { id: '1', title: 'Inception', type: 'movie' },
        { id: '2', title: 'Breaking Bad', type: 'tv-series' },
        { id: '3', title: 'The Dark Knight', type: 'movie' },
      ];
      setFavorites(favoriteData);
    };

    fetchFavorites();
  }, []);

  const handleUnfavorite = (id: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== id),
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemType}>
          {item.type === 'movie' ? 'Movie' : 'TV Series'}
        </Text>
      </View>
      <Pressable
        onPress={() => handleUnfavorite(item.id)}
        style={styles.iconButton}
      >
        <FontAwesome5 name="heart-broken" size={24} color="#ff6b6b" />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Movies & TV Series</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
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
    marginBottom: 24,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemType: {
    fontSize: 14,
    color: '#555',
  },
  iconButton: {
    padding: 8,
  },
  separator: {
    height: 8,
  },
});
