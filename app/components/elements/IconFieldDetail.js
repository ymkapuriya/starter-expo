import React from 'react'
import { StyleSheet } from "react-native";

import { Text, View } from "react-native";
import { TextStyles } from '_styles/global';
import { Icon } from 'react-native-elements';

export default function IconFieldDetail(props) {
    return (
        <View style={styles.container}>
            <Icon
                name={props.iconName}
                type={props.iconType}
                color={props.iconColor ? props.iconColor : "black"}
                size={props.iconSize ? props.iconSize : 24}
                containerStyle={styles.iconCont}
            />
            <View>
                <Text style={[TextStyles.label, { textAlign: props.align }]}>
                    {props.label}
                </Text>
                <Text style={[TextStyles.value, { textAlign: props.align }]}>
                    {props.value}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 10
    },
    iconCont: {
        justifyContent: "center",
        paddingRight: 15
    }
});