import {
  View,
  StyleSheet,
  Image,
  Pressable,
  StyleProp,
  Text,
  ViewStyle,
} from 'react-native';

type PosterProps = {
  title: string;
  src: string;
  onFavoritePress: () => void;
  isFavorite: boolean;
  styles?: StyleProp<ViewStyle>;
};

export function Poster(props: PosterProps) {
  return (
    <View style={[styles.wrapper, styles.wrapper]}>
      {props.onFavoritePress && (
        <Pressable
          style={[
            styles.button,
            props.isFavorite
              ? {
                  backgroundColor: 'yellow',
                }
              : { backgroundColor: 'transparent' },
          ]}
          onPress={props.onFavoritePress}
        >
          <Text>{props.isFavorite ? '-' : '+'}</Text>
        </Pressable>
      )}
      <Image alt={props.title} src={props.src} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  button: {
    borderWidth: 2,
    borderColor: 'yellow',
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
