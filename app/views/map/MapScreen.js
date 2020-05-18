import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";

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
            <>
                <AppHeader
                    title="Google Map"
                    iconName="google-maps"
                    iconType="material-community"
                    {...this.props}
                />
                <Grid>
                    <Row size={20}>
                        <Col style={styles.header}>
                            <Text h4 h4Style={styles.title}>Google Map & Device Location</Text>
                            <Button
                                title="Show Map & Location"
                                onPress={this.initMap}
                            />
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
                                    <Text style={styles.footer}>
                                        https://docs.expo.io/versions/v37.0.0/sdk/map-view/
                                    </Text>
                                    <Text style={[styles.footer, styles.highlight]}>
                                        expo-location
                                    </Text>
                                    <Text style={styles.footer}>
                                        https://docs.expo.io/versions/v37.0.0/sdk/location/
                                    </Text>
                                </View>
                            }
                        </Col>
                    </Row>
                </Grid>
            </>
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