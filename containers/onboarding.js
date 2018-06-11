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
                        <Image style={OnBoardingStyle.image} source = {require('../assets/images/onbording/onboarding1.png')}/>
                        <Text style={OnBoardingStyle.title}>{'Avant de commencer'}</Text>
                        <Text style={[GlobalStyle.text, OnBoardingStyle.text]}>N’oubliez pas de vérifier qu’il y ait du papier dans la machine, qu’elle soit branchée et qu’il y ait réseau wifi dans la pièce.</Text>
                    </View>
                    <View style={OnBoardingStyle.indication}>
                        <Image style={OnBoardingStyle.image} source = {require('../assets/images/onbording/onboarding1.png')}/>
                        <Text style={OnBoardingStyle.title}>{'Histoire au coin du feu'}</Text>
                        <Text style={[GlobalStyle.text, OnBoardingStyle.text]}>Installez les enfants près de la machine, à environ 2m, comme elle émettra des sons. Il faut qu’ils puissent aussi vous voir et vous entendre.</Text>
                    </View>
                    <View style={OnBoardingStyle.indication}>
                        <Image style={OnBoardingStyle.image} source = {require('../assets/images/onbording/onboarding1.png')}/>
                        <Text style={OnBoardingStyle.title}>{'Écrire avec les enfants'}</Text>
                        <Text style={[GlobalStyle.text, OnBoardingStyle.text]}>Faites participer les enfants à tour de rôle pour compléter l’histoire</Text>
                    </View>
                    <View style={OnBoardingStyle.indication}>
                        <Image style={OnBoardingStyle.image} source = {require('../assets/images/onbording/onboarding1.png')}/>
                        <Text style={OnBoardingStyle.title}>{'Rendre la séance vivante'}</Text>
                        <Text style={[GlobalStyle.text, OnBoardingStyle.text]}>FABULAB suggère des questions à leur poser. N'hésitez pas à reformuler et à intégrer les personnages inventés par les enfants.</Text>
                    </View>
                    <View style={OnBoardingStyle.indication}>
                        <Image style={OnBoardingStyle.image} source = {require('../assets/images/onbording/onboarding1.png')}/>
                        <Text style={OnBoardingStyle.title}>{'Clôturer l’expérience'}</Text>
                        <Text style={[GlobalStyle.text, OnBoardingStyle.text]}>Quand l’histoire est terminée, n’oubliez pas d’éteindre la machine depuis la tablette.
                        </Text>
                    </View>
                </OnBoardingSlide>
            </View>
        );
    }
}