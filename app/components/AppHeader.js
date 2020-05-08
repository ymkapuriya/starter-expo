import React, { Component } from 'react';
import { StyleSheet } from "react-native";
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import Colors from '_styles/colors';

export default class AppHeader extends Component {
    constructor(props) {
        super(props);        
    }

    render() {
        const { navigation } = this.props;

        return (
            <Header style={styles.header}>
                <Left>
                    {/* Open side drawer */}
                    <Button transparent onPress={() => navigation.openDrawer()}>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.title}>{this.props.title}</Title>
                </Body>
                <Right>
                    {/* Navigate to dashboard */}
                    <Button transparent onPress={() => navigation.navigate('Dashboard')}>
                        <Icon name='home' />
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
    }
});