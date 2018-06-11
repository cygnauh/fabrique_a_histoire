import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    Animated

} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Header from '../components/header';
import OnBoarding from "./onboarding";
import GlobalStyle from "../styles/mainStyle";
import {scaleHeight, scaleWidth} from "../utils/scale";


const PendingView = () => (
    <View
        style={{
            flex: 1,
            backgroundColor: 'lightgreen',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <Text>Waiting</Text>
    </View>
);


export default class Redirection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            index: 1,
            opacity: new Animated.Value(0)
        }
    }

    animationDisplayValidation() {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start()
    }

    redirectionWriting() {

        if (this.state.index > 1) {
            this.state.index = 1

            this.setState({
                scanValid: true
            })


            this.animationDisplayValidation()

            setTimeout(() => {
                this.props.navigation.navigate('Onboarding')
            }, 1000)


        } else {
            this.setState({
                index: this.state.index + 1
            })
        }
    }

    redirectionReading() {

        console.log("okok")
        this.state.index = 1

        //default story

        // let num = this.props.navigation.state.params.num
        //                         console.log(num)
        // let request = 'https://testappfabulab.herokuapp.com/storysoundsforreading?story=' + num;
        //
        //


        fetch('https://testappfabulab.herokuapp.com/laststory')

            .then((response) => {

                if (response.status === 500) {
                    this.setState({
                        story_not_found: 1,
                        isLoading: false
                    })
                } else {
                    response.json()
                        .then((responseJson) => {
                            this.setState({
                                responseLastStory: responseJson
                            });

                            let num = this.state.responseLastStory[0].id

                            fetch('https://testappfabulab.herokuapp.com/storysoundsforreading?story=' + num)

                                .then((response) => {

                                    if (response.status === 500) {
                                        console.log("444")
                                        this.setState({
                                            story_not_found: 1,
                                            isLoading: false
                                        })
                                    } else {
                                        response.json()
                                            .then((responseJson) => {
                                                if (responseJson && responseJson.length === 4) {
                                                    this.setState({
                                                        response: responseJson
                                                    });
                                                }

                                                if (responseJson && this.state.response) {


                                                    console.log("hello")

                                                    this.setState({
                                                        scanValid: true
                                                    })

                                                    this.animationDisplayValidation()

                                                    setTimeout(() => {
                                                        this.props.navigation.navigate('ReadingMode', {responseJson: this.state.response})
                                                    }, 1000)

                                                }
                                            })
                                    }
                                })


                        })
                }
            })


            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <TouchableHighlight style={{flex: 1}}
                                onPress={() => this.redirectionWriting()}
                                onLongPress={() => this.redirectionReading()}>
                <View style={[GlobalStyle.view, styles.container]}>
                    <Header
                        leftElm="back" rightElm="about"
                        onPress={() => this.props.navigation.goBack()}
                        goAbout={() => this.props.navigation.navigate('About')}/>
                    <RNCamera
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                    >
                        {({camera, status}) => {
                            if (status !== 'READY') return <PendingView/>;
                            return (
                                <View>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        top: 300
                                    }}>
                                        <Image style={{
                                            height: scaleWidth(150),
                                            width: scaleWidth(150),
                                            paddingTop: 20,

                                        }} source={require('../assets/images/scan/scan1.png')}/>
                                        {/*VALID*/}

                                        {this.state.scanValid ? (
                                            <Animated.Image
                                                onLoad={this.animationDisplayValidation()}
                                                style={
                                                    {
                                                        position: "absolute",
                                                        height: scaleWidth(16),
                                                        width: scaleWidth(16),
                                                        left: (scaleWidth(150) / 2) - scaleWidth(20) / 2,
                                                        top: ((scaleWidth(150) / 2) - scaleWidth(20) / 2),
                                                        opacity: this.state.opacity,
                                                        transform: [{
                                                            scale: this.state.opacity.interpolate({
                                                                inputRange: [0, 1],
                                                                outputRange: [0.85, 1],
                                                            })
                                                        }]
                                                    }
                                                }
                                                source={require('../assets/images/scan/scanOk.png')}
                                            />
                                        ) : null}

                                    </View>
                                    <View style={{opacity: 0, flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
                                        <TouchableOpacity onPress={() => this.takePicture(camera)}
                                                          style={styles.capture}>
                                            <Text style={{fontSize: 14}}> SNAP </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            );
                        }}
                    </RNCamera>
                </View>
            </TouchableHighlight>

        );
    }

    takePicture = async function (camera) {
        const options = {quality: 0.5, base64: true};
        const data = await camera.takePictureAsync(options);
        //  eslint-disable-next-line
        console.log(data.uri);
    }

}


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    }
});
