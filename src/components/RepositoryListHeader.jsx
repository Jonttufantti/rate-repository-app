import { View, TextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 10,
    borderRadius: 5,
  },
});

const RepositoryListHeader = ({ searchKeyword, setSearchKeyword }) => (
  <View>
    <TextInput
      style={styles.input}
      placeholder="Search repositories"
      value={searchKeyword}
      onChangeText={setSearchKeyword}
    />
  </View>
);

export default RepositoryListHeader;
