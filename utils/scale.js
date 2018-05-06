import React from 'react';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Standard sizes for an 5" screen mobile device
const baseWidth = 350;
const baseHeight = 680;

const scaleWidth = (size) => width / baseWidth * size;
const scaleHeight = (size) => height / baseHeight * size;
const scaleDelta = (size, factor) => size + (scaleWidth(size) - size) * factor;

export { scaleWidth, scaleHeight, scaleDelta }