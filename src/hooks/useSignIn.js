import { useMutation, useApolloClient } from "@apollo/client/react";
import { useNavigate } from "react-router-native";
import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        credentials: { username, password },
      },
    });

    const accessToken = data.authenticate.accessToken;

    await authStorage.setAccessToken(accessToken);
    await apolloClient.resetStore();

    navigate("/");
  };

  return [signIn, result];
};

export default useSignIn;
