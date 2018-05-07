import React from 'react';
import { View, Text, Button, StatusBar, AsyncStorage } from 'react-native';
import Logo from '../components/logo';
import GlobalStyle from '../styles/mainStyle.js';

export default class Home extends React.Component {

    componentDidMount() {
        StatusBar.setHidden(true);
    }

render() {
        return(
            <View style={GlobalStyle.view}>
                <Logo/>
                <View style={GlobalStyle.titleHeader}>
                    <View style={GlobalStyle.titleContainer}>
                        <Text style={GlobalStyle.title}>Bienvenue</Text>
                        <Text style={GlobalStyle.subtitle}>dans Fabulab</Text>
                    </View>
                    <View style={GlobalStyle.line}/>
                </View>
                <Text style={[GlobalStyle.text, GlobalStyle.homeText]}>
                    Repérer le code de votre machine ou d'une histoire pour commencer l'expérience
                </Text>

                <Button title={'Commencer'.toUpperCase()} onPress={() => {
                    this.props.navigation.navigate('Onboarding')} } />
            </View>
        );
    }
}