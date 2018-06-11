import React from 'react';
import {Alert} from "react-native";

const getRandomInt = (min, max) => { // min and max included
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
};

const delEndDot = (string) => {
    if (string.indexOf(".") > - 1) { // has dot
        let string_parts = string.split(".");
        return string_parts[0];
    } else {
        return string;
    }
};

const addEndDot = (string) => { // add dot if no punctuations at the end
    let last_character = string.slice(-1),
        filter = /^[a-zA-Z]$/;
    if (filter.test(last_character)) { // hasn't dot
        return string + '.';
    } else {
        return string;
    }
};

const upperCaseFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1); // first letter + string without first letter
};

const addNil = (digit) => {
    return (digit < 10) ? ("0" + digit) : digit;
};

const shutDown = () => {
    Alert.alert('Attention', 'Voulez-vous vraiment éteindre la machine ?',
        [
            {text: 'Annuler', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'Éteindre', onPress: () => fetch(networkUrl, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        action: 'shutdown',
                    })
                }).then(function (response) {
                    console.log(response);
                    return response;
                }).catch(function (error) {
                    return error;
                })
            },
        ],
        { cancelable: false } // unable dismiss by tapping outside of the alert box
    );
}

const gatherText = (sentences) => {
    let text = "";
    for (let i = 0, count = sentences.length; i < count; i++) {
        if (sentences[i] !== "") {
            text += sentences[i] + ' ';
        }
        // text += sentences[i] + '@'; // add @ previous custom words sentence
    }
    return text;
};

const generateTitle = (hero, place) => {
    return upperCaseFirst(delEndDot(hero) + ' ' + delEndDot(place)); // hasn't apostrophe
};

let home_url = 'http://192.168.0.37:8080/',
    christine_url = 'http://192.168.43.71:8080/',
    noemie_url = 'http://192.168.43.70:8080/';
const networkUrl = noemie_url;

export { getRandomInt, delEndDot, addEndDot, upperCaseFirst, addNil, gatherText, generateTitle, networkUrl, shutDown }