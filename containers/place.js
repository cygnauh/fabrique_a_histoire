import React from 'react';
import {
    View,
    Text,
    Button,
    ActivityIndicator,
    FlatList,
    Animated,
    StyleSheet,
    Easing,
    TouchableOpacity,
    AlertIOS,
    AppRegistry,
    Platform,
  } from 'react-native';
import Header from '../components/header';
import RectangleButton from '../components/rectangleButton';
import GlobalStyle from '../styles/mainStyle';
import Video from 'react-native-video';
import TimerMixin from 'react-timer-mixin';

// http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4


export default class Place extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            isLoading: true,
            opacity: new Animated.Value(0.7),
            status:false

        };
        this.colors =[

            '#e0650b', //volvan
            '#e3a34b', //désert
            '#f4ddac', //plage
            '#66892c', //jungle
            // '#004c34', //forêt
            '#1a507d', //lac
            '#6b9adb', //ciel
            '#c6c1b8', //montagne
            '#7d7d7d', //ville
            // '#4f4640', //grotte
        ]

        // this.color="#aaa"
        // // this.changeColor(Colors, this.color)

        this.animatedValue = new Animated.Value(0);

        //test
        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onBuffer = this.onBuffer.bind(this);

        setTimeout( ()=>{
            this.ShowHideTextComponentView();
        }, 3000);
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

    renderSkinControl(skin) {
        const isSelected = this.state.skin == skin;
        const selectControls = skin == 'native' || skin == 'embed';
        return (
            <TouchableOpacity onPress={() => { this.setState({
                controls: selectControls,
                skin: skin
            }) }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
                    {skin}
                </Text>
            </TouchableOpacity>
        );
    }

    renderRateControl(rate) {
        const isSelected = (this.state.rate == rate);

        return (
            <TouchableOpacity onPress={() => { this.setState({rate: rate}) }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
                    {rate}x
                </Text>
            </TouchableOpacity>
        )
    }

    renderResizeModeControl(resizeMode) {
        const isSelected = (this.state.resizeMode == resizeMode);

        return (
            <TouchableOpacity onPress={() => { this.setState({resizeMode: resizeMode}) }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
                    {resizeMode}
                </Text>
            </TouchableOpacity>
        )
    }

    renderVolumeControl(volume) {
        const isSelected = (this.state.volume == volume);

        return (
            <TouchableOpacity onPress={() => { this.setState({volume: volume}) }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
                    {volume * 100}%
                </Text>
            </TouchableOpacity>
        )
    }

    renderIgnoreSilentSwitchControl(ignoreSilentSwitch) {
        const isSelected = (this.state.ignoreSilentSwitch == ignoreSilentSwitch);

        return (
            <TouchableOpacity onPress={() => { this.setState({ignoreSilentSwitch: ignoreSilentSwitch}) }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
                    {ignoreSilentSwitch}
                </Text>
            </TouchableOpacity>
        )
    }

    // renderCustomSkin() {
    //     const flexCompleted = this.getCurrentTimePercentage() * 100;
    //     const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
    //
    //     return (
    //         <View style={styles.container}>
    //             <TouchableOpacity style={styles.fullScreen} onPress={() => {this.setState({paused: !this.state.paused})}}>
    //                 <Video
    //                     source={{uri: "https://christinehuang.fr/BDDI2018/sounds/WATER/LAKE.mp3"}}
    //                     style={styles.fullScreen}
    //                     rate={this.state.rate}
    //                     paused={this.state.paused}
    //                     volume={this.state.volume}
    //                     muted={this.state.muted}
    //                     ignoreSilentSwitch={this.state.ignoreSilentSwitch}
    //                     resizeMode={this.state.resizeMode}
    //                     onLoad={this.onLoad}
    //                     onBuffer={this.onBuffer}
    //                     onProgress={this.onProgress}
    //                     // onEnd={() => { AlertIOS.alert('Done!') }}
    //                     repeat={true}
    //                 />
    //             </TouchableOpacity>
    //
    //             <View style={styles.controls}>
    //                 <View style={styles.generalControls}>
    //                     <View style={styles.skinControl}>
    //                         {this.renderSkinControl('custom')}
    //                         {this.renderSkinControl('native')}
    //                         {this.renderSkinControl('embed')}
    //                     </View>
    //                 </View>
    //                 <View style={styles.generalControls}>
    //                     <View style={styles.rateControl}>
    //                         {this.renderRateControl(0.5)}
    //                         {this.renderRateControl(1.0)}
    //                         {this.renderRateControl(2.0)}
    //                     </View>
    //
    //                     <View style={styles.volumeControl}>
    //                         {this.renderVolumeControl(0.5)}
    //                         {this.renderVolumeControl(1)}
    //                         {this.renderVolumeControl(1.5)}
    //                     </View>
    //
    //                     <View style={styles.resizeModeControl}>
    //                         {this.renderResizeModeControl('cover')}
    //                         {this.renderResizeModeControl('contain')}
    //                         {this.renderResizeModeControl('stretch')}
    //                     </View>
    //                 </View>
    //                 <View style={styles.generalControls}>
    //                     {
    //                         (Platform.OS === 'ios') ?
    //                             <View style={styles.ignoreSilentSwitchControl}>
    //                                 {this.renderIgnoreSilentSwitchControl('ignore')}
    //                                 {this.renderIgnoreSilentSwitchControl('obey')}
    //                             </View> : null
    //                     }
    //                 </View>
    //
    //                 <View style={styles.trackingControls}>
    //                     <View style={styles.progress}>
    //                         <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]} />
    //                         <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]} />
    //                     </View>
    //                 </View>
    //             </View>
    //         </View>
    //     );
    // }

    // renderNativeSkin() {
    //     const videoStyle = this.state.skin == 'embed' ? styles.nativeVideoControls : styles.fullScreen;
    //     return (
    //         <View style={styles.container}>
    //             <View style={styles.fullScreen}>
    //                 <Video
    //                     source={{uri: "https://christinehuang.fr/BDDI2018/sounds/WATER/LAKE.wav"}}
    //                     style={videoStyle}
    //                     rate={this.state.rate}
    //                     paused={this.state.paused}
    //                     volume={this.state.volume}
    //                     muted={this.state.muted}
    //                     ignoreSilentSwitch={this.state.ignoreSilentSwitch}
    //                     resizeMode={this.state.resizeMode}
    //                     onLoad={this.onLoad}
    //                     onBuffer={this.onBuffer}
    //                     onProgress={this.onProgress}
    //                     // onEnd={() => { AlertIOS.alert('Done!') }}
    //                     repeat={true}
    //                     controls={this.state.controls}
    //                 />
    //             </View>
    //             <View style={styles.controls}>
    //                 <View style={styles.generalControls}>
    //                     <View style={styles.skinControl}>
    //                         {this.renderSkinControl('custom')}
    //                         {this.renderSkinControl('native')}
    //                         {this.renderSkinControl('embed')}
    //                     </View>
    //                 </View>
    //                 <View style={styles.generalControls}>
    //                     <View style={styles.rateControl}>
    //                         {this.renderRateControl(0.5)}
    //                         {this.renderRateControl(1.0)}
    //                         {this.renderRateControl(2.0)}
    //                     </View>
    //
    //                     <View style={styles.volumeControl}>
    //                         {this.renderVolumeControl(0.5)}
    //                         {this.renderVolumeControl(1)}
    //                         {this.renderVolumeControl(1.5)}
    //                     </View>
    //
    //                     <View style={styles.resizeModeControl}>
    //                         {this.renderResizeModeControl('cover')}
    //                         {this.renderResizeModeControl('contain')}
    //                         {this.renderResizeModeControl('stretch')}
    //                     </View>
    //                 </View>
    //                 <View style={styles.generalControls}>
    //                     {
    //                         (Platform.OS === 'ios') ?
    //                             <View style={styles.ignoreSilentSwitchControl}>
    //                                 {this.renderIgnoreSilentSwitchControl('ignore')}
    //                                 {this.renderIgnoreSilentSwitchControl('obey')}
    //                             </View> : null
    //                     }
    //                 </View>
    //             </View>
    //
    //         </View>
    //     );
    // }





    animateBackgroundColor = () =>
    {
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear
            }
        ).start((animation) => {

            // this.animateBackgroundColor()
            if (animation.finished) {
                this.animateBackgroundColor()
                // this.spin();
            }});

        let callback = (value) => {
            console.log(value)
        }

        let stopAnimation = function(){
            Animated.timing(
                this.animatedValue
            ).stop((value)=>{
                console.log(value)
            });

        };
        stopAnimation = stopAnimation.bind(this);

        setTimeout( ()=>{
            stopAnimation(this.animatedValue);
        }, 3000);



    }

    componentDidMount(){
        this.animateBackgroundColor();

        return fetch('https://testappfabulab.herokuapp.com/places')
            .then((response) => response.json())
            .then((responseJson) => {

                // console.log(responseJson)

                var random = Math.floor(Math.random() * Math.floor(responseJson.length));

                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                    randomPlace:random,
                    randomPlaceName:responseJson[random],
                    colors:responseJson.color
                }, function(){

                });

                if(this.state.randomPlaceName.url){
                    console.log(this.state.randomPlaceName.url)
                }



            })
            .catch((error) =>{
                console.error(error);
            });
    }

    ShowHideTextComponentView = () =>{

        if(this.state.status == true)
        {
            this.setState({status: false})
        }
        else
        {
            this.setState({status: true})
        }
    }

    render() {
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;


        const backgroundColorVar = this.animatedValue.interpolate(
            {
                inputRange:[ 0, 0.1,0.3,0.4,0.5,0.6,0.7, 1 ],
                outputRange:  this.colors
            });


        if(this.state.isLoading){
            return(
                <View style={[GlobalStyle.view, GlobalStyle.headerView]}>
                    <Header onPress={() => this.props.navigation.goBack()}/>
                    <View style={{flex: 1,  justifyContent: 'center'}}>


                        <ActivityIndicator/>
                    </View>
                </View>
            )
        }
        return(


            <Animated.View style={[GlobalStyle.view, GlobalStyle.headerView, { backgroundColor: backgroundColorVar }]}>
                <Header onPress={() => this.props.navigation.goBack()}/>

                {/*<Animated.View style = {[ styles.container, { backgroundColor: backgroundColorVar } ]}>*/}
                    {/*<Text style = { styles.text }>Animated </Text>*/}
                {/*</Animated.View>*/}

                <View>
                    <Text style={GlobalStyle.placePhrase}>Cette histoire se passe </Text>

                    <View style={GlobalStyle.placeContainer}>

                        {/*TEST VIDEO*/}

                        <View style={styles.container}>
                            {/*<TouchableOpacity style={styles.fullScreen} onPress={() => {this.setState({paused: !this.state.paused})}}>*/}

                            {
                                // Pass any View or Component inside the curly bracket.
                                // Here the ? Question Mark represent the ternary operator.

                                this.state.randomPlaceName ?
                                    <Video
                                    source={{uri: this.state.randomPlaceName.url }}
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
                                />: null

                            }

                            {/*</TouchableOpacity>*/}

                            {/*<View style={styles.controls}>*/}
                                {/*<View style={styles.generalControls}>*/}
                                    {/*<View style={styles.skinControl}>*/}
                                        {/*{this.renderSkinControl('custom')}*/}
                                        {/*{this.renderSkinControl('native')}*/}
                                        {/*{this.renderSkinControl('embed')}*/}
                                    {/*</View>*/}
                                {/*</View>*/}
                                {/*<View style={styles.generalControls}>*/}
                                    {/*<View style={styles.rateControl}>*/}
                                        {/*{this.renderRateControl(0.5)}*/}
                                        {/*{this.renderRateControl(1.0)}*/}
                                        {/*{this.renderRateControl(2.0)}*/}
                                    {/*</View>*/}

                                    {/*<View style={styles.volumeControl}>*/}
                                        {/*{this.renderVolumeControl(0.5)}*/}
                                        {/*{this.renderVolumeControl(1)}*/}
                                        {/*{this.renderVolumeControl(1.5)}*/}
                                    {/*</View>*/}

                                    {/*<View style={styles.resizeModeControl}>*/}
                                        {/*{this.renderResizeModeControl('cover')}*/}
                                        {/*{this.renderResizeModeControl('contain')}*/}
                                        {/*{this.renderResizeModeControl('stretch')}*/}
                                    {/*</View>*/}
                                {/*</View>*/}
                                {/*<View style={styles.generalControls}>*/}
                                    {/*{*/}
                                        {/*(Platform.OS === 'ios') ?*/}
                                            {/*<View style={styles.ignoreSilentSwitchControl}>*/}
                                                {/*{this.renderIgnoreSilentSwitchControl('ignore')}*/}
                                                {/*{this.renderIgnoreSilentSwitchControl('obey')}*/}
                                            {/*</View> : null*/}
                                    {/*}*/}
                                {/*</View>*/}

                                {/*<View style={styles.trackingControls}>*/}
                                    {/*<View style={styles.progress}>*/}
                                        {/*<View style={[styles.innerProgressCompleted, {flex: flexCompleted}]} />*/}
                                        {/*<View style={[styles.innerProgressRemaining, {flex: flexRemaining}]} />*/}
                                    {/*</View>*/}
                                {/*</View>*/}
                            {/*</View>*/}
                        </View>
                        {/*TEST VIDEO*/}




                        {
                            // Pass any View or Component inside the curly bracket.
                            // Here the ? Question Mark represent the ternary operator.

                            this.state.status ?  <Text style={GlobalStyle.placeTitle}>{this.state.randomPlaceName.name}</Text> : null
                        }

                    </View>
                </View>
                <RectangleButton content={'Continuer'} src={require('../assets/images/validate.png')} onPress={
                    () => this.props.navigation.navigate('Form',{place: this.state.randomPlaceName.name} )}/>
                {/*<RectangleButton title={'Continuer'()} onPress={() => this.props.navigation.navigate('Form', {place: this.state.randomPlaceName.name} )} />*/}
            </Animated.View>

        );
    }

    // render() {
    //     return this.renderCustomSkin();
    // }
}

