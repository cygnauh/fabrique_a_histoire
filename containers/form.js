import React from 'react';
import { View, TextInput, Animated, Keyboard, ScrollView, Alert } from 'react-native';
import Header from '../components/header';
import RadioButton from '../components/radioButton';
import RectangleButton from '../components/rectangleButton';
import GlobalStyle from '../styles/mainStyle';
import FormStyle from "../styles/formStyle";
import Video from 'react-native-video';
import {scaleDelta, scaleHeight} from "../utils/scale";

const data = require('../assets/data/data_structure.json');

export default class Form extends React.Component{
    constructor(props) {
        super(props);
        this.length = this.props.navigation.state.params.length;
        this.basesound = this.props.navigation.state.params.basesound;



        this.place = this.props.navigation.state.params.place

        this.keyboardHeight = new Animated.Value(0);
        this.state = {
            // introduction_place: "dans la jungle" + ".",
            introduction_place: this.place  + ".",
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

            //sound helper
            // can_play: false
        };

        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onBuffer = this.onBuffer.bind(this);

        this.loadSoundsFromAPI()
    }

    onLoad(data) {
        console.log('On load fired!');
        this.setState({duration: data.duration});
    }

    onProgress(data) {
        this.setState({currentTime: data.currentTime});
    }

    onBuffer({ isBuffering }: { isBuffering: boolean }) {
        this.setState({ isBuffering });
    }

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        } else {
            return 0;
        }
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
            disrupt = data.disruption,
            adventure = data.adventure,
            state = this.state;

        let intro_expression_1 = intro.expression_1.filter((exp) => {return exp.selected === true}),
            hero = state.introduction_hero_who,
            characteristic = state.introduction_hero_characteristic,
            description = state.introduction_hero_description,
            intro_expression_2 = intro.expression_2.filter((exp) => {return exp.selected === true}),
            hobbies = state.introduction_hero_hobbies,
            current_action = state.introduction_hero_current_action,
            place = state.introduction_place,
            disrupt_expression_1 = disrupt.expression_1.filter((exp) => {return exp.selected === true}),
            disrupt_event = state.disruption_event_description,
            disrupt_reaction = state.disruption_event_reaction,
            disrupt_decision = state.disruption_event_decision,
            disrupt_then = state.disruption_event_then,
            adventure_expression_1 = adventure.expression_1.filter((exp) => {return exp.selected === true}),
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
                { cancelable: false }
            )
        } else {
            // Create the text
            let text_elm = [
                intro_expression_1[0].label, hero, characteristic, description, intro_expression_2[0].label, hobbies, current_action, place,
                disrupt_expression_1[0].label, disrupt_event, disrupt_reaction, disrupt_decision, disrupt_then,
                adventure_expression_1[0].label, adventure_description, adventure_reaction],
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
            // TODO ckeck the address IP of the network to find the raspberry one
            let home_url = 'http://192.168.0.37:8080/',
                christine_url = 'http://192.168.43.70:8080/';
            fetch(home_url, {
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

            // TODO Save the story in the database
        }
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
                onChangeText={(text) => this.inputOnChange(name, text)}
                onBlur={(e) => this.onBlurSearchSound(e)}
                multiline={true} placeholder={placeholder} value={state}/>;

        if (state.length > 0) {
            question = <TextInput style={[FormStyle.question]} editable={false} selectTextOnFocus={false} value = {placeholder}/>;
        }
        return(
            <View>
                {question}{input}
            </View>
        )
    }

    // -------------------------------- test son

    onBlurSearchSound(e){
        console.log(e.nativeEvent.text)

        var theString = e.nativeEvent.text
        var res = theString.split(" ");

        for(var i = 0; i < res.length; i++){
            this.searchSound(res[i])
        }

        // console.log(res[2])

        //break down the string




    }

    //appel API
    searchSound(word){
        if(this.state.sounds){
            for(var i = 0 ; i<this.state.sounds.length; i++){
                if(word.replace(/[^a-zA-Z ]/g, "").toLowerCase() === this.state.sounds[i].name){
                    console.log("word found", this.state.sounds[i].name)
                    console.log(this.state.sounds[i].url)

                    //Can Play

                    this.setState({can_play: true, sound : this.state.sounds[i]})

                }
            }
        }
    }

    playASound(url){
        return(


            <Video
                source={{uri: url }}
                style={styles.fullScreen}
                rate={this.state.rate}
                paused={this.state.paused}
                volume={this.state.volume}
                muted={this.state.muted}
                ignoreSilentSwitch={this.state.ignoreSilentSwitch}
                resizeMode={this.state.resizeMode}
                onLoad={this.onLoad}
                onBuffer={this.onBuffer}
                onProgress={this.onProgress}
                // onEnd={() => { AlertIOS.alert('Done!') }}
                repeat={true}
            />

    )}


    loadSoundsFromAPI(){
            return fetch('https://testappfabulab.herokuapp.com/sounds')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        isLoading: false,
                        sounds:responseJson
                    }, function(){

                    });
                })
                .catch((error) =>{
                    console.error(error);
                });
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
            <View style={[FormStyle.formContainer]}>
                {this.renderRadioBtn(disruption.expression_1)}
                {this.renderInput("disruption_event_description", disruption.event.description.placeholder, state.disruption_event_description)}
                {this.renderInput("disruption_event_reaction", disruption.event.hero_reaction.placeholder, state.disruption_event_reaction)}
                {this.renderInput("disruption_event_decision", disruption.event.hero_decision.placeholder, state.disruption_event_decision)}
                {this.renderInput("disruption_event_then", disruption.event.then.placeholder, state.disruption_event_then)}
            </View>
        );
    }
    renderAdventure() {
        let adventure = data.adventure,
            state = this.state;
        return (
            <Animated.View style={[FormStyle.formContainer, { paddingBottom: this.keyboardHeight }]}>
                {this.renderRadioBtn(adventure.expression_1)}
                {this.renderInput("adventure_event_description", adventure.event.description.placeholder, state.adventure_event_description)}
                {this.renderInput("adventure_event_reaction", adventure.event.hero_reaction.placeholder, state.adventure_event_reaction)}
            </Animated.View>
        );
    }

    render() {

        console.log(global.test)
        return(
            <View style={[GlobalStyle.view, GlobalStyle.headerView, FormStyle.formView]}>
                <Header onPress={() => this.props.navigation.goBack()}/>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} >
                    {
                        // Pass any View or Component inside the curly bracket.
                        // Here the ? Question Mark represent the ternary operator.

                        this.state.can_play ?
                            <Video
                                source={{uri: this.state.sound.url }}
                                rate={this.state.rate}
                                paused={this.state.paused}
                                volume={this.state.volume}
                                muted={this.state.muted}
                                ignoreSilentSwitch={this.state.ignoreSilentSwitch}
                                resizeMode={this.state.resizeMode}
                                onLoad={this.onLoad}
                                onBuffer={this.onBuffer}
                                onProgress={this.onProgress}
                                // onEnd={() => { AlertIOS.alert('Done!') }}
                                repeat={true}
                            />: null

                    }


                    {this.renderIntroduction()}
                    {this.renderDisruption()}
                    {this.renderAdventure()}
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