import React, { Component } from "react";

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { notifyError } from '_actions/notify.action';

//services
import { ToastService as toast } from '_services/toast.service';

//views
import PublicNavigator from './PublicNavigator';
import ProtectedNavigator from './ProtectedNavigator';

class LandingScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps) {
        if (this.props.auth.isSignedIn !== prevProps.auth.isSignedIn) {
            if (this.props.auth.isSignedIn) {
                toast.success("Welcome");
            } else {
                toast.success("Thank you.");
            }
        }
        if (this.props.notify.isError) {
            this.props.notifyError(this.props.notify);
        }
    }

    render() {
        //const isSignedIn = this.props.auth.isSignedIn;
        const isSignedIn = true;
        if (isSignedIn) {
            return (
                <ProtectedNavigator />
            )
        } else {
            return <PublicNavigator
                setScreenTitle={this.setScreenTitle}
                setIconName={this.setIconName}
            />
        }
    }
}

const mapStateToProps = (state) => {
    console.log("Landing : ", state);
    const { auth, notify } = state;
    return {
        auth,
        notify,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        notifyError: bindActionCreators(notifyError, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen);
