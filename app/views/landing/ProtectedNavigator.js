import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Icon } from "native-base";

//react navigation
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';

//redux for signout
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { signOut } from '_actions/auth.action';

//views
import DashboardScreen from "_views/dashboard/DashboardScreen";
import ProfileScreen from "_views/profile/ProfileScreen";
import BarcodeScreen from "_views/barcode/BarcodeScreen";

//services
import { AlertService as alert } from '_services/alert.service';
import { AuthService as auth } from '_services/auth.service';
import { ToastService as toast } from '_services/toast.service';

//child components
import DrawerHeader from "./DrawerHeader";

/**
 * Set title for spcecifed screen name
 * @param {string} screen 
 */
function setScreenTitle(screen) {
    switch (screen) {
        case 'Dashboard':
            return 'App Dashboard'
        case 'Profile':
            return 'User Profile'
        case 'Barcode':
            return 'Barcode Scanner Demo'
        default:
            return screen
    }
}

/**
 * Set icon name for specified 
 * @param {string} route 
 * @param {bool} focused 
 */
function setIconName(screen, focused) {
    let name, type;
    switch (screen) {
        case "Dashboard":
            type = 'MaterialCommunityIcons'
            name = focused ? 'view-dashboard' : 'view-dashboard-outline';
            break;
        case "Profile":
            type = 'MaterialCommunityIcons'
            name = focused ? 'account' : 'account-outline';
            break;
        case "Barcode":
            type = 'MaterialCommunityIcons'
            name = focused ? 'barcode-scan' : 'barcode';
            break;
        case "Logout":
            type = 'MaterialCommunityIcons'
            name = focused ? 'logout' : 'logout';
            break;
    }
    return { type, name };
}

/**
 * Drawer Navigator Componenet with 
 *      Custom drawer content 
 *      Redux support for signout operation
 */
class ProtectedNavigator extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loggedUser: {}
        }
    }

    componentDidMount = () => {
        //get user profile
        auth.getUserProfile()
            .then((profile) => {
                this.setState({
                    loggedUser: profile
                })
            })
            .catch((error) => {
                toast.error(error)
            })
    }

    handleSignOut = (props) => {
        alert.confirm(
            'Logout',
            'Are you sure?',
            () => {
                this.props.signOut()
            },
            () => {
                props.navigation.closeDrawer();
            }
        )
    }

    getDrawerContent = (props) => {
        return (
            <>
                <DrawerHeader loggedUser={this.state.loggedUser} />
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                    <DrawerItem
                        label="Logout"
                        onPress={(navigation) => this.handleSignOut({ ...props })}
                        style={styles.link}
                        icon={(focused, color, size) => {
                            const { type, name } = setIconName('Logout', focused);
                            return <Icon type={type} name={name} size={size} color={color} />;
                        }}
                    />
                </DrawerContentScrollView>
            </>
        )
    }

    render() {
        const Drawer = createDrawerNavigator();
        return (
            <Drawer.Navigator
                initialRouteName="Dashboard"
                hideStatusBar={true}
                drawerContent={(props) => this.getDrawerContent({ ...props })}
                drawerContentOptions={{
                    itemStyle: styles.link
                }}
                screenOptions={({ route }) => ({
                    drawerLabel: setScreenTitle(route.name),
                    drawerIcon: ({ focused, color, size }) => {
                        const { type, name } = setIconName(route.name, focused);
                        // You can return any component that you like here!
                        return <Icon type={type} name={name} size={size} color={color} />;
                    },
                })}
            >
                <Drawer.Screen name="Dashboard" component={DashboardScreen} />
                <Drawer.Screen name="Profile" component={ProfileScreen} />
                <Drawer.Screen name="Barcode" component={BarcodeScreen} />
            </Drawer.Navigator>
        )
    }
}

const styles = StyleSheet.create({
    link: {
        marginHorizontal: 5,
        borderRadius: 0
    }
});

//export default ProtectedNavigator;
const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: bindActionCreators(signOut, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedNavigator);