import React from 'react';
import { TextInput } from 'react-native';
import FormStyle from "../styles/formStyle";

export default class Input extends React.Component {
    render() {
        return(
            <TextInput style={[FormStyle.inputItem, FormStyle.formItem]} onChangeText={this.props.onChange} placeholder={this.props.placeholder} value={this.props.value}/>
        );
    }
}