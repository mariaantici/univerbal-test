import { Button as RNB } from 'react-native';

export const Button: React.FC<{
  title: string;
  onPress?: () => void;
}> = ({ title, onPress }) => {
  return <RNB title={title} onPress={onPress} />;
};
