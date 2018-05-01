import React from 'react';
import {View, Text, Button, Image} from 'react-native';
import OnBoardingSlide from '../components/onboardingSlide';
import OnBoardingStyle from '../styles/onboardingStyle';


export default class OnBoarding extends React.Component {

    render() {
        return(
            <View>
                <OnBoardingSlide navigation={this.props.navigation}>
                    <View style={OnBoardingStyle.indication}>
                        <Text style={OnBoardingStyle.title}>{'Installation'.toUpperCase()}</Text>
                        <Text>Branchez la machine, allumez-la et placez-là près de vous. Installez les enfants de manière à tous les voir et qu’il puissent vous entendre.</Text>
                    </View>
                    <View style={OnBoardingStyle.indication}>
                        <Text style={OnBoardingStyle.title}>{'Longueur du récit'.toUpperCase()}</Text>
                        <Text>Choisissez en fonction de du public : plus court pour les plus jeunes, ou plus plus long si beaucoup d’enfants participent.</Text>
                    </View>
                    <View style={OnBoardingStyle.indication}>
                        <Text style={OnBoardingStyle.title}>{'Écrire à plusieurs'.toUpperCase()}</Text>
                        <Text>Un récit à compléter apparaît. Pour le remplir, interrogez les enfants à tour de rôle et entrez leurs réponses pour progresser dans l’histoire.</Text>
                    </View>
                    <View style={OnBoardingStyle.indication}>
                        <Text style={OnBoardingStyle.title}>{'Déroulement'.toUpperCase()}</Text>
                        <Text>Des événements inattendus surviendront au cours de la lecture.</Text>
                    </View>
                </OnBoardingSlide>
            </View>
        );
    }
}