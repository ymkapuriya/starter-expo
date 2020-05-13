import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { DatePicker, Text, Row, Col } from 'native-base';


/**
 * A component which renders a DatePicker component
 */
class FormDatePicker extends React.Component {

    constructor(props) {
        super(props)

        //get default
        this.defaultDate = this.props.value

        this.state = {
            selected: this.defaultDate
        }
    }

    setDate = (date) => {
        this.setState({
            selected: date
        });
        //call parent method to update form data
        this.props.onDateSelected(date)
    }

    render() {
        const { placeHolder, labelText, ...inputProps } = this.props;
        return (
            <View style={styles.inputWrapper}>
                {
                    labelText &&
                    <Text style={styles.label}>{labelText}</Text>
                }
                <DatePicker
                    defaultDate={this.defaultDate}
                    placeHolderText={this.state.selected ? undefined : placeHolder}
                    onDateChange={this.setDate}
                    textStyle={styles.input}
                    placeHolderTextStyle={styles.input}
                    {...inputProps}
                />
            </View>
        )
    }
}

FormDatePicker.propTypes = {
    value: PropTypes.object,
    placeHolder: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    onDateSelected: PropTypes.func,
};

FormDatePicker.defaultProps = {
    value: new Date,
    placeholder: null,
    labelText: null,
    onDateSelected: f => f,
};

const styles = StyleSheet.create({
    inputWrapper: {
        flex: 1,
        paddingHorizontal: 10,
    },
    inputCont: {
        alignItems: "center"
    },
    label: {
        marginBottom: 5,
        color: 'grey'
    },
    input: {
        paddingLeft: 0,
    }
});

export default FormDatePicker;
