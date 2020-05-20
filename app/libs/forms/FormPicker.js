import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Picker } from 'react-native';
import { Text, Icon } from 'react-native-elements';


/**
 * A component which renders a Picker component
 */
class FormPicker extends React.Component {

    constructor(props) {
        super(props)

        //get default
        const defaultSelected = this.props.value
        this.state = {
            selected: defaultSelected
        }
    }

    /**
     * In case form is reset default value is to be set for this componenet
     * @param {Object} nextProps 
     * @param {Object} prevState 
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.value !== prevState.value) {
            const defaultSelected = nextProps.value
            return {
                selected: defaultSelected
            }
        } else {
            return null;
        }
    }


    onValueChange = (value) => {
        this.setState({
            selected: value
        });
        //call parent method to update form data
        this.props.onValuePicked(value)
    }

    render() {
        const { placeHolder, labelText, pickerItems, ...inputProps } = this.props;
        return (
            <View style={styles.inputWrapper}>
                {
                    labelText &&
                    <Text style={styles.label}>{labelText}</Text>
                }
                <Picker
                    placeholder={placeHolder}
                    iosHeader={placeHolder}
                    iosIcon={<Icon name="arrow-down" />}
                    textStyle={styles.input}
                    selectedValue={this.state.selected}
                    style={styles.picker}
                    onValueChange={this.onValueChange}
                    {...inputProps}
                >
                    {
                        Object.keys(pickerItems).map((key, i) => (
                            <Picker.Item
                                label={pickerItems[key]}
                                value={key}
                                style={styles.item}
                                key={`item-${i}`} />
                        ))
                    }
                </Picker>
            </View>
        )
    }
}

FormPicker.propTypes = {
    placeHolder: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    onValuePicked: PropTypes.func,
    pickerItems: PropTypes.object.isRequired,
};

FormPicker.defaultProps = {
    placeholder: null,
    labelText: null,
    onValuePicked: f => f,
    pickerItems: {},
};

const styles = StyleSheet.create({
    inputWrapper: {
        //flex: 1,
        paddingHorizontal: 10,
    },
    label: {
        color: 'grey'
    },
    picker: {
        width: undefined,
        marginStart: 0
    },
    input: {
        paddingLeft: 0,
    }
});

export default FormPicker;
