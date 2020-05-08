import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from '_views/landing/LandingScreen';
import HomeScreen from '_views/home/HomeScreen';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      isSignedIn: false,
      token: null,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });

    //check for token
    let token;
    try {
      token = await SecureStore.getItemAsync('token');
      console.log(token);
      if (token) {
        this.setState({
          isSignedIn: true,
          token: token,
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({
        isSignedIn: false,
        token: null
      });
    }
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    const Stack = createStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator>
          {
            this.state.isSignedIn == false ? (
              <Stack.Screen options={{ headerShown: false }} name="Landing" component={LandingScreen} />
            ) : (
                <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
              )
          }
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}