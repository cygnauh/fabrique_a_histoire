
import React from 'react';
import {View} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './containers/home';
import OnBoarding from './containers/onboarding';
import Length from './containers/length';
import Place from './containers/place';
import Form from './containers/form';
import Video from 'react-native-video';
import {Animated} from "react-native";

const StackNavigation = StackNavigator(
    {
        Home: { screen: Home },
        Onboarding: { screen: OnBoarding },
        Length: { screen: Length },
        Place: { screen: Place },
        Form: { screen: Form},
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
    }
);



export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            isLoading: true,
            opacity: new Animated.Value(0.7),
            status:false

        };


        // this.color="#aaa"
        // // this.changeColor(Colors, this.color)

        //test
        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onBuffer = this.onBuffer.bind(this);


    }

    //Test
    state = {
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'contain',
        duration: 0.0,
        currentTime: 0.0,
        controls: false,
        paused: true,
        skin: 'custom',
        ignoreSilentSwitch: null,
        isBuffering: false,
    };

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



    render() {
        return (
            <View>
                <StackNavigation/>
                <Video
                    source={{uri: "https://christinehuang.fr/BDDI2018/sounds/WATER/OCEAN.mp3" }}
                    rate={this.state.rate}
                    paused={this.state.paused}
                    volume={0.5}
                    muted={this.state.muted}
                    ignoreSilentSwitch={this.state.ignoreSilentSwitch}
                    resizeMode={this.state.resizeMode}
                    onLoad={this.onLoad}
                    onBuffer={this.onBuffer}
                    onProgress={this.onProgress}
                    onEnd={() => { console.log('Done!') }}
                    repeat={false}
                />
            </View>

        );
    }
}