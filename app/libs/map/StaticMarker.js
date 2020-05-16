import React from 'react'

import { Marker } from 'react-native-maps';

function StaticMarker(props) {
    const marker = props.marker;
    return (
        <Marker
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
        />
    )
}

export default StaticMarker;