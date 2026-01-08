import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useState, useEffect } from "react";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [repositories, setRepositories] = useState({ edges: [] });
  const [loading, setLoading] = useState(true);

  const fetchRepositories = async () => {
    try {
      const response = await fetch("http://10.0.2.2:5000/api/repositories");
      const json = await response.json();
      setRepositories(json);
    } catch (error) {
      console.error("Failed to fetch repositories:", error);
    }
  };

  useEffect(() => {
    fetchRepositories().finally(() => setLoading(false));
  }, []);

  const repositoryNodes = repositories.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryList;
