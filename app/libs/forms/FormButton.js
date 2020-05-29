import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';

/**
 * A stateless function component which renders a button.
 *
 * @param {obj} props
 */
const FormButton = (props) => {
    const { children, onPress, disabled, iconName, iconType } = props;
    
    return (
        <Button
            type={props.type ? props.type : "solid"}
            title={children}
            buttonStyle={[styles.button, disabled && styles.buttonDisabled]}
            onPress={onPress}
            disabled={disabled}
        />
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
        minWidth: 100
    },
    buttonText: {
        fontSize: 16,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
});

export default FormButton;