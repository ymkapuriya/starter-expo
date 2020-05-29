import React from 'react'
import { Text, View } from "react-native";
import { TextStyles } from '_styles/global';


export default function FieldDetail(props) {
    return (
        <View>
            <Text style={[TextStyles.label, {textAlign : props.align}]}>
                {props.label}
            </Text>
            <Text style={[TextStyles.value, {textAlign : props.align}]}>
                {props.value}
            </Text>
        </View>
    )
}