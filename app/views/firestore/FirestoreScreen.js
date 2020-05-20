import React, { Component } from "react";
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Icon, ListItem } from 'react-native-elements';

import Colors from '_styles/colors';
import AppHeader from '_components/AppHeader';
import ActionList from '_components/ActionList';
import CreateNote from './CreateNote';
import UpdateNote from './UpdateNote';

import FirestoreService from '_services/firebase/firestore.service';
import { AlertService as alert } from '_services/alert.service';
import { ToastService as toast } from '_services/toast.service';

export default class FirestoreScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            create: false,
            update: false,
            notes: [],
            current: ''    //current record
        }
        this.firestore = new FirestoreService();

        this.leftActions = [
            {
                title: 'Close',
                icon: 'close',
                bgColor: 'cyan',
                iconColor: 'black',
                callback: () => { },
            }
        ]
        this.rightActions = [
            {
                title: 'Delete',
                icon: 'delete',
                bgColor: 'orange',
                iconColor: 'black',
                callback: this.onDelete
            },
            {
                title: 'Update',
                icon: 'edit',
                bgColor: 'teal',
                iconColor: 'white',
                callback: this.onUpdate
            }
        ]
    }

    onDelete = (id) => {
        //confirm before delete
        alert.confirm(
            "Delete Note",
            "Are you sure to perform this operation?",
            async () => {
                //delete
                console.log("Delete doc : " + id);
                try {
                    await this.firestore.deleteDoc("notes", id);
                    toast.success("Note deleted successfully.");
                } catch (error) {
                    toast.error(error);
                }
            }
        )
    }

    onUpdate = (id) => {
        console.log("Update : " + id);
        this.setState({
            current: id
        })
        this.toggleUpdate()
    }

    onResult = (querySnapshot) => {
        let notes = [];
        querySnapshot.forEach(function (docRef) {
            const note = {
                key: docRef.id,
                title: docRef.data().title,
                subtitle: docRef.data().description
            }
            notes.push(note)
        });
        this.setState({
            notes: notes
        })
    }

    onError = (error) => {
        console.log("Listen Error : " + error);
    }

    componentDidMount() {
        //listen to realtime updates on collection notes
        /**
         * { key: 'title', op: '==', value: 'Arjuna' }
         */
        const conditions = [];
        //call service method
        this.unsubscribe = this.firestore.collectionSnapshot("notes", conditions, this.onResult, this.onError)
    }

    componentWillUnmount() {
        //Stop listening to realtime updates
        this.unsubscribe();
    }

    toggleCreate = () => {
        const create = this.state.create
        this.setState({
            create: !create
        })
    }

    toggleUpdate = () => {
        this.setState({
            update: !this.state.update
        })
    }

    renderNote = (data) => {
        return (
            <ListItem
                key={data.item.key}
                title={data.item.title}
                subtitle={data.item.subtitle}
                leftIcon={{ name: data.item.icon ? data.item.icon : "info", color: 'grey' }}
                bottomDivider
            />
        )
    }

    render() {

        return (
            <>
                <AppHeader
                    title="Firestore Notes"
                    iconName="firebase"
                    iconType="material-community"
                    {...this.props}
                />
                <Grid>
                    <Row>
                        <Col>
                            <ActionList
                                data={this.state.notes}
                                renderItem={this.renderNote}
                                leftActions={this.leftActions}
                                rightActions={this.rightActions}
                                actionWidth={60}
                            />
                        </Col>
                    </Row>
                    <Row style={styles.actionPanel}>
                        <Col style={styles.command}>
                            <CreateNote
                                visible={this.state.create}
                                toggleOverlay={this.toggleCreate}
                            />
                            <UpdateNote
                                visible={this.state.update}
                                toggleOverlay={this.toggleUpdate}
                                docRef={this.state.current}
                            />
                            <Icon
                                name="add"
                                type="material"
                                color={Colors.fg}
                                reverse
                                raised
                                size={30}
                                onPress={() => this.toggleCreate()}
                            />
                        </Col>
                    </Row>
                </Grid>
            </>
        )
    }
}

const styles = StyleSheet.create({
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
});