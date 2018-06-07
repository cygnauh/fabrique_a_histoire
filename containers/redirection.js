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
import Camera from 'react-native-camera';
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
            <View>
                <Camera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    type={Camera.Constants.Type.back}
                    flashMode={Camera.Constants.FlashMode.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                />
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                    <TouchableOpacity
                        onPress={this.takePicture.bind(this)}
                    >
                        <Text style={{fontSize: 14}}> SNAP </Text>
                    </TouchableOpacity>
                </View>
            </View>

        )

    }
    takePicture = async function() {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)
            console.log(data.uri);
        }
    }
}
