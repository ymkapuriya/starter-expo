import React from 'react';
import PropTypes from 'prop-types';
import {
    View, StyleSheet, Keyboard, Alert, Text
} from 'react-native';

import FormTextInput from './FormTextInput';
import FormBooleanInput from './FormBooleanInput';
import FormButton from './FormButton';
import FormPicker from './FormPicker';
import FormDatePicker from './FormDatePicker';
import FormCheckBox from './FormCheckBox';

import _ from 'lodash';

import { ValidationService as vs } from '_services/validation.service';

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

        //initialize errors
        const errors = [];
        Object.keys(formFieldNames).map((value, index) => {
            errors[value] = null;
        });

        // define the initial state, so we can use it later on
        // when we'll need to reset the form
        this.initialState = {
            ...formFieldNames,
            errors: errors,
        };

        //carefull copy
        //this.state = JSON.parse(JSON.stringify(this.initialState));
        this.state = _.cloneDeep(this.initialState);

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
    getFormFieldDefaultValue = (field) => {
        if (this.props.defaultValues.hasOwnProperty(field.name)) {
            return this.props.defaultValues[field.name];
        } else {
            switch (field.type) {
                case 'checkbox':
                    return [];
                case 'boolean':
                    return false;
                case 'date':
                    return new Date();
                default:
                    return '';
            }
        }
    };

    /**
     * Validate all required fields have been filled out
     */
    validateRequired = (formFields) => {

        let isValid = true;
        let fieldErrors = this.state.errors;
        formFields
            //filter boolean
            .filter(field => field.type !== 'boolean')
            //filter optional
            .filter(field => !field.isOptional)
            .map((field) => {
                const value = this.state[field.name]
                if ((Array.isArray(value) && value.length == 0) || !value) {
                    fieldErrors[field.name] = field.label + " is required.";
                    isValid = false;
                }
            });
        if (!isValid) {
            this.setState({
                errors: fieldErrors
            })
        }
        return isValid;
    }

    /**
     * Validate all email fields
     */
    validateEmail = (formFields) => {
        let isValid = true;
        let fieldErrors = this.state.errors;
        formFields.filter(field => field.isEmail == true) // filter only email types
            .map((field) => {
                //get value
                const value = this.state[field.name];
                if (!vs.isEmail(value)) {
                    fieldErrors[field.name] = "Not a valid email address.";
                    isValid = false;
                }
            });
        if (!isValid) {
            this.setState({
                errors: fieldErrors
            })
        }
        return isValid;
    }

    /**
     * Check if all fields have been filled out.
     */
    /* eslint-disable react/destructuring-assignment */
    hasValidFormData = () => {
        /*
        const formFields = this.getFormFields();
        const isFilled = formFields
            // filter out Boolean fields because they will always have a value
            .filter(field => field.type !== 'boolean')
            // check if all remaining fields have been filled out
            .every(field => !!this.state[field.name]);
        */
        const formFields = this.getFormFields();
        //validate required
        let isValid = this.validateRequired(formFields);

        //validate email
        isValid = isValid && this.validateEmail(formFields);

        return isValid;
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
            return Alert.alert('Input error', 'Please resolve all validation errors.');
        }

        return handleSubmit(this.state);
    };

    /**
     * Reset the form and hide the keyboard.
     */
    resetForm = () => {
        Keyboard.dismiss();
        this.setState(_.cloneDeep(this.initialState));
    };

    /* eslint-disable react/destructuring-assignment */
    renderTextInput = ({ name, label, inputProps }) => (
        <View style={styles.fieldCont} key={name}>
            <FormTextInput
                {...inputProps}
                value={this.state[name].toString()}
                onChangeText={(value) => {
                    this.setState({
                        [name]: value,
                        errors: {
                            ...this.state.errors,
                            [name]: null
                        }
                    });
                }}
                labelText={label}
            />
            <Text style={styles.error}>
                {this.state.errors[name]}
            </Text>
        </View>
    );
    /* eslint-enable react/destructuring-assignment */

    /* eslint-disable react/destructuring-assignment */
    renderBooleanInput = ({ name, label, inputProps }) => (
        <View style={styles.fieldCont} key={name}>
            <FormBooleanInput
                {...inputProps}
                value={this.state[name]}
                onValueChange={(value) => {
                    this.setState({ [name]: value });
                }}
                labelText={label}
            />
            <Text style={styles.error}>
                {this.state.errors[name]}
            </Text>
        </View>
    );
    /* eslint-enable react/destructuring-assignment */

    /* eslint-disable react/destructuring-assignment */
    renderPickerInput = ({ name, label, items, inputProps }) => {
        let placeHolder = "Select " + name;
        return (
            <View style={styles.fieldCont} key={name}>
                <FormPicker
                    {...inputProps}
                    placeHolder={placeHolder}
                    value={this.state[name]}
                    onValuePicked={(value) => {
                        this.setState({
                            [name]: value,
                            errors: {
                                ...this.state.errors,
                                [name]: null
                            }
                        });
                    }}
                    labelText={label}
                    pickerItems={items}
                />
                <Text style={styles.error}>
                    {this.state.errors[name]}
                </Text>
            </View>
        )
    };
    /* eslint-enable react/destructuring-assignment */

    /* eslint-disable react/destructuring-assignment */
    renderDatePickerInput = ({ name, label, inputProps }) => {
        let placeHolder = "Select " + name;
        return (
            <View style={styles.fieldCont} key={name}>
                <FormDatePicker
                    {...inputProps}
                    placeHolder={placeHolder}
                    value={this.state[name]}
                    onDateSelected={(value) => {
                        this.setState({
                            [name]: value,
                            errors: {
                                ...this.state.errors,
                                [name]: null
                            }
                        });
                    }}
                    labelText={label}
                />
                <Text style={styles.error}>
                    {this.state.errors[name]}
                </Text>
            </View>
        )
    };
    /* eslint-enable react/destructuring-assignment */

    /* eslint-disable react/destructuring-assignment */
    renderCheckBoxInput = ({ name, label, items, inputProps }) => {
        return (
            <View style={styles.fieldCont} key={name}>
                <FormCheckBox
                    {...inputProps}
                    value={this.state[name]}
                    onValueChecked={(value) => {
                        this.setState({
                            [name]: value,
                            errors: {
                                ...this.state.errors,
                                [name]: null
                            }
                        });
                    }}
                    labelText={label}
                    checkItems={items}
                />
                <Text style={styles.error}>
                    {this.state.errors[name]}
                </Text>
            </View>
        )
    };
    /* eslint-enable react/destructuring-assignment */

    componentDidUpdate(prevProps) {
        if (this.props.resetForm !== prevProps.resetForm) {
            //in case form reset flag is true
            if (this.props.resetForm == true) {
                //reset form
                this.resetForm();
                //execute parent reset function
                this.props.resetCallback();
            }
        }
    }

    render() {
        const { submitBtnTitle, resetBtnTitle, formFieldsRows, hideReset } = this.props;

        return (
            <View style={styles.container}>
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
                        //disabled={!this.hasValidFormData()}
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
                        {resetBtnTitle}
                        </FormButton>
                    }

                </View>
            </View>
        );
    }
}

