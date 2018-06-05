import React from 'react';
import { Image, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import Header from '../components/header';
import GlobalStyle from '../styles/mainStyle.js';

export default class Home extends React.Component {

    componentDidMount() {
        StatusBar.setHidden(true);
    }

render() {
        return(
            <View style={[GlobalStyle.view, GlobalStyle.headerView]}>
                <Image style={GlobalStyle.backgroundImage} source={require('../assets/images/background.png')} />
                <Header
                    leftElm="none" rightElm="about"
                    onPress={() => this.props.navigation.goBack()}
                    goAbout={() => this.props.navigation.navigate('About')}/>
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
            </View>
        );
    }
}