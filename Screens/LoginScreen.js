import React from 'react';
import {View, Text} from 'react-native';
import LoginForm from '../Components/LoginForm';
import {Provider as PaperProvider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleLogin = ({email, password}) => {
    if (email === 'test@test.com' && password === 'password') {
      console.log('Logged in');
      navigation.navigate('Home');
    } else {
      console.log('Invalid email or password');
      // Display an error message to the user
    }

    console.log('Login attempt with email:', email, 'password:', password);
  };

  return (
    <PaperProvider>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 10}}>
          Login
        </Text>
        <LoginForm onSubmit={handleLogin} />
        <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 10}}>
          <Text style={{alignSelf: 'center'}}>
            &copy; 2023, Group 3 - Mobile Programming
          </Text>
        </View>
      </View>
    </PaperProvider>
  );
};

export default LoginScreen;
