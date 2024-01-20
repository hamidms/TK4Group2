import React from 'react';
import {View, Text} from 'react-native';
import LoginForm from '../Components/LoginForm';
import {Provider as PaperProvider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

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

  const handleGoogleLogin = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();
      console.log('User info:', userInfo);
      navigation.navigate('Home');
      // Handle successful login (e.g., store user data, navigate to app)
    } catch (error) {
      console.error('Login error:', error);
      // Handle login errors
    }
  };

  return (
    <PaperProvider>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
            marginTop: 10,
          }}>
          Login
        </Text>
        <LoginForm onSubmit={handleLogin} />
        <GoogleSigninButton
          style={{width: 192, height: 48, marginTop: 20}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleGoogleLogin}
        />
        <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 10}}>
          <Text style={{alignSelf: 'center'}}>
            &copy; 2024, Group 2 - Mobile Programming
          </Text>
        </View>
      </View>
    </PaperProvider>
  );
};

export default LoginScreen;
