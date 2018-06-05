import React from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, Animated, ActivityIndicator, Button} from 'react-native';
import Header from '../components/header';
import GlobalStyle from '../styles/mainStyle';
import Video from 'react-native-video';

export default class readingMode extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }

        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onBuffer = this.onBuffer.bind(this);
        this.onEnd = this.onEnd.bind(this);
    }

    onLoad(data) {

        if (!this.baseSound_load) {
            this.baseSound_load = true
        }
        // console.log('On load fired!');
        this.setState({duration: data.duration});
    }

    onProgress(data) {
        this.setState({currentTime: data.currentTime});
    }

    onBuffer({isBuffering}: { isBuffering: boolean }) {
        this.setState({isBuffering});
    }

    onEnd() {

            this.setState({
                canPlay: false
            });

    }

    getSounds(id) {

        this.setState({
            isLoading: true,
            story_not_found: false,
            story_id_incorrect: false
        });

        if (id !== '') {
            var num = parseInt(id)
            if (isNaN(num)) {
                this.setState({
                    isLoading: false,
                    story_id_incorrect: true
                });
            } else {
                var request = 'https://testappfabulab.herokuapp.com/storysoundsforreading?story=' + num

                return fetch(request)

                    .then((response) => {

                        if (response.status === 500) {
                            this.setState({
                                story_not_found: true,
                                isLoading: false
                            })
                        } else {
                            response.json()
                                .then((responseJson) => {
                                    if (responseJson && responseJson.length === 4) {
                                        this.setState({
                                            base_sound: responseJson[3].base_sound[0],
                                            story_title: responseJson[0].title,
                                            sounds_added: responseJson[1].sounds_added,
                                            sounds_added_url: responseJson[2].sounds_added_url
                                        }, function () {

                                        });
                                    }

                                    if (this.state.sounds_added) {
                                        this.handleAddedSound(this.state.sounds_added_url)
                                    }

                                    this.setState({
                                        isLoading: false,
                                    });
                                })
                        }
                    })

                    .catch((error) => {
                        console.error(error);
                    });
            }

        }
    }

    apiRequestForStorySounds() {

        if (!this.state.base_sound) {
            return (
                <View>
                    <TextInput
                        placeholder={"Entrer le code"}
                        onChangeText={(text) => this.setState({input: text})}
                        style={{padding: 20}}
                        keyboardType='numeric'
                    />

                    <TouchableOpacity onPress={() => {
                        this.getSounds(this.state.input)
                    }}>
                        <Text style={GlobalStyle.homeBtn}>{'Relire mon histoire'}</Text>
                    </TouchableOpacity>
                </View>

            )
        }
    }

    sortBy(a, b) {

        const genreA = a.time;
        const genreB = b.time;

        let comparison = 0;
        if (genreA > genreB) {
            comparison = 1;
        } else if (genreA < genreB) {
            comparison = -1;
        }
        return comparison;
    }

    handleAddedSound(url) {


        if (this.state.sounds_added && url) {

            this.state.sounds_added.sort(this.sortBy)

            for (var j = 1; j < this.state.sounds_added.length; j++) {
                for (var i = 0; i < url.length; i++) {

                    if (url[i].id === this.state.sounds_added[j].sound_id) {
                        this.state.sounds_added[j].url = url[i].url
                    }

                    if (url[i].id === this.state.sounds_added[0].sound_id) {
                        this.state.sounds_added[0].url = url[i].url
                    }
                }
            }

            for (var k = 0; k < this.state.sounds_added.length; k++) {
                this.setTimerToPlaySound(this.state.sounds_added[k].time / 2, this.state.sounds_added[k].url)
            }
        }
    }

    setTimerToPlaySound(delay, url) {

        setTimeout(() => {
            console.log("URL", url)
            this.setState({
                canPlay: true,
                sound_url: url

            })
        }, delay)
    }

    playASound(url) {

        this.repeat = false
        return (
            <Video
                source={{uri: url}}
                volume={1}
                onLoad={this.onLoad}
                onBuffer={this.onBuffer}
                onProgress={this.onProgress}
                onEnd={this.onEnd} //reset canPlay
                repeat={this.repeat}
            />
        )
    }


    setBackgroundColor() {
        if (this.state.base_sound) {
            return this.state.base_sound.color
        } else {
            return 'transparent'
        }
    }


    render() {

        if (this.state.isLoading) {
            return (
                <View style={[GlobalStyle.view, GlobalStyle.headerView]}>
                    <Header onPress={() => this.props.navigation.goBack()}/>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <ActivityIndicator/>
                    </View>
                </View>
            )
        }

        return (

            <View style={[GlobalStyle.view, GlobalStyle.headerView, {backgroundColor: this.setBackgroundColor()}]}>

                <Header onPress={() => this.props.navigation.goBack()}/>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    {this.state.story_not_found ? (
                        <View> <Text style={{color: "#D66853"}}> Nous n'avons pas trouvé d'histoire avec ce code.</Text>
                        </View>) : null}
                    {this.state.story_id_incorrect ? (
                        <View> <Text style={{color: "#D66853"}}> Il faut entrer seulement des chiffres. </Text>
                        </View>) : null}

                    {this.apiRequestForStorySounds()}

                    {this.state.base_sound ? (<View>

                        <View style={GlobalStyle.placeContainer}>

                            {this.state.story_title ?
                                <Text style={GlobalStyle.placeTitle}>{this.state.story_title}</Text> : null}

                        </View>
                    </View>) : null
                    }

                    {// background sound
                        this.state.base_sound ? (
                            <Video
                                source={{uri: this.state.base_sound.url}}
                                volume={0.2}
                                onLoad={this.onLoad}
                                onBuffer={this.onBuffer}
                                onProgress={this.onProgress}
                                // onEnd={}//reset canPlay
                                repeat={this.repeat}
                            />
                        ) : null
                    }

                    { // detected sound
                        (this.state.canPlay && this.state.sound_url) ? this.playASound(this.state.sound_url) : null
                    }

                </View>
            </View>
        )
    }
}
