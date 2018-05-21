import React from 'react';
import { View, Text, Image } from 'react-native';
import Logo from '../components/logo';
import Print from '../containers/print';
import GlobalStyle from "../styles/mainStyle";

export default class Correction extends React.Component {
    constructor(props) {
        super(props);
        this.story = this.props.navigation.state.params.story;
        this.title = this.props.navigation.state.params.title;
        this.sounds = this.props.navigation.state.params.sounds;
    }
    renderStory() {
        let story_parts = this.story.split("@"),
            paragraphs = [];
        for (let key = 0, nbParts = story_parts.length; key < nbParts; key++) {
            let paragraph = <Text style={[GlobalStyle.text, GlobalStyle.storyText]}>{story_parts[key]}</Text>;
            paragraphs.push(React.cloneElement(paragraph, {key}));
        }

        return(
            <View>
                <Text style={[GlobalStyle.subtitle, GlobalStyle.storyTitle]}>{this.title}</Text>
                <View>{paragraphs}</View>
            </View>
        )
    }
    render() {
        return(
            <View style={[GlobalStyle.view]}>
                <Image style={GlobalStyle.backgroundImage} source={require('../assets/images/background.png')} />
                <Logo/>
                {this.renderStory()}
                <Print prevNav={this.props.navigation} title={this.title} story={this.story} sounds={this.sounds}/>
            </View>
        )
    }
}