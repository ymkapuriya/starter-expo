import React, { Component } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { Text, View, Icon, Grid, Row, Col } from "native-base";

export default function DrawerHeader(props) {
    const user = props.loggedUser;
    return (
        <View style={styles.header}>
            <ImageBackground
                source={
                    require('_assets/images/header-bg.jpg')
                }
                /*
                source={{
                    uri: "https://picsum.photos/300/200"
                }}
                */
                style={styles.background}
                imageStyle={styles.image}
            >
                <View style={styles.textContainer}>
                    <Grid>
                        <Col style={styles.iconCont}>
                            <Icon type='MaterialIcons' name="account-box" style={styles.icon} />
                        </Col>
                        <Col>
                            <Row size={2}>
                                <Text style={styles.title}>{user.name}</Text>
                            </Row>
                            <Row size={1}>
                                <Text style={styles.subtitle}>{user.role}</Text>
                            </Row>
                            <Row size={1}>
                                <Text style={styles.subtitle}>{user.email}</Text>
                            </Row>
                        </Col>
                    </Grid>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 150,
    },
    background: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    image: {
        resizeMode: "stretch"
    },
    textContainer: {
        opacity: 0.7,
        backgroundColor: 'black',
        margin: 20,
        padding: 10,
        flex: 1
    },
    iconCont: {
        width: 50,
    },
    icon: {
        fontSize: 40,
        color: "white"
    },
    title: {
        fontSize: 30,
        color: "white"
    },
    subtitle: {
        color: "white"
    }
});