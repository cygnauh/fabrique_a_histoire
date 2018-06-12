import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import OnBoardingStyle from '../styles/onboardingStyle';

export default class RectangleButton extends React.Component {
    constructor(props){
        super(props);
        this.iconSide = this.props.iconSide;

    }
    render({ onPress } = this.props) {

        if(this.iconSide === "left"){
            return(
                <TouchableOpacity onPress={onPress}>
                    <View style={OnBoardingStyle.buttonLeft} >
                        <Image style={OnBoardingStyle.buttonImg} source={this.props.src}/>
                        <Text style={OnBoardingStyle.buttonText}>{this.props.content.toUpperCase()}</Text>
                    </View>
                </TouchableOpacity>
            );
        }else{
            return(
                <TouchableOpacity onPress={onPress}>
                    <View style={OnBoardingStyle.buttonItem} >
                        <Text style={OnBoardingStyle.buttonText}>{this.props.content.toUpperCase()}</Text>
                        <Image style={OnBoardingStyle.buttonImg} source={this.props.src}/>
                    </View>
                </TouchableOpacity>
            );
        }

    }
}