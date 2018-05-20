import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import FormStyle from '../styles/formStyle';

export default class RadioButton extends React.Component {
    constructor(props) {
        super(props);
    }

    renderBtn() {
        let selected =
                <View style={FormStyle.radioBtnContainer}>
                    <Text style={[FormStyle.radioSelected, FormStyle.formItem, FormStyle.itemChange]}>{this.props.button.label}</Text>
                    <Image style={FormStyle.radioBtnChange} source={require('../assets/images/arrowChange.png')}/>
                </View>,
            unselected =
                <View style={FormStyle.radioBtnContainer} >
                    <View style={FormStyle.radioBtnLine}/>
                    <Text style={[FormStyle.radioUnselected, FormStyle.formItem]}>{this.props.button.label}</Text>
                </View>;

        if (this.props.button.selected) {
            if (this.props.button.selected === "none") {
                return(unselected)
            } else {
                return(selected)
            }
        }
    }

    render() {
        return (
            <TouchableOpacity onPress = { this.props.onClick }>
                {this.renderBtn()}
            </TouchableOpacity>
        );
    }
}