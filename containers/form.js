import React from 'react';
import { View, Text, Button } from 'react-native';
import GlobalStyle from '../styles/main';

export default class Form extends React.Component{
    constructor(props) {
        super(props);
        this.length = this.props.navigation.state.params.length;
    }

    render() {
        return(
            <View style={GlobalStyle.view}>
                <Button title={'Retour'.toUpperCase()} onPress={() => this.props.navigation.goBack()}/>
                /* Put form component */
                <Text>{'Length : ' + this.length}</Text>
            </View>
        );
    }
}