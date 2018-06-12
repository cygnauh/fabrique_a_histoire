import React from 'react';
import { View, Text, Slider, Image, TouchableOpacity, Alert, Dimensions } from 'react-native';
import Header from '../components/header';
import Video from 'react-native-video';
import RectangleButton from '../components/rectangleButton';
import GlobalStyle from '../styles/mainStyle';
import {networkUrl} from "../utils/tools";
import {colors} from "../styles/colors";
import OnBoardingStyle from "../styles/onboardingStyle";
import {scaleDelta, scaleWidth} from "../utils/scale";

const { width, height } = Dimensions.get('window');


export default class Length extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            indicatorColor: colors.paleSalmon,
            isError: false,
            connectText: "Connexion en cours...",
            testConnection : true,
            detail: {
                short: false,
                medium: true,
                long: false,
            }
        };

        this.connectionSound = "https://noemie-ey.com/fabulab/sounds/design_connexion-2.mp3";
        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onBuffer = this.onBuffer.bind(this);
    }

    onLoad(data) {

        if(!this.baseSound_load){
            this.baseSound_load = true;
        }
        this.setState({duration: data.duration});
    }
    onProgress(data) {
        this.setState({currentTime: data.currentTime});
    }
    onBuffer({isBuffering}: { isBuffering: boolean }) {
        this.setState({isBuffering});
    }

    changeOnClick(value){
        let newVal = '';
        if (value === 0) {
            if (this.state.value > 0){
                newVal = this.state.value-1;
            }
        } else {
            if(this.state.value < 2){
                newVal = this.state.value+1;
            }
        }

        if (newVal !=='') {
            this.renderLength(newVal);
            this.setState(() => {
                return { value : newVal}
            });
            switch (newVal) {
                case 1:
                    this.state.detail.short = false; this.state.detail.medium = true; this.state.detail.long = false;
                    break;
                case 2:
                    this.state.detail.short = false; this.state.detail.medium = false; this.state.detail.long = true;
                    break;
                default:
                    this.state.detail.short = true; this.state.detail.medium = false; this.state.detail.long = false;
                    break;
            }
        }
    }

    onChange(value) {
        this.renderLength(value);
        this.setState(() => {
            return { value : value } // update value
        });
        switch (value) {
            case 1:
                this.state.detail.short = false; this.state.detail.medium = true; this.state.detail.long = false;
                break;
            case 2:
                this.state.detail.short = false; this.state.detail.medium = false; this.state.detail.long = true;
                break;
            default:
                this.state.detail.short = true; this.state.detail.medium = false; this.state.detail.long = false;
                break;
        }
    }

    testConnection = () => {
        fetch(networkUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'testConnection',
            })
        }).then((response) => { // ES6 : change the context
            this.setState(() => {
                return {
                    connectText : "Machine connectée",
                    indicatorColor : colors.greenishTeal,
                    isConnect:true,
                    isError: false,
                    testConnection : false
                }
            });
            return response;
        }).catch((error) => {
            this.setState(() => {
                return {
                    connectText : "Echec de connexion",
                    indicatorColor : colors.deepPink,
                    isError: true,
                    testConnection : false
                }
            });
            setTimeout(() => {
                console.log("Do again the request");
                this.state.testConnection = true;
                this.testConnection();
            }, 10000);
            return error;
        });
    };

    renderConnection = () => {
        const state = this.state;
        let indication = null, text = null;

        if (state.testConnection === true) {
            this.testConnection();
        }

        if (state.isError === true) {
            indication = <Image style={[GlobalStyle.errorIndication]} source={require('../assets/images/warning.png')}/>;
            text = <Text style={[GlobalStyle.connectText, {color: state.indicatorColor}]}>{state.connectText.toUpperCase()}</Text>
        } else if (state.isError === false) {
            indication = <View style={[GlobalStyle.connectIndication, {backgroundColor: state.indicatorColor}]}/>;
            text = <Text style={GlobalStyle.connectText}>{state.connectText.toUpperCase()}</Text>;
        }

        let connection_render =
            <View style={GlobalStyle.connectContainer}>
                {indication}{text}
            </View>;

        return(connection_render)
    };

    renderLengthDetail = (time, age, length) => {
        let time_img = null, age_img = null;

        switch (length) {
            case 1:
                time_img = <Image style={GlobalStyle.iconLength} source={require("../assets/images/length/timeMedium.png")}/>;
                age_img = <Image style={GlobalStyle.iconLength} source={require("../assets/images/length/age7.png")}/>;
                break;
            case 2:
                time_img = <Image style={GlobalStyle.iconLength} source={require("../assets/images/length/timeLong.png")}/>;
                age_img = <Image style={GlobalStyle.iconLength} source={require("../assets/images/length/age8.png")}/>;
                break;
            default:
                time_img = <Image style={GlobalStyle.iconLength} source={require("../assets/images/length/timeShort.png")}/>;
                age_img = <Image style={GlobalStyle.iconLength} source={require("../assets/images/length/age6.png")}/>;
                break;

        }
        return(
            <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    {time_img}
                    <Text style={GlobalStyle.lengthIndication}>{time}</Text>
                </View>
                <View style={{flexDirection: 'row', paddingTop:15}}>
                    {age_img}
                    <Text style={GlobalStyle.lengthIndication}>{age}</Text>
                </View>
            </View>
        )
    };

    renderLength = (value) => {
        let lengthText = ['Court', 'Moyen', 'Long'],
            lengths = [], short_detail = null, medium_detail = null, long_detail = null, justify = null;
        const currentLength = <Text style={[GlobalStyle.lengthItem, GlobalStyle.currentLength]}>{ lengthText[value] }</Text>;
        for (let key = 0, nbLengths = lengthText.length; key < nbLengths; key++) {
            const otherLength = <Text style={[GlobalStyle.lengthItem]}>{ lengthText[key] }</Text>;
            lengths.push(React.cloneElement(otherLength, { key }));
        }

        if (value !== '') {
            let key = value;
            switch (value) {
                case 0:
                    lengths.splice(0, 1, React.cloneElement(currentLength, { key }));
                    break;
                case 2:
                    lengths.splice(2, 1, React.cloneElement(currentLength, { key }));
                    break;
                default:
                    lengths.splice(1, 1, React.cloneElement(currentLength, { key }));
                    break;
            }
        }

        if (this.state.detail.short === true) {
            short_detail = this.renderLengthDetail("15min", "6-7ans", 0);
            justify = 'flex-start';
        }
        if (this.state.detail.medium === true) {
            medium_detail = this.renderLengthDetail("20min", "7-8ans", 1);
            justify = 'center';
        }
        if (this.state.detail.long === true) {
            long_detail = this.renderLengthDetail("45min", "8-9ans", 2);
            justify = 'flex-end';
        }

        return (
            <View>
                <View style={GlobalStyle.lengthContainer}>
                    {lengths}
                </View>
                <View style={[GlobalStyle.lengthContainer, {flexDirection: 'row', justifyContent: justify}]}>
                    {short_detail}{medium_detail}{long_detail}
                </View>
            </View>
        );

    };

    renderNextButton = () => {
        let button = null;
        if (this.state.isError === false) {
            button =
                <RectangleButton
                    content={'Continuer'} src={require('../assets/images/validate.png')}
                    onPress={() => this.props.navigation.navigate('Place', {length: this.state.value})}
                />
        } else {
            button =
                <RectangleButton
                    content={'Continuer'} src={require('../assets/images/validate.png')}
                    onPress={() => Alert.alert(
                        'Attention', 'Vérifiez la connection à la machine avant de passez à la suite.',
                        [{text: 'OK', onPress: () => console.log('OK Pressed')}], { cancelable: false }
                    )}
                />
        }
        return(button)
    };

    render() {
        return(
            <View style={[GlobalStyle.view, GlobalStyle.headerView]}>
                <Header
                    rightElm="about"
                    onPress={() => this.props.navigation.goBack()}
                    goAbout={() => this.props.navigation.navigate('About')}/>
                <View>
                    {this.renderConnection()}
                </View>
                <View>{this.state.isConnect ? (<Video
                    source={{uri: this.connectionSound}}
                    volume={0.5}
                    onLoad={this.onLoad}
                    onBuffer={this.onBuffer}
                    onProgress={this.onProgress}
                    repeat={false}
                />) : null}
                </View>
                <View>
                    <Text style={GlobalStyle.titleContent}>Longueur du récit</Text>
                    <View style={GlobalStyle.lengthSliderContainer}>
                        <TouchableOpacity onPress={()=>{this.changeOnClick(0)}}>
                            <Text style={GlobalStyle.manageLength}>-</Text>
                        </TouchableOpacity>
                        <View>
                            <Slider style={GlobalStyle.lengthSlider} step={1}
                                    minimumTrackTintColor={'#4D4641'}
                                    maximumValue={2}
                                    value={this.state.value}
                                    thumbImage={require('../assets/images/trackSlider.png')}
                                    onValueChange={(value) => this.onChange(value)}/>
                            {this.renderLength(this.state.value)}
                        </View>
                        <TouchableOpacity onPress={()=>{this.changeOnClick(1)}}>
                            <Text style={GlobalStyle.manageLength}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.renderNextButton()}
            </View>
        );
    }
}