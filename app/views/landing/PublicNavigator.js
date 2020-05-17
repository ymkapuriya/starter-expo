import React from "react";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//views
import SignInScreen from "_views/auth/SignInScreen";
import SignUpScreen from "_views/auth/SignUpScreen";
import ResetPasswordScreen from "_views/auth/ResetPasswordScreen";
import GoogleScreen from "_views/auth/GoogleScreen";
import FacebookScreen from "_views/auth/FacebookScreen";
import FirebaseScreen from "_views/auth/FirebaseScreen";

/**
 * Set title for spcecifed screen name
 * @param {string} screen 
 */
function setScreenTitle(screen) {
    switch (screen) {
        case 'SignIn':
            return 'Sign In'
        case 'SignUp':
            return 'New User'
        case 'ResetPassword':
            return 'Reset'
        case 'Google':
            return 'SignIn'
        case 'Facebook':
            return 'SignIn'
        case 'Firebase':
            return 'Auth'
    }
}

/**
 * Set icon name for specified 
 * @param {string} route 
 * @param {bool} focused 
 */
function setIconName(screen, focused) {
    let iconName;
    let iconType = 'Ionicons';
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
        case "Google":
            iconName = focused ? 'logo-google' : 'logo-google';
            break;
        case "Facebook":
            iconName = focused ? 'logo-facebook' : 'logo-facebook';
            break;
        case "Firebase":
            iconType = 'MaterialCommunityIcons';
            iconName = focused ? 'firebase' : 'firebase';
            break;
    }
    return { iconName, iconType };
}

const PublicNavigator = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            initialRouteName="SignIn"
            screenOptions={({ route }) => ({
                title: setScreenTitle(route.name),
                tabBarIcon: ({ focused, color, size }) => {
                    let { iconName, iconType } = setIconName(route.name, focused);
                    // You can return any component that you like here!
                    switch (iconType) {
                        case 'Ionicons':
                            return <Ionicons name={iconName} size={size} color={color} />;
                        case 'MaterialCommunityIcons':
                            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    }
                },
            })}
            tabBarOptions={{
                activeTintColor: 'black',
                inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="SignIn" component={SignInScreen} />
            <Tab.Screen name="SignUp" component={SignUpScreen} />
            <Tab.Screen name="ResetPassword" component={ResetPasswordScreen} />
            <Tab.Screen name="Google" component={GoogleScreen} />
            <Tab.Screen name="Facebook" component={FacebookScreen} />
            <Tab.Screen name="Firebase" component={FirebaseScreen} />
        </Tab.Navigator>
    )
};

export default PublicNavigator;