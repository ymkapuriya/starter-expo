import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Icon } from 'react-native-elements';

/**
 * Component to render actions on each rows
 * @param {*} props 
 */
const Actions = (props) => {
    const { actions, width, rowMap, rowKey, handleAction, position } = props;
    return (
        actions.map((action, index) =>
            (
                <TouchableOpacity
                    key={`a-${rowKey}-${index}`}
                    style={{
                        ...styles.actionBtn,
                        width: width,
                        [position]: width * index,
                        backgroundColor: action.bgColor
                    }}
                    onPress={() => handleAction(rowMap, rowKey, action.callback)}
                >
                    {
                        action.icon ?
                            <Icon
                                name={action.icon}
                                color={action.iconColor ? action.iconColor : "white"}
                            />
                            :
                            <Text style={styles.actionBtnText}>{action.title}</Text>
                    }
                </TouchableOpacity>
            )
        )
    )
}

class ActionList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: this.props.data
        }

        //console.log(this.state.data);

        this.leftOpenValue = this.props.leftActions.length * this.props.actionWidth
        this.rightOpenValue = (-1) * this.props.rightActions.length * this.props.actionWidth
    }

    /**
     * Update state of child with parent props
     * @param {object} nextProps 
     * @param {object} prevState 
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data !== prevState.data) {
            return {
                data: nextProps.data
            }
        } else {
            return null;
        }
    }

    /**
     * Generic action controller to close the row and handle the action
     */
    handleAction = (rowMap, rowKey, parentAction) => {
        rowMap[rowKey].closeRow();
        setTimeout(() => {
            parentAction(rowKey)
        }, 500);

    }

    /**
     * Render each row usin ListItem
     */
    renderItem = (data) => {
        return (
            <View style={styles.rowFront}>
                {this.props.renderItem(data)}
            </View>
        )
    }

    /**
     * Render actions for each row
     */
    renderHiddenItem = (data, rowMap) => {
        return (
            <View style={styles.rowBack}>
                <Actions
                    actions={this.props.leftActions}
                    rowMap={rowMap}
                    rowKey={data.item.key}
                    handleAction={this.handleAction}
                    position='left'
                    width={this.props.actionWidth}
                />
                <Actions
                    actions={this.props.rightActions}
                    rowMap={rowMap}
                    rowKey={data.item.key}
                    handleAction={this.handleAction}
                    position='right'
                    width={this.props.actionWidth}
                />
            </View>
        )
    }

    render() {
        return (
            <SwipeListView
                useFlatList={true}
                data={this.state.data}
                renderItem={this.renderItem}
                renderHiddenItem={this.renderHiddenItem}
                leftOpenValue={this.leftOpenValue}
                rightOpenValue={this.rightOpenValue}
                onRowOpen={(rowKey, rowMap) => {
                    setTimeout(() => {
                        rowMap[rowKey].closeRow()
                    }, 2000)
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    actionBtn: {
        bottom: 0,
        position: 'absolute',
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionBtnText: {
        color: "white"
    }
});

/**
 * Property type
 */
ActionList.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            subtitle: PropTypes.string,
            other: PropTypes.object,
        }),
    ),
    renderItem: PropTypes.func.isRequired,
    leftActions: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            icon: PropTypes.string,
            bgColor: PropTypes.string,
            iconColor: PropTypes.string,
            callback: PropTypes.func.isRequired,
        }),
    ),
    rightActions: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            icon: PropTypes.string,
            bgColor: PropTypes.string,
            iconColor: PropTypes.string,
            callback: PropTypes.func.isRequired,
        }),
    ),
    actionWidth: PropTypes.number
};

/**
 * Default values for optional fields
 */
ActionList.defaultProps = {
    data: [],
    renderItem: f => f,
    leftActions: [],
    rightActions: [],
    actionWidth: 60
};

export default ActionList;
