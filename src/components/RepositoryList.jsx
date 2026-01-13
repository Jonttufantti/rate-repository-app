import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import RepositoryListHeader from "./RepositoryListHeader";

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
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword] = useDebounce(searchKeyword, 500);

  const { repositories, loading, refetch } = useRepositories({
    ...ORDERINGS[order],
    searchKeyword: debouncedKeyword,
  });

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View>
          <RepositoryListHeader
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />

          <Picker
            selectedValue={order}
            onValueChange={(value) => setOrder(value)}
          >
            <Picker.Item label="Latest repositories" value="LATEST" />
            <Picker.Item label="Highest rated repositories" value="HIGHEST" />
            <Picker.Item label="Lowest rated repositories" value="LOWEST" />
          </Picker>
        </View>
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
