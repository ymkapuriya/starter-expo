import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';

import DashboardScreen from "../dashboard/DashboardScreen";
import ProfileScreen from "../profile/ProfileScreen";

import Colors from '_styles/colors';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        const Drawer = createDrawerNavigator();

        return (
            <Drawer.Navigator initialRouteName="Dashboard">
                <Drawer.Screen name="Dashboard" component={DashboardScreen} />
                <Drawer.Screen name="Profile" component={ProfileScreen} />
            </Drawer.Navigator>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: Colors.bg,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    title: {
        color: Colors.fg,
    }
});