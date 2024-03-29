import React from 'react';
import {View, Text, TextInput, Animated, Keyboard, ScrollView, Dimensions, UIManager, findNodeHandle, TouchableOpacity, Image} from 'react-native';
import Header from '../../components/header';
import RadioButton from '../../components/form/radioButton';
import RectangleButton from '../../components/rectangleButton';
import FormTextImposed from '../../components/form/textImposed';
import GlobalStyle from '../../styles/mainStyle';
import FormStyle from "../../styles/formStyle";
import Video from 'react-native-video';
import { scaleDelta, scaleHeight } from "../../utils/scale";
import { colors } from "../../styles/colors";
const { width, height } = Dimensions.get('window');
import { getRandomInt, delEndDot, addEndDot, upperCaseFirst, gatherText, generateTitle } from "../../utils/tools";

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
const medium_outcome = data.outcome.medium;
const short_end = data.conclusion.short;
const medium_end = data.conclusion.medium;

export default class Form extends React.Component {

    constructor(props) {
        super(props);
        this.length = this.props.navigation.state.params.length;
        this.basesound = this.props.navigation.state.params.basesound;
        this.validationSound = "https://noemie-ey.com/fabulab/sounds/design_input-3.mp3";
        // this.validationSound = "https://christinehuang.fr/BDDI2018/sounds/VALIDATION/validation.mp3";
        this.place = this.props.navigation.state.params.place;
        this.story_sounds = [];
        this.adventure_event_id = getRandomInt(0, imposed_events.events.length - 1);
        this.state = {
            part_title: "Introduction", direction: null, previousOffset: 0, current_navigation: 1,
            intro_exp_1: [
                { label: short_intro.expression_1[0], selected: "none" },
                { label: short_intro.expression_1[1], selected: "none" },
                { label: short_intro.expression_1[2], selected: "none" }
            ], intro_hero_who: "", intro_hero_characteristic: "",
            intro_hero_habit_before: "", intro_hero_habit: short_intro.hero.habit, intro_hero_habit_after: "", intro_place: this.place.name.toLowerCase(),
            intro_hero_now: short_intro.expression_2[getRandomInt(0, short_intro.expression_2.length - 1)], intro_hero_current_action: "",
            intro_partner_who: "", intro_partner_how: "", intro_description_where: "", intro_description_time: "",

            disrupt_exp_1: [
                { label: short_disrupt.expression_1[0], selected: "none" },
                { label: short_disrupt.expression_1[1], selected: "none" },
                { label: short_disrupt.expression_1[2], selected: "none" },
            ], disrupt_description: "",
            disrupt_message: long_disrupt.message[getRandomInt(0, long_disrupt.message.length - 1)], disrupt_content: "",

            advent_hero_reaction: "", advent_partner_reaction: "",
            advent_exp_1 : [
                { label: short_adventure.expression_1[0], selected: "none" },
                { label: short_adventure.expression_1[1], selected: "none" },
                { label: short_adventure.expression_1[2], selected: "none" },
            ], advent_then: "", advent_consequence: "",
            adventure_imposed_event: [
                { label: imposed_events.events[this.adventure_event_id].choice[0], selected: false },
                { label: imposed_events.events[this.adventure_event_id].choice[1], selected: false },
            ],
            advent_exp_2 : [
                { label: medium_adventure.expression_1[0], selected: "none" },
                { label: medium_adventure.expression_1[1], selected: "none" }
            ], advent_emotion: "", advent_action: "",

            outcome_exp_1: [
                { label: short_outcome.expression_1[0], selected: "none" },
                { label: short_outcome.expression_1[1], selected: "none" },
                { label: short_outcome.expression_1[2], selected: "none" }
            ],
            outcome_hero_solution: "", outcome_partner_solution: "",

            end_exp_1: [
                { label: short_end.expression_1[0], selected: "none" },
                { label: short_end.expression_1[1], selected: "none" },
                { label: short_end.expression_1[2], selected: "none" }
            ],
            end_change: "", end_learn: "",
            complete_story: {}, showPrintBtn: false,

            intro_exp_selected: false, disrupt_exp_selected: false,
            adventure_exp_selected_1: false, adventure_exp_selected_2: false,
            outcome_exp_selected: false, end_exp_selected: false,

            intro_completed: null, disrupt_completed: null,
            adventure_completed: null, adventure_completed_1: null, adventure_completed_2: null, adventure_completed_3: null,
            outcome_completed: null, end_completed: null,

            toResetSound : false,
            playPlaceSound:true
        };

        this.partHeight = { introduction: '', disruption: '', adventure: '', outcome: ''};
        this.partEnd = { introduction: '', disruption: '', adventure: '', outcome: '' };
        // this.fadeIn = new Animated.Value(0);

        // this.baseSound_load = false
        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onBuffer = this.onBuffer.bind(this);
        this.loadSoundsFromAPI();
    }

