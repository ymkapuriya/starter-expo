import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

import { CalenderService as calenderService } from '_services/calender.service';

export default class CalenderNav extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount = async () => {
        //check calender permission
        try {
            await calenderService.checkPermission();
            this.props.onPermission(true);
        } catch (error) {
            console.log(error);
            this.props.onPermission(false);
        }
    }

    dateUpdated = (date) => {
        this.props.onDateUpdate(start);
    }

    render() {

        return (
            <View>
                <CalendarPicker
                    width={this.props.width}
                    height={this.props.height}
                    onDateChange={this.dateUpdated}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

});