// const audio_options = {
//     source:{remote:{uri:"http://www.sample-videos.com/audio/mp3/india-national-anthem.mp3"}}
// }



// Later on in your styles..

const styles = StyleSheet.create({

    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

    MainContainer :{

// Setting up View inside content in Vertically center.
        justifyContent: 'center',
        flex:1,
        margin: 10

    },

    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: 'black',
    // },


    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        backgroundColor: "transparent",
        borderRadius: 5,
        position: 'absolute',
        bottom: 44,
        left: 4,
        right: 4,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 20,
        backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C',
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
        paddingBottom: 10,
    },
    skinControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    volumeControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ignoreSilentSwitchControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: "white",
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    },
    nativeVideoControls: {
        top: 184,
        height: 300
    }

});

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'black',
//     },
//     fullScreen: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         bottom: 0,
//         right: 0,
//     },
//     controls: {
//         backgroundColor: "transparent",
//         borderRadius: 5,
//         position: 'absolute',
//         bottom: 44,
//         left: 4,
//         right: 4,
//     },
//     progress: {
//         flex: 1,
//         flexDirection: 'row',
//         borderRadius: 3,
//         overflow: 'hidden',
//     },
//     innerProgressCompleted: {
//         height: 20,
//         backgroundColor: '#cccccc',
//     },
//     innerProgressRemaining: {
//         height: 20,
//         backgroundColor: '#2C2C2C',
//     },
//     generalControls: {
//         flex: 1,
//         flexDirection: 'row',
//         overflow: 'hidden',
//         paddingBottom: 10,
//     },
//     skinControl: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'center',
//     },
//     rateControl: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'center',
//     },
//     volumeControl: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'center',
//     },
//     resizeModeControl: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     ignoreSilentSwitchControl: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     controlOption: {
//         alignSelf: 'center',
//         fontSize: 11,
//         color: "white",
//         paddingLeft: 2,
//         paddingRight: 2,
//         lineHeight: 12,
//     },
//     nativeVideoControls: {
//         top: 184,
//         height: 300
//     }
// });