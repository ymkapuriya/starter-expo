import React, { Component } from 'react';
import { StyleSheet } from 'react-native'
import { Icon, Header, Text } from 'react-native-elements';

import Colors from '_styles/colors';
import SignOutButton from '_components/SignOutButton';

function Left(props) {
    //in case of left action is defined
    if (props.leftAction) {
        return (
            <Icon
                name='ios-arrow-back'
                type='ionicon'
                iconStyle={styles.icon}
                color={Colors.bg}
                onPress={() => props.leftAction()}
            />
        )
    } else {
        return (
            <Icon
                name='menu'
                iconStyle={styles.icon}
                color={Colors.bg}
                onPress={() => props.navigation.openDrawer()}
            />
        )
    }
}

function Right(props) {
    return (
        <>
            {props.rightAction ?
                <Icon
                    name={props.iconName}
                    type={props.iconType}
                    iconStyle={styles.icon}
                    color={Colors.bg}
                    onPress={() => props.rightAction()}
                /> :
                <>
                    <Icon
                        name={props.iconName}
                        type={props.iconType}
                        iconStyle={styles.icon}
                        color={Colors.bg}
                    //onPress={() => navigation.navigate('Dashboard')}
                    />
                    {/*
                <SignOutButton></SignOutButton>
                */}
                </>
            }
        </>
    )
}

export default class AppHeader extends Component {

    constructor(props) {
        super(props);
    }

    centerComponent = () => {
        return (
            <Text style={styles.title}>{this.props.title}</Text>
        )
    }

    render() {
        //derive navigation prop from parent
        const { navigation } = this.props;
        return (
            <Header
                leftComponent={
                    <Left
                        navigation={navigation}
                        leftAction={this.props.leftAction}
                    />
                }
                centerComponent={this.centerComponent}
                rightComponent={
                    <Right
                        rightComponent={this.props.rightAction}
                        {...this.props}
                    />
                }
                backgroundColor={Colors.fg}
                containerStyle={styles.header}
                barStyle="default"
            />
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: 75
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        color: Colors.bg,
    },
    icon: {
        padding: 10,
    }
});