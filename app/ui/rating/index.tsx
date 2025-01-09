import { Text, View } from 'react-native';

export function Rating({ value, max = 100 }: any) {
  return (
    <View>
      <Text>{(value / max) * 100}%</Text>
    </View>
  );
}
