import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import styles from './styles';
import {Images} from '../../components/index';
import Modal from 'react-native-modal';
import {CheckBox} from 'react-native-elements';

export default function Buttons({checked, onPress}) {
  return (
    <View style={styles.conatiner}>
      <View style={{margin: 0, padding: 0}}>
        <CheckBox
          checkedIcon={
            <Image source={Images.checkbox_select} style={styles.checkbox} />
          }
          uncheckedIcon={
            <Image source={Images.checkbox_unselect} style={styles.checkbox} />
          }
          checked={checked}
          containerStyle={{
            padding: 0,
            margin: 0,
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            alignItems: 'center',
          }}
          onPress={onPress}
          // onPress={() => setCount(count + 1)}
        />
      </View>
    </View>
  );
}
