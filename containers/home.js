import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image } from 'react-native';
import Logo from '../components/logo';
import GlobalStyle from '../styles/mainStyle.js';

export default class Home extends React.Component {

    componentDidMount() {
        StatusBar.setHidden(true);
    }

render() {
        return(
            <View style={GlobalStyle.view}>
                <Image style={GlobalStyle.backgroundImage} source={require('../assets/images/background.png')} />
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

                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Onboarding')} }>
                    <Text style={GlobalStyle.homeBtn}>{'Commencer'.toUpperCase()}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('readingMode')} }>
                    <Text style={GlobalStyle.homeBtn}>{'Lecture'.toUpperCase()}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}