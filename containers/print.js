import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity, TextInput, Alert, Button } from 'react-native';
import Header from '../components/header';
import RectangleButton from '../components/rectangleButton';
import GlobalStyle from "../styles/mainStyle";
import { addNil, shutDown, networkUrl } from "../utils/tools";
import FormStyle from "../styles/formStyle";

export default class Print extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            nbCopies: 1,
            updateBtnVisible: true,
            isRegistered:false
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

        this.setState({
            canDisplay:true
        })


        if(!this.raspberryUrl){
            this.raspberryUrl = networkUrl
        }

        fetch(this.raspberryUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: "print",
                title: this.props.title,
                text: this.props.story,
                quantity: this.state.nbCopies,
            })
        }).then(function (response) {
            console.log(response);
            return response;
        }).catch(function (error) {
            return error;
        });

        // Save the story in the database
        let api_url = "https://testappfabulab.herokuapp.com/createStory";
        let api_url_storysounds = "https://testappfabulab.herokuapp.com/createstorysound";

        console.log(this.props.place)

        if(!this.state.isRegistered){

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

                this.story_id = responseJson[0].insertId;

                // ---------------------------------------------------- send the story sounds

                if (this.story_id) {

                    for (let i = 0; i < this.props.sounds.length; i++) {

                        console.log(this.story_id, this.props.sounds[i].sound.id, this.props.sounds[i].time)

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


                            this.setState({
                                isRegistered:true
                            })

                            console.log(response);
                            console.log("good");
                            return response;
                        }).catch(function (error) {
                            return error;
                        })
                    }
                }
            }).catch(function (error) {
                return error;
            })

        }else{
            console.log("already registered")
        }



        /** Hide modal **/
        this.setState({updateBtnVisible: false,});
        this.setModalVisible(!this.state.modalVisible);
    }

    renderUpdateBtn() {
        let update_btn = null;
        if (this.state.updateBtnVisible) {
            update_btn = <RectangleButton
                content={'Modifier'}
                src={require('../assets/images/arrowPrev.png')}
                onPress={() => this.props.nav.goBack()}/>;
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

                        {/*TO BE TESTED*/}

                        <View>
                            { this.state.input ? <Text style={[{paddingBottom: 20}]}>{networkUrl}</Text> :null}
                            <TextInput
                                placeholder={networkUrl}
                                onChangeText={(text) => this.setState({input: text})}
                            />
                            <Button title={'update url'} onPress={() => {this.raspberryUrl = this.input}}/>

                        </View>

                        {/*TO BE TESTED*/}


                        /*run request the set modal visible*/
                        <RectangleButton
                            content={'Imprimer'}
                            src={require('../assets/images/print.png')}
                            onPress = {() => this.printStory()}/>
                    </View>
                </Modal>
                <View style={GlobalStyle.reReadingBtnContainer}>
                    {this.renderUpdateBtn()}

                    {!this.state.canDisplay ? (
                        <RectangleButton
                        content={'Valider'}
                        src={require('../assets/images/validate.png')}
                        onPress = {() => {this.setModalVisible(true)}}
                        />
                        )

                     :null}

                    {this.state.canDisplay ? (<RectangleButton
                        content={'Recommencer'}
                        textAlign={'center'}
                        onPress = {() => this.props.nav.navigate('Length')}/>) : null
                    }

                    {this.state.canDisplay ? (<RectangleButton
                        content={'Terminer'}
                        textAlign={'center'}
                        onPress = {() => {shutDown()}}/>) : null
                    }
                </View>
            </View>
        );
    }
}