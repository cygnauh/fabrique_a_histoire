import React from 'react';
import {View, Text, TextInput, Animated, Keyboard, ScrollView, Alert, UIManager, findNodeHandle} from 'react-native';
import Header from '../components/header';
import RadioButton from '../components/radioButton';
import RectangleButton from '../components/rectangleButton';
import GlobalStyle from '../styles/mainStyle';
import FormStyle from "../styles/formStyle";
import {scaleDelta, scaleHeight} from "../utils/scale";

const data = require('../assets/data/data_structure.json');

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.length = this.props.navigation.state.params.length;
        this.place = this.props.navigation.state.params.place;
        this.state = {
            // introduction_place: "dans la jungle" + ".",
            introduction_place: this.place,
            introduction_hero_who: "",
            introduction_hero_characteristic: "",
            introduction_hero_description: "",
            introduction_hero_hobbies: "",
            introduction_hero_current_action: "",
            disruption_event_description: "",
            disruption_event_reaction: "",
            disruption_event_decision: "",
            disruption_event_then: "",
            adventure_event_description: "",
            adventure_event_reaction: "",
            partTitle: "Introduction"
        };
        this.partEnd = {
            introduction: '',
            disruption: '',
        };
        this.keyboardHeight = new Animated.Value(0);
    }

    radioBtnOnChange(index, array) {
        array.map((item) => {
            item.selected = false;
        });
        array[index].selected = true;
        this.setState({radioItems: array}); // update view
    }

    inputOnChange = (name, value) => {
        this.setState(() => ({[name]: value}));
    };

    printStory() {
        // Retrieve text
        let short_intro = data.introduction.short,
            short_disrupt = data.disruption.short,
            short_adventure = data.adventure.short,
            state = this.state;

        let intro_expression_1 = short_intro.expression_1.filter((exp) => {
                return exp.selected === true
            }),
            hero = state.introduction_hero_who,
            characteristic = state.introduction_hero_characteristic,
            description = state.introduction_hero_description,
            intro_expression_2 = short_intro.expression_2.filter((exp) => {
                return exp.selected === true
            }),
            hobbies = state.introduction_hero_hobbies,
            current_action = state.introduction_hero_current_action,
            place = state.introduction_place + '.',
            disrupt_expression_1 = short_disrupt.expression_1.filter((exp) => {
                return exp.selected === true
            }),
            disrupt_event = state.disruption_event_description,
            disrupt_reaction = state.disruption_event_reaction,
            disrupt_decision = state.disruption_event_decision,
            disrupt_then = state.disruption_event_then,
            adventure_expression_1 = short_adventure.expression_1.filter((exp) => {
                return exp.selected === true
            }),
            adventure_description = state.adventure_event_description,
            adventure_reaction = state.adventure_event_reaction;

        // Check before retrieve
        if (!hero || !characteristic || !description || !hobbies || !current_action || !disrupt_event || !disrupt_reaction || !disrupt_decision || !disrupt_then || !adventure_description || !adventure_reaction) {
            Alert.alert(
                'Attention',
                "Veuillez remplir tous les champs du formulaire avant d'imprimer l'histoire !",
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            )
        } else {
            // Create the text
            let text_elm = [
                    intro_expression_1[0].label,
                    hero, characteristic,
                    description,
                    intro_expression_2[0].label,
                    hobbies, current_action,
                    place,
                    disrupt_expression_1[0].label,
                    disrupt_event,
                    disrupt_reaction,
                    disrupt_decision,
                    disrupt_then,
                    adventure_expression_1[0].label,
                    adventure_description, adventure_reaction
                ],
                story = '';
            for (let i = 0, count = text_elm.length; i < count; i++) {
                if (i === text_elm.length - 1) {
                    story += text_elm[i] + '.';
                } else {
                    if (text_elm[i] === place || text_elm[i] === disrupt_then) {
                        console.log(text_elm[i]);
                        story += text_elm[i] + '@'; // add @ previous custom words sentence
                    } else {
                        story += text_elm[i] + ' ';
                    }
                }
            }
            console.log(story);

            // Send a request
            // TODO ckeck the address IP of the network to find the raspberry one
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
            }).then(function (response) {
                console.log(response);
                return response;
            }).catch(function (error) {
                return error;
            });

            // TODO Save the story in the database
        }
    }

    renderRadioBtn(label) {
        return (
            <View style={FormStyle.radioGroup}>
                {label.map(
                    (item, key) => (
                        <RadioButton key={key} button={item} onClick={
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
                onChangeText={(text) => this.inputOnChange(name, text)} multiline={true} placeholder={placeholder}
                value={state}/>;

        if (state.length > 0) {
            question = <TextInput style={[FormStyle.question]} editable={false} selectTextOnFocus={false}
                                  value={placeholder}/>;
        }
        return (
            <View>
                {question}{input}
            </View>
        )
    }

    componentWillMount() {
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

    renderTitlePart() {
        return (
            <View style={FormStyle.partTitleContainer}>
                <Text style={FormStyle.partTitleItem}>{this.state.partTitle.toUpperCase()}</Text>;
            </View>
        );
    }
    renderIntroduction() {
        let short_intro = data.introduction.short,
            state = this.state,
            medium_intro_render = null;

        let short_intro_render =
            <View>
                {this.renderRadioBtn(short_intro.expression_1)}
                {this.renderInput("introduction_hero_who", short_intro.hero.who.placeholder, state.introduction_hero_who)}
                {this.renderInput("introduction_hero_characteristic", short_intro.hero.characteristic.placeholder, state.introduction_hero_characteristic)}
                {this.renderInput("introduction_hero_description", short_intro.hero.description.placeholder, state.introduction_hero_description)}
                {this.renderRadioBtn(short_intro.expression_2)}
                {this.renderInput("introduction_hero_hobbies", short_intro.hero_detail.hobbies.placeholder, state.introduction_hero_hobbies)}
                {this.renderInput("introduction_hero_current_action", short_intro.hero_detail.current_action.placeholder, state.introduction_hero_current_action)}
                <TextInput
                    style={[FormStyle.formItem, FormStyle.placeItem]}
                    editable={false} selectTextOnFocus={false}
                    value={state.introduction_place + '.'}/>
            </View>;
        if (this.length === 1 || this.length === 2) {
            medium_intro_render =
                <View>
                    {this.renderInput("introduction_hero_who", short_intro.hero.who.placeholder, state.introduction_hero_who)}
                    {this.renderInput("introduction_hero_characteristic", short_intro.hero.characteristic.placeholder, state.introduction_hero_characteristic)}
                </View>
        }
        if (this.length === 2) {
            // TODO
        }

        return (
            <View style={[FormStyle.formContainer]} ref="Introduction" onLayout={(e) => {
                let view = this.refs['Introduction'],
                    handle = findNodeHandle(view);
                UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                    this.partEnd.introduction = height - scaleHeight(150); // padding bottom
                })
            }}>
                {short_intro_render}
                {medium_intro_render}
            </View>
        );
    }

    renderDisruption() {
        let short_disruption = data.disruption.short,
            state = this.state;
        return (
            <View style={[FormStyle.formContainer]}>
                {this.renderRadioBtn(short_disruption.expression_1)}
                {this.renderInput("disruption_event_description", short_disruption.event.description.placeholder, state.disruption_event_description)}
                {this.renderInput("disruption_event_reaction", short_disruption.event.hero_reaction.placeholder, state.disruption_event_reaction)}
                {this.renderInput("disruption_event_decision", short_disruption.event.hero_decision.placeholder, state.disruption_event_decision)}
                {this.renderInput("disruption_event_then", short_disruption.event.then.placeholder, state.disruption_event_then)}
            </View>
        );
    }

    renderAdventure() {
        let short_adventure = data.adventure.short,
            state = this.state;
        return (
            <Animated.View style={[FormStyle.formContainer, {paddingBottom: this.keyboardHeight}]}>
                {this.renderRadioBtn(short_adventure.expression_1)}
                {this.renderInput("adventure_event_description", short_adventure.event.description.placeholder, state.adventure_event_description)}
                {this.renderInput("adventure_event_reaction", short_adventure.event.hero_reaction.placeholder, state.adventure_event_reaction)}
                <View style={FormStyle.printBtnContainer}>
                    <RectangleButton
                        content={'Imprimer'}
                        src={require('../assets/images/print.png')}
                        onPress={this.printStory.bind(this)}/>
                </View>
            </Animated.View>
        );
    }

    onScroll = (e) => {
        console.log(e.nativeEvent);
        let currentOffset = e.nativeEvent.contentOffset.y; // get the current y position on scroll
        if (currentOffset >= 0 && currentOffset < this.partEnd.introduction) {
            this.setState({partTitle: "Introduction"}); // update view
        }
        if (currentOffset >= this.partEnd.introduction) {
            this.setState({partTitle: "Élément déclencheur"}); // update view
        }
    };

    render() {
        return (
            <View style={[GlobalStyle.view, GlobalStyle.headerView, FormStyle.formView]}>
                <Header onPress={() => this.props.navigation.goBack()}/>
                {this.renderTitlePart()}
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
                            onScroll={this.onScroll}>
                    <View>
                        {this.renderIntroduction()}
                        {this.renderDisruption()}
                        {this.renderAdventure()}
                    </View>
                </ScrollView>
                <Text>{'Length : ' + this.length}</Text>
            </View>
        );
    }
}