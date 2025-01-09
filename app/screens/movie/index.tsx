import { View, Text } from 'react-native';
import { Movie } from '@/../domain/movie';

type MovieScreenProps = {
  route: {
    params: {
      movie: Movie; // Pass the entire movie object as a route parameter
    };
  };
};

export default function MovieScreen({ route }: MovieScreenProps): JSX.Element {
  const { movie } = route.params;

  return (
    <View>
      <Text>ID: {movie.id}</Text>
      <Text>Title: {movie.title}</Text>
      <Text>Director: {movie.director}</Text>
      <Text>Release Year: {movie.releaseYear}</Text>
      <Text>Genres: {movie.genres.join(', ')}</Text>
      <Text>Rating: {movie.rating}</Text>
      <Text>Runtime: {movie.runtimeMinutes} minutes</Text>
    </View>
  );
}
