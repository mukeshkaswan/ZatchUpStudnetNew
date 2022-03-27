import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

interface AppProps {
  onChangeText: (email: any) => void;
  onIconPress: () => void;
  secureTextEntry?: boolean;
  editable?: boolean;
  isPlaceHolder?: boolean;
  multiline?: boolean;
  keyboardType?: any;
  placeholderTextColor?: string;
  imageIcon?: string;
  value?: string;
  placeholder?: string;
  error?: string;
  maxLength?: number;
  numberOfLines?: number;
  customStyles?: any;
  onEndEditing: (email: any) => void;
}
interface State { }

export default class TextField extends Component<AppProps, {}> {
  static defaultProps = {
    underlineColorAndroid: 'transparent',
    autoCapitalize: 'sentences',
    editable: true,
    isPlaceHolder: true,
    secureTextEntry: false,
    multiline: false,
    keyboardType: 'default',
    placeholderTextColor: '#33333380',
    imageIcon: '',
    value: '',
    error: '',
    placeholder: '',
    maxLength: 100,
    numberOfLines: 1,
    customStyles: '',
  };

  constructor(props: AppProps) {
    super(props);
  }
  componentDidMount() { }

  render() {
    //console.log("---------->", this.props);
    return (
      <View
        style={[
          styles.inputContainer,
          this.props.imageIcon != '' && styles.flexdirection,
          ...this.props.customStyles,
        ]}>
        <TextInput
          ref={ref =>
            ref && ref.setNativeProps({ style: { fontFamily: 'Lato-Regular' } })
          }
          maxLength={this.props.maxLength}
          //  placeholderTextColor={'red'}
          underlineColorAndroid="transparent"
          //  placeholderTextColor = {'#333'}

          onChangeText={this.props.onChangeText}
          secureTextEntry={this.props.secureTextEntry}
          editable={this.props.editable}
          multiline={this.props.multiline}
          onEndEditing={this.props.onEndEditing}
          numberOfLines={this.props.numberOfLines}
          keyboardType={this.props.keyboardType}
          placeholder={this.props.isPlaceHolder ? this.props.placeholder : ''}
          value={this.props.value}
          style={[
            styles.textboxfieldd,
            this.props.imageIcon == '' && styles.textboxwidth,
            this.props.multiline && styles.textAreaCss,
          ]}
        />
        {this.props.imageIcon != '' && (
          <View style={styles.imageiconConatiner}>
            <TouchableWithoutFeedback onPress={this.props.onIconPress}>
              <Image source={this.props.imageIcon} style={styles.imageicon} />
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
    );
  }
}

//export default TextField;
