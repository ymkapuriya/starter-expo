import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Icon } from "native-base";
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
            <Button transparent onPress={() => this.handleSignOut()}>
                <Icon name='log-out' style={styles.title} />
            </Button>
        );
    }
}

const styles = StyleSheet.create({
    title : {
        fontWeight: "600",
        color: Colors.bg,
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
