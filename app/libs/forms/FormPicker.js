import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
//import { Picker } from '@react-native-community/picker';
import { Picker, Text, Icon } from 'native-base';


/**
 * A component which renders a Picker component
 */
class FormPicker extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            selected: undefined
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
                            <Picker.Item label={pickerItems[key]} value={key} style={styles.item} key={`item-${i}`} />
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
        flex: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    label: {
        color: 'grey'
    },
    picker: {
        width: undefined,
        marginStart: 0
    },
    input : {
        paddingLeft:0,
    }    
});

export default FormPicker;
