import { View, StyleSheet, Pressable, Alert } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { format } from "date-fns";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client/react";
import { DELETE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
  container: { flexDirection: "row", padding: 15, backgroundColor: "white" },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  content: { flex: 1 },
  username: { fontWeight: "bold", marginBottom: 4 },
  date: { color: theme.colors.textSecondary, marginBottom: 4 },
  text: {},
  actions: { flexDirection: "row", marginTop: 10 },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 8,
    marginRight: 10,
    borderRadius: 5,
  },
  buttonText: { color: "white", fontWeight: "bold" },
});

const ReviewItem = ({ review, refetchReviews }) => {
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDelete = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteReview({ variables: { id: review.id } });
            refetchReviews();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text color={theme.colors.primary}>{review.rating}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.username}>
          {review.user?.username || "Unknown"}
        </Text>
        <Text style={styles.date}>
          {format(new Date(review.createdAt), "dd.MM.yyyy")}
        </Text>
        <Text style={styles.text}>{review.text}</Text>

        <View style={styles.actions}>
          <Pressable
            style={styles.button}
            onPress={() => navigate(`/repositories/${review.repository.id}`)}
          >
            <Text style={styles.buttonText}>View repository</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete review</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
