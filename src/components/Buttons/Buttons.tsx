import React, { Component } from 'react';
import { View, Text, TextInput, Image, Pressable, TouchableOpacity, TouchableHighlight } from 'react-native';
import styles from './styles';


export default function Buttons({
  onPress,
  title,
  disabled,
  backgroundColor = '',
  borderColor = '',
  borderWidth = '',
  textColor = '',
  flag,
}) {

  return (
    <View style={styles.conatiner}>
      <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.buttonContainer, backgroundColor == 'green' && styles.bg, backgroundColor == 'none' && styles.border]}>
        <Text style={[styles.buttonTitle, textColor != '' && styles.textcolor]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}





