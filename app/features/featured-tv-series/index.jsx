import { Poster } from '@/ui/poster';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { featuredTvSeries$ } from './state';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Rating } from '@/ui/rating';

export function FeaturedTvSeries() {
  const [featuredTvSeries] = useAtom(featuredTvSeries$);

  return (
    <View style={featuredTvSeriesStyles.root}>
      <Text style={featuredTvSeriesStyles.title}>Featured Tv Series</Text>
      <FlatList
        style={featuredTvSeriesStyles.list}
        horizontal
        data={featuredTvSeries}
        keyExtractor={(it) => it.id}
        renderItem={(it) => {
          console.log(it.item.rating);
          return (
            <Entry
              title={it.item.title}
              rating={it.item.rating}
              seasons={it.item.seasons}
            />
          );
        }}
      />
    </View>
  );
}

const featuredTvSeriesStyles = StyleSheet.create({
  root: {
    backgroundColor: 'pink',
  },

  title: {
    marginBottom: 20,
  },

  list: {
    backgroundColor: 'red',
  },
});

function Entry(props) {
  console.log(props.title);
  return (
    <View style={entryStyles.root}>
      <View style={entryStyles.overlay}>
        <Text style={entryStyles.text}>{props.title}</Text>
        <Rating style={entryStyles.text} value={props.rating} />
        <Text style={entryStyles.text}>seasons: {props.seasons.length}</Text>
      </View>
      <Poster
        title={props.title}
        style={entryStyles.poster}
        src={
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/2560px-Image_created_with_a_mobile_phone.png'
        }
      />
    </View>
  );
}

const entryStyles = StyleSheet.create({
  root: {
    height: 200,
    aspectRatio: 1 / 2,
    backgroundColor: 'blue',
    borderWidth: 2,
    borderColor: 'yellow',
    position: 'relative',
  },

  overlay: {
    position: 'absolute',
    backgroundColor: 'black',
    zIndex: 1,
    width: '100%',
    height: '50%',
    bottom: 0,
    justifyContent: 'flex-start',
  },

  text: {
    color: 'white',
  },
});
