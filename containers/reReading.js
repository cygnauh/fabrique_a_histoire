import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import Logo from '../components/logo';
import Header from '../components/header';
import Print from '../containers/print';
import FormStyle from "../styles/formStyle";
import GlobalStyle from "../styles/mainStyle";
import {scaleHeight} from "../utils/scale";

export default class Correction extends React.Component {
    constructor(props) {
        super(props);
        this.story = this.props.navigation.state.params.story;
        this.title = this.props.navigation.state.params.title;
        this.sounds = this.props.navigation.state.params.sounds;
        this.place = this.props.navigation.state.params.place;
        this.formState = this.props.navigation.state.params.state;

        if(this.formState){
                this.formState.playPlaceSound=false;
        }
    }
    renderStory() {
        let story_parts = this.story.split("@"),
            paragraphs = [];
        for (let key = 0, nbParts = story_parts.length; key < nbParts; key++) {
            let paragraph = <Text style={[GlobalStyle.text, GlobalStyle.storyText]}>{story_parts[key]}</Text>;
            paragraphs.push(React.cloneElement(paragraph, {key}));
        }

        return(
            <ScrollView
                style={{marginTop: scaleHeight(40), marginBottom: scaleHeight(30)}} bounces={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                <Text style={[GlobalStyle.subtitle, GlobalStyle.storyTitle]}>{this.title}</Text>
                <View>{paragraphs}</View>
            </ScrollView>
        )
    }
    render() {
        return(
            <View style={[GlobalStyle.view, GlobalStyle.headerView]}>
                    <Header
                        leftElm="home" rightElm="about"
                        goHome={() => this.props.navigation.navigate('Home')}
                        goAbout={() => this.props.navigation.navigate('About')}/>
                    {this.renderStory()}
                    <Print
                        nav={this.props.navigation}
                        title={this.title} story={this.story} sounds={this.sounds} place={this.place}/>
            </View>

        )
    }
}