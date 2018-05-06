import React from 'react';
import { View, Button } from 'react-native';
import Logo from '../components/logo';
import OnBoardingStyle from "../styles/onboardingStyle";

export default class Header extends React.Component{
    render() {
        return(
            <View>
                <View style={[OnBoardingStyle.backBtn]}>
                    <Button title={'Retour'.toUpperCase()} onPress={ this.props.onPress } />
                </View>
                <Logo/>
            </View>
        );
    }
}