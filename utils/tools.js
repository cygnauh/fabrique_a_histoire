import React from 'react';

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

export { getRandomInt, delEndDot, addEndDot, upperCaseFirst, addNil, gatherText, generateTitle }