import React from 'react';
import {
    View,
    Text,
    Animated,
    StyleSheet,
    Easing,
    Image,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Header from '../components/header';
import RectangleButton from '../components/rectangleButton';
import GlobalStyle from '../styles/mainStyle';
import FormStyle from "../styles/formStyle";



export default class Redirection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            index:1
        }
    }

    redirection(){
        this.setState({
            index: this.state.index+1
        })



        if(this.state.index > 1){
            this.props.navigation.navigate('Length')
        }

        console.log(this.state.index)

    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={(cam) => {
                        this.camera = cam
                    }}
                    style={styles.view}
                    aspect={RNCamera.constants.Aspect.fill}>
                    <Text
                        style={styles.capture}
                        onPress={this.takePicture.bind(this)}>
                        [CAPTURE_IMAGE]
                    </Text>
                </RNCamera>
            </View>
        );
    }

    takePicture() {
        const options = {}

        this.camera.capture({metadata: options}).then((data) => {
            console.log(data)
        }).catch((error) => {
            console.log(error)
        })
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    view: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: 'steelblue',
        borderRadius: 10,
        color: 'red',
        padding: 15,
        margin: 45
    }
});
