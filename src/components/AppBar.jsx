import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import Constants from "expo-constants";
import { Link, useNavigate } from "react-router-native";
import { useQuery, useApolloClient } from "@apollo/client/react";
import Text from "./Text";
import theme from "../theme";
import useAuthStorage from "../hooks/useAuthStorage";
import { ME } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 15,
    backgroundColor: theme.colors.textPrimary,
  },
  tabsContainer: {
    flexDirection: "row",
  },
  tab: {
    paddingVertical: 15,
    marginRight: 20,
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const { data } = useQuery(ME);
  const isAuthenticated = !!data?.me;

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate("/");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.tabsContainer}>
        <Link to="/" component={Pressable}>
          <Text color="textAppbar" fontWeight="bold" style={styles.tab}>
            Repositories
          </Text>
        </Link>

        {isAuthenticated && (
          <Link to="/create-review" component={Pressable}>
            <Text color="textAppbar" fontWeight="bold" style={styles.tab}>
              Create a review
            </Text>
          </Link>
        )}

        {isAuthenticated ? (
          <Pressable onPress={handleSignOut}>
            <Text color="textAppbar" fontWeight="bold" style={styles.tab}>
              Sign out
            </Text>
          </Pressable>
        ) : (
          <Link to="/signin" component={Pressable}>
            <Text color="textAppbar" fontWeight="bold" style={styles.tab}>
              Sign in
            </Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
