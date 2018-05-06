import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import OnBoardingStyle from '../styles/onboardingStyle';

export default class RectangleButton extends React.Component {
    render({ onPress } = this.props) {
        return(
            <TouchableOpacity onPress={onPress} activeOpacity={1}>
                <View>
                    <Text style={OnBoardingStyle.button}>{this.props.content.toUpperCase()}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}