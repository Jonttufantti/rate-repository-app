import { View, StyleSheet, TextInput, Pressable } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: { padding: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
    paddingVertical: 12,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    alignItems: "center",
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const SignInContainer = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View>
            <TextInput
              testID="usernameField"
              value={values.username}
              onChangeText={handleChange("username")}
            />
            <TextInput
              testID="passwordField"
              value={values.password}
              onChangeText={handleChange("password")}
              secureTextEntry
            />
            <Pressable testID="submitButton" onPress={handleSubmit}>
              <Text>Sign in</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignInContainer;
