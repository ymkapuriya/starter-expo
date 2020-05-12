import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList } from 'react-native';
import { ListItem, CheckBox, Text, Body } from 'native-base';


function CheckItem({ id, title, checked, checkBoxPressed }) {
    return (
        <ListItem>
            <CheckBox
                checked={checked}
                onPress={() => checkBoxPressed(id)}
            />
            <Body>
                <Text>{title}</Text>
            </Body>
        </ListItem>
    )
}

/**
 * A component which renders a Picker component
 */
class FormCheckBox extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            checkedItems: []
        }

        //prepare options
        this.options = [];
        let options = this.props.checkItems;
        for (const key in options) {
            if (options.hasOwnProperty(key)) {
                const value = options[key];
                this.options.push({
                    id: key,
                    title: value
                })
            }
        }
        console.log(this.options);
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
        const { labelText, checkItems, ...inputProps } = this.props;
        return (
            <View style={styles.inputWrapper}>
                {
                    labelText &&
                    <Text style={styles.label}>{labelText}</Text>
                }
                <FlatList
                    data={this.options}
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
            </View>
        )
    }
}

FormCheckBox.propTypes = {
    labelText: PropTypes.string.isRequired,
    onValueChecked: PropTypes.func,
    checkItems: PropTypes.object.isRequired,
};

FormCheckBox.defaultProps = {
    labelText: null,
    onValueChecked: f => f,
    checkItems: {},
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
    item: {
        borderWidth: 0,
    }
});

export default FormCheckBox;
