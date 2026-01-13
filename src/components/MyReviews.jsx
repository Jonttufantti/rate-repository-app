import { FlatList } from "react-native";
import { useQuery } from "@apollo/client/react";
import { ME } from "../graphql/queries";
import ReviewItem from "./ReviewItem";

const MyReviews = () => {
  const { data, loading, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return null;

  const reviews = data?.me?.reviews?.edges?.map((e) => e.node) ?? [];

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ReviewItem review={item} refetchReviews={refetch} />
      )}
    />
  );
};

export default MyReviews;
