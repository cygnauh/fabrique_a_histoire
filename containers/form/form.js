import React from 'react';
import {View, Text, TextInput, Animated, Keyboard, ScrollView, Alert, UIManager, findNodeHandle, TouchableOpacity, Image} from 'react-native';
import Header from '../../components/header';
import RadioButton from '../../components/radioButton';
import RectangleButton from '../../components/rectangleButton';
import GlobalStyle from '../../styles/mainStyle';
import FormStyle from "../../styles/formStyle";
import Video from 'react-native-video';
import { scaleDelta, scaleHeight } from "../../utils/scale";
import { getRandomInt, delEndDot, addEndDot, upperCaseFirst } from "../../utils/tools";

const data = require('../../assets/data/structure.json');
const imposed_events = require('../../assets/data/imposed_events');

export default class Form extends React.Component {

    constructor(props) {
        super(props);
        this.length = this.props.navigation.state.params.length;
        this.basesound = this.props.navigation.state.params.basesound;
        this.validationSound = "https://christinehuang.fr/BDDI2018/sounds/VALIDATION/validation.mp3"
        this.place = this.props.navigation.state.params.place
        this.story_sounds = []
        this.state = {
            introduction_place: this.place.name,
            introduction_and: "et",
            introduction_hero_who: "",
            introduction_hero_characteristic: "",
            introduction_hero_description: "",
            introduction_hero_hobbies: "",
            introduction_hero_current_action: "",
            disruption_event_description: "",
            disruption_event_reaction: "",
            disruption_event_decision: "",
            disruption_event_then: "",
            adventure_event_decision: "",
            adventure_event_consequence: "",
            adventure_event_reaction: "",
            adventure_event_then: "",
            outcome_description_solution: "",
            outcome_description_then: "",
            conclusion_description_change: "",
            conclusion_description_learn: "",
            part_title: "Introduction",
            adventure_event_id: getRandomInt(0, imposed_events.meteorological.length - 1),
            current_navigation: 1,
        };
        this.partEnd = {
            introduction: '',
            disruption: '',
            adventure: '',
            outcome: '',
        };
        this.keyboardHeight = new Animated.Value(0);

        // this.baseSound_load = false

        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onBuffer = this.onBuffer.bind(this);
        this.onEnd = this.onEnd.bind(this);

        this.baseSoundRepeat = 0
        this.loadSoundsFromAPI()
    }


    onLoad(data) {

        if(!this.baseSound_load){
            this.baseSound_load = true
            this.startOriginCounter()
            console.log("turn to true")
        }
        console.log('On load fired!');
        this.setState({duration: data.duration});
    }

    onProgress(data) {
        this.setState({currentTime: data.currentTime});
    }

    onBuffer({isBuffering}: { isBuffering: boolean }) {
        this.setState({isBuffering});
    }

