import React from 'react';
import {View, Text, TextInput, Animated, Keyboard, ScrollView, Alert, UIManager, findNodeHandle, TouchableOpacity, Image} from 'react-native';
import Header from '../../components/header';
import RadioButton from '../../components/form/radioButton';
import RectangleButton from '../../components/rectangleButton';
import FormTextImposed from '../../components/form/textImposed';
import GlobalStyle from '../../styles/mainStyle';
import FormStyle from "../../styles/formStyle";
import Video from 'react-native-video';
import { scaleDelta, scaleHeight } from "../../utils/scale";
import { getRandomInt, delEndDot, addEndDot, upperCaseFirst } from "../../utils/tools";

const data = require('../../assets/data/structure.json');
const imposed_events = require('../../assets/data/imposed_events');
const short_intro = data.introduction.short;
const medium_intro = data.introduction.medium;
const long_intro = data.introduction.long;
const short_disrupt = data.disruption.short;
const long_disrupt = data.disruption.long;
const short_adventure = data.adventure.short;
const medium_adventure = data.adventure.medium;
const long_adventure = data.adventure.long;
const short_outcome = data.outcome.short;
const short_conclusion = data.conclusion.short;

export default class Form extends React.Component {

    constructor(props) {
        super(props);
        this.length = this.props.navigation.state.params.length;
        this.basesound = this.props.navigation.state.params.basesound;
        this.validationSound = "https://christinehuang.fr/BDDI2018/sounds/VALIDATION/validation.mp3";
        this.place = this.props.navigation.state.params.place;
        this.story_sounds = [];
        this.state = {
            part_title: "Introduction",
            current_navigation: 1,

            intro_hero_who: "", intro_hero_characteristic: "",
            intro_hero_habit_before: "", intro_hero_habit: short_intro.hero.habit, intro_hero_habit_after: "", intro_place: this.place.name.toLowerCase(),
            intro_hero_now: short_intro.expression_2[getRandomInt(0, short_intro.expression_2.length - 1)], intro_hero_current_action: "",
            intro_partner_who: "", intro_partner_how: "", intro_description_where: "", intro_description_time: "",

            disrupt_description: "",
            disrupt_message: long_disrupt.message[getRandomInt(0, long_disrupt.message.length - 1)], disrupt_content: "",

            advent_hero_reaction: "", advent_partner_reaction: "",
            adventure_event_id: getRandomInt(0, imposed_events.events.length - 1),
            advent_then: "", advent_consequence: "", advent_emotion: "", advent_action: "",

            outcome_description_solution: "",
            outcome_description_then: "",
            conclusion_description_change: "",
            conclusion_description_learn: "",

            intro_exp_selected: false, disrupt_exp_selected: false,
            adventure_exp_selected_1: false, adventure_exp_selected_2: false,
            outcome_exp_selected: false, end_exp_selected: false,
        };
        this.partEnd = {
            introduction: '', disruption: '', adventure: '', outcome: '',
        };
        this.keyboardHeight = new Animated.Value(0);
        this.fadeIn = new Animated.Value(0);

        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onBuffer = this.onBuffer.bind(this);
        this.loadSoundsFromAPI();
    }

