import React from 'react';
import { Root } from "native-base";
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from '_navigations/RootNavigation';

import LandingScreen from '_views/landing/LandingScreen';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });    
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    const Stack = createStackNavigator();

    return (
      <Root>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Landing" component={LandingScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    );
  }
}