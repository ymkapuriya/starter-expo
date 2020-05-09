import React, { Component } from 'react';
import { StyleSheet } from "react-native";
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import * as RootNavigation from '_navigations/RootNavigation';

import Colors from '_styles/colors';
import { authService as auth } from '_services/auth';
import { ToastService as toast } from '_services/common';

export default class AppHeader extends Component {
    constructor(props) {
        super(props);        
    }

    /**
     * Logout
     */
    async signOut() {
        try {
            await auth.logout();
            toast.success('Successful Logout');

            //redirect to home
            RootNavigation.navigate('Landing');
        } catch (error) {
            toast.error(error);
        }
    }

    render() {
        const { navigation } = this.props;

        return (
            <Header style={styles.header}>
                <Left>
                    {/* Open side drawer */}
                    <Button transparent onPress={() => navigation.openDrawer()}>
                        <Icon name='menu' style={styles.title} />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.title}>{this.props.title}</Title>
                </Body>
                <Right>
                    {/* Navigate to dashboard */}
                    <Button transparent onPress={() => navigation.navigate('Dashboard')}>
                        <Icon name='home' style={styles.title} />
                    </Button>
                    <Button transparent onPress={() => this.signOut()}>
                        <Icon name='log-out' style={styles.title} />
                    </Button>
                </Right>
            </Header>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.fg
    },
    title : {
        fontWeight: "600",
        color: Colors.bg,
    }
});