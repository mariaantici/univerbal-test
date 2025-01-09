import React, { ReactNode, useRef } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  Text,
} from 'react-native';
import { inputValue$, suggestions$ } from './state';
import { useAtom, useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';

export type SearchProps = {
  style?: StyleProp<ViewStyle>;
};

export function Search({ style }: SearchProps): ReactNode {
  const inputRef = useRef<TextInput>(null);
  const [inputValue, setInputValue] = useAtom(inputValue$);
  const suggestions = useAtomValue(loadable(suggestions$));

  return (
    <View style={[searchStyles.root, style]}>
      <TextInput
        ref={inputRef}
        style={{ height: 40, borderColor: 'red', borderWidth: 2 }}
        placeholder="type to search..."
        onChangeText={setInputValue}
        value={inputValue}
      />

      {!inputValue ? null : (
        <View style={searchStyles.suggestions}>
          {suggestions.state !== 'hasData'
            ? null
            : suggestions.data.map((it) => (
                <View style={searchStyles.suggestionEntry}>
                  <Text>{it.title}</Text>
                </View>
              ))}
        </View>
      )}
    </View>
  );
}

const searchStyles = StyleSheet.create({
  root: {},

  input: {},

  suggestions: {
    width: '100%',
    position: 'relative', // Change to relative
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'yellow',
    marginTop: 5, // Add space below the input
  },

  suggestionEntry: {},
});
