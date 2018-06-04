import React from 'react';
import { View, Text, Image } from 'react-native';
import Header from '../components/header';
import GlobalStyle from '../styles/mainStyle.js';

export default class About extends React.Component {

    render() {
        return(
            <View style={[GlobalStyle.headerView, GlobalStyle.aboutPageContainer]}>
                <Image style={GlobalStyle.backgroundImage} source={require('../assets/images/background.png')} />
                <Header
                    onPress={() => this.props.navigation.goBack()}
                    goAbout={() => this.props.navigation.navigate('About')}/>
                <View style={GlobalStyle.aboutContainer}>
                    <Text style={[GlobalStyle.subtitle, GlobalStyle.titleAbout]}>
                        FABULAB propose une expérience d’écriture collective pour enfants de 6 à 10 ans.
                    </Text>
                    <Text style={[GlobalStyle.text, GlobalStyle.aboutText]}>
                        C’est une activité collaborative qui vise à développer l’imagination et la créativité des enfants en réinterprétant la figure du conteur et le principe archétypal de l’histoire contée au coin du feu. Les participants font cercle autour d’un adulte, qui prend le rôle du narrateur. Ce rituel est augmenté par la présence de sons, émis par la machine qui évoque un totem et objet par lequel survient la magie.
                    </Text>
                    <Text style={[GlobalStyle.text, GlobalStyle.aboutText]}>
                        La participation à l’écriture de l’histoire permet à l’enfant de s’affirmer dans le groupe, ce contexte d’« être-ensemble » (François Flahault) instauré par la relation d’écoute et de partage entre le narrateur et les participants. L’absence d’illustrations concentre l’attention de l’enfant sur l’activité de lecture même.
                    </Text>
                    <Text style={[GlobalStyle.text, GlobalStyle.aboutText]}>
                        Dans un second temps et un autre contexte, l’enfant peut à nouveau lire l’histoire pour pratiquer la lecture. Si besoin, il demandera à un proche de l’aider, créant à nouveau le lien conteur-conté avec un proche.
                    </Text>
                </View>
            </View>
        );
    }
}