    onEnd(data) {
        console.log("this is the end")
        //reset from the beggining of the sound
        this.baseSoundRepeat ++
        this.now = new Date().getTime()
    }


    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        } else {
            return 0;
        }
    }

    getCurrentTimeFromNow() {

        this.time = new Date().getTime() - this.now
        return this.time
    }

    startOriginCounter(){
        if(this.baseSound_load){
            console.log("isLoad")
            this.now = new Date().getTime()
        }
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
    eventOnVote(index) {
        let events = imposed_events.meteorological,
            imposed_event = events[this.state.adventure_event_id],
            choices = imposed_event.choice;
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
            console.log(e.nativeEvent.text, 'onfocus')
            this.canAnalyseTheString = false
        }
    }

    onBlurSearchSound(e) {
        console.log(this.getCurrentTimePercentage())

        var theString = e.nativeEvent.text
        if (this.canAnalyseTheString === true && theString !== "") {
            console.log("this.canAnalyseTheString", this.canAnalyseTheString)
            var res = theString.split(" ");
            for (var i = 0; i < res.length; i++) {
                this.searchSound(res[i])
            }
            this.setCanPlayValidationSound()
        }
    }

    //appel API
    searchSound(word) {


        if (this.state.sounds) {
            for (var i = 0; i < this.state.sounds.length; i++) {
                if (word.replace(/[^a-zA-Z ]/g, "").toLowerCase() === this.state.sounds[i].name) {

                    //Wait until validation sound is played
                    var _i = i
                    setTimeout(() => {

                        //check if the sound is already there
                        var found = this.story_sounds.some( (el)  =>{
                            return el.sound === this.state.sounds[_i];
                        });
                        if (!found) {

                            this.setState({can_play: true, sound: this.state.sounds[_i]})

                            //stock the sound id
                            var name = this.state.sounds[_i]
                            var story_sound = {sound: this.state.sounds[_i], time: this.getCurrentTimeFromNow(), repeat : this.baseSoundRepeat}
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
            console.log("A")
        }
        else {
            this.setState({canPlayValidationSound: true})

            //let the sound be played before reset it
            setTimeout(() => {
                this.setCanPlayValidationSound();
            }, 3000);
            console.log("B")
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
                onEnd={this.onEnd}
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
        let short_intro = data.introduction.short,
            short_disrupt = data.disruption.short,
            short_adventure = data.adventure.short,
            short_outcome = data.outcome.short,
            short_conclusion = data.conclusion.short,
            state = this.state;

        let intro_expression_1 = short_intro.expression_1.filter((exp) => {
                return exp.selected === true
            }),
            hero = addEndDot(state.introduction_hero_who),
            description = addEndDot(state.introduction_hero_description),
            characteristic = state.introduction_hero_characteristic,
            intro_expression_2 = state.introduction_and,
            hobbies = addEndDot(state.introduction_hero_hobbies),
            current_action = state.introduction_hero_current_action,
            place = addEndDot(state.introduction_place),
            disrupt_expression_1 = short_disrupt.expression_1.filter((exp) => {
                return exp.selected === true
            }),
            disrupt_event = addEndDot(state.disruption_event_description),
            disrupt_reaction = addEndDot(state.disruption_event_reaction),
            disrupt_decision = addEndDot(state.disruption_event_decision),
            disrupt_then = addEndDot(state.disruption_event_then),
            adventure_expression_1 = short_adventure.expression_1.filter((exp) => {
                return exp.selected === true
            }),
            adventure_decision = addEndDot(state.adventure_event_decision),
            adventure_consequence = addEndDot(state.adventure_event_consequence),
            imposed_event = imposed_events.meteorological[state.adventure_event_id].event,
            response_event = imposed_events.meteorological[state.adventure_event_id].choice.filter((exp) => {
                return exp.selected === true
            }),
            adventure_reaction = addEndDot(state.adventure_event_reaction),
            adventure_then = addEndDot(state.adventure_event_then),
            outcome_expression_1 = short_outcome.expression_1.filter((exp) => {
                return exp.selected === true
            }),
            outcome_solution = addEndDot(state.outcome_description_solution),
            outcome_then = addEndDot(state.outcome_description_then),
            conclusion_expression_1 = short_conclusion.expression_1.filter((exp) => {
                return exp.selected === true
            }),
            conclusion_change = addEndDot(state.conclusion_description_change),
            conclusion_learn = addEndDot(state.conclusion_description_learn);


        // Check before retrieve
        if (!hero || !characteristic || !description || !hobbies || !current_action || !disrupt_event || !disrupt_reaction || !disrupt_decision || !disrupt_then || !adventure_decision || !adventure_consequence || !response_event || !adventure_reaction || !adventure_then || !outcome_solution || !outcome_then || !conclusion_change || !conclusion_learn) {
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
                    intro_expression_1[0].label,
                    hero,
                    description,
                    characteristic,
                    intro_expression_2,
                    hobbies, current_action,
                    place,
                    disrupt_expression_1[0].label,
                    disrupt_event,
                    disrupt_reaction,
                    disrupt_decision,
                    disrupt_then,
                    adventure_expression_1[0].label,
                    adventure_decision,
                    adventure_consequence,
                    imposed_event,
                    response_event[0].label,
                    adventure_reaction,
                    adventure_then,
                    outcome_expression_1[0].label,
                    outcome_solution,
                    outcome_then,
                    conclusion_expression_1[0].label,
                    conclusion_change,
                    conclusion_learn
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
                if (text_elm[i] === place || text_elm[i] === disrupt_then || text_elm[i] === adventure_then || text_elm[i] === outcome_then) {
                    story += text_elm[i] + '@'; // add @ previous custom words sentence
                } else {
                    story += text_elm[i] + ' ';
                }
            }
            console.log(this.story_sounds);
            this.props.navigation.navigate('Correction', {story: story, title: title, sounds:this.story_sounds, place:this.place});
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
    renderInput(name, placeholder, state, autoCapitalize = 'sentences') {
        let question = null,
            input = <TextInput
                style={[FormStyle.inputItem, FormStyle.formItem, state !== "" && FormStyle.onChange]}
                onChangeText={(text) => this.inputOnChange(name, text)}
                onFocus={(e) => this.onFocusHelper(e)}
                onBlur={(e) => this.onBlurSearchSound(e)}
                autoCapitalize={autoCapitalize}
                multiline={true}
                placeholder={placeholder}
                value={state}/>;

        if (state.length > 0) {
            question = <TextInput style={[FormStyle.question]} editable={false} selectTextOnFocus={false} value={placeholder}/>;
        }
        return (
            <View>
                {question}{input}
            </View>
        )
    }
    renderImposedEvent(){
        let events = imposed_events.meteorological,
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
                <TextInput style={[FormStyle.formItem, FormStyle.placeItem]} multiline={true} editable={false} selectTextOnFocus={false}
                    value={imposed_event.event}/>
                {choices}
            </View>
        );
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

    renderIntroduction() {
        let short_intro = data.introduction.short,
            state = this.state,
            medium_intro_render = null,
            opacity = null;
        if (this.state.current_navigation === 1) { opacity = 1; } else { opacity = .4; }

        let short_intro_render =
            <View>
                {this.renderRadioBtn(short_intro.expression_1)}
                {this.renderInput("introduction_hero_who", short_intro.hero.who.placeholder, state.introduction_hero_who, 'none')}
                {this.renderInput("introduction_hero_description", short_intro.hero.description.placeholder, state.introduction_hero_description)}
                {this.renderInput("introduction_hero_characteristic", short_intro.hero.characteristic.placeholder, state.introduction_hero_characteristic)}
                <TextInput style={[FormStyle.formItem, FormStyle.placeItem]} editable={false} selectTextOnFocus={false} value={state.introduction_and}/>
                {this.renderInput("introduction_hero_hobbies", short_intro.hero_detail.hobbies.placeholder, state.introduction_hero_hobbies, 'none')}
                {this.renderInput("introduction_hero_current_action", short_intro.hero_detail.current_action.placeholder, state.introduction_hero_current_action)}
                <TextInput style={[FormStyle.formItem, FormStyle.placeItem]} editable={false} selectTextOnFocus={false} value={state.introduction_place + '.'}/>
            </View>;
        if (this.length === 1 || this.length === 2) {
            //TODO replaced the right inputs
 /*           medium_intro_render =
                <View>

                    {this.renderInput("introduction_hero_who", short_intro.hero.who.placeholder, state.introduction_hero_who)}
                    {this.renderInput("introduction_hero_characteristic", short_intro.hero.characteristic.placeholder, state.introduction_hero_characteristic)}
                </View>*/
        }
        if (this.length === 2) {
            // TODO
        }

        return (
            <View style={[FormStyle.formContainer, {opacity: opacity}]} ref="Introduction" onLayout={(e) => {
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
            state = this.state,
            opacity: null;
        if (this.state.current_navigation === 2) { opacity = 1; } else { opacity = .4; }

        return (
            <View style={[FormStyle.formContainer, {opacity: opacity}]} ref="Disrupt" onLayout={(e) => {
                let view = this.refs['Disrupt'],
                    handle = findNodeHandle(view);
                UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                    this.partEnd.disruption = y + height - scaleHeight(150); // padding bottom
                })
            }}>
                {this.renderRadioBtn(short_disruption.expression_1)}
                {this.renderInput("disruption_event_description", short_disruption.event.description.placeholder, state.disruption_event_description, 'none')}
                {this.renderInput("disruption_event_reaction", short_disruption.event.hero_reaction.placeholder, state.disruption_event_reaction)}
                {this.renderInput("disruption_event_decision", short_disruption.event.hero_decision.placeholder, state.disruption_event_decision)}
                {this.renderInput("disruption_event_then", short_disruption.event.then.placeholder, state.disruption_event_then)}
            </View>
        );
    }
    renderAdventure() {
        let short_adventure = data.adventure.short,
            state = this.state,
            opacity: null;
        if (this.state.current_navigation === 3) { opacity = 1; } else { opacity = .4; }
        return (
            <View style={[FormStyle.formContainer, {opacity: opacity}]} ref="Adventure" onLayout={(e) => {
                let view = this.refs['Adventure'],
                    handle = findNodeHandle(view);
                UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                    this.partEnd.adventure = y + height - scaleHeight(150); // padding bottom
                })
            }}>
                {this.renderRadioBtn(short_adventure.expression_1)}
                {this.renderInput("adventure_event_decision", short_adventure.event.hero_decision.placeholder, state.adventure_event_decision, 'none')}
                {this.renderInput("adventure_event_consequence", short_adventure.event.consequence.placeholder, state.adventure_event_consequence)}
                {this.renderImposedEvent()}
                {this.renderInput("adventure_event_reaction", short_adventure.event.hero_reaction.placeholder, state.adventure_event_reaction)}
                {this.renderInput("adventure_event_then", short_adventure.event.then.placeholder, state.adventure_event_then)}
            </View>
        );
    }
    renderOutcome() {
        let short_outcome = data.outcome.short,
            state = this.state,
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
        let short_conclusion = data.conclusion.short,
            state = this.state,
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

                        {// background sound
                            this.place ? this.playBaseSound(this.place.url, 0.5, "repeat") : null
                        }

                        {//added sound
                            this.state.can_play ? this.playASound(this.state.sound.url, 0.5, "no-repeat", false) : null
                        }

                        {//validation sound
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