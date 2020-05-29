import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-elements';

export default class Card extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                {this.props.title &&
                    <>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Divider style={styles.divider}></Divider>
                    </>
                }
                <View style={styles.content}>
                    {this.props.children}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        alignSelf: "center",
        paddingVertical: 10
    },
    divider : {
        marginBottom: 10,
    },
    content: {
        paddingHorizontal: 10,
        paddingVertical: 10
    }
});

