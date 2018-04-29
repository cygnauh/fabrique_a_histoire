import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import GlobalStyle from '../styles/main.js';

export default class Home extends React.Component {
    render() {
        return(
            <View style={GlobalStyle.view}>
                <Image style={GlobalStyle.logo} source={require('../images/colorfulLogo.png')} />
                <View>
                    <Text style={GlobalStyle.title}>Bienvenue</Text>
                    <Text>dans la fabrique à histoire</Text>
                </View>
                <Text>Repérer le code de votre machine ou d'une histoire pour commencer l'expérience</Text>
                <Button title={'Commencer'.toUpperCase()}/>
            </View>
        );
    }
}