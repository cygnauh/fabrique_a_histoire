import React from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, Animated, ActivityIndicator, Button} from 'react-native';
import Header from '../components/header';
import GlobalStyle from '../styles/mainStyle';
import Video from 'react-native-video';

export default class ReadingMode extends React.Component {
    constructor(props) {
        super(props);

        this.responseJson = this.props.navigation.state.params.responseJson;
        console.log(this.responseJson)
        this.state = {
            isLoading: false,
            displayReadingSound:true
        };

        if(this.state){
            this.handleResponseJson()
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

    handleResponseJson() {


        if (this.responseJson && this.responseJson.length === 4) {

            this.state.base_sound = this.responseJson[3].base_sound[0]
            this.state.story_title = this.responseJson[0].title
            this.state.sounds_added = this.responseJson[1].sounds_added
            this.state.sounds_added_url = this.responseJson[2].sounds_added_url
        }

        if (this.state.sounds_added) {
            this.handleAddedSound(this.state.sounds_added_url)
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

            for (var j = 0; j < this.state.sounds_added.length; j++) {
                for (var i = 0; i < url.length; i++) {

                    if (url[i].id === this.state.sounds_added[j].sound_id) {
                        this.state.sounds_added[j].url = url[i].url
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

                <Header onPress={() => {
                    this.setState({
                        displayReadingSound:false
                    });
                    setTimeout(()=>{this.props.navigation.goBack();}, 500)

                }}/>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    {this.state.base_sound ? (<View>

                        <View style={GlobalStyle.placeContainer}>

                            {this.state.story_title ?
                                <Text style={GlobalStyle.placeTitle}>{this.state.story_title}</Text> : null}

                        </View>
                    </View>) : null
                    }

                    {// background sound
                        (this.state.displayReadingSound && this.state.base_sound) ? (
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
                        ( this.state.displayReadingSound && this.state.canPlay && this.state.sound_url) ? this.playASound(this.state.sound_url) : null
                    }

                </View>
            </View>
        )
    }
}
