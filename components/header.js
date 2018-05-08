import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Logo from '../components/logo';
import OnBoardingStyle from "../styles/onboardingStyle";

export default class Header extends React.Component{
    render() {
        return(
            <View>
                <View style={[OnBoardingStyle.backBtn]}>
                    <TouchableOpacity onPress={ this.props.onPress }>
                        <Image style={OnBoardingStyle.iconBack} source={require('../assets/images/iconBack.png')}/>
                    </TouchableOpacity>
                </View>
                <Logo/>
            </View>
        );
    }
}