import React from 'react';
import {View, Text, Image} from 'react-native';
import OnBoardingSlide from '../components/onboardingSlide';
import GlobalStyle from '../styles/mainStyle';
import OnBoardingStyle from '../styles/onboardingStyle';


export default class OnBoarding extends React.Component {

    render() {
        return(
            <View>
                <OnBoardingSlide navigation={this.props.navigation}>
                    <View style={OnBoardingStyle.indication}>
                        <Text style={OnBoardingStyle.title}>{'Installation'}</Text>
                        <Text style={[GlobalStyle.text, OnBoardingStyle.text]}>Branchez la machine, allumez-la et placez-là près de vous. Installez les enfants de manière à tous les voir et qu’il puissent vous entendre.</Text>
                    </View>
                    <View style={OnBoardingStyle.indication}>
                        <Text style={OnBoardingStyle.title}>{'Longueur du récit'}</Text>
                        <Text style={[GlobalStyle.text, OnBoardingStyle.text]}>Choisissez en fonction de du public : plus court pour les plus jeunes, ou plus plus long si beaucoup d’enfants participent.</Text>
                    </View>
                    <View style={OnBoardingStyle.indication}>
                        <Text style={OnBoardingStyle.title}>{'Écrire à plusieurs'}</Text>
                        <Text style={[GlobalStyle.text, OnBoardingStyle.text]}>Un récit à compléter apparaît. Pour le remplir, interrogez les enfants à tour de rôle et entrez leurs réponses pour progresser dans l’histoire.</Text>
                    </View>
                    <View style={OnBoardingStyle.indication}>
                        <Text style={OnBoardingStyle.title}>{'Déroulement'}</Text>
                        <Text style={[GlobalStyle.text, OnBoardingStyle.text]}>Des événements inattendus surviendront au cours de la lecture.</Text>
                    </View>
                </OnBoardingSlide>
            </View>
        );
    }
}