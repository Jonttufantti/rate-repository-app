import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = ({ id, first }) => {
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: {
      id,
      first,
    },
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    if (loading || !data?.repository.reviews.pageInfo.hasNextPage) {
      return;
    }
    console.log("Fetching more reviews…");

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        first,
        id,
      },
    });
  };

  return {
    repository: data?.repository,
    loading,
    fetchMore: handleFetchMore,
  };
};

export default useRepository;
