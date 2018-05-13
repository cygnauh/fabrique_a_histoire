import React from 'react';
import { View, Text, Image } from 'react-native';
import Header from '../components/header';
import RectangleButton from '../components/rectangleButton';
import GlobalStyle from "../styles/mainStyle";

export default class Correction extends React.Component {
    constructor(props) {
        super(props);
        this.story = this.props.navigation.state.params.story;
        this.title = this.props.navigation.state.params.title;
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
            <View style={[GlobalStyle.view, GlobalStyle.headerView]}>
                <Image style={GlobalStyle.backgroundImage} source={require('../assets/images/background.png')} />
                <Header onPress={() => this.props.navigation.goBack()}/>
                {this.renderStory()}
                <View style={GlobalStyle.reReadingBtnContainer}>
                    <RectangleButton
                        content={'Modifier'}
                        src={require('../assets/images/arrowNext.png')}
                        onPress={() => this.props.navigation.goBack()}/>
                    <RectangleButton
                        content={'Imprimer'}
                        src={require('../assets/images/print.png')}/>
                </View>
            </View>
        )
    }
}