    onLoad(data) {
        console.log('On load fired!');
        this.setState({duration: data.duration});
    }
    onProgress(data) {
        this.setState({currentTime: data.currentTime});
    }
    onBuffer({isBuffering}: { isBuffering: boolean }) {
        this.setState({isBuffering});
    }
    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        } else {
            return 0;
        }
    }

    radioBtnOnChange(index, array, name) {
        if (array[index].selected === true && array[index].selected !== "none") {
            array.map((item) => { item.selected = "none"; });
            array[index].selected = "none";

            switch (name) {
                case 'intro_btn':
                    this.state.intro_exp_selected = false;
                    break;
                case 'disrupt_btn':
                    this.state.disrupt_exp_selected = false;
                    break;
                case 'adventure_btn_1':
                    this.state.adventure_exp_selected_1 = false;
                    break;
                case 'adventure_btn_2':
                    this.state.adventure_exp_selected_2 = false;
                    break;
                default:
                    break;
            }
        } else {
            array.map((item) => { item.selected = false; });
            array[index].selected = true;
            switch (name) {
                case 'intro_btn':
                    this.state.intro_exp_selected = true;
                    break;
                case 'disrupt_btn':
                    this.state.disrupt_exp_selected = true;
                    break;
                case 'adventure_btn_1':
                    this.state.adventure_exp_selected_1 = true;
                    break;
                case 'adventure_btn_2':
                    this.state.adventure_exp_selected_2 = true;
                    break;
                default:
                    break;
            }
        }
        this.setState({radioItems: array}); // update view
    }
    inputOnChange = (name, value) => {
        this.setState(() => ({[name]: value}));
    };
    eventOnVote(index) {
        let events = imposed_events.events,
            imposed_event = events[this.state.adventure_event_id],
            choices = imposed_event.choice;
        choices.map((item) => {
            item.selected = false;
        });
        choices[index].selected = true;
        this.setState({voteItems: choices}); // update view
    };

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

    // -------------------------------- test son

    onFocusHelper(e) {

        //can be analyse and play sound
        if (e.nativeEvent.text === "") {
            this.canAnalyseTheString = true
        }
        // in case the input is already fill nothing happens
        else {
            //console.log(e.nativeEvent.text, 'onfocus');
            this.canAnalyseTheString = false;
        }
    }
    onBlurSearchSound(e) {
        console.log(this.getCurrentTimePercentage());

        let theString = e.nativeEvent.text;
        if (this.canAnalyseTheString === true && theString !== "") {
            //console.log("this.canAnalyseTheString", this.canAnalyseTheString);
            let res = theString.split(" ");
            for (let i = 0; i < res.length; i++) {
                this.searchSound(res[i])
            }
            this.setCanPlayValidationSound()
        }
    }
    // API Call
    searchSound(word) {

        if (this.state.sounds) {
            for (let i = 0; i < this.state.sounds.length; i++) {
                if (word.replace(/[^a-zA-Z ]/g, "").toLowerCase() === this.state.sounds[i].name) {

                    //Wait until validation sound is played
                    let _i = i;
                    setTimeout(() => {


                        //check if the sound is already there
                        let found = this.story_sounds.some( (el)  =>{
                            return el.sound === this.state.sounds[_i];
                        });
                        if (!found) {

                            this.setState({can_play: true, sound: this.state.sounds[_i]});

                            //stock the sound id
                            let name = this.state.sounds[_i];

                            let story_sound = {sound: this.state.sounds[_i], time: this.getCurrentTimePercentage()}
                            //console.log(story_sound);
                            this.story_sounds.push(story_sound);
                            //console.log("this.story_sounds");
                            //console.log(this.story_sounds);

                        }

                    }, 4000)
                }
            }
        }
    }
    setCanPlayValidationSound = () => {

        if (this.state.canPlayValidationSound === true) {
            this.setState({canPlayValidationSound: false});
            //console.log("A");
        }
        else {
            this.setState({canPlayValidationSound: true});

            //let the sound be played before reset it
            setTimeout(() => {
                this.setCanPlayValidationSound();
            }, 3000);
            //console.log("B");
        }
    };
    playASound(url, volume, repeat, isValidation) {

        if (repeat === "repeat") {
            this.repeat = true
        } else {
            this.repeat = false
        }

        if (isValidation === true && this.canPlayValidationSound === true) {
            //specific for the validation sound

            return (
                <Video
                    source={{uri: url}}
                    volume={volume}
                    onLoad={this.onLoad}
                    onBuffer={this.onBuffer}
                    onProgress={this.onProgress}
                    // onEnd={() => { this.setCanPlayValidationSound(), console.log() }}
                    repeat={this.repeat}
                />
            )
        } else {
            return (
                <Video
                    source={{uri: url}}
                    volume={volume}
                    onLoad={this.onLoad}
                    onBuffer={this.onBuffer}
                    onProgress={this.onProgress}
                    repeat={this.repeat}
                />
            )
        }
    }
    loadSoundsFromAPI() {
        return fetch('https://testappfabulab.herokuapp.com/sounds')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    sounds: responseJson
                }, function () {

                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    prepareStory() {

        // Retrieve text
        let state = this.state;

        let intro_exp_1 = short_intro.expression_1.filter((exp) => { return exp.selected === true }),
            hero = addEndDot(state.intro_hero_who), characteristic = addEndDot(state.intro_hero_characteristic),
            habit_before = state.intro_hero_habit_before, intro_exp_2 = state.intro_hero_habit, habit_after = addEndDot(state.intro_hero_habit_after),
            intro_exp_3 = state.intro_hero_now, current_action = state.intro_hero_current_action,
            place = addEndDot(state.intro_place),
            partner_who = addEndDot(state.intro_partner_who), partner_how = addEndDot(state.intro_partner_how),
            intro_where = addEndDot(state.intro_description_where), intro_time = addEndDot(state.intro_description_time),

            disrupt_exp_1 = short_disrupt.expression_1.filter((exp) => { return exp.selected === true }),
            disrupt_description = addEndDot(state.disrupt_description),
            disrupt_message = state.disrupt_message, disrupt_content = addEndDot(state.disrupt_content),

            advent_hero_reaction = addEndDot(state.advent_hero_reaction), advent_partner_reaction = addEndDot(state.advent_partner_reaction),
            advent_exp_1 = short_adventure.expression_1.filter((exp) => { return exp.selected === true }),
            advent_then = addEndDot(state.advent_then), advent_consequence = addEndDot(state.advent_consequence),
            imposed_event = imposed_events.events[state.adventure_event_id].event,
            response_event = imposed_events.events[state.adventure_event_id].choice.filter((exp) => { return exp.selected === true }),
            advent_emotion = addEndDot(state.advent_emotion),
            advent_exp_2 = medium_adventure.expression_1.filter((exp) => { return exp.selected === true }),
            advent_action = addEndDot(state.advent_action),

            outcome_expression_1 = short_outcome.expression_1.filter((exp) => { return exp.selected === true }),
            outcome_solution = addEndDot(state.outcome_description_solution),
            outcome_then = addEndDot(state.outcome_description_then),
            conclusion_expression_1 = short_conclusion.expression_1.filter((exp) => { return exp.selected === true }),
            conclusion_change = addEndDot(state.conclusion_description_change),
            conclusion_learn = addEndDot(state.conclusion_description_learn);

        // Check before retrieve
        if (!hero || !characteristic || !habit_before || !habit_after || !current_action || !disrupt_description || !disrupt_message || !advent_hero_reaction || !advent_partner_reaction || !advent_then || !advent_consequence || !response_event || !advent_emotion || !advent_action || !outcome_solution || !outcome_then || !conclusion_change || !conclusion_learn) {
            Alert.alert(
                'Attention',
                "Veuillez remplir tous les champs du formulaire avant d'imprimer l'histoire !",
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            )
        } else {

            let text_elm = [
                    intro_exp_1[0].label, hero, characteristic,
                    habit_before, intro_exp_2, habit_after,
                    intro_exp_3, current_action, place,
                    partner_who, partner_how,
                    intro_where, intro_time,

                    disrupt_exp_1[0].label, disrupt_description,
                    disrupt_message, disrupt_content,

                    advent_hero_reaction, advent_partner_reaction,
                    advent_exp_1[0].label, advent_then, advent_consequence,
                    imposed_event, response_event[0].label, advent_emotion,
                    advent_exp_2[0].label, advent_action,

                    outcome_expression_1[0].label, outcome_solution, outcome_then,
                    conclusion_expression_1[0].label, conclusion_change, conclusion_learn
                ],
                title = '',
                story = '';

            // Create the title
            if (hero.indexOf("’") > - 1) {
                let hero_parts = hero.split("d’"),
                    hero_title = "";

                for (let i = 1, count = hero_parts.length; i < count; i++) {
                    if (i === hero_parts.length - 1) { // last part
                        hero_title += delEndDot(hero_parts[i]); // subtract "."
                    } else {
                        hero_title +=  hero_parts[i];
                    }
                }
                title = upperCaseFirst(hero_title + ' ' + delEndDot(place));
            } else {
                title = upperCaseFirst(delEndDot(hero) + ' ' + delEndDot(place)); // hasn't apostrophe
            }

            // Create the text
            for (let i = 0, count = text_elm.length; i < count; i++) {
                if (text_elm[i] === partner_who || text_elm[i] === disrupt_then || text_elm[i] === adventure_then || text_elm[i] === outcome_then) {
                    story += text_elm[i] + '@'; // add @ previous custom words sentence
                } else {
                    story += text_elm[i] + ' ';
                }
            }
            //console.log(this.story_sounds);
            this.props.navigation.navigate('Correction', {story: story, title: title, sounds:this.story_sounds});
        }
    }

    renderRadioBtn(labels, name) {
        return (
            <View style={FormStyle.radioGroup}>
                {labels.map(
                    (item, key) => (
                        <RadioButton key={key} button={item} onClick={
                            this.radioBtnOnChange.bind(this, key, labels, name)
                        }/>
                    )
                )}
            </View>
        )
    }
    renderInput(name, placeholder, state, btnSelected, autoCapitalize = 'sentences') {
        return (
            <TextInput
                style={[FormStyle.inputItem, FormStyle.formItem]}
                onChangeText={(text) => this.inputOnChange(name, text)}
                onFocus={(e) => this.onFocusHelper(e)}
                onBlur={(e) => this.onBlurSearchSound(e)}
                autoCapitalize={autoCapitalize} multiline={true}
                placeholder={placeholder} value={state} editable={btnSelected} selectTextOnFocus={btnSelected}
            />
        )
    }

    renderTitlePart() {
        return (
            <View style={[FormStyle.partContainer, FormStyle.partTitleContainer]}>
                <Text style={FormStyle.partTitleItem}>{this.state.part_title.toUpperCase()}</Text>;
            </View>
        );
    }
    renderNavigationPart() {
        let top_arrow,
            down_arrow,
            navigation = [];
        for (let key = 1, count = Object.keys(data).length; key <= count; key++) {
            const navigationItem =
                <TouchableOpacity style={FormStyle.partNavigationItemContainer} onPress={this.scrollTo.bind(this, key)}>
                    <Text style={FormStyle.partNavigationItem}>{key}</Text>
                </TouchableOpacity>;

            if (key === this.state.current_navigation) {
                const currentNavigationItem =
                    <TouchableOpacity style={FormStyle.partNavigationItemContainer} activeOpacity={1}>
                        <Text style={[FormStyle.partNavigationItem, FormStyle.partNavigationCurrentItem]}>{key}</Text>
                    </TouchableOpacity>;
                navigation.push(React.cloneElement(currentNavigationItem, {key}));
            } else {
                navigation.push(React.cloneElement(navigationItem, {key}));
            }
        }
        if (this.state.current_navigation !== 1) {
            top_arrow =
                <TouchableOpacity onPress={ this.scrollPrevTo.bind(this, this.state.current_navigation) }>
                    <Image style={[FormStyle.iconNav, FormStyle.iconNavTop]} source={require('../../assets/images/arrowTop.png')}/>
                </TouchableOpacity>;
        }
        if (this.state.current_navigation !== 5) {
            down_arrow =
                <TouchableOpacity onPress={ this.scrollNextTo.bind(this, this.state.current_navigation) }>
                    <Image style={[FormStyle.iconNav, FormStyle.iconNavDown]} source={require('../../assets/images/arrowDown.png')}/>
                </TouchableOpacity>;
        }
        return (
            <View style={[FormStyle.partContainer, FormStyle.partNavigationContainer]}>
                {top_arrow}
                {navigation}
                {down_arrow}
            </View>
        )
    }

    renderImposedEvent(){
        let events = imposed_events.events,
            imposed_event = events[this.state.adventure_event_id],
            choices = [];
        for (let key = 0, nbChoices = imposed_event.choice.length; key < nbChoices; key++) {
            const voteItem =
                <TouchableOpacity onPress={this.eventOnVote.bind(this, key, choices)}>
                    {(imposed_event.choice[key].selected)
                        ? <Text style={[FormStyle.voteItem, FormStyle.voteSelected]}>{imposed_event.choice[key].label}</Text>
                        : <Text style={[FormStyle.voteItem, FormStyle.voteUnselected]}>{imposed_event.choice[key].label}</Text>
                    }
                </TouchableOpacity>;
            choices.push(React.cloneElement(voteItem, { key })); // active slide
        }
        return(
            <View>
                <TextInput
                    style={[FormStyle.formItem, FormStyle.textItem, FormStyle.imposedEvent]}
                    multiline={true} editable={false} selectTextOnFocus={false}
                    value={imposed_event.event}/>
                {choices}
            </View>
        );
    }
    renderIntroduction() {
        let state = this.state,
            medium_intro_render = null,
            long_intro_render = null,
            opacity = null,
            content_opacity = null,
            btn_selected = state.intro_exp_selected;
        if (this.state.current_navigation === 1) { opacity = 1; } else { opacity = .4; }
        if (btn_selected === true) { content_opacity = 1; } else { content_opacity = .4; }

        let intro_exp =
            <View>
                {this.renderRadioBtn(short_intro.expression_1, "intro_btn")};
            </View>;

        let short_intro_render =
            <View>
                {this.renderInput("intro_hero_who", short_intro.hero.who, state.intro_hero_who, btn_selected, 'none')}
                {this.renderInput("intro_hero_characteristic", short_intro.hero.characteristic, state.intro_hero_characteristic, btn_selected)}
                {this.renderInput("intro_hero_habit_before", short_intro.hero.habit_before, state.intro_hero_habit_before, btn_selected)}
                <FormTextImposed value={state.intro_hero_habit}/>
                {this.renderInput("intro_hero_habit_after", short_intro.hero.habit_after, state.intro_hero_habit_after, btn_selected, 'none')}
                <FormTextImposed value={state.intro_hero_now} position={"start"}/>
                {this.renderInput("intro_hero_current_action", short_intro.hero.current_action, state.intro_hero_current_action, btn_selected, 'none')}
                <FormTextImposed value={state.intro_place + '.'} position={"end"}/>
            </View>;

        if (this.length === 1 || this.length === 2) {
            medium_intro_render =
                <View>
                    {this.renderInput("intro_partner_who", medium_intro.partner.who, state.intro_partner_who, btn_selected)}
                    {this.renderInput("intro_partner_how", medium_intro.partner.how, state.intro_partner_how, btn_selected)}
                </View>;
        }
        if (this.length === 2) {
            long_intro_render =
                <View>
                    {this.renderInput("intro_description_where", long_intro.description.where, state.intro_description_where, btn_selected)}
                    {this.renderInput("intro_description_time", long_intro.description.time, state.intro_description_time, btn_selected)}
                </View>;
            intro_exp =
                <View>
                    {this.renderRadioBtn(long_intro.expression_1, "intro_btn")};
                </View>;
        }

        return (
            <View style={[FormStyle.formContainer, {opacity: opacity}]} ref="Introduction" onLayout={(e) => {
                let view = this.refs['Introduction'],
                    handle = findNodeHandle(view);
                UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                    this.partEnd.introduction = height - scaleHeight(150); // padding bottom
                })
            }}>
                {intro_exp}
                <View style={{opacity: content_opacity}}>
                    {short_intro_render}
                    {medium_intro_render}
                    {long_intro_render}
                </View>
            </View>
        );
    }
    renderDisruption() {
        let state = this.state,
            long_disrupt_render: null,
            opacity: null,
            content_opacity: null,
            btn_selected = state.disrupt_exp_selected;
        if (this.state.current_navigation === 2) { opacity = 1; } else { opacity = .4; }
        if (btn_selected === true) { content_opacity = 1; } else { content_opacity = .4; }

        let disrupt_exp =
            <View>
                {this.renderRadioBtn(short_disrupt.expression_1, "disrupt_btn")}
            </View>;

        let short_disrupt_render =
            <View>
                {this.renderInput("disrupt_description", short_disrupt.event.description, state.disrupt_description, btn_selected, 'none')}
            </View>;

        if (this.length === 2) {
            long_disrupt_render =
                <View>
                    <FormTextImposed value={state.disrupt_message} position={"start"}/>
                    {this.renderInput("disrupt_content", long_disrupt.content, state.disrupt_content, btn_selected)}
                </View>;
        }

        return (
            <View style={[FormStyle.formContainer, {opacity: opacity}]} ref="Disrupt" onLayout={(e) => {
                let view = this.refs['Disrupt'],
                    handle = findNodeHandle(view);
                UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                    this.partEnd.disruption = y + height - scaleHeight(150); // padding bottom
                })
            }}>
                {disrupt_exp}
                <View style={{opacity: content_opacity}}>
                    {short_disrupt_render}
                    {long_disrupt_render}
                </View>
            </View>
        );
    }
    renderAdventure() {
        let state = this.state,
            medium_reaction: null,
            medium_consequence: null,
            long_emotion: null,
            short_exp_2: null,
            medium_action: null,
            opacity: null,
            content_opacity_1: null,
            content_opacity_2: null,
            btn_selected_1 = state.adventure_exp_selected_1,
            btn_selected_2 = state.adventure_exp_selected_2;
        if (this.state.current_navigation === 3) { opacity = 1; } else { opacity = .4; }
        if (btn_selected_1 === true) { content_opacity_1 = 1; } else { content_opacity_1 = .4; }
        if (btn_selected_2 === true) { content_opacity_2 = 1; } else { content_opacity_2 = .4; }

        let short_reaction =
            <View>
                {this.renderInput("advent_hero_reaction", short_adventure.event.hero_reaction, state.advent_hero_reaction, true)}
            </View>;
        let short_exp_1 = <View>{this.renderRadioBtn(short_adventure.expression_1, "adventure_btn_1")}</View>;
        let short_then = <View>{this.renderInput("advent_then", short_adventure.event.then, state.advent_then, btn_selected_1, 'none')}</View>;

        if (this.length === 1 || this.length === 2) {
            medium_reaction =
                <View>
                    {this.renderInput("advent_partner_reaction", medium_adventure.event.partner_reaction, state.advent_partner_reaction, true)}
                </View>;
            medium_consequence =
                <View>
                    {this.renderInput("advent_consequence", medium_adventure.event.consequence, state.advent_consequence, btn_selected_1)}
                </View>;
            short_exp_2 = <View>{this.renderRadioBtn(medium_adventure.expression_1, "adventure_btn_2")}</View>;
            medium_action =
                <View>
                    {this.renderInput("advent_action", medium_adventure.event.action, state.advent_action, btn_selected_2, 'none')}
                </View>;
        }

        if (this.length === 2) {
            long_emotion =
                <View>
                    {this.renderInput("advent_emotion", long_adventure.emotion, state.advent_emotion, btn_selected_1)}
                </View>;
        }

        return (
            <View style={[FormStyle.formContainer, {opacity: opacity}]} ref="Adventure" onLayout={(e) => {
                let view = this.refs['Adventure'],
                    handle = findNodeHandle(view);
                UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                    this.partEnd.adventure = y + height - scaleHeight(150); // padding bottom
                })
            }}>
                {short_reaction}
                {medium_reaction}
                {short_exp_1}
                <View style={{ opacity : content_opacity_1 }}>
                    {short_then}
                    {medium_consequence}
                    {this.renderImposedEvent()}
                    {long_emotion}
                    {short_exp_2}
                </View>
                <View style={{ opacity : content_opacity_2 }}>
                    {medium_action}
                </View>
            </View>
        );
    }
    renderOutcome() {
        let state = this.state,
            opacity: null;
        if (this.state.current_navigation === 4) { opacity = 1; } else { opacity = .4; }
        return (
            <View style={[FormStyle.formContainer, {opacity: opacity}]} ref="Outcome" onLayout={(e) => {
                let view = this.refs['Outcome'],
                    handle = findNodeHandle(view);
                UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                    this.partEnd.outcome = y + height - scaleHeight(150); // padding bottom
                })
            }}>
                {this.renderRadioBtn(short_outcome.expression_1)}
                {this.renderInput("outcome_description_solution", short_outcome.description.solution.placeholder, state.outcome_description_solution, 'none')}
                {this.renderInput("outcome_description_then", short_outcome.description.then.placeholder, state.outcome_description_then)}
            </View>
        );
    }
    renderConclusion() {
        let state = this.state,
            opacity: null;
        if (this.state.current_navigation === 5) { opacity = 1; } else { opacity = .4; }
        return (
            <Animated.View style={[FormStyle.formContainer, {paddingBottom: this.keyboardHeight, opacity: opacity}]}>
                {this.renderRadioBtn(short_conclusion.expression_1)}
                {this.renderInput("conclusion_description_change", short_conclusion.description.change.placeholder, state.conclusion_description_change, 'none')}
                {this.renderInput("conclusion_description_learn", short_conclusion.description.learn.placeholder, state.conclusion_description_learn)}
                <View style={FormStyle.printBtnContainer}>
                    <RectangleButton
                        content={'Terminer'}
                        src={require('../../assets/images/validate.png')}
                        onPress={this.prepareStory.bind(this)}/>
                </View>
            </Animated.View>
        );
    }

    onScroll = (e) => {
        /*console.log(e.nativeEvent);*/
        let currentOffset = e.nativeEvent.contentOffset.y; // get the current y position on scroll
        // TODO calculation according if keyboard is open and form height
        if (currentOffset >= 0 && currentOffset < this.partEnd.introduction) {
            this.setState({part_title: "Introduction"}); // update view
            this.setState({current_navigation: 1});
        }
        if (currentOffset >= this.partEnd.introduction && currentOffset < this.partEnd.disruption) {
            this.setState({part_title: "Problème"});
            this.setState({current_navigation: 2})
        }
        if (currentOffset >= this.partEnd.disruption && currentOffset < this.partEnd.adventure) {
            this.setState({part_title: "Aventures"});
            this.setState({current_navigation: 3})
        }
        if (currentOffset >= this.partEnd.adventure && currentOffset < this.partEnd.outcome) {
            this.setState({part_title: "Dénouement"});
            this.setState({current_navigation: 4})
        }
        if (currentOffset >= this.partEnd.outcome) {
            this.setState({part_title: "Conclusion"});
            this.setState({current_navigation: 5})
        }
    };
    scrollTo = (index) => {
        switch (index) {
            case 2:
                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.introduction + 1, animated: true});
                break;
            case 3:
                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.disruption + 1, animated: true});
                break;
            case 4:
                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.adventure + 1, animated: true});
                break;
            case 5:
                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.outcome + 1, animated: true});
                break;
            default:
                this.refs.FormScrollView.scrollTo({x: 0, y: 0, animated: true});
                break;
        }
    };
    scrollPrevTo = (index) => {
        switch (index) {
            case 3:
                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.introduction + 1, animated: true});
                break;
            case 4:
                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.disruption + 1, animated: true});
                break;
            case 5:
                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.adventure + 1, animated: true});
                break;
            default:
                this.refs.FormScrollView.scrollTo({x: 0, y: 0, animated: true}); // case 2
                break;
        }
    };
    scrollNextTo = (index) => {
        switch (index) {
            case 2:
                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.disruption + 1, animated: true});
                break;
            case 3:
                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.adventure + 1, animated: true});
                break;
            case 4:
                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.outcome + 1, animated: true});
                break;
            default:
                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.introduction + 1, animated: true}); // case 1
                break;
        }
    };

    render() {
        return (
            <View style={[GlobalStyle.view, GlobalStyle.headerView, FormStyle.formView]}>
                <Image style={GlobalStyle.backgroundImage} source={require('../../assets/images/background.png')} />
                <Header onPress={() => this.props.navigation.goBack()}/>
                {this.renderTitlePart()}
                <ScrollView ref="FormScrollView"
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    onScroll={this.onScroll}>
                    <View>
                        { // background sound
                            this.place ? this.playASound(this.place.url, 0.5, "repeat", false) : null
                        }
                        { //added sound
                            this.state.can_play ? this.playASound(this.state.sound.url, 0.5, "no-repeat", false) : null
                        }
                        { //validation sound
                            this.state.canPlayValidationSound ? this.playASound(this.validationSound, 0.5, "no-repeat", true) : null
                        }
                        {this.renderIntroduction()}
                        {this.renderDisruption()}
                        {this.renderAdventure()}
                        {this.renderOutcome()}
                        {this.renderConclusion()}
                    </View>
                </ScrollView>
                {this.renderNavigationPart()}
                {/*<Text>{'Length : ' + this.length}</Text>*/}
            </View>
        );
    }
}