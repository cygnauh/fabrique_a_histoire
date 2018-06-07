import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight

} from 'react-native';
import { RNCamera } from 'react-native-camera';


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
            index:1
        }
    }

    redirectionWriting(){

        if(this.state.index > 1){
            this.state.index = 1
            this.props.navigation.navigate('Length')
        }else{
            this.setState({
                index: this.state.index+1
            })
        }
    }

    redirectionReading(){
            this.state.index = 1

        //default story
            let num = 1462
            let request = 'https://testappfabulab.herokuapp.com/storysoundsforreading?story=' + num;

            return fetch(request)

                .then((response) => {

                    if (response.status === 500) {
                        this.setState({
                            story_not_found: 1,
                            isLoading: false
                        })
                    } else {
                        response.json()
                            .then((responseJson) => {
                                if (responseJson && responseJson.length === 4) {
                                    this.setState({
                                        response:responseJson
                                    });
                                }

                                if(responseJson && this.state.response){
                                    this.props.navigation.navigate('ReadingMode',{responseJson: this.state.response})
                                }
                                // this.setState({
                                //     isLoading: false,
                                // });
                            })
                    }
                })

                .catch((error) => {
                    console.error(error);
                });
    }

    render() {
        return (
            <TouchableHighlight style={{flex:1}} onPress={()=>this.redirectionWriting()} onLongPress={()=>this.redirectionReading()}>
                <View style={styles.container}>
                    <RNCamera
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                    >
                        {({ camera, status }) => {
                            if (status !== 'READY') return <PendingView />;
                            return (
                                <View style={{opacity: 0 ,flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                                        <Text style={{ fontSize: 14 }}> SNAP </Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    </RNCamera>
                </View>
             </TouchableHighlight>

        );
    }

    takePicture = async function(camera) {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        //  eslint-disable-next-line
        console.log(data.uri);
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
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
