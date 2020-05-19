import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Icon, Text, Divider, ListItem } from 'react-native-elements';
import { NavigationContext, useRoute, useNavigation } from '@react-navigation/native';

import Colors from '_styles/colors';
import AppHeader from '_components/AppHeader';
import EventListing from "./EventListing";
import CalenderNav from "./CalenderNav";
import CalenderSelector from "./CalenderSelector";

import { AlertService as alert } from '_services/alert.service';

class CalenderHome extends Component {

    //static contextType = NavigationContext;

    constructor(props) {
        super(props)
        this.initialDate = new Date()
        this.state = {
            calender: {
                id: '',
                title: ''
            },
            date: new Date(),
            hasPermission: false,
            refresh: false
        }
    }

    updatePermission = (value) => {
        this.setState({
            hasPermission: value
        })
    }

    calenderSelected = (calender) => {
        //console.log(calender);
        this.setState({
            calender: calender
        })
    }

    dateSelected = (date) => {
        //console.log(date);
        this.setState({
            date: date
        })
    }

    createEvent = () => {
        const { navigation } = this.props;
        const date = this.state.date;
        const calender = this.state.calender;
        if (calender.id === '') {
            alert.ok("Error", "Select Calender");
        } else {
            const params = {
                date: JSON.stringify(date),
                calender: JSON.stringify(calender)
            }
            navigation.navigate('CreateEvent', params)
        }
    }

    onFocus = () => {
        const { route } = this.props;
        //check if new event as set refresh flag
        if (route.params) {
            const refresh = route.params.refresh;
            if (refresh) {
                this.setState({
                    refresh: true
                })
            }
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        //bind focus event
        this._focus = navigation.addListener('focus', this.onFocus);
    }

    componentWillUnmount() {
        //unbind focus event
        this._focus();
    }

    render() {

        return (
            <>
                <AppHeader
                    rightAction={() => this.createEvent()}
                    title="Calender"
                    iconName="calendar-plus"
                    iconType="material-community"
                    {...this.props}
                />
                <Grid>
                    <Row style={styles.calenderCont}>
                        <Col>
                            <View>
                                <CalenderSelector
                                    onSelect={this.calenderSelected}
                                />
                            </View>
                            <View style={styles.calender}>
                                <CalenderNav
                                    width={250}
                                    height={250}
                                    onDateUpdate={this.dateSelected}
                                    onPermission={this.updatePermission}
                                    selectedDate={this.state.date}
                                />
                            </View>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Divider></Divider>
                            <EventListing
                                date={this.state.date}
                                calender={this.state.calender.id}
                                refresh={this.state.refresh}
                            />
                        </Col>
                    </Row>
                    <Row style={styles.actionPanel}>
                        <Col style={styles.command}>
                            <Icon
                                name="calendar-plus"
                                type="material-community"
                                color={Colors.fg}
                                reverse
                                raised
                                size={30}
                                disabled={!this.state.hasPermission}
                                onPress={() => this.createEvent()}
                            />
                        </Col>
                    </Row>
                </Grid>
            </>
        )
    }
}

// Wrap and export
export default function (props) {
    const route = useRoute();
    const navigation = useNavigation();
    return <CalenderHome {...props} route={route} navigation={navigation} />;
}

const styles = StyleSheet.create({
    calenderCont: {
        height: 270,
        backgroundColor: Colors.bg
    },
    calender: {
        marginTop: 10
    },
    content: {
    },
    title: {
        color: Colors.fg
    },
    actionPanel: {
        height: 40,
        backgroundColor: "#ddd",
    },
    command: {
        justifyContent: 'center',
        alignItems: "center",
        marginTop: -20,
        marginBottom: 20
    },
    commandLable: {
        paddingVertical: 10,
        color: "grey",
        fontSize: 15
    }
});