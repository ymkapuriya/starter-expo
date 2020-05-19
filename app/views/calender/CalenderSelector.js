import React, { useState, useEffect } from 'react'
import { FlatList, View, StyleSheet } from 'react-native';
import { Text, ListItem, Icon, Overlay } from 'react-native-elements';

import { CalenderService as calender } from '_services/calender.service';

const CalenderListing = (props) => {

    const { visible, toggleOverlay, calenders } = props

    const keyExtractor = (item, index) => item.id

    const selectCalender = (calender) => {
        props.onSelect(calender);
        toggleOverlay();
    }

    const renderItem = ({ item }) => {
        const calender = item
        return (
            <ListItem
                title={calender.title}
                bottomDivider
                chevron
                onPress={() => selectCalender(item)}
            />
        )
    }

    return (
        <View>
            <Overlay
                isVisible={visible}
                onBackdropPress={toggleOverlay}
                fullScreen={true}
            >
                <FlatList
                    data={calenders}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem} />
            </Overlay>
        </View>
    );
};

function CalenderSelector(props) {

    const [selected, setSelected] = useState({
        id: '',
        title: 'Not selected'
    });
    const [calenders, setCalenders] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        //get system calenders
        calender.getCalenders()
            .then((calenders) => {
                calenders = calenders.map((c, i) => {
                    return {
                        id: c.id,
                        title: c.title
                    }
                });
                setCalenders(calenders);
            })
            .catch((error) => {
                setCalenders([]);
            })
        return () => { }
    }, [])

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const onSelect = (calender) => {
        setSelected(calender);
        //also pass it to parent
        props.onSelect(calender);
    }

    return (
        <>
            <ListItem
                key="calender"
                leftElement={<Text style={styles.name}>{selected.title}</Text>}
                bottomDivider
                chevron={<Icon name='unfold-more' type='material' />}
                onPress={toggleOverlay}
            />
            <CalenderListing
                calenders={calenders}
                visible={visible}
                toggleOverlay={toggleOverlay}
                onSelect={onSelect}
            />
        </>
    )
}

const styles = StyleSheet.create({
    name: {
        fontSize: 15,
        fontFamily: "Montserrat-Bold"
    },
});

export default CalenderSelector
