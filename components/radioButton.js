import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import FormStyle from '../styles/formStyle';

export default class RadioButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity onPress = { this.props.onClick }>
                {(this.props.button.selected)
                    ? <Text style={[FormStyle.radioSelected, FormStyle.radioItem]}>{this.props.button.label}</Text>
                    : <Text style={[FormStyle.radioUnselected, FormStyle.radioItem]}>{this.props.button.label}</Text>
                }
            </TouchableOpacity>
        );
    }
}