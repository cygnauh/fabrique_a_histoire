import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import Logo from '../components/logo';
import Print from '../containers/print';
import GlobalStyle from "../styles/mainStyle";

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
            <ScrollView style={{marginBottom:30}}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                <Text style={[GlobalStyle.subtitle, GlobalStyle.storyTitle]}>{this.title}</Text>
                <View>{paragraphs}</View>
            </ScrollView>
        )
    }
    render() {
        return(
            <View style={[GlobalStyle.view]}>
                    <Image style={GlobalStyle.backgroundImage} source={require('../assets/images/background.png')} />
                    <Logo/>
                    {this.renderStory()}
                    <Print onPress={()=>{

                        }
                    }
                           nav={this.props.navigation}
                           title={this.title} story={this.story} sounds={this.sounds} place={this.place}/>
            </View>

        )
    }
}