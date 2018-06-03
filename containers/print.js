import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';
import Header from '../components/header';
import RectangleButton from '../components/rectangleButton';
import GlobalStyle from "../styles/mainStyle";
import { addNil } from "../utils/tools";

export default class Print extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            nbCopies: 1,
            updateBtnVisible: true,
        };
    }

    setModalVisible(visible) {
        this.setState({
            modalVisible: visible,
        });
    }

    printStory() {
        //console.log(this.props.story);

        /** Send a request to the raspberry **/
        // TODO Check the address IP of the network to find the raspberry one

        let home_url = 'http://192.168.0.37:8080/',
            christine_url = 'http://192.168.43.70:8080/';

        fetch(christine_url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: this.props.title,
                text: this.props.story,
                quantity: this.state.nbCopies,
            })
        }).then(function (response) {
            console.log(response);
            this.setState({updateBtnVisible: false,});
            return response;
        }).catch(function (error) {
            return error;
        });

        // TODO Save the story in the database

        var api_url = "https://testappfabulab.herokuapp.com/createStory"
        var api_url_storysounds = "https://testappfabulab.herokuapp.com/createstorysound"

        console.log(this.props.place)

        fetch(api_url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "text/plain"
            },
            body: JSON.stringify({
                "title": this.props.title,
                "content": this.props.story,
                "base_sound":this.props.place.id,
                "light":this.props.place.color
            })
        }).then(function (response) {

            console.log(response);
            return response.json();
        }).then((responseJson) => {

            this.story_id = responseJson[0].insertId

            console.log(this.props.sounds)

            // ---------------------------------------------------- send the story sounds

            if (this.story_id) {
                for (var i = 0; i < this.props.sounds.length; i++) {

                    fetch(api_url_storysounds, {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            "Content-Type": "text/plain"
                        },
                        body: JSON.stringify({
                            'storyId': this.story_id,
                            'soundId': this.props.sounds[i].sound.id,
                            'addAtTime': this.props.sounds[i].time
                        })
                    }).then(function (response) {
                        console.log(response)
                        console.log("good")
                        return response;
                    }).catch(function (error) {
                        return error;
                    })
                }
            }
        }).catch(function (error) {
            return error;
        })



        /** Hide modal **/
        this.setModalVisible(!this.state.modalVisible);
    }

    renderUpdateBtn() {
        let update_btn = null;
        if (this.state.updateBtnVisible) {
            update_btn = <RectangleButton
                content={'Modifier'}
                src={require('../assets/images/arrowPrev.png')}
                onPress={() => this.props.prevNav.goBack()}/>;
        }
        return(update_btn)
    }

    manageQuantity(type) {
        if (type === 'subtract') {
            if (this.state.nbCopies > 1) { // at least one
                this.setState({
                    nbCopies: this.state.nbCopies - 1,
                });
            }
        } else if (type === 'add') {
            this.setState({
                nbCopies: this.state.nbCopies + 1,
            });
        }
    };

    render() {
        return(
            <View>
                <Modal animationType="slide" transparent={false} visible={this.state.modalVisible}>
                    <View style={[GlobalStyle.view]}>
                        <Image style={GlobalStyle.backgroundImage} source={require('../assets/images/background.png')} />
                        <Header onPress={() => this.setModalVisible(!this.state.modalVisible)}/>
                        <Text style={[GlobalStyle.subtitle, GlobalStyle.printTitle]}>
                            Combien de copies faut-il imprimer ?
                        </Text>
                        <View style={GlobalStyle.printQuantityContainer}>
                            <TouchableOpacity
                                style={GlobalStyle.quantityBackground}
                                onPress={this.manageQuantity.bind(this, 'subtract')}>
                                <Text style={GlobalStyle.manageQuantity}>-</Text>
                            </TouchableOpacity>
                            <Text style={GlobalStyle.nbCopies}>{addNil(this.state.nbCopies)}</Text>
                            <TouchableOpacity
                                style={GlobalStyle.quantityBackground}
                                onPress={this.manageQuantity.bind(this, 'add')}>
                                <Text style={GlobalStyle.manageQuantity}>+</Text>
                            </TouchableOpacity>
                        </View>
                        /*run request the set modal visible*/
                        <RectangleButton
                            content={'Imprimer'}
                            src={require('../assets/images/print.png')}
                            onPress = {() => this.printStory()}/>
                    </View>
                </Modal>
                <View style={GlobalStyle.reReadingBtnContainer}>
                    {this.renderUpdateBtn()}
                    <RectangleButton
                        content={'Valider'}
                        src={require('../assets/images/validate.png')}
                        onPress = {() => {this.setModalVisible(true)}}/>
                </View>
            </View>
        );
    }
}