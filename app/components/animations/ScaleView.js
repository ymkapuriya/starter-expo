import React, { Component, useEffect, useState } from "react";
import { Animated } from "react-native";

const ScaleView = props => {
    const [width] = useState(new Animated.Value(0)); // Initial value for opacity: 0
    const [height] = useState(new Animated.Value(0)); // Initial value for opacity: 0

    React.useEffect(() => {
        Animated.timing(width, {
            toValue: 100,
            duration: 2000,
        }).start();
        Animated.timing(height, {
            toValue: 100,
            duration: 2000,
        }).start();
    }, []);

    return (
        <Animated.View // Special animatable View
            style={{
                ...props.style,
                width: width, // Bind opacity to animated value
                height: height
            }}>
            {props.children}
        </Animated.View>
    );
};

export default ScaleView;