/**
 * Property type
 */
FormBuilder.propTypes = {
    submitBtnTitle: PropTypes.string,           //title of submit button
    resetBtnTitle: PropTypes.string,            //title of reset button
    formFieldsRows: PropTypes.arrayOf(          //detail of input fields
        PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                label: PropTypes.string,
                type: PropTypes.string,
                isOptional: PropTypes.bool,
                isEmail: PropTypes.bool,
                inputProps: PropTypes.object,
                //defaultValue: PropTypes.any,
            }),
        ),
    ).isRequired,
    hideReset: PropTypes.bool,                  //flag to indicate reset button is to be hidden or not
    handleSubmit: PropTypes.func.isRequired,    //callback for submit handler
    defaultValues: PropTypes.object,            //default values for input fields
    resetForm: PropTypes.bool,                  //flag to indicate form is to be reset or not
    resetCallback: PropTypes.func,              //callback for form reset
};

/**
 * Default values for optional fields
 */
FormBuilder.defaultProps = {
    submitBtnTitle: 'Submit',
    resetBtnTitle: 'Reset',
    hideReset: false,
    defaultValues: {},
    resetForm: false,
    resetCallback: f => f,
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 15,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    fieldCont: {
        flex: 1
    },
    error: {
        paddingTop: 5,
        paddingHorizontal: 10,
        color: "red",
        fontStyle: "italic"
    },
    command: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10
    }
});

export default FormBuilder;
