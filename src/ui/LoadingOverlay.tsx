import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface LoadingOverlayProps {
  message: string;
} 

export const LoadingOverlay = ({ message }: LoadingOverlayProps) => {
  return (
    <View style={ styles.rootContainer }>
      <Text style={ styles.message }>{ message }</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});
