import React, { Component } from "react";
import { StyleSheet } from "react-native";

import { createStackNavigator } from '@react-navigation/stack';

import CalenderHome from './CalenderHome'
import CreateEvent from './CreateEvent'

export default class CalenderScreen extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const Stack = createStackNavigator();
        return (
            <>
                <Stack.Navigator initialRouteName="CalenderHome">
                    <Stack.Screen options={{ headerShown: false }} name="CalenderHome" component={CalenderHome} />
                    <Stack.Screen options={{ headerShown: false }} name="CreateEvent" component={CreateEvent} />
                </Stack.Navigator>
            </>
        )
    }
}