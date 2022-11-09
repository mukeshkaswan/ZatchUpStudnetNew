import React, {Component, FC, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// import FloatLabelTextInput from 'react-native-floating-label-text-input';
import styles from './styles';
import RNPickerSelect from 'react-native-picker-select';
// create a component
const CustomDropdown: FC = ({
  SelectedLanguagedata,
  placeholder,
  value,
  data,
  onChangeText,
  secureTextEntry,
  disabled,
}) => {
  // const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <View style={{flex: 1}}>
      <View style={styles.dropdownpicker}>
        <RNPickerSelect
          style={pickerStyle}
          items={data.map(obj => ({
            label: obj.label,
            value: obj.value,
            color: 'rgba(77,38,22,1)',
          }))}
          value={value}
          disabled={disabled}
          placeholder={{
            label: placeholder,
            value: null,
          }}
          onValueChange={(itemValue, itemIndex) => {
            SelectedLanguagedata(itemValue);
          }}
        />
        <Text
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            bottom: 0,
            left: 0,
          }}>
          {' '}
        </Text>
      </View>
    </View>
    // <View style={{ flex:1 }}>
    //   <View style={styles.dropdownpicker}>
    //     <RNPickerSelect
    //       value={value}
    //       //   value={value}
    //       // value={valueitem}
    //       style={pickerStyle}
    //       //  placeholder={{}}

    //       placeholder={{
    //         label: placeholder,
    //         value: null,
    //       }}

    //       disabled={disabled}
    //       // selectedValue={selectedValue}
    //       //  onValueChange={(value) => SelectedLanguagedata(value)}

    //       onValueChange={
    //         (itemValue, itemIndex) => {
    //           //  console.log('-------saazdfsdfsdfsdfsdfsdfdsfdsfa>', typeof itemValue);
    //           SelectedLanguagedata(itemValue);
    //         }
    //         //  SelectedLanguagedata(itemValue)
    //       }
    //       items={data.map(obj => ({
    //         label: obj.label,
    //         value: obj.value,
    //         //value: obj._id,
    //         color: 'rgba(77,38,22,1)',
    //       }))}
    //       >

    //       {/* items={[
    //             { label: 'Football', value: 'football' },
    //             { label: 'Baseball', value: 'baseball' },
    //             { label: 'Hockey', value: 'hockey' },
    //         ]}
    //       <Item label={label1} value={value1} />
    //       <Item label={label2} value={value2} />
    //       <Item label={label3} value={value3} /> */}
    //     </RNPickerSelect>
    //   </View>
    // </View>
  );
};

const pickerStyle = {
  inputIOS: {
    color: '#000',
    // paddingHorizontal: 5,
    // backgroundColor: 'red',
    borderRadius: 5,
    marginLeft: 10,
  },
  placeholder: {
    //  color: 'white',
    color: '#A6A9A7',
  },
  iconContainer: {
    placeholderColor: 'red',
    // top: scale(2),
    // right: scale(20),
  },
  inputAndroid: {
    color: '#000',
    //  paddingHorizontal: 5,
    // backgroundColor: 'red',

    borderRadius: 5,
  },
};
export default CustomDropdown;
