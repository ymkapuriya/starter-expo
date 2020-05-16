import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Container, Grid, Row, Col, H1, Button, Text } from "native-base";

import { NavigationContext } from '@react-navigation/native';

import Colors from '_styles/colors';
import AppHeader from '_components/AppHeader';

//library
import MapLocation from '_libs/map/MapLocation';

export default class MapScreen extends Component {

    static contextType = NavigationContext;

    constructor(props) {
        super(props);

        this.state = {
            mapWindow: false,
            defaultRegion: {
                latitude: 21.2354169,
                longitude: 72.8397314,
                latitudeDelta: 0.07,
                longitudeDelta: 0.07
            },
            markers: [
                {
                    title: "Default Location",
                    latlng: {
                        latitude: 21.247572,
                        longitude: 72.844485,
                    },
                    description: "This is default location",
                }
            ],
            location: "",
        }
    }

    onFocus = () => {
        //hide map window
        this.setState({
            mapWindow: false
        })
    }

    componentDidMount() {
        const navigation = this.context;
        //bind focus event
        this._focus = navigation.addListener('focus', this.onFocus);
    }

    componentWillUnmount() {
        //unbind focus event
        this._focus();
    }

    initMap = () => {
        this.setState({
            mapWindow: true,
            location: ""
        });
    }

    mapClosed = (data) => {
        this.setState({
            mapWindow: false,
            location: JSON.stringify(data)
        })
    }

    render() {
        return (
            <Container>
                <AppHeader
                    title="Google Map"
                    iconName="google-maps"
                    iconType="MaterialCommunityIcons"
                    {...this.props}
                />
                <Grid>
                    <Row size={20}>
                        <Col style={styles.header}>
                            <H1 style={styles.title}>Google Map & Device Location</H1>
                            <Button primary rounded onPress={this.initMap} >
                                <Text>Show Map & Location</Text>
                            </Button>
                        </Col>
                    </Row>
                    <Row size={80}>
                        <Col>
                            {this.state.mapWindow ?
                                <MapLocation
                                    fullScreen={false}
                                    defaultRegion={this.state.defaultRegion}
                                    markers={this.state.markers}
                                    markCurrent={true}
                                    closeButton={true}
                                    onClose={this.mapClosed}
                                />
                                :
                                <View style={styles.content}>
                                    <Text style={styles.location}>
                                        {this.state.location}
                                    </Text>
                                    <Text style={styles.footer}>
                                        Developed using
                                    </Text>
                                    <Text style={[styles.footer, styles.highlight]}>
                                        react-native-maps
                                    </Text>
                                </View>
                            }
                        </Col>
                    </Row>
                </Grid>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.bg,
        justifyContent: "space-evenly",
        alignItems: 'center',
        flex: 1
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 40
    },
    title: {
        color: Colors.fg,
    },
    location: {
        color: Colors.highlight,
        marginVertical: 20,
    },
    footer: {
        justifyContent: 'center',
        color: Colors.note
    },
    highlight: {
        color: Colors.highlight
    }
});