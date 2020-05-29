import React from 'react';
import PropTypes from 'prop-types';
import {
    View, TextInput, Text, StyleSheet,
} from 'react-native';

/**
 * A component which renders a TextInput with a label above it.
 * Note: This component can easily be written as a stateless function
 *      since it only includes the `render()` function and nothing else
 *      (see FormButton component as an example).
 */
class FormTextInput extends React.Component {
    render() {
        const { labelText, multiline, inputStyle, labelStyle, ...inputProps } = this.props;

        return (
            <View style={styles.inputWrapper}>
                {labelText && <Text style={[styles.label, labelStyle]}>{labelText}</Text>}
                <TextInput
                    ref={this.props.setRef}
                    style={[styles.textInput, multiline && styles.textarea, inputStyle]}
                    blurOnSubmit
                    {...inputProps}
                    multiline={multiline}
                />
            </View>
        );
    }
}

FormTextInput.propTypes = {
    value: PropTypes.string,
    labelText: PropTypes.string,
    multiline: PropTypes.bool,
    setRef: PropTypes.func,
    inputStyle: PropTypes.object,
    labelStyle: PropTypes.object
};

FormTextInput.defaultProps = {
    value: "",
    labelText: null,
    multiline: false,
    setRef: f => f,
    inputStyle: {},
    labelStyle: {}
};

const styles = StyleSheet.create({
    inputWrapper: {
        //flex: 1,        
        paddingHorizontal: 10,
    },
    textInput: {
        height: 40,
        paddingHorizontal: 10,
        fontSize: 18,
        borderBottomWidth: 1,
        borderColor: 'grey',
        borderRadius: 3,
        paddingLeft: 3
    },
    label: {
        marginBottom: 5,
        color: 'grey'
    },
    textarea: {
        height: 80,
    },
});

export default FormTextInput;
