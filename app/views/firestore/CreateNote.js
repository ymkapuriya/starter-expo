import React, { useEffect } from 'react'
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

const CreateNote = (props) => {

    const { visible, toggleOverlay } = props

    const saveNote = async (state) => {
        //save note to database and exit popup
        const data = {
            title: state.title,
            description: state.description,
        }
        try {
            const docRef = await firestore.addDoc("notes", data);
            console.log("Create doc : ", docRef)
            toggleOverlay();
        } catch (error) {
            console.log(error)
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
                            <FormBuilder
                                formFieldsRows={formFields}
                                defaultValues={defaultValues}
                                handleSubmit={saveNote}
                                submitBtnTitle="Create Note"
                                hideReset={true}
                            />
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
    overlay : {
        height: 260
    },
    form: {
        width: 300,
        flex: 1,
    }
});

export default CreateNote
