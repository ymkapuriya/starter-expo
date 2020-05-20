import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList } from 'react-native';
import { CheckBox, Text } from 'react-native-elements';

function CheckItem({ id, title, checked, checkBoxPressed }) {
    return (
        <CheckBox
            title={title}
            checked={checked}
            onPress={() => checkBoxPressed(id)}
        />
    )
}

/**
 * A component which renders a Picker component
 */
class FormCheckBox extends React.Component {

    constructor(props) {
        super(props)

        //prepare options
        const options = this.prepareOptions();
        const defaultChecked = Array.isArray(this.props.value) ? this.props.value : [];

        this.state = {
            checkedItems: defaultChecked,
            options: options
        }
    }

    prepareOptions = () => {
        const { checkItems } = this.props;
        const options = [];
        for (const key in checkItems) {
            if (checkItems.hasOwnProperty(key)) {
                const value = checkItems[key];
                options.push({
                    id: key,
                    title: value
                })
            }
        }
        return options;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.value !== prevState.value) {
            const defaultChecked = Array.isArray(nextProps.value) ? nextProps.value : [];
            return {
                checkedItems: defaultChecked
            }
        } else {
            return null;
        }
    }

    checkBoxPressed = (value) => {
        let checked = this.state.checkedItems;
        if (checked.includes(value)) {
            checked.splice(checked.indexOf(value), 1);
        } else {
            checked.push(value);
        }
        this.setState({
            checkedItems: checked
        });
        //call parent method to update form data
        this.props.onValueChecked(checked);
    }

    render() {
        const { name, labelText, ...inputProps } = this.props;
        return (
            <View style={styles.inputWrapper}>
                {
                    labelText &&
                    <Text style={styles.label}>{labelText}</Text>
                }
                <View style={styles.optionsCont}>
                    {
                        this.state.options.map((item, i) => {
                            const key = name + "-" + i;
                            return (
                                <CheckItem
                                    id={item.id}
                                    title={item.title}
                                    checked={this.state.checkedItems.includes(item.id) ? true : false}
                                    checkBoxPressed={() => this.checkBoxPressed(item.id)}
                                    key={key}
                                />
                            )
                        })
                    }
                </View>
                {/* 
                //To avoid warning of FlatList inside ScrollView
                <FlatList
                    data={this.state.options}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <CheckItem
                            id={item.id}
                            title={item.title}
                            checked={this.state.checkedItems.includes(item.id) ? true : false}
                            checkBoxPressed={() => this.checkBoxPressed(item.id)}
                        />
                    }
                />
                */}
            </View>
        )
    }
}

FormCheckBox.propTypes = {
    value: PropTypes.array,
    labelText: PropTypes.string.isRequired,
    onValueChecked: PropTypes.func,
    checkItems: PropTypes.object.isRequired,
};

FormCheckBox.defaultProps = {
    value: [],
    labelText: null,
    onValueChecked: f => f,
    checkItems: {},
};

const styles = StyleSheet.create({
    inputWrapper: {
        //flex: 1,
        paddingHorizontal: 10,
    },
    label: {
        color: 'grey'
    },
    optionsCont: {
        paddingTop: 10
    },
    item: {
        borderWidth: 0,
    }
});

export default FormCheckBox;
