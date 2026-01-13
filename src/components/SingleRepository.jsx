import { View } from "react-native";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";

const SingleRepository = () => {
  const { id } = useParams();

  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

  if (loading) return null;

  return (
    <View>
      <RepositoryItem item={data.repository} showGitHubButton />
    </View>
  );
};

export default SingleRepository;
