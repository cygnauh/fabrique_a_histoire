import React from 'react';
import { View, Text, Slider, Image, TouchableOpacity, Alert } from 'react-native';
import Header from '../components/header';
import RectangleButton from '../components/rectangleButton';
import GlobalStyle from '../styles/mainStyle';
import {networkUrl} from "../utils/tools";
import {colors} from "../styles/colors";

export default class Length extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            indicatorColor: colors.paleSalmon,
            isError: false,
            connectText: "Connexion en cours...",
            testConnection : true,
        };
    }


    changeOnClick(value){
        var newVal = ''
        if(value === 0){
            if(this.state.value > 0){
                newVal = this.state.value-1
            }
        }else{
            if(this.state.value < 2){
                newVal = this.state.value+1
            }
        }

        if(newVal !==''){
            this.renderLength(newVal);
            this.setState(() => {
                return { value : newVal}
            })
        }

    }




    onChange(value) {
        this.renderLength(value);
        this.setState(() => {
            return { value : value } // update value
        });
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

    renderLength = (value) => {
        let lengthText = ['Court', 'Moyen', 'Long'],
            lengths = [];
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

        return (
            <View style={GlobalStyle.lengthContainer}>
                {lengths}
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
                <Image style={GlobalStyle.backgroundImage} source={require('../assets/images/background.png')} />
                <Header
                    rightElm="about"
                    onPress={() => this.props.navigation.goBack()}
                    goAbout={() => this.props.navigation.navigate('About')}/>
                <View>
                    {this.renderConnection()}
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

                        {/*<TouchableOpacity onPress={()=>console.log('hello')}>+</TouchableOpacity>*/}
                    </View>
                </View>
                {this.renderNextButton()}
            </View>
        );
    }
}