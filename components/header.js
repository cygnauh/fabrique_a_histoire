import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import Logo from '../components/logo';
import OnBoardingStyle from "../styles/onboardingStyle";

export default class Header extends React.Component{
    render() {
        // TODO manage pass or about
        return(
            <View>
                <View style={[OnBoardingStyle.backBtn]}>
                    <TouchableOpacity onPress={ this.props.onPress }>
                        <Image style={OnBoardingStyle.iconBack} source={require('../assets/images/iconBack.png')}/>
                        <Text style={OnBoardingStyle.backText}>{'Retour'}</Text>
                    </TouchableOpacity>
                    {/*<TouchableOpacity onPress={ this.props.about }>
                        <Image style={OnBoardingStyle.iconBack} source={require('../assets/images/about.png')}/>
                    </TouchableOpacity>*/}
                </View>
                <Logo/>
            </View>
        );
    }
}