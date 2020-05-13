import React, { Component } from "react";
import { Ionicons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { notifyError } from '_actions/notify.action';

//services
import { ToastService as toast } from '_services/common.service';

//views
import SignInScreen from "_views/auth/SignInScreen";
import SignUpScreen from "_views/auth/SignUpScreen";
import ResetPasswordScreen from "_views/auth/ResetPasswordScreen";
import DashboardScreen from "_views/dashboard/DashboardScreen";
import ProfileScreen from "_views/profile/ProfileScreen";

class LandingScreen extends Component {

    constructor(props) {
        super(props);
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

    componentDidUpdate(prevProps) {
        if (this.props.auth.isSignedIn !== prevProps.auth.isSignedIn) {
            if (this.props.auth.isSignedIn) {
                toast.success("Welcome");
            } else {
                toast.success("Thank you.");
            }
        }
        if (this.props.notify.isError) {
            this.props.notifyError(this.props.notify);
        }
    }

    render() {
        if (this.props.auth.isSignedIn) {
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
                    initialRouteName="SignUp"
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

const mapStateToProps = (state) => {
    console.log("Landing : ", state);
    const { auth, notify } = state;
    return {
        auth,
        notify,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        notifyError: bindActionCreators(notifyError, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen);
