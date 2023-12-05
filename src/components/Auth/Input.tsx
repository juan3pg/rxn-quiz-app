import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../../constants/styles';

interface InputProps {
  label: string,
  keyboardType?: KeyboardTypeOptions | undefined,
  secureTextEntry?: boolean | undefined,
  onChangeText?: ((text: string) => void) | undefined,
  value?: string | undefined,
  isInvalid?: boolean,
}

function Input({
  label,
  keyboardType,
  secureTextEntry,
  onChangeText,
  value,
  isInvalid,
}: InputProps) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: 'white',
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
