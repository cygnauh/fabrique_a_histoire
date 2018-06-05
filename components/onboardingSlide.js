import React from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Image} from 'react-native';
import Header from '../components/header';
import RectangleButton from './rectangleButton';
import OnBoardingStyle from '../styles/onboardingStyle';
import GlobalStyle from "../styles/mainStyle";
import { colors } from "../styles/colors";
import { networkUrl } from "../utils/tools";

const { width, height } = Dimensions.get('window');

export default class OnBoardingSlide extends React.Component {

    /* ScrollView Component props */
    static defaultProps = {
        horizontal: true,
        pagingEnabled: true,
        showsHorizontalScrollIndicator: false,
        showsVerticalScrollIndicator: false,
        bounces: false,
        scrollsToTop: false, // do not scroll to the top when the status bar is tapped
        automaticallyAdjustContentInsets: false, // do not adjust content behind nav
        index: 0,
    };
    state = this.initState(this.props);

    /* Initialize the state */
    initState(props) {
        const nbSlides = props.children ? props.children.length || 1 : 0, // Get the total number of slides
            index = props.index, // Current index
            offset = width * index; // Current offset
        const state = { nbSlides, index, offset, width, height };
        // Component internals as a class property and not state to avoid component re-renders when updated
        this.internals = {
            isScrolling: false,
            offset
        };
        this.connection = {
            indicatorColor: colors.paleSalmon,
            text: "Connexion en cours..."
        };
        return state;
    }

    /* Scroll begin handler */
    onScrollBegin = () => {
        this.internals.isScrolling = true; // Update internal isScrolling state
    };

    /* Scroll end handler */
    onScrollEnd = (e: Object) => {
        this.internals.isScrolling = false; // Update internal isScrolling state
        this.updateIndex(e.nativeEvent.contentOffset.x); // Update index
    };

    /* Drag end handler  */
    onScrollEndDrag = (e: Object) => {
        const { contentOffset: { x: newOffset } } = e.nativeEvent,
            { children } = this.props,
            { index } = this.state,
            { offset } = this.internals;

        // if swiped right on the last slide or left on the first one
        if (offset === newOffset && (index === 0 || index === children.length - 1)) {
            this.internals.isScrolling = false; // update internal isScrolling state
        }
    };

    /* Update index after scroll */
    updateIndex = (offset) => {
        const state = this.state,
            diff = offset - this.internals.offset, // current offset - old offset
            screenWidth = state.width;
        let index = state.index;
        if (!diff) { return; } // do nothing if offset didn't change

        index = parseInt(index + Math.round(diff / screenWidth), 10); // go left === -1 and right +1
        this.internals.offset = offset; // update internal offset
        this.setState({
            index // Update index in the state
        });
    };

    /* Swipe one slide forward */
    swipe = () => {
        // ignore if already scrolling or if there is less than 2 slides
        if (this.internals.isScrolling || this.state.nbSlides < 2) {
            return;
        }

        const state = this.state,
            diff = this.state.index + 1,
            x = diff * state.width,
            y = 0;
        // console.log(this.state);
        this.scrollView && this.scrollView.scrollTo({ x, y, animated: true });
        this.internals.isScrolling = true; // update internal scroll state
    };

    /* Render ScrollView component */
    renderScrollView = (sliders) => {
        return (
            <ScrollView ref={component => { this.scrollView = component; }}
                        {...this.props}
                        contentContainerStyle={this.props.style}
                        onScrollBeginDrag={this.onScrollBegin}
                        onMomentumScrollEnd={this.onScrollEnd}
                        onScrollEndDrag={this.onScrollEndDrag}
            >
                {sliders.map((slide, i) =>
                    <View style={[OnBoardingStyle.fullScreen]} key={i}>
                        {slide}
                        {this.renderButton()} /*Render buttons according the case */
                    </View>
                )}
            </ScrollView>
        );
    };

    /* Render pagination indicators */
    renderPagination = () => {
        if (this.state.nbSlides <= 1) { return null; }
        let paginations = [];
        const currentSlide =
            <TouchableOpacity>
                <Text style={
                    [OnBoardingStyle.paginationItem, OnBoardingStyle.currentPagination]}>
                    {this.state.index + 1}
                </Text>
            </TouchableOpacity>;

        for (let key = 0, nbSlides = this.state.nbSlides; key < nbSlides; key++) {
            let otherSlide =
                <Text style={OnBoardingStyle.paginationItem}>{key + 1}</Text>;
            if (key === this.state.index) {
                paginations.push(React.cloneElement(currentSlide, { key })) // active slide
            } else {
                paginations.push(React.cloneElement(otherSlide, { key }))
            }
        }
        return (
            <View pointerEvents="none" style={[OnBoardingStyle.fullScreen, OnBoardingStyle.paginationContainer]}>
                {paginations}
            </View>
        );
    };

    /* Render buttons according the case */
    renderButton = () => {
        let button;
        const lastSlide = this.state.index === this.state.nbSlides - 1;
        if (lastSlide) {
            button = <RectangleButton
                content="Commencer" src={require('../assets/images/validate.png')}
                onPress={() => this.props.navigation.navigate('Length')} />
        } else {
            button = <RectangleButton content="Continuer" src={require('../assets/images/arrowNext.png')} onPress={() => this.swipe()} />
        }
        return (
            <View pointerEvents="box-none" style={
                [OnBoardingStyle.fullScreen, OnBoardingStyle.buttonContainer]}>
                <View style={[OnBoardingStyle.line]}/>
                {button}
            </View>
        );
    };

    renderHeader = () => {
        return(
            <Header
                rightElm="skip"
                onPress={() => this.props.navigation.goBack()}
                goLength={() => this.props.navigation.navigate('Length')}
            />
        );
    };


    renderConnection = () => {
        // TODO : send in continue the request ?
        let connection = this.connection;

        fetch(networkUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'testConnection',
            })
        }).then(function (response) {
            connection.text = "Machine connectée";
            connection.indicatorColor = colors.greenishTeal;
            return response;
        }).catch(function (error) {
            return error;
        });

        return(
            <View style={OnBoardingStyle.connectionContainer}>
                <View style={[OnBoardingStyle.connectionIndication, {backgroundColor: connection.indicatorColor}]}/>
                <Text style={OnBoardingStyle.connectionText}>{connection.text.toUpperCase()}</Text>
            </View>
        )
    };

    /* Render the component */
    render = ({ children } = this.props) => {
        return (
            <View style={[OnBoardingStyle.fullScreen, OnBoardingStyle.container]}>
                <Image style={GlobalStyle.backgroundImage} source={require('../assets/images/background.png')} />
                {this.renderHeader()}
                {this.renderConnection()}
                {this.renderScrollView(children)} /*Render screens */
                {this.renderPagination()} /*Render pagination */
            </View>
        );
    }
}