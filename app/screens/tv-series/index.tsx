import { View, Text } from 'react-native';
import { TVSeries } from '@/../domain/tv-series';

type TvSeriesScreenProps = {
  route: {
    params: {
      tvSeries: TVSeries; // Pass the entire TV series object as a route parameter
    };
  };
};

export default function TvSeriesScreen({
  route,
}: TvSeriesScreenProps): JSX.Element {
  const { tvSeries } = route.params;

  return (
    <View>
      <Text>ID: {tvSeries.id}</Text>
      <Text>Title: {tvSeries.title}</Text>
      <Text>Creator: {tvSeries.creator}</Text>
      <Text>Release Year: {tvSeries.releaseYear}</Text>
      <Text>Genres: {tvSeries.genres.join(', ')}</Text>
      <Text>Rating: {tvSeries.rating}</Text>
      <Text>Seasons: {tvSeries.seasons.length}</Text>
      {tvSeries.seasons.map((season, index) => (
        <View key={season.seasonId}>
          <Text>
            Season {index + 1} ({season.releaseYear})
          </Text>
          <Text>Episodes: {season.episodes.length}</Text>
        </View>
      ))}
    </View>
  );
}
