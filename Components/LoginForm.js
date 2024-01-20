import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Provider as PaperProvider,
  Text,
  Button,
  TextInput,
  Card,
} from 'react-native-paper';

const LoginForm = ({onSubmit}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = () => {
    onSubmit({email, password});
  };

  return (
    <Card style={styles.container}>
      <TextInput
        label="Email"
        mode="outlined"
        dense
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        dense
        value={password}
        onChangeText={setPassword}
      />
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Login
      </Button>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    padding: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default LoginForm;
