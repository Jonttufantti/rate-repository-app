import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 15,
    backgroundColor: theme.colors.textPrimary,
  },
  tab: {
    paddingVertical: 15,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.tab}>
        <Text color="primary" fontWeight="bold">
          Repositories
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
