import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import Logo from '../components/logo';
import OnBoardingStyle from "../styles/onboardingStyle";

export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAbout: false,
            isBack: true,
        };
        this.leftElm = this.props.leftElm;
        this.rightElm = this.props.rightElm;
    }

    render() {
        let about = null,
            back = null,
            alignElm: null;

        switch (this.leftElm) {
            case 'about': this.state.isAbout = true; break;
            default: this.state.isAbout = false; break;
        }
        switch (this.rightElm) {
            case 'none':
                this.state.isBack = false;
                alignElm = 'flex-end';
                break;
            default:
                this.state.isBack = true;
                alignElm = 'space-between';
                break;
        }

        if (this.state.isBack === true) {
            back =
                <TouchableOpacity onPress={ this.props.onPress }>
                    <Image style={OnBoardingStyle.iconBack} source={require('../assets/images/iconBack.png')}/>
                    <Text style={OnBoardingStyle.backText}>{'Retour'}</Text>
                </TouchableOpacity>
        }
        if (this.state.isAbout === true) {
            about =
                <TouchableOpacity onPress={this.props.goAbout} >
                    <Image style={OnBoardingStyle.iconAbout} source={require('../assets/images/about.png')}/>
                </TouchableOpacity>;
        }

        return(
            <View>
                <View style={[OnBoardingStyle.backBtn, {justifyContent: alignElm}]}>
                    {back}{about}
                </View>
                <Logo/>
            </View>
        );
    }
}