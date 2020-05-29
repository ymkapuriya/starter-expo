import React from "react";
import { ActivityIndicator, StyleSheet, View, Image } from "react-native";
import { Text } from 'react-native-elements';

export default function Loading(props) {
    const { title, subtitle } = props
    return (
        <View style={styles.container}>
            <View style={styles.horizontal}>
                <Image
                    source={
                        require('_assets/icon.png')
                    }
                    style={styles.logo}
                    containerStyle={styles.logoCont}
                />
                <ActivityIndicator size="large" color="#636363" />
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        justifyContent: "center",
        padding: 10,
        alignItems: "center"
    },
    logoCont: {
        paddingVertical: 20
    },
    logo: {
        width: 100,
        height: 100,
        opacity: 0.5,
        marginVertical: 10
    },
    title: {
        marginVertical: 20,
        fontFamily: "Montserrat",
        fontSize: 20
    },
    subtitle: {
        marginVertical: 20,
        fontFamily: "Montserrat",
        fontSize: 16
    }
});
