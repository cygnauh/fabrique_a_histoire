import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/header';
import RectangleButton from '../components/rectangleButton';
import FormStyle from "../styles/formStyle";
import GlobalStyle from "../styles/mainStyle";

export default class Correction extends React.Component {
    constructor(props) {
        super(props);
        this.story = this.props.navigation.state.params.story;
    }
    renderStory() {
        console.log(this.story);
        return(
            <Text>{this.story}</Text>
        )
    }
    render() {
        return(
            <View style={[GlobalStyle.view, GlobalStyle.headerView]}>
                <Header onPress={() => this.props.navigation.goBack()}/>
                {this.renderStory()}
                <View>
                    <RectangleButton
                        content={'Modifier'}
                        src={require('../assets/images/arrowNext.png')}/>
                    <RectangleButton
                        content={'Imprimer'}
                        src={require('../assets/images/print.png')}/>
                </View>
            </View>
        )
    }
}