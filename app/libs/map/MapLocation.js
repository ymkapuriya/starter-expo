import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import MapView from 'react-native-maps';

//location service
import { ToastService as toast } from '_services/toast.service';
import { LocationService as location } from '_services/location.service';
import Markers from './Markers';
import DraggableMarker from './DraggableMarker';

const DEFAULT_LATITUDE = 21.2354169
const DEFAULT_LONGITUDE = 72.8397314
const DEFAULT_DELTA = 0.07

/**
 * In order to build it for deployment
 * Add API_KEY to app.json
 */

export default class MapLocation extends Component {

    constructor(props) {
        super(props)

        this.state = {
            markers: this.props.markers,
            region: this.props.defaultRegion,
            current: {},
            closeButton: this.props.closeButton,
            selected: {},
        }

        //compute map width and heigt
        this.mapStyle = {
            width: this.props.fullScreen ? Dimensions.get('screen').width : "100%",
            height: this.props.fullScreen ? Dimensions.get('screen').height : "100%",
        }
    }

    /**
     * Get current location and prepare marker object from it
     */
    _getCurrentLocationMarker = async () => {
        //get current location
        try {
            const currentLocation = await location.current();

            //prepare marker object from location
            const currentMarker = {
                latlng: {
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                },
                title: "Current Location",
                description: "Drag this pin to desired location."
            }
            return Promise.resolve(currentMarker);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    componentDidMount = async () => {
        if (this.props.markCurrent) {
            try {
                const marker = await this._getCurrentLocationMarker();

                //add current location to list of markers
                this.setState({
                    current: marker,
                    selected: marker.latlng
                })
                toast.success("Current location marker added.");
            } catch (error) {
                console.log("Current Location : ", error);
            }
        }
    }

    onRegionChange = (region) => {
        this.setState({
            region: region
        })
    }

    /**
     * Upated coordinates will be received
     */
    updateCoordinate = (coordinate) => {
        this.setState({
            selected: coordinate
        })
        toast.success(JSON.stringify(coordinate));
    }

    closeMap = () => {
        //send selected coordinates as data
        const response = {
            selected: this.state.selected
        }
        this.props.onClose(response);
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.closeButton &&
                    <TouchableOpacity
                        ref={close => { this._close = close }}
                        style={styles.closeCont}
                        onPress={this.closeMap}
                    >
                        <Text style={styles.closeButton}>Close</Text>
                    </TouchableOpacity>
                }
                <MapView
                    ref={map => { this._map = map }}
                    provider="google"
                    style={this.mapStyle}
                    initialRegion={this.state.region}
                    onRegionChange={this.onRegionChange}
                >
                    <Markers
                        markers={this.state.markers}
                    />
                    <DraggableMarker
                        coordinate={this.state.current.latlng}
                        title={this.state.current.title}
                        description={this.state.current.description}
                        onUpdate={this.updateCoordinate}
                    />
                </MapView>
            </View>
        )
    }
}

MapLocation.propTypes = {
    defaultRegion: PropTypes.object,    //default region for map view
    fullScreen: PropTypes.bool,         //map shoule be render on full screen or not
    markCurrent: PropTypes.bool,        //current location of device should be masked or not
    markers: PropTypes.array,           //array of location to be marked on map
    closeButton: PropTypes.bool,        //close button is to be shown or not
    onClose: PropTypes.func             //map close callback
};

MapLocation.defaultProps = {
    defaultRegion: {
        latitude: DEFAULT_LATITUDE,
        longitude: DEFAULT_LONGITUDE,
        latitudeDelta: DEFAULT_DELTA,
        longitudeDelta: DEFAULT_DELTA,
    },
    fullScreen: false,
    markCurrent: true,
    markers: [],
    closeButton: true,
    onClose: f => f
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeCont: {
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 10,

    },
    closeButton: {
        backgroundColor: "black",
        color: "white",
        padding: 10,
        textAlign: "center"
    }
});
