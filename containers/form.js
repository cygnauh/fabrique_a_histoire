import React from 'react';
import { View, Text, Button } from 'react-native';
import Logo from '../components/logo';
import RadioButton from '../components/radioButton';
import Input from '../components/input';
import GlobalStyle from '../styles/mainStyle';
import FormStyle from "../styles/formStyle";

const data = require('../assets/data/data_structure.json');
console.log(data);

export default class Form extends React.Component{
    constructor(props) {
        super(props);
        this.length = this.props.navigation.state.params.length;
        this.state = {
            place: 'dans la jungle',
            hero_who: '',
            hero_appearance: '',
            hero_hobbies: '',
            hero_current_action: ''
        }
    }

    radioBtnOnChange(index, array) {
        array.map( (item) => {
            item.selected = false;
        });
        array[index].selected = true;
        this.setState({ radioItems: array }); // update view
    }

    printStory() {
        // Retrieve text
        let expression_1 = data.introduction.expression_1.filter((exp) => {return exp.selected === true}),
            hero = this.state.hero_who,
            appearance = this.state.hero_appearance,
            expression_2 = data.introduction.expression_2.filter((exp) => {return exp.selected === true}),
            hobbies = this.state.hero_hobbies,
            current_action = this.state.hero_current_action,
            place = this.state.place,
            text_elm = [expression_1[0].label, hero, appearance, expression_2[0].label, hobbies, current_action, place],
            story = '';

        for (let i = 0, count = text_elm.length; i < count; i++) {
            if (i === text_elm.length - 1) {
                story += text_elm[i] + '.';
            } else {
                story += text_elm[i] + ' ';
            }
        }

        // Send a request
        fetch('http://192.168.0.37:8080/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: story
            })
        }).then(function(response) {
            console.log(response);
            return response;
        }).catch(function(error) {
            return error;
        });

        // Save the story in the database
    }

    render() {
        return(
            <View style={GlobalStyle.view}>
                <View>
                    <Button title={'Retour'.toUpperCase()} onPress={() => this.props.navigation.goBack()}/>
                    <Logo/>
                </View>
                <View>
                    <View style={FormStyle.radioGroup}>
                        {data.introduction.expression_1.map(
                            (item, key) => (
                                <RadioButton key = { key } button = { item } onClick = {
                                    this.radioBtnOnChange.bind(this, key, data.introduction.expression_1)
                                }/>
                            )
                        )}
                    </View>
                    <Input onChange = {
                        (text) => this.setState({ hero_who: text})
                    } placeholder = { data.introduction.hero.who.placeholder } value = { this.state.hero_who } />
                    <Input onChange = {
                        (text) => this.setState({ hero_appearance: text})
                    } placeholder = { data.introduction.hero.appearance.placeholder } value = { this.state.hero_appearance}/>
                    <View style={FormStyle.radioGroup}>
                        {data.introduction.expression_2.map(
                            (item, key) => (
                                <RadioButton key = { key } button = { item } onClick = {
                                    this.radioBtnOnChange.bind(this, key, data.introduction.expression_2)
                                }/>
                            )
                        )}
                    </View>
                    <Input onChange = {
                        (text) => this.setState({ hero_hobbies: text})
                    } placeholder = { data.introduction.hero_detail.hobbies.placeholder } value = {this.state.hero_hobbies } />
                    <Input onChange = {
                        (text) => this.setState({ hero_current_action: text})
                    } placeholder = { data.introduction.hero_detail.current_action.placeholder } value = {this.state.hero_current_action }/>
                    <Text>{this.state.place}.</Text>
                </View>
                <Button title={'Imprimer'.toUpperCase()} onPress = { this.printStory.bind(this) }/>
                <Text>{'Length : ' + this.length}</Text>

            </View>
        );
    }
}