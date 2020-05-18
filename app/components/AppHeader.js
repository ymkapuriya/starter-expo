import React, { Component } from 'react';
import { StyleSheet } from 'react-native'
import { Icon, Header, Text } from 'react-native-elements';

import Colors from '_styles/colors';
import SignOutButton from '_components/SignOutButton';

function Left(props) {
    return (
        <Icon
            name='menu'
            iconStyle={styles.icon}
            color={Colors.bg}
            onPress={() => props.navigation.openDrawer()}
        />
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

    rightComponent = (navigation) => {
        return (
            <>
                <Icon
                    name={this.props.iconName}
                    type={this.props.iconType}
                    iconStyle={styles.icon}
                    color={Colors.bg}
                    onPress={() => navigation.navigate('Dashboard')}
                />
                {/*
                <SignOutButton></SignOutButton>
                */}
            </>
        )
    }

    render() {
        //derive navigation prop from parent
        const { navigation } = this.props;
        return (
            <Header
                leftComponent={<Left navigation={navigation} />}
                centerComponent={this.centerComponent}
                rightComponent={this.rightComponent(navigation)}
                backgroundColor={Colors.fg}
                containerStyle={{ height: 75 }}
                barStyle="default"
            />
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.fg
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        color: Colors.bg,
    },
    icon: {
        padding: 5,
    }
});