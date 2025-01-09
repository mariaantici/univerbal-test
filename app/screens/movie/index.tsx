import { View, Text } from 'react-native';

type MovieScreenProps = {
  route: any;
};

export default function MovieScreen(props: MovieScreenProps) {
  return (
    <View>
      <Text>favorite movie: {props.route.id}</Text>
    </View>
  );
}
