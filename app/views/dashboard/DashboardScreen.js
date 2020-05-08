import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Content, Grid, Row, Col, H1, Button, Text } from "native-base";
import Colors from '_styles/colors';
import AppHeader from '_components/AppHeader';

export default class DashboardScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <AppHeader title="Dashboard" {...this.props}></AppHeader>
                <Grid>
                    <Row size={100}>
                        <Col style={styles.content}>
                            <H1 style={styles.title}>Dashboard</H1>
                        </Col>
                    </Row>
                </Grid>
            </Container>
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