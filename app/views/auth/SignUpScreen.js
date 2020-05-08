import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Grid, Row, Col, Card, CardItem, Text, H1 } from "native-base";
import Colors from '_styles/colors';

export default class SignUpScreen extends Component {
    render() {
        return (
            <Container>
                <Grid>
                    <Row size={100}>
                        <Col style={styles.background}>
                            <Card transparent>
                                <CardItem>
                                    <Text>
                                        Sign Up!
                                    </Text>
                                </CardItem>
                            </Card>
                        </Col>
                    </Row>
                </Grid>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: Colors.fg,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});