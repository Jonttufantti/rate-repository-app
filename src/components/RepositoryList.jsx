import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ORDERINGS = {
  LATEST: {
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  },
  HIGHEST: {
    orderBy: "RATING_AVERAGE",
    orderDirection: "DESC",
  },
  LOWEST: {
    orderBy: "RATING_AVERAGE",
    orderDirection: "ASC",
  },
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState("LATEST");

  const { repositories, loading, refetch } = useRepositories(ORDERINGS[order]);

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <Picker
          selectedValue={order}
          onValueChange={(value) => setOrder(value)}
        >
          <Picker.Item label="Latest repositories" value="LATEST" />
          <Picker.Item label="Highest rated repositories" value="HIGHEST" />
          <Picker.Item label="Lowest rated repositories" value="LOWEST" />
        </Picker>
      }
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      ItemSeparatorComponent={ItemSeparator}
      onRefresh={refetch}
      refreshing={loading}
    />
  );
};

export default RepositoryList;
