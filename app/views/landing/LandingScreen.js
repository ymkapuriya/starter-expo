import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignInScreen from "../auth/SignInScreen";
import SignUpScreen from "../auth/SignUpScreen";
import ResetPasswordScreen from "../auth/ResetPasswordScreen";
import Colors from '_styles/colors';


export default class LandingScreen extends Component {

    /**
     * Set title for spcecifed screen name
     * @param {string} screen 
     */
    setScreenTitle(screen) {
        switch (screen) {
            case 'SignIn':
                return 'Sign In'
            case 'SignUp':
                return 'New User'
            case 'ResetPassword':
                return 'Forgot Password'
        }
    }

    /**
     * Set icon name for specified 
     * @param {string} route 
     * @param {bool} focused 
     */
    setIconName(screen, focused) {
        let iconName;
        switch (screen) {
            case "SignIn":
                iconName = focused ? 'ios-log-in' : 'ios-log-in';
                break;
            case "SignUp":
                iconName = focused ? 'ios-person-add' : 'ios-person-add';
                break;
            case "ResetPassword":
                iconName = focused ? 'ios-unlock' : 'ios-unlock';
                break;
        }
        return iconName;
    }

    render() {

        const Tab = createBottomTabNavigator();

        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    title: this.setScreenTitle(route.name),
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = this.setIconName(route.name, focused);
                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'black',
                    inactiveTintColor: 'gray',
                }}>
                <Tab.Screen name="SignIn" component={SignInScreen} />
                <Tab.Screen name="SignUp" component={SignUpScreen} />
                <Tab.Screen name="ResetPassword" component={ResetPasswordScreen} />
            </Tab.Navigator>
        )
    }
}

const styles = StyleSheet.create({
    top: {
        backgroundColor: Colors.fg,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    title: {
        color: Colors.bg,
    },
    bottom: {
        backgroundColor: Colors.bg
    },
});