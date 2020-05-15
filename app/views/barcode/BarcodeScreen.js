import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Container, Grid, Row, Col, H1, Button, Text, Card, CardItem } from "native-base";
import Colors from '_styles/colors';
import AppHeader from '_components/AppHeader';
import BarcodeScanner from '_libs/barcode/BarcodeScanner';

function ScannedData(props) {
    const scanned = props.data;
    if (scanned == undefined) {
        return <Text>Nothing is scanned.</Text>
    }
    return (
        <Card>
            <CardItem>
                <Text style={styles.scanTitle}>Scanned Data</Text>
            </CardItem>
            <CardItem>
                <Text>Type : {scanned.type}</Text>
            </CardItem>
            <CardItem>
                <Text>Data : {scanned.data}</Text>
            </CardItem>
        </Card>
    )
}


export default class BarcodeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scannerWindow: false,
            scanned: undefined
        }
    }

    initScan = () => {
        this.setState({
            scannerWindow: true
        });
    }

    onScanned = (data, type) => {
        this.setState({
            scannerWindow: false,
            scanned: {
                type: type,
                data: data
            }
        });
    }

    render() {
        return (
            <Container>
                <AppHeader
                    title="Barcode"
                    iconName="barcode-scan"
                    iconType="MaterialCommunityIcons"
                    {...this.props}
                />
                <Grid>
                    <Row size={20}>
                        <Col style={styles.header}>
                            <H1 style={styles.title}>Barcode</H1>
                            <Button primary rounded onPress={this.initScan} >
                                <Text>Scan</Text>
                            </Button>
                        </Col>
                    </Row>
                    <Row size={80}>
                        <Col>
                            {this.state.scannerWindow ?
                                <BarcodeScanner
                                    onScanned={this.onScanned}
                                />
                                :
                                <View style={styles.content}>
                                    <ScannedData data={this.state.scanned} />
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
    },
    title: {
        color: Colors.fg,
    },
    scanTitle: {
        flexGrow: 1,
        textAlign: "center",
        fontSize: 30
    }
});