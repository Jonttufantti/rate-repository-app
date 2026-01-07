import { View, StyleSheet, TextInput, Button } from 'react-native';
import { Formik } from 'formik';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
  },
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <Text>Username</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              autoCapitalize="none"
            />

            <Text>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />

            <Button title="Sign in" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;
