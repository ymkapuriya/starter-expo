
import React, { Component, useState } from 'react'
import PropTypes from 'prop-types';

import { Marker, Callout } from 'react-native-maps';

export default class DraggableMarker extends Component {

    constructor(props) {
        super(props)

        this.state = {
            coordinate: this.props.coordinate,
            title: this.props.title,
            description: this.props.description,
            isReady: false
        }
    }

    setCoordinate(coordinate) {
        this.setState({
            coordinate: coordinate
        })
        //notify parent about coordinate update
        this.props.onUpdate(coordinate);
    }

    /**
     * Update steate markers with props markers
     * @param {Object} nextProps 
     * @param {Object} prevState 
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.coordinate !== prevState.coordinate) {
            return {
                coordinate: nextProps.coordinate,
                isReady: true
            }
        } else {
            return null;
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.coordinate !== prevProps.coordinate) {
            if (this.state.isReady) {
                this.marker.showCallout();
            }
        }
    }

    render() {
        return (
            <>
                {this.state.isReady &&
                    <Marker
                        ref={marker => { this.marker = marker }}
                        draggable
                        isPreselected={true}
                        coordinate={this.state.coordinate}
                        title={this.state.coordinate}
                        description={this.state.description}
                        onDragEnd={(e) => this.setCoordinate(e.nativeEvent.coordinate)}
                        image={require('./icons/drag-icon.png')}
                        {...this.props}
                    />
                }
            </>
        )
    }
}

/**
 * Property type
 */
DraggableMarker.propTypes = {
    coordinate: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
    }),
    title: PropTypes.string,
    description: PropTypes.string,
    onUpdate: PropTypes.func.isRequired
};

/**
 * Default values for optional fields
 */
DraggableMarker.defaultProps = {
    title: "Draggable Marker",
    description: "Drag marker to desired location",
    onUpdate: f => f
}
