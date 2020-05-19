import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { UtilityService as utility } from '_services/utility.service';

const PlatformDatePicker = (props) => {

    const [label, setLabel] = useState('')
    const [display, setDisplay] = useState(false)

    const onChange = (event, date) => {
        setDisplay(false)
        const label = utility.dateToString(date, 'DD-MM-YYYY');
        setLabel(label);
        props.onChange(event, date);
    }

    switch (Platform.OS) {
        case 'ios':
            return (
                <DateTimePicker
                    mode={props.mode}
                    value={props.value}
                    onChange={props.onChange}
                    {...props.inputProps}
                />
            )
        case 'android':
            return (
                <>
                    <TouchableOpacity
                        style={styles.select}
                        onPress={() => setDisplay(true)}
                    >
                        <Text style={styles.selectedDate}>{label}</Text>
                        <Text style={styles.selectLabel}>Select</Text>                        
                    </TouchableOpacity>
                    {
                        display &&
                        <DateTimePicker
                            mode={props.mode}
                            value={props.value}
                            onChange={onChange}
                            {...props.inputProps}
                        />
                    }
                </>
            )
        default:
            return (<></>);
    }
}

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

    setDate = (event, date) => {
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
                <PlatformDatePicker
                    value={this.state.selected}
                    onChange={this.setDate}
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
    label: {
        marginBottom: 5,
        color: 'grey'
    },
    select: {        
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    selectLabel: {
        fontSize: 15,
        color: 'skyblue'
    },
    selectedDate: {
        fontSize: 15,   
        paddingStart: 10     
    }
});

export default FormDatePicker;
