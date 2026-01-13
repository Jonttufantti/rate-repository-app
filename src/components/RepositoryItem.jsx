import { View, StyleSheet, Image, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    marginBottom: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 15,
  },
  language: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.primary,
    color: "white",
    padding: 4,
    borderRadius: 4,
    marginTop: 6,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  statItem: {
    alignItems: "center",
  },
});

const formatCount = (value) =>
  value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value;

const RepositoryItem = ({ item, showGitHubButton = false }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />

        <View style={{ flex: 1 }}>
          <Text fontWeight="bold" fontSize="subheading">
            {item.fullName}
          </Text>

          <Text color="textSecondary">{item.description}</Text>

          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatCount(item.stargazersCount)}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>

        <View style={styles.statItem}>
          <Text fontWeight="bold">{formatCount(item.forksCount)}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>

        <View style={styles.statItem}>
          <Text fontWeight="bold">{item.reviewCount}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>

        <View style={styles.statItem}>
          <Text fontWeight="bold">{item.ratingAverage}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>

      {showGitHubButton && (
        <Pressable
          style={{
            marginTop: 15,
            padding: 12,
            backgroundColor: theme.colors.primary,
            borderRadius: 5,
            alignItems: "center",
          }}
          onPress={() => Linking.openURL(item.url)}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Open in GitHub
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
