import { StyleSheet } from 'react-native';

const CardStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        paddingVertical: 10,
        borderWidth: 0
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        alignSelf: "center",
        paddingVertical: 10
    },
    divider: {
        marginBottom: 10,
    },
    content: {
        paddingHorizontal: 10,
        paddingVertical: 10
    }
});

const FormStyles = StyleSheet.create({
    inputWrapper: {
        //flex: 1,        
        paddingHorizontal: 10,
    },
    inputCont : {
        paddingVertical: 10,
    },
    textInput: {
        height: 40,
        paddingHorizontal: 10,
        fontSize: 18,
        borderBottomWidth: 1,
        borderColor: 'grey',
        borderRadius: 3,
        paddingLeft: 3
    },
    label: {
        marginBottom: 5,
        color: 'grey'
    },
    textarea: {
        height: 80,
    },
    error: {
        paddingTop: 5,
        paddingHorizontal: 10,
        color: "red",
        fontStyle: "italic"
    },
    command: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10
    }
})

const TextStyles = StyleSheet.create({
    label: {
        color: "grey",
        marginBottom: 5
    },
    value: {
        fontFamily: "Montserrat",
        marginBottom: 10,
        fontSize: 20
    },
    divider : {
        marginVertical: 10
    }
})

export { CardStyles, FormStyles, TextStyles }
