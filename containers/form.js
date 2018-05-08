import React from 'react';
import { View, TextInput, Animated, Keyboard, ScrollView, KeyboardAvoidingView } from 'react-native';
import Header from '../components/header';
import RadioButton from '../components/radioButton';
import RectangleButton from '../components/rectangleButton';
import GlobalStyle from '../styles/mainStyle';
import FormStyle from "../styles/formStyle";
import {scaleHeight} from "../utils/scale";

const data = require('../assets/data/data_structure.json');

export default class Form extends React.Component{
    constructor(props) {
        super(props);
        this.length = this.props.navigation.state.params.length;
        this.keyboardHeight = new Animated.Value(0);
        this.state = {
            introduction_place: "dans la jungle",
            introduction_hero_who: "",
            introduction_hero_characteristic: "",
            introduction_hero_description: "",
            introduction_hero_hobbies: "",
            introduction_hero_current_action: "",
            disruption_event_description: "",
            disruption_event_reaction: "",
            disruption_event_decision: "",
            disruption_event_then: "",
        };
    }

    radioBtnOnChange(index, array) {
        array.map( (item) => {
            item.selected = false;
        });
        array[index].selected = true;
        this.setState({ radioItems: array }); // update view
    }
    inputOnChange = (name, value) => {
        this.setState(() => ({ [name]: value }));
    };

    printStory() {
        // Retrieve text
        let intro = data.introduction,
            state = this.state;
        let expression_1 = intro.expression_1.filter((exp) => {return exp.selected === true}),
            hero = state.introduction_hero_who,
            characteristic = state.introduction_hero_characteristic,
            description = state.introduction_hero_description,
            expression_2 = intro.expression_2.filter((exp) => {return exp.selected === true}),
            hobbies = state.introduction_hero_hobbies,
            current_action = state.introduction_hero_current_action,
            place = state.introduction_place,
            text_elm = [expression_1[0].label, hero, characteristic, description, expression_2[0].label, hobbies, current_action, place],
            story = '';

        for (let i = 0, count = text_elm.length; i < count; i++) {
            if (i === text_elm.length - 1) {
                story += text_elm[i] + '.';
            } else {
                story += text_elm[i] + ' ';
            }
        }
        console.log(story);

        // Send a request
        let home_url = 'http://192.168.0.37:8080/',
            christine_url = 'http://192.168.43.70:8080/';
        fetch(christine_url, {
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

    renderRadioBtn(label) {
        return(
            <View style={FormStyle.radioGroup}>
                {label.map(
                    (item, key) => (
                        <RadioButton key = { key } button = { item } onClick = {
                            this.radioBtnOnChange.bind(this, key, label)
                        }/>
                    )
                )}
            </View>
        )
    }
    renderInput(name, placeholder, state) {
        let question = null,
            input = <TextInput
                style={[FormStyle.inputItem, FormStyle.formItem, state !== "" && FormStyle.onChange]}
                onChangeText={(text) => this.inputOnChange(name, text)} multiline={true} placeholder={placeholder} value={state}/>;
        if (state !== "") {
            question = <TextInput style={[FormStyle.question]} editable={false} selectTextOnFocus={false} value = {placeholder}/>;
        }
        return(
            <View>
                {question}{input}
            </View>
        )
    }


    componentWillMount () {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }
    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }
    keyboardWillShow = (e) => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: e.duration,
                toValue: e.endCoordinates.height,
            }),
        ]).start();
    };
    keyboardWillHide = (e) => {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: e.duration,
                toValue: 0,
            }),
        ]).start();
    };

    renderIntroduction() {
        let intro = data.introduction,
            state = this.state;
        return (
            <View style={[FormStyle.formContainer]}>
                {this.renderRadioBtn(intro.expression_1)}
                {this.renderInput("introduction_hero_who", intro.hero.who.placeholder, state.introduction_hero_who)}
                {this.renderInput("introduction_hero_characteristic", intro.hero.characteristic.placeholder, state.introduction_hero_characteristic)}
                {this.renderInput("introduction_hero_description", intro.hero.description.placeholder, state.introduction_hero_description)}
                {this.renderRadioBtn(intro.expression_2)}
                {this.renderInput("introduction_hero_hobbies", intro.hero_detail.hobbies.placeholder, state.introduction_hero_hobbies)}
                {this.renderInput("introduction_hero_current_action", intro.hero_detail.current_action.placeholder, state.introduction_hero_current_action)}
                <TextInput
                    style={[FormStyle.formItem, FormStyle.placeItem]}
                    editable={false} selectTextOnFocus={false}
                    value = {state.introduction_place + '.'}/>
            </View>
        );
    }
    renderDisruption() {
        let disruption = data.disruption,
            state = this.state;
        return (
            <Animated.View style={[FormStyle.formContainer, { paddingBottom: this.keyboardHeight }]}>
                {this.renderRadioBtn(data.disruption.expression_1)}
                {this.renderInput("disruption_event_description", disruption.event.description.placeholder, state.disruption_event_description)}
                {this.renderInput("disruption_event_reaction", disruption.event.hero_reaction.placeholder, state.disruption_event_reaction)}
                {this.renderInput("disruption_event_decision", disruption.event.hero_decision.placeholder, state.disruption_event_decision)}
                {this.renderInput("disruption_event_then", disruption.event.then.placeholder, state.disruption_event_then)}
            </Animated.View>
        );
    }

    render() {

        return(
            <View style={[GlobalStyle.view, GlobalStyle.headerView, FormStyle.formView]}>
                <Header onPress={() => this.props.navigation.goBack()}/>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} >
                    {this.renderIntroduction()}
                    {this.renderDisruption()}
                    <View style={FormStyle.printBtnContainer}>
                        <RectangleButton
                            content={'Imprimer'}
                            src={require('../assets/images/print.png')}
                            onPress = { this.printStory.bind(this) }/>
                    </View>
                </ScrollView>
                {/*<Text>{'Length : ' + this.length}</Text>*/}
            </View>
        );
    }
}