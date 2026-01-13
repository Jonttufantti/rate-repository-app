import { View, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import theme from "../theme";
import { useMutation, gql } from "@apollo/client/react";
import { useNavigate } from "react-router-native";
import { CREATE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
  container: { padding: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  inputError: { borderColor: "#d73a4a" },
  errorText: { color: "#d73a4a", marginBottom: 10 },
  button: {
    marginTop: 10,
    paddingVertical: 12,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner's username is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(0, "Rating must be at least 0")
    .max(100, "Rating cannot exceed 100"),
  text: yup.string(),
});

const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CREATE_REVIEW);

  const onSubmit = async (values) => {
    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName: values.ownerName,
            repositoryName: values.repositoryName,
            rating: Number(values.rating),
            text: values.text,
          },
        },
      });

      navigate(`/repositories/${data.createReview.repositoryId}`);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          ownerName: "",
          repositoryName: "",
          rating: "",
          text: "",
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <Text>Repository owner's username</Text>
            <TextInput
              style={[
                styles.input,
                touched.ownerName && errors.ownerName && styles.inputError,
              ]}
              onChangeText={handleChange("ownerName")}
              onBlur={handleBlur("ownerName")}
              value={values.ownerName}
            />
            {touched.ownerName && errors.ownerName && (
              <Text style={styles.errorText}>{errors.ownerName}</Text>
            )}

            <Text>Repository name</Text>
            <TextInput
              style={[
                styles.input,
                touched.repositoryName &&
                  errors.repositoryName &&
                  styles.inputError,
              ]}
              onChangeText={handleChange("repositoryName")}
              onBlur={handleBlur("repositoryName")}
              value={values.repositoryName}
            />
            {touched.repositoryName && errors.repositoryName && (
              <Text style={styles.errorText}>{errors.repositoryName}</Text>
            )}

            <Text>Rating (0-100)</Text>
            <TextInput
              style={[
                styles.input,
                touched.rating && errors.rating && styles.inputError,
              ]}
              onChangeText={handleChange("rating")}
              onBlur={handleBlur("rating")}
              value={values.rating}
              keyboardType="numeric"
            />
            {touched.rating && errors.rating && (
              <Text style={styles.errorText}>{errors.rating}</Text>
            )}

            <Text>Review</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("text")}
              onBlur={handleBlur("text")}
              value={values.text}
              multiline
            />

            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Create a review</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ReviewForm;