    onLoad(data) {

        if(!this.baseSound_load){
            this.baseSound_load = true;
            this.startOriginCounter();
        }
        this.setState({duration: data.duration});
    }
    onProgress(data) {
        this.setState({currentTime: data.currentTime});
    }
    onBuffer({isBuffering}: { isBuffering: boolean }) {
        this.setState({isBuffering});
    }


    getCurrentTimeFromNow() {
        this.time = new Date().getTime() - this.now;
        return this.time;
    }

    startOriginCounter(){
        if(this.baseSound_load){
            this.now = new Date().getTime();
        } 
    }

    radioBtnOnChange(index, array, name, isLast = false) {
        let state = this.state;
        if (state.intro_completed === true &&
            state.disrupt_completed === true &&
            state.adventure_completed === true &&
            state.outcome_completed === true &&
            isLast === true) {
            state.showPrintBtn = true;
        }

        if (array[index].selected === true && array[index].selected !== "none") {
            array.map((item) => { item.selected = "none"; });
            array[index].selected = "none";
            switch (name) {
                case 'intro_btn': state.intro_exp_selected = false; break;
                case 'disrupt_btn': state.disrupt_exp_selected = false; break;
                case 'adventure_btn_1': state.adventure_exp_selected_1 = false; break;
                case 'adventure_btn_2': state.adventure_exp_selected_2 = false; break;
                case 'outcome_btn': state.outcome_exp_selected = false; break;
                case 'end_btn': state.end_exp_selected = false; break;
                default: break;
            }
        } else {
            array.map((item) => { item.selected = false; });
            array[index].selected = true;
            switch (name) {
                case 'intro_btn': state.intro_exp_selected = true; break;
                case 'disrupt_btn': state.disrupt_exp_selected = true; break;
                case 'adventure_btn_1': state.adventure_exp_selected_1 = true; break;
                case 'adventure_btn_2': state.adventure_exp_selected_2 = true; break;
                case 'outcome_btn': state.outcome_exp_selected = true; break;
                case 'end_btn': state.end_exp_selected = true; break;
                default: break;
            }
        }
        this.setState({radioItems: array}); // update view
    }
    inputOnChange = (name, value) => {
        this.setState(() => ({[name]: value}));
        this.setState(() => ({[name + '_isWriting']: true}));
    };
    eventOnVote(index) {
        let choices = this.state.adventure_imposed_event;
        choices.map((item) => {
            item.selected = false;
        });
        choices[index].selected = true;
        this.setState({voteItems: choices}); // update view
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
        let theString = e.nativeEvent.text;
        if (this.canAnalyseTheString === true && theString !== "") {
            let res = theString.split(" ");
            for (var i = 0; i < res.length; i++) {
                this.searchSound(res[i])
            }
            this.setCanPlayValidationSound()
        }
    }
    onEndEditing(name) {
        this.state[name + '_isWriting'] = false;
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

                            this.setState({canPlay: true, sound: this.state.sounds[_i]});

                            //stock the sound id
                            var name = this.state.sounds[_i]
                            var story_sound = {sound: this.state.sounds[_i], time: this.getCurrentTimeFromNow()}
                            this.story_sounds.push(story_sound)
                        }

                    }, 4000)
                }
            }
        }
    }

    setCanPlayValidationSound = () => {

        if (this.state.canPlayValidationSound === true) {
            this.setState({canPlayValidationSound: false})
        }
        else {
            this.setState({canPlayValidationSound: true});

            //let the sound be played before reset it
            setTimeout(() => {
                this.setCanPlayValidationSound();
            }, 3000);
        }
    }

    playBaseSound(url, volume, repeat) {
        if (repeat === "repeat") {
            this.repeat = true
        } else {
            this.repeat = false
        }

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
        // check the last part
        let end_exp_1 = state.end_exp_1.filter((exp) => { return exp.selected === true }),
            end_change = addEndDot(state.end_change), end_learn = addEndDot(state.end_learn);

        let short_check = !end_exp_1 || !end_change,
            medium_check = short_check || !end_learn;

        if (end_exp_1.length !== 0) {
            let check_inputs = null;
            switch (this.length) {
                case 1: check_inputs = medium_check; break;
                case 2: check_inputs = medium_check; break;
                default: check_inputs = short_check; break;
            }
            if (check_inputs) {
                state.end_completed = false;
                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.outcome + 1, animated: true}); // scroll to top
            } else { // scroll and save
                let sentences = [end_exp_1[0].label, end_change, end_learn];
                state.complete_story.end = gatherText(sentences);

                let story = "",
                    title = state.complete_story.title;
                for (let key in state.complete_story) {
                    if (key !== 'title' && state.complete_story.hasOwnProperty(key)) {
                        if (key === Object.keys(state.complete_story)[Object.keys(state.complete_story).length - 1] || key === 'disrupt') {
                            story += state.complete_story[key];
                        } else {
                            story += state.complete_story[key] + "@";
                        }
                    }
                }
                this.props.navigation.navigate('Correction', {story: story, title: title, sounds:this.story_sounds, place:this.place, state:this.state});
            }
        }
    }

    renderRadioBtn(labels, name, isLast) {
        return (
            <View style={FormStyle.radioGroup}>
                {labels.map(
                    (item, key) => (
                        <RadioButton key={key} button={item} onClick={
                            this.radioBtnOnChange.bind(this, key, labels, name, isLast)
                        }/>
                    )
                )}
            </View>
        )
    }
    renderInput(name, placeholder, state, btnSelected, completed, autoCapitalize = 'sentences') {
        let error_img = null,
            question = null,
            borderColor = colors.pinkishGreyTwo;

        if (completed === false) {
            if (state === "") {
                error_img = <Image style={FormStyle.errorImage} source={require('../../assets/images/warning.png')}/>;
                question = <Text style={FormStyle.errorQuestion}>{placeholder}</Text>;
                borderColor = colors.deepPink;
            }
            placeholder = "Attention: il faut remplir ce champ avant de passer à la suite";
        }
        if (this.state[name + '_isWriting'] === true && state !== "") {
            question = <Text style={FormStyle.errorQuestion}>{placeholder}</Text>;
        }
        let placeholderColor = (completed === false) ? colors.deepPink : colors.pinkishGreyTwo;

        return (
            <View style={FormStyle.inputContainer}>
                {question}
                <TextInput
                    style={[FormStyle.inputItem, FormStyle.formItem, {borderColor: borderColor}]}
                    onChangeText={(text) => this.inputOnChange(name, text)}
                    onFocus={(e) => this.onFocusHelper(e)}
                    onBlur={(e) => this.onBlurSearchSound(e)}
                    onEndEditing={this.onEndEditing.bind(this, name)}
                    placeholderTextColor={placeholderColor}
                    autoCapitalize={autoCapitalize} multiline={true}
                    placeholder={placeholder} value={state} editable={btnSelected}
                />
                {error_img}
            </View>
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
            imposed_event = events[this.adventure_event_id],
            choices = [];
        for (let key = 0, nbChoices = this.state.adventure_imposed_event.length; key < nbChoices; key++) {
            const voteItem =
                <TouchableOpacity onPress={this.eventOnVote.bind(this, key, choices)}>
                    {(this.state.adventure_imposed_event[key].selected)
                        ? <Text style={[FormStyle.voteItem, FormStyle.voteSelected]}>
                            {this.state.adventure_imposed_event[key].label}</Text>
                        : <Text style={[FormStyle.voteItem, FormStyle.voteUnselected]}>
                            Choix {key + 1} : {this.state.adventure_imposed_event[key].label}</Text>
                    }
                </TouchableOpacity>;
            choices.push(React.cloneElement(voteItem, { key })); // active slide
        }
        return(
            <View>
                <FormTextImposed value={imposed_event.event} position={"imposed_event"}/>
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
            btn_selected = state.intro_exp_selected,
            completed = state.intro_completed;
        if (state.current_navigation === 1) { opacity = 1; } else { opacity = .3; }
        if (btn_selected === true) { content_opacity = 1; } else { content_opacity = .3; }

        let intro_exp =
            <View>
                {this.renderRadioBtn(state.intro_exp_1, "intro_btn")};
            </View>;

        let short_intro_render =
            <View>
                {this.renderInput("intro_hero_who", short_intro.hero.who, state.intro_hero_who, btn_selected, completed, 'none')}
                {this.renderInput("intro_hero_characteristic", short_intro.hero.characteristic, state.intro_hero_characteristic, btn_selected, completed)}
                {this.renderInput("intro_hero_habit_before", short_intro.hero.habit_before, state.intro_hero_habit_before, btn_selected, completed)}
                <FormTextImposed value={state.intro_hero_habit}/>
                {this.renderInput("intro_hero_habit_after", short_intro.hero.habit_after, state.intro_hero_habit_after, btn_selected, completed, 'none')}
                <FormTextImposed value={state.intro_hero_now} position={"start"}/>
                {this.renderInput("intro_hero_current_action", short_intro.hero.current_action, state.intro_hero_current_action, btn_selected, completed, 'none')}
                <FormTextImposed value={state.intro_place + '.'} position={"end"}/>
            </View>;

        if (this.length === 1 || this.length === 2) {
            medium_intro_render =
                <View>
                    {this.renderInput("intro_partner_who", medium_intro.partner.who, state.intro_partner_who, btn_selected, completed)}
                    {this.renderInput("intro_partner_how", medium_intro.partner.how, state.intro_partner_how, btn_selected, completed)}
                </View>;
        }
        if (this.length === 2) {
            long_intro_render =
                <View>
                    {this.renderInput("intro_description_where", long_intro.description.where, state.intro_description_where, btn_selected, completed)}
                    {this.renderInput("intro_description_time", long_intro.description.time, state.intro_description_time, btn_selected, completed)}
                </View>;
        }

        return (
            <View style={[FormStyle.formContainer, {opacity: opacity}]} ref="Introduction" onLayout={(e) => {
                let view = this.refs['Introduction'],
                    handle = findNodeHandle(view);
                UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                    this.partHeight.introduction = height;
                    this.partEnd.introduction = height; // padding bottom
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
            btn_selected = state.disrupt_exp_selected,
            completed = state.disrupt_completed;
        if (state.current_navigation === 2) { opacity = 1; } else { opacity = .3; }
        if (btn_selected === true) { content_opacity = 1; } else { content_opacity = .3; }

        let disrupt_exp =
            <View>
                {this.renderRadioBtn(state.disrupt_exp_1, "disrupt_btn")}
            </View>;

        let short_disrupt_render =
            <View>
                {this.renderInput("disrupt_description", short_disrupt.event.description, state.disrupt_description, btn_selected, completed, 'none')}
            </View>;

        if (this.length === 2) {
            long_disrupt_render =
                <View>
                    <FormTextImposed value={state.disrupt_message} position={"start"}/>
                    {this.renderInput("disrupt_content", long_disrupt.content, state.disrupt_content, btn_selected, completed)}
                </View>;
        }

        return (
            <View style={[FormStyle.formContainer, {opacity: opacity}]} ref="Disrupt" onLayout={(e) => {
                let view = this.refs['Disrupt'],
                    handle = findNodeHandle(view);
                UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                    this.partHeight.disruption = height;
                    this.partEnd.disruption = y + height; // padding bottom
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
            btn_selected_2 = state.adventure_exp_selected_2,
            completed_1 = state.adventure_completed_1,
            completed_2 = state.adventure_completed_2,
            completed_3 = state.adventure_completed_3;
        if (state.current_navigation === 3) { opacity = 1; } else { opacity = .3; }
        if (btn_selected_1 === true) { content_opacity_1 = 1; } else { content_opacity_1 = .3; }
        if (btn_selected_2 === true) { content_opacity_2 = 1; } else { content_opacity_2 = .3; }

        let short_reaction =
            <View>
                {this.renderInput("advent_hero_reaction", short_adventure.event.hero_reaction, state.advent_hero_reaction, state.intro_disrupt_completed, completed_1)}
            </View>;
        let short_exp_1 = <View>{this.renderRadioBtn(state.advent_exp_1, "adventure_btn_1")}</View>;
        let short_then = <View>{this.renderInput("advent_then", short_adventure.event.then, state.advent_then, btn_selected_1, completed_2, 'none')}</View>;

        if (this.length === 1 || this.length === 2) {
            medium_reaction =
                <View>
                    {this.renderInput("advent_partner_reaction", medium_adventure.event.partner_reaction, state.advent_partner_reaction, state.intro_disrupt_completed, completed_1)}
                </View>;
            medium_consequence =
                <View>
                    {this.renderInput("advent_consequence", medium_adventure.event.consequence, state.advent_consequence, btn_selected_1, completed_2)}
                </View>;
            short_exp_2 = <View>{this.renderRadioBtn(state.advent_exp_2, "adventure_btn_2")}</View>;
            medium_action =
                <View>
                    {this.renderInput("advent_action", medium_adventure.event.action, state.advent_action, btn_selected_2, completed_3, 'none')}
                </View>;
        }

        if (this.length === 2) {
            long_emotion =
                <View>
                    {this.renderInput("advent_emotion", long_adventure.emotion, state.advent_emotion, btn_selected_1, completed_2)}
                </View>;
        }

        return (
            <View style={[FormStyle.formContainer, {opacity: opacity}]} ref="Adventure" onLayout={(e) => {
                let view = this.refs['Adventure'],
                    handle = findNodeHandle(view);
                UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                    this.partHeight.adventure = height;
                    this.partEnd.adventure = y + height; // padding bottom
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
            medium_outcome_render: null,
            opacity: null,
            content_opacity: null,
            btn_selected = state.outcome_exp_selected,
            completed = state.outcome_completed;
        if (state.current_navigation === 4) { opacity = 1; } else { opacity = .3; }
        if (btn_selected === true) { content_opacity = 1; } else { content_opacity = .3; }

        let outcome_exp =
            <View>
                {this.renderRadioBtn(state.outcome_exp_1, "outcome_btn")}
            </View>;

        let short_outcome_render =
            <View>
                {this.renderInput("outcome_hero_solution", short_outcome.hero_solution, state.outcome_hero_solution, btn_selected, completed, 'none')}
            </View>;

        if (this.length === 1 || this.length === 2) {
            medium_outcome_render =
                <View>
                    {this.renderInput("outcome_partner_solution", medium_outcome.partner_solution, state.outcome_partner_solution, btn_selected, completed)}
                </View>
        }

        return (
            <View
                style={[FormStyle.formContainer, {opacity: opacity}]}
                ref="Outcome" onLayout={(e) => {
                let view = this.refs['Outcome'],
                    handle = findNodeHandle(view);
                UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                    this.partHeight.outcome = height;
                    this.partEnd.outcome = y + height; // padding bottom
                })
            }}>
                {outcome_exp}
                <View style={{ opacity: content_opacity}}>
                    {short_outcome_render}
                    {medium_outcome_render}
                </View>
            </View>
        );
    }
    renderConclusion() {
        let state = this.state,
            medium_end_render: null,
            print_btn_render: null,
            opacity: null,
            content_opacity: null,
            btn_selected = state.end_exp_selected,
            completed = state.end_completed;
        if (state.current_navigation === 5) { opacity = 1; } else { opacity = .3; }
        if (btn_selected === true) { content_opacity = 1; } else { content_opacity = .3; }

        let end_exp =
            <View>
                {this.renderRadioBtn(state.end_exp_1, "end_btn", true)}
            </View>;

        let short_end_render =
            <View>
                {this.renderInput("end_change", short_end.change, state.end_change, btn_selected, completed, 'none')}
            </View>;

        if (this.length === 1 || this.length === 2) {
            medium_end_render =
                <View>
                    {this.renderInput("end_learn", medium_end.learn, state.end_learn, btn_selected, completed)}
                </View>
        }

        if (state.showPrintBtn === true) {
            print_btn_render =
                <View style={FormStyle.printBtnContainer}>
                    <RectangleButton
                        content={'Terminer'}
                        src={require('../../assets/images/validate.png')}
                        onPress={this.prepareStory.bind(this)}/>
                </View>
        }

        return (
            <View style={[FormStyle.formContainer, {opacity: opacity, height: height - scaleHeight(40)}]}>
                {end_exp}
                <View style={{ opacity: content_opacity}}>
                    {short_end_render}
                    {medium_end_render}
                </View>
                {print_btn_render}
            </View>
        );
    }

    onScrollEndDrag = (e) => {
        let currentOffset = e.nativeEvent.contentOffset.y,
            state = this.state;
        switch (state.current_navigation) {
            case 1:
                if (currentOffset >= this.partHeight.introduction / 2 && state.direction === "down") {
                    this.introSave();
                } else if (state.direction === "up") {
                    this.refs.FormScrollView.scrollTo({x: 0, y: 0, animated: true}); // scroll to top
                }
                break;
            case 2:
                if (currentOffset >= this.partEnd.introduction + this.partHeight.disruption / 2 && state.direction === "down") {
                    this.disruptSave();
                } else if (state.direction === "up") {
                    this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.introduction + 1, animated: true});
                }
                break;
            case 3:
                if (currentOffset >= this.partEnd.disruption + this.partHeight.adventure / 2 && state.direction === "down") {
                    this.adventSave();
                } else if (state.direction === "up") {
                    this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.disruption + 1, animated: true});
                }
                break;
            case 4:
                if (currentOffset >= this.partEnd.adventure + this.partHeight.outcome / 2 && state.direction === "down") {
                    this.outcomeSave();
                } else if (state.direction === "up") {
                    this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.adventure + 1, animated: true});
                }
                break;
            default:
                break;
        }

    };

    onScroll = (e) => {
        let currentOffset = e.nativeEvent.contentOffset.y; // get the current y position on scroll
        this.state.direction = this.state.previousOffset - currentOffset > 0 ? 'up' : 'down';
        this.state.previousOffset = currentOffset;

        // Update title part and navigation
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
        if (currentOffset >= this.partEnd.outcome - (this.partHeight.outcome / 2)) {
            this.setState({part_title: "Conclusion"});
            this.setState({current_navigation: 5})
        }
    };
    scrollTo = (index) => {
        switch (index) {
            case 2:
                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.introduction + 1, animated: true});
                this.introSave();
                break;
            case 3:
                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.disruption + 1, animated: true});
                this.disruptSave();
                break;
            case 4:
                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.adventure + 1, animated: true});
                this.adventSave();
                break;
            case 5:
                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.outcome + 1, animated: true});
                this.outcomeSave();
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
                this.refs.FormScrollView.scrollTo({x: 0, y: 0, animated: true}); // case 2 to intro
                break;
        }
    };
    scrollNextTo = (index) => {
        switch (index) {
            case 2:
                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.disruption + 1, animated: true});
                this.disruptSave();
                break;
            case 3:
                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.adventure + 1, animated: true});
                this.adventSave();
                break;
            case 4:
                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.outcome + 1, animated: true});
                this.outcomeSave();
                break;
            default:
                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.introduction + 1, animated: true}); // case 1
                this.introSave();
                break;
        }
    };

    introSave() {
        let state = this.state;
        let intro_exp_1 = state.intro_exp_1.filter((exp) => { return exp.selected === true }),
            hero = addEndDot(state.intro_hero_who), characteristic = addEndDot(state.intro_hero_characteristic),
            habit_before = state.intro_hero_habit_before,
            intro_exp_2 = state.intro_hero_habit, habit_after = addEndDot(state.intro_hero_habit_after),
            intro_exp_3 = state.intro_hero_now, current_action = state.intro_hero_current_action,
            place = addEndDot(state.intro_place),
            partner_who = addEndDot(state.intro_partner_who), partner_how = addEndDot(state.intro_partner_how),
            intro_where = addEndDot(state.intro_description_where), intro_time = addEndDot(state.intro_description_time);

        let short_check = !hero || !characteristic || !habit_before || !habit_after || !current_action,
            medium_check = short_check || !partner_who || !partner_how,
            long_check = medium_check || !intro_where || !intro_time;

        if (intro_exp_1.length !== 0) {
            // console.log("A linking word has been had");
            let check_inputs = null;
            switch (this.length) {
                case 1: check_inputs = medium_check; break;
                case 2: check_inputs = long_check; break;
                default: check_inputs = short_check; break;
            }
            if (check_inputs) {
                state.intro_completed = false;
                this.refs.FormScrollView.scrollTo({x: 0, y: 0, animated: true}); // scroll to top
                // console.log("Something is empty");
            } else {
                // scroll and save
                state.intro_completed = true;
                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.introduction + 1, animated: true}); // scroll to next part
                let sentences = [
                    intro_exp_1[0].label, hero, characteristic,
                    habit_before, intro_exp_2, habit_after, intro_exp_3, current_action, place,
                    partner_who, partner_how, intro_where, intro_time];
                state.complete_story.title = generateTitle(hero, place);
                state.complete_story.introduction = gatherText(sentences);
            }
        } else { // scroll to see the next part if no linking word choose
            this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.introduction + 1, animated: true});
        }
    }
    disruptSave() {
        let state = this.state;
        let disrupt_exp_1 = state.disrupt_exp_1.filter((exp) => { return exp.selected === true }),
            disrupt_description = addEndDot(state.disrupt_description),
            disrupt_message = state.disrupt_message, disrupt_content = addEndDot(state.disrupt_content);
        if (this.length === 0 || this.length === 1) { disrupt_message = "";}

        let short_check = !disrupt_exp_1 || !disrupt_description,
            long_check = short_check || !disrupt_content;

        if (disrupt_exp_1.length !== 0) {
            let check_inputs = null;
            switch (this.length) {
                case 1: check_inputs = short_check; break;
                case 2: check_inputs = long_check; break;
                default: check_inputs = short_check; break;
            }
            if (check_inputs) {
                state.disrupt_completed = false;
                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.introduction + 1, animated: true});
            } else {
                // scroll and save
                state.disrupt_completed = true;
                if (state.intro_completed === true && state.disrupt_completed === true) { state.intro_disrupt_completed = true; }
                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.disruption + 1, animated: true});
                let sentences = [ disrupt_exp_1[0].label, disrupt_description, disrupt_message, disrupt_content];
                state.complete_story.disrupt = gatherText(sentences);
            }
        } else {
            this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.disruption + 1, animated: true});
        }
    }
    adventSave() {
        let state = this.state;
        let advent_hero_reaction = addEndDot(state.advent_hero_reaction), advent_partner_reaction = addEndDot(state.advent_partner_reaction),
            advent_exp_1 = state.advent_exp_1.filter((exp) => { return exp.selected === true }),
            advent_then = addEndDot(state.advent_then), advent_consequence = addEndDot(state.advent_consequence),
            imposed_event = imposed_events.events[this.adventure_event_id].event,
            response_event = state.adventure_imposed_event.filter((exp) => { return exp.selected === true }),
            advent_emotion = addEndDot(state.advent_emotion),
            advent_exp_2 = state.advent_exp_2.filter((exp) => { return exp.selected === true }),
            advent_action = addEndDot(state.advent_action);

        // Allow scroll if the story isn't written yet
        if (state.intro_completed === null && state.disrupt_completed === null) {
            this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.adventure + 1, animated: true});
        } else { // Start to check inputs
            if (advent_exp_1.length === 0) {
                if (this.length === 0) {
                    if (!advent_hero_reaction) {
                        state.adventure_completed_1 = false;
                    }
                    this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.disruption + 1, animated: true}); // scroll if empty
                } else if (this.length === 1 || this.length === 2) {
                    if (!advent_hero_reaction || !advent_partner_reaction) {
                        state.adventure_completed_1 = false;
                        this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.disruption + 1, animated: true});
                    } else {
                        this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.disruption + scaleHeight(120), animated: true});
                    }
                }

            } else { // Check the first linking word
                let check_inputs = null;
                let short_check = !advent_then || !imposed_event || !response_event.length > 0,
                    medium_check = short_check || !advent_partner_reaction || !advent_consequence || !advent_exp_2,
                    long_check = medium_check || !advent_emotion;
                switch (this.length) {
                    case 1: check_inputs = medium_check; break;
                    case 2: check_inputs = long_check; break;
                    default: check_inputs = short_check; break;
                }
                if (check_inputs) { // something empty
                    state.adventure_completed_2 = false;
                    if (this.length === 0) {
                        this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.disruption + 1, animated: true}); // short version
                    } else { // length === 1 || length === 2 : scroll to first linking word
                        this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.disruption + scaleHeight(120), animated: true});
                    }
                } else {
                    if (this.length === 0) {
                        state.adventure_completed = true;
                        this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.adventure + 1, animated: true});
                        let sentences = [advent_hero_reaction, advent_exp_1[0].label, advent_then, imposed_event, response_event[0].label];
                        state.complete_story.adventure = gatherText(sentences);
                        console.log(state.complete_story.adventure);
                    } else { // length === 1 || length === 2 : check the second linking word
                        if (advent_exp_2.length !== 0) {
                            let check_input = !advent_action;
                            if (check_input) {
                                state.adventure_completed_3 = false;
                                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.disruption + scaleHeight(280), animated: true});
                            } else {
                                state.adventure_completed = true;
                                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.adventure + 1, animated: true});
                                let sentences = [
                                    advent_hero_reaction, advent_partner_reaction,
                                    advent_exp_1[0].label, advent_then, advent_consequence,
                                    imposed_event, response_event[0].label, advent_emotion,
                                    advent_exp_2[0].label, advent_action
                                ];
                                state.complete_story.adventure = gatherText(sentences);
                                console.log(state.complete_story.adventure);
                            }
                        } else {
                            this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.disruption + scaleHeight(280), animated: true});
                        }
                    }
                }
            }
        }
    }
    outcomeSave() {
        let state = this.state;
        let outcome_exp_1 = state.outcome_exp_1.filter((exp) => { return exp.selected === true }),
            outcome_hero_solution = addEndDot(state.outcome_hero_solution),
            outcome_partner_solution = addEndDot(state.outcome_partner_solution);

        let short_check = !outcome_exp_1 || !outcome_hero_solution,
            medium_check = short_check || !outcome_partner_solution;

        if (outcome_exp_1.length !== 0) {
            let check_inputs = null;
            switch (this.length) {
                case 1: check_inputs = medium_check; break;
                case 2: check_inputs = medium_check; break;
                default: check_inputs = short_check; break;
            }
            if (check_inputs) {
                state.outcome_completed = false;
                this.refs.FormScrollView.scrollTo({x: 0, y: this.partEnd.adventure + 1, animated: true}); // scroll to top
            } else { // scroll and save
                state.outcome_completed = true;
                this.refs.FormScrollView.scrollToEnd({animated: true}); // scroll to the end
                let sentences = [outcome_exp_1[0].label, outcome_hero_solution, outcome_partner_solution];
                state.complete_story.outcome = gatherText(sentences);
            }
        } else { // scroll to see the next part if no linking word choose
            this.refs.FormScrollView.scrollToEnd({animated: true}); // scroll to the end
        }
    }

    render() {
        return (
            <View style={[GlobalStyle.view, GlobalStyle.headerView, FormStyle.formView]}>
                <Header
                    leftElm="home" rightElm="about"
                    goHome={() =>{
                        this.state.canPlay = false;
                        this.state.playPlaceSound = false;
                        this.props.navigation.navigate('Home')
                    }}
                    goAbout={() => this.props.navigation.navigate('About')}/>

                {this.renderTitlePart()}
                <ScrollView style={FormStyle.formScrollContainer}
                    ref="FormScrollView"
                    bounces={false} decelerationRate={'fast'}
                    scrollEventThrottle = {0}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    onScroll={this.onScroll} onScrollEndDrag={this.onScrollEndDrag}>
                        { // background sound
                            this.state.playPlaceSound ? this.playBaseSound(this.place.url, 0.5, "repeat") : null
                        }
                        { //added sound
                            this.state.canPlay ? this.playASound(this.state.sound.url, 0.5, "no-repeat", false) : null
                        }
                        { //validation sound
                            this.state.canPlayValidationSound ? this.playASound(this.validationSound, 0.5, "no-repeat", true) : null
                        }
                        {this.renderIntroduction()}
                        {this.renderDisruption()}
                        {this.renderAdventure()}
                        {this.renderOutcome()}
                        {this.renderConclusion()}
                </ScrollView>
                {this.renderNavigationPart()}
                {/*<Text>{'Length : ' + this.length}</Text>*/}
            </View>
        );
    }
}