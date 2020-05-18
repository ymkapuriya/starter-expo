import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import Colors from '_styles/colors';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { signOut } from '_actions/auth.action';

import * as RootNavigation from '_navigations/RootNavigation';

class SignOutButton extends Component {

    constructor(props) {
        super(props);
    }

    handleSignOut = () => {
        this.props.signOut();
        RootNavigation.navigate('Landing');
    }

    render() {
        return (
            <Icon
                name='logout'
                type='material-community'
                iconStyle={styles.title}
                color={Colors.bg}
                onPress={() => this.handleSignOut()}
            />
        );
    }
}

const styles = StyleSheet.create({
    title: {
        padding: 5,
    }
});

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: bindActionCreators(signOut, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOutButton);
