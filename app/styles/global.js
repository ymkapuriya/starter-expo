import { StyleSheet } from 'react-native';

const CardStyle = StyleSheet.create({
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

export { CardStyle }
