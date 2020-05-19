import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View } from "react-native";
import { ListItem } from 'react-native-elements';
import moment from 'moment';

import { CalenderService as calenderService } from '_services/calender.service';

export default function EventListing(props) {

    const { date, calender, refresh } = props

    //maintains event listing for selected date
    const [events, setEvents] = useState([]);

    const renderEvent = ({ item }) => {
        const event = item
        let subtitle;
        if (event.allDay) {
            subtitle = "Full Day"
        } else {
            const start = moment(event.startDate);
            const end = moment(event.endDate);
            subtitle = start.format('HH:mm A') + " to " + end.format('HH:mm A')
        }
        return (
            <ListItem
                title={event.title}
                subtitle={subtitle}
                leftIcon={{ name: 'info', color: 'grey' }}
                bottomDivider
                chevron
            />
        )
    }

    const keyExtractor = (item, index) => index.toString()

    useEffect(() => {
        const start = moment(date).startOf('day');
        const end = moment(date).endOf('day');

        //get events for seleceted calender and date
        if (calender !== '') {
            console.log("EventListing");
            calenderService.getEvents([calender], start.toDate(), end.toDate())
                .then((events) => {
                    setEvents(events);
                })
                .catch((error) => {
                    setEvents([]);
                })
        }
        return () => {
            setEvents([]);
        }
    }, [date, calender, refresh])

    return (
        <>
            <View>
                <ListItem
                    title="Event Listing"
                    titleStyle={styles.eventsTitle}
                    containerStyle={styles.events}
                    bottomDivider
                />
            </View>
            <FlatList
                data={events}
                keyExtractor={keyExtractor}
                renderItem={renderEvent}
            />
        </>
    )
}

const styles = StyleSheet.create({
    events: {
        backgroundColor: '#ddd',
    },
    eventsTitle: {
        textAlign: "center",
        fontFamily: "Montserrat-Bold"
    },
});
