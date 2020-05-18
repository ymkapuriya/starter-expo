import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Text, Icon } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";

import Colors from '_styles/colors';
import AppHeader from '_components/AppHeader';

export default class DashboardScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <AppHeader
                    title="Dashboard"
                    iconName="view-dashboard"
                    iconType="material-community"
                    {...this.props}
                />
                <Grid>
                    <Row size={100}>
                        <Col style={styles.content}>
                            <Text h4 h4Style={styles.title}>Dashboard</Text>
                        </Col>
                    </Row>
                </Grid>
            </>
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