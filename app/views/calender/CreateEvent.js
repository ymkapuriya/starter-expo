import React, { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from 'moment';
import { ListItem } from "react-native-elements";

import Colors from '_styles/colors';
import AppHeader from '_components/AppHeader';
import { FormBuilder } from '_libs/forms';
import { CalenderService as calenderService } from '_services/calender.service';
import { ToastService as toast } from '_services/toast.service';

const formFields = [
    [
        {
            name: 'title',
            label: 'Event Title',
            type: 'text',
            inputProps: {
                autoCorrect: false,
                autoCapitalize: 'words'
            },
        }
    ],
    [
        {
            name: 'withAlarm',
            label: 'Set alarm before event',
            type: 'boolean',
        },
        {
            name: 'alarmMinutes',
            label: 'Minutes',
            type: 'text',
            isOptional: true,
            inputProps: {
                keyboardType: 'number-pad',
            },
        },
    ],
    [
        {
            name: 'startDate',
            label: 'Start',
            type: 'date',
            mode: 'datetime'
        },
    ],
    [
        {
            name: 'endDate',
            label: 'End',
            type: 'date',
            mode: 'datetime'
        },
    ],
]

const getParameters = (route) => {
    const params = route.params;
    const date = new Date(JSON.parse(params.date));
    const calender = JSON.parse(params.calender);
    return { date, calender };
}

export default function CreateEvent(props) {

    const navigation = useNavigation();
    const route = useRoute();
    let { date, calender } = getParameters(route)

    const getFormFields = () => {
        const fields = formFields;
        return fields;
    }

    const getDefaultValues = () => {
        const start = moment(date);
        const end = moment(date).add(1, 'h');
        const defaults = {
            title: "Event Title",
            allDay: false,
            startDate: start.toDate(),
            endDate: end.toDate(),
            alarmMinutes: '10'
        }
        return defaults;
    }

    const handleSubmit = async (data) => {
        if (data) {
            //create event
            let detail = {
                title: data.title,
                startDate: data.startDate,
                endDate: data.endDate
            }
            if (data.withAlarm) {
                detail['alarms'] = [
                    {
                        relativeOffset: Number(data.alarmMinutes)
                    }
                ]
            }
            console.log("Event Data", detail);
            try {
                const eventId = await calenderService.createEvent(calender.id, detail);
                toast.success("Event created : " + eventId);
                navigation.navigate('CalenderHome', { refresh: true });
            } catch (error) {
                toast.error(error);
            }
        }
    }

    const handleReset = () => {
        setResetForm(false)
    }

    return (
        <>
            <AppHeader
                leftAction={() => navigation.goBack()}
                title="Create Event"
                iconName="calendar-month"
                iconType="material-community"
                {...props}
            />
            <ScrollView>
                <ListItem
                    title={calender.title}
                    titleStyle={styles.headerTitle}
                    containerStyle={styles.header}
                    bottomDivider
                />
                <View style={styles.content}>
                    <FormBuilder
                        formFieldsRows={getFormFields()}
                        defaultValues={getDefaultValues()}
                        handleSubmit={handleSubmit}
                        submitBtnTitle="Create Event"
                        resetBtnTitle="Reset"
                        hideReset={false}
                    />
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#ddd',
    },
    headerTitle: {
        textAlign: "center",
        fontFamily: "Montserrat-Bold"
    },
    content: {
        paddingHorizontal: 40,
        paddingVertical: 30,
        backgroundColor: "white"
    },
    title: {
        color: Colors.fg,
    }
});