import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Overlay } from 'react-native-elements';
import { FormBuilder } from '_libs/forms';

import FirestoreService from '_services/firebase/firestore.service';
const firestore = new FirestoreService();

const formFields = [
    [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            inputProps: {
                autoCapitalize: 'words'
            },
        },
    ],
    [
        {
            name: 'description',
            label: 'Description',
            type: 'text'
        },
    ],
];

const defaultValues = {}

const UpdateNote = (props) => {

    const { visible, toggleOverlay, docRef } = props

    const [data, setData] = useState()

    //flag to delay form rendering
    const [ready, setReady] = useState(false)

    useEffect(() => {
        //get document spceified by ref 
        if (docRef) {
            firestore.getDoc("notes", docRef)
                .then((data) => {
                    //console.log(data);
                    setData(data);
                    //now form is to be rendered
                    setReady(true);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        return () => {
            setData();
        }
    }, [docRef])

    const updateNote = async (state) => {
        //save note to database and exit popup
        const data = {
            title: state.title,
            description: state.description,
        }
        try {
            await firestore.updateDoc("notes", docRef, data);
            console.log("Update doc : ", docRef)

            //form should not be rendered untill flag set
            setReady(false);
            toggleOverlay();
        } catch (error) {
            console.log(error)
        }
    }

    const getInitialValues = () => {
        return {
            title: data.title,
            description: data.description
        }
    }

    return (
        <View>
            <Overlay
                isVisible={visible}
                onBackdropPress={() => toggleOverlay()}
                overlayStyle={styles.overlay}
            >
                <View style={styles.container}>
                    <View style={styles.form}>
                        {
                            ready &&
                            <FormBuilder
                                formFieldsRows={formFields}
                                defaultValues={getInitialValues()}
                                handleSubmit={updateNote}
                                submitBtnTitle="Update"
                                hideReset={true}
                            />
                        }
                    </View>
                </View>
            </Overlay>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    overlay: {
        height: 260
    },
    form: {
        width: 300,
        flex: 1,
    }
});

export default UpdateNote
