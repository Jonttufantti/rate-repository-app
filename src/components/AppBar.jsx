import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 15,
    backgroundColor: theme.colors.textPrimary,
  },
  tabsContainer: {
    flexDirection: 'row',
  },
  tab: {
    paddingVertical: 15,
    marginRight: 20,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.tabsContainer}>
        <Link to="/" component={Pressable}>
          <Text color="textAppbar" fontWeight="bold" style={styles.tab}>
            Repositories
          </Text>
        </Link>

        <Link to="/signin" component={Pressable}>
          <Text color="textAppbar" fontWeight="bold" style={styles.tab}>
            Sign in
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
