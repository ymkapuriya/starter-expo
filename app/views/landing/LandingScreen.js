import React, { Component } from "react";
import { Ionicons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SignInScreen from "../auth/SignInScreen";
import SignUpScreen from "../auth/SignUpScreen";
import ResetPasswordScreen from "../auth/ResetPasswordScreen";
import DashboardScreen from "../dashboard/DashboardScreen";
import ProfileScreen from "../profile/ProfileScreen";

import { authService as auth } from '_services/auth';

export default class LandingScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            token: null,
        };
    }

    async componentDidMount() {
        //check whether user is logged in or not
        try {
            token = await auth.getToken();
            this.setState({
                isSignedIn: true,
                token: token,
            });
        } catch (error) {
            this.setState({
                isSignedIn: false,
                token: null
            });
        }
        console.log(token);
    }

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
        if (this.state.isSignedIn) {
            //Protected view

            const Drawer = createDrawerNavigator();
            return (
                <Drawer.Navigator initialRouteName="Dashboard">
                    <Drawer.Screen name="Dashboard" component={DashboardScreen} />
                    <Drawer.Screen name="Profile" component={ProfileScreen} />
                </Drawer.Navigator>
            )
        } else {
            //Public view

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
}