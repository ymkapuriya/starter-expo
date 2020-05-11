import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Button, Text, Icon } from 'native-base';

/**
 * A stateless function component which renders a button.
 *
 * @param {obj} props
 */
const FormButton = (props) => {
    const { children, onPress, disabled, iconName, iconType } = props;

    return (
        <Button
            bordered
            iconLeft
            style={[styles.button, disabled && styles.buttonDisabled]}
            onPress={onPress}
            disabled={disabled}
        >
            <Icon name={iconName} type={iconType}></Icon>
            <Text style={styles.buttonText}>{children}</Text>
        </Button>
    );
};

FormButton.propTypes = {
    onPress: PropTypes.func,
    children: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
};

FormButton.defaultProps = {
    onPress: f => f,
    disabled: false,
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
});

export default FormButton;