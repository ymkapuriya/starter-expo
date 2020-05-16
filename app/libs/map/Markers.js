
import React, { Component, useState } from 'react'
import PropTypes from 'prop-types';

import StaticMarker from './StaticMarker';

export default class Markers extends Component {

    constructor(props) {
        super(props)

        this.state = {
            markers: this.props.markers,
        }
    }

    /**
     * Update steate markers with props markers
     * @param {Object} nextProps 
     * @param {Object} prevState 
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.markers.length !== prevState.markers.length) {
            return {
                markers: nextProps.markers
            }
        } else {
            return null;
        }
    }

    render() {
        return (
            <>
                {
                    this.state.markers.map((marker, i) => (
                        <StaticMarker
                            marker={marker}
                            key={`sm-${i}`}
                            {...this.props}
                        />
                    ))
                }
            </>
        )
    }
}

/**
 * Property type
 */
Markers.propTypes = {
    markers: PropTypes.arrayOf(
        PropTypes.shape({
            latlng: PropTypes.shape({
                latitude: PropTypes.number,
                longitude: PropTypes.number,
            }).isRequired,
            title: PropTypes.string,
            description: PropTypes.string
        }),
    ).isRequired,
};

/**
 * Default values for optional fields
 */
Markers.defaultProps = {
    markers: [],
};
