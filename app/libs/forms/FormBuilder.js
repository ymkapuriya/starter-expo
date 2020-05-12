import React from 'react';
import PropTypes from 'prop-types';
import {
    View, StyleSheet, Keyboard, Alert,
} from 'react-native';

import FormTextInput from './FormTextInput';
import FormBooleanInput from './FormBooleanInput';
import FormButton from './FormButton';
import FormPicker from './FormPicker';
import FormDatePicker from './FormDatePicker';
import FormCheckBox from './FormCheckBox';

/**
 * A component which renders a form based on a given list of fields.
 */
class FormBuilder extends React.Component {
    /* eslint-disable no-param-reassign */
    constructor(props) {
        super(props);

        const formFields = this.getFormFields();

        // dynamically construct our initial state by using
        // each form field's name as an object property.
        const formFieldNames = formFields.reduce((obj, field) => {
            obj[field.name] = this.getFormFieldDefaultValue(field);
            return obj;
        }, {});

        // define the initial state, so we can use it later on
        // when we'll need to reset the form
        this.initialState = {
            ...formFieldNames,
        };

        this.state = this.initialState;
    }
    /* eslint-enable no-param-reassign */

    /**
     * Extract our form fields from each row
     * and compose one big list of field objects.
     */
    getFormFields = () => {
        const { formFieldsRows } = this.props;
        const formFields = [];

        formFieldsRows.forEach((formFieldsRow) => {
            formFields.push(...formFieldsRow);
        });

        return formFields;
    };

    /**
     * Determine what should be the default value
     * for a given field.
     */
    getFormFieldDefaultValue = ({ defaultValue, type }) => {
        if (defaultValue !== undefined) {
            return defaultValue;
        }

        switch (type) {
            case 'boolean':
                return false;
            default:
                return '';
        }
    };

    /**
     * Check if all fields have been filled out.
     */
    /* eslint-disable react/destructuring-assignment */
    hasValidFormData = () => {
        const formFields = this.getFormFields();
        const isFilled = formFields
            // filter out Boolean fields because they will always have a value
            .filter(field => field.type !== 'boolean')
            // check if all remaining fields have been filled out
            .every(field => !!this.state[field.name]);

        return isFilled;
    };

    /**
     * Check if at least one field has been filled out.
     */
    hasDirtyFormData = () => {
        const formFields = this.getFormFields();
        const isDirty = formFields.some((field) => {
            switch (field.type) {
                case 'boolean':
                    // because Boolean fields will have a default value,
                    // we need to check if the current value is not the default one
                    return this.state[field.name] !== this.getFormFieldDefaultValue(field);

                default:
                    return !!this.state[field.name];
            }
        });

        return isDirty;
    };
    /* eslint-enable react/destructuring-assignment */

    /**
     * Attempt to submit the form if all fields have been
     * properly filled out.
     */
    attemptFormSubmission = () => {
        const { handleSubmit } = this.props;

        if (!this.hasValidFormData()) {
            return Alert.alert('Input error', 'Please input all required fields.');
        }

        return handleSubmit(this.state);
    };

    /**
     * Reset the form and hide the keyboard.
     */
    resetForm = () => {
        Keyboard.dismiss();
        this.setState(this.initialState);
    };

    /* eslint-disable react/destructuring-assignment */
    renderTextInput = ({ name, label, inputProps }) => (
        <FormTextInput
            {...inputProps}
            value={this.state[name].toString()}
            onChangeText={(value) => {
                this.setState({ [name]: value });
            }}
            labelText={label}
            key={name}
        />
    );
    /* eslint-enable react/destructuring-assignment */

    /* eslint-disable react/destructuring-assignment */
    renderBooleanInput = ({ name, label, inputProps }) => (
        <FormBooleanInput
            {...inputProps}
            value={this.state[name]}
            onValueChange={(value) => {
                this.setState({ [name]: value });
            }}
            labelText={label}
            key={name}
        />
    );
    /* eslint-enable react/destructuring-assignment */

    /* eslint-disable react/destructuring-assignment */
    renderPickerInput = ({ name, label, items, inputProps }) => {
        let placeHolder = "Select " + name;
        return (
            <FormPicker
                {...inputProps}
                placeHolder={placeHolder}
                value={this.state[name]}
                onValuePicked={(value) => {
                    this.setState({ [name]: value });
                }}
                labelText={label}
                key={name}
                pickerItems={items}
            />
        )
    };
    /* eslint-enable react/destructuring-assignment */

    /* eslint-disable react/destructuring-assignment */
    renderDatePickerInput = ({ name, label, inputProps }) => {
        let placeHolder = "Select " + name;
        return (
            <FormDatePicker
                {...inputProps}
                placeHolder={placeHolder}
                value={this.state[name]}
                onDateSelected={(value) => {
                    this.setState({ [name]: value });
                }}
                labelText={label}
                key={name}
            />
        )
    };
    /* eslint-enable react/destructuring-assignment */

    /* eslint-disable react/destructuring-assignment */
    renderCheckBoxInput = ({ name, label, items, inputProps }) => {
        return (
            <FormCheckBox
                {...inputProps}
                value={this.state[name]}
                onValueChecked={(value) => {
                    this.setState({ [name]: value });
                }}
                labelText={label}
                key={name}
                checkItems={items}
            />
        )
    };
    /* eslint-enable react/destructuring-assignment */

    render() {
        const { submitBtnTitle, formFieldsRows, hideReset } = this.props;

        return (
            <View>
                {/* eslint-disable react/no-array-index-key */}
                {formFieldsRows.map((formFieldsRow, i) => (
                    <View style={styles.row} key={`r-${i}`}>
                        {formFieldsRow.map((field) => {
                            switch (field.type) {
                                case 'boolean':
                                    return this.renderBooleanInput(field);
                                case 'picker':
                                    return this.renderPickerInput(field);
                                case 'date':
                                    return this.renderDatePickerInput(field);
                                case 'checkbox':
                                    return this.renderCheckBoxInput(field);
                                default:
                                    return this.renderTextInput(field);
                            }
                        })}
                    </View>
                ))}
                {/* eslint-enable react/no-array-index-key */}

                <View style={styles.command}>
                    <FormButton
                        onPress={this.attemptFormSubmission}
                        disabled={!this.hasValidFormData()}
                        iconName='check'
                        iconType="Feather"
                    >
                        {submitBtnTitle}
                    </FormButton>
                    {
                        !hideReset &&
                        <FormButton
                            onPress={this.resetForm}
                            disabled={!this.hasDirtyFormData()}
                            iconName='lock-reset'
                            iconType="MaterialCommunityIcons"
                        >
                            Reset
                        </FormButton>
                    }

                </View>
            </View>
        );
    }
}

FormBuilder.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitBtnTitle: PropTypes.string,
    formFieldsRows: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                label: PropTypes.string,
                type: PropTypes.string,
                inputProps: PropTypes.object,
                defaultValue: PropTypes.any,
            }),
        ),
    ).isRequired,
};

FormBuilder.defaultProps = {
    submitBtnTitle: 'Submit',
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    command: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10
    }
});

export default FormBuilder;
