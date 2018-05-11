import React from 'react';

const getRandomInt = (min, max) => { // min and max included
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
};

export { getRandomInt }