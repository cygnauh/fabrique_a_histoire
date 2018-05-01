import React from 'react';
import { View, Text, Button } from 'react-native';
import GlobalStyle from '../styles/main';

export default class Form extends React.Component{
    render() {
        return(
            <View style={GlobalStyle.view}>
                <Button title={'Retour'.toUpperCase()} onPress={() => this.props.navigation.navigate('Home')}/>
                <Text>
                    I'm the form
                </Text>
            </View>
        );
    }
}