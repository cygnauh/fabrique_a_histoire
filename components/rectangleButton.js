import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import OnBoardingStyle from '../styles/onboardingStyle';

export default class RectangleButton extends React.Component {
    render({ onPress } = this.props) {
        return(
            <TouchableOpacity onPress={onPress} activeOpacity={1}>
                <View style={OnBoardingStyle.buttonItem} >
                    <Text style={OnBoardingStyle.buttonText}>{this.props.content.toUpperCase()}</Text>
                    <Image style={OnBoardingStyle.buttonImg} source={this.props.src}/>
                </View>
            </TouchableOpacity>
        );
    }
}