import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Button, Platform, Image, KeyboardAvoidingView, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import styles from './style';
import { Images } from '../../../components/index';
import OtpInputs from 'react-native-otp-inputs';
import { TextField, CustomButton, CustomStatusBar, BackBtn, CustomDropdown, Validate } from '../../../components';
const screenWidth = Dimensions.get('window').width;
import { CheckBox } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SignUpScreenProps { navigation: any }

const SignUpScreen = (props: SignUpScreenProps) => {

  const [Firstname, setFirstname] = useState('dfsd');
  const [Lastname, setLastname] = useState('sdfsdf');
  const [Email, setEmail] = useState('@mailinator.com');
  const [Phone, setPhone] = useState('');
  const [Password, setPassword] = useState('@MUKesh77');
  const [ConfirmPassword, setConfirmPassword] = useState('@MUKesh77');
  const [Gender, setGender] = useState('');
  const [CustomGender, setCustomGender] = useState('');
  const [count, setCount] = useState(0);
  const [allSelected, setSelected] = useState(false)
  const [male, setMale] = useState(false)
  const [Female, setFemale] = useState(false)
  const [Custom, setCustom] = useState(false)
  const [customgenderView, setcustomgenderView] = useState(false)
  const [isLoading, setLoading] = useState(false);
  const [pronoun, setSelectpronoun] = useState('');
  const [SecureTextEntry, setSecureTextEntry] = useState(true);
  const [SecureTextEntryRepassword, setSecureTextEntryRepassword] = useState(true);
  const [KYC_type_doc_Selected, setKYCSelected] = useState('');

  const dispatch = useDispatch();

  const [KYC_type_doc, setKYC_type_doc] = useState([
    {
      label: 'He',
      value: '0',
    },
    {
      label: 'She',
      value: '1',
    },
    {
      label: 'They',
      value: '2',
    },
  ]);

  const [date, setDate] = useState(new Date());
  const [date_copy, setDate_Copy] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);


  const renderIndicator = () => {
    return (
      <View style={{}}>

        <ProgressLoader
          visible={true}
          isModal={true} isHUD={true}
          //hudColor={"#ffffff00"}
          hudColor={"#4B2A6A"}
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
          color={"white"} />
      </View>
    );
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    if (event.type == "set") {   //ok button
      setDate(currentDate)
    } else {    //cancel Button
      return null
    }
    //  setDate(currentDate);
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    //  console.log('A date has been picked: ' + day + '-' + month + '-' + year);
    //setDate_Copy(year + '-' + month + '-'  + day);

    var MyDateString = (currentDate.getFullYear()) + '-'
      + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-'
      + ('0' + (currentDate.getDate())).slice(-2)
    //  console.log('A date has been picked: ' + day + '-' + month + '-' + year);
    setDate_Copy(MyDateString);

    // YYYY-MM-DD
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };



  const checkedterm = () => {
    setSelected(!allSelected)

  }


  const checkedMale = () => {
    setMale(!male)
    setFemale(false)
    setCustom(false)
    setcustomgenderView(false)
    setGender('M')
  }

  const checkedFemale = () => {
    setFemale(!Female)
    setCustom(false)
    setMale(false)
    setcustomgenderView(false)
    setGender('F')
  }

  const checkedCustom = () => {
    setCustom(!Custom)
    setMale(false)
    setFemale(false)
    setcustomgenderView(true)
    setGender('M')
  }


  const _storeData = async () => {
    try {
      await AsyncStorage.setItem('username', Firstname + " " + Lastname);
      await AsyncStorage.setItem('dob', date_copy);


    } catch (e) {
      // saving error
    }
  };


  const onPressSignup = () => {
   // const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //  var key = Email.indexOf("@") != -1 ? 'email' : 'mobile'
    var hasNumber = /\d/; 
    var key = Email.indexOf('@') == -1 ? hasNumber.test(Email) ? 'mobile': 'email':'email';//'email' : 'mobile';
    const firstnameError = Validate("first_name", Firstname);
    const dobError = Validate("dob", date_copy);
    const genderError = Validate("gender", male || Female || Custom);
    const lastameError = Validate("last_name", Lastname);
    const emailError = Validate(key, Email);
    // const emailError = Validate('email', Email);
    const passwordError = Validate("password", Password);
    const confirmPasswordError = Validate(
      "confirm_password",
      ConfirmPassword, Password
    );
    const termError = Validate("checkedterm", allSelected);

  

    if (firstnameError || lastameError || emailError || genderError || dobError || passwordError || confirmPasswordError || termError) {

      Toast.show(firstnameError || lastameError || emailError || genderError || dobError || passwordError || confirmPasswordError || termError, Toast.SHORT);

      return false;
    } else {
      var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      var  data = ''
      var key =
      KYC_type_doc_Selected == 0
        ? 'He'
        : KYC_type_doc_Selected == 1
          ? 'She'
          : 'They';
      if(format.test(Email)){
       // console.log('email','email')
         data = {
          "username": Email,
          "email": Email,
          "password": Password,
          "first_name": Firstname,
          "last_name": Lastname,
          "phone": '',
          "profile": {
            "dob": date_copy,
            "gender": Gender,
            "pronoun": key
          },
          "is_term_cond": allSelected
  
        }
      }
      else{
       // console.log('phone','phone')
        data = {
          "username": Email,
          "email": '',
          "password": Password,
          "first_name": Firstname,
          "last_name": Lastname,
          "phone": Email,
          "profile": {
            "dob": date_copy,
            "gender": Gender,
            "pronoun": key
          },
          "is_term_cond": allSelected
  
        }

      }


      
     
      setLoading(true);

      dispatch(
        userActions.registerUser({
          data,
          callback: ({ result, error }) => {

            if (result.status === true) {
              console.warn(
                'after register result',
                JSON.stringify(result.status, undefined, 2),
                props.navigation.navigate('Otp', { 'username': Email })
              );
              // setSpinnerStart(false);
              _storeData();
              setLoading(false);
            }


            if (result.status === false) {
              console.warn(JSON.stringify(error, undefined, 2));
              // setLoginSuccess(result);
              Toast.show(result.error.email[0], Toast.SHORT);

              //  console.log('error Result',result.error.email[0])

              setLoading(false);


              // signOut();
            }
            else {
              // setError(true);
              // signOut();
              // console.log('error',result)
              setLoading(false);

              console.warn(JSON.stringify(error, undefined, 2));
            }
          },
        }),
      );
    }
  };
  return (
    <View style={styles.container}>
      <CustomStatusBar />
      {/* <ModelComponent isvisible={this.state.visible} modeltype={'RequestAuth_1'} onPress={this.closemodel}/> */}
      {isLoading && renderIndicator()}

      <View style={styles.signupConatiner}>
        <View style={styles.backbtnCss}><BackBtn navigation={props.navigation} /></View>
        <View style={styles.signupTextq}>
          <Text style={styles.signupText1}>Sign Up</Text>
        </View>
      </View>
      <ScrollView>

        <View style={styles.inputContainer}>
          <View style={[styles.firstnameContainer, styles.inputmarginBottom]}>
            <View style={{ flex: 1, marginRight: '2%' }}>
              <TextField placeholder={'First Name'} imageIcon={Images.user_icon} onChangeText={val => setFirstname(val)} value={Firstname} />
            </View>
            <View style={{ flex: 1 }}>
              <TextField placeholder={'Last Name'} imageIcon={Images.user_icon} onChangeText={val => setLastname(val)} value={Lastname} />
            </View>
          </View>
          <View>
            <TextField placeholder={'Email Id or Mobile Number'} imageIcon={Images.emailormobile} onChangeText={val => setEmail(val)} value={Email} />
          </View>
          {/* <View style={styles.ortextConatiner} ><Text style={styles.ortext}></Text></View>
          <View style={styles.inputmarginBottom}>
            <TextField placeholder={'Enter Your Phone Number'} imageIcon={Images.phone_icon} keyboardType={'numeric'} onChangeText={val => setPhone(val)} value={Phone} />
          </View> */}


          <View style={styles.labelConatiner} ><Text style={styles.labelText}>Gender</Text></View>

          <View style={[styles.inputmarginBottom, { flexDirection: 'row', flex: 1, marginLeft: 25, marginRight: 25 }]}>
            <View style={{ flex: 1 }}>
              <CheckBox
                title=' Male'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle'
                checked={male}
                containerStyle={{ padding: 0, margin: 0, backgroundColor: 'transparent', borderColor: 'transparent' }}
                titleProps={{ style: { color: 'rgba(51,51,51,0.5)', fontFamily: 'Lato-Regular' } }}
                uncheckedColor={'#fff'}
                checkedColor={'rgb(70,50,103)'}
                textStyle={{ color: '#33333380', fontFamily: 'Lato-Regular' }}
                onPress={checkedMale}
              // fontFamily={'Lato-Regular'}
              />
            </View>


            <View style={{ flex: 1 }}>
              <CheckBox
                title=' Female'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle'
                checked={Female}
                containerStyle={{ padding: 0, margin: 0, backgroundColor: 'transparent', borderColor: 'transparent' }}
                titleProps={{ style: { color: 'rgba(51,51,51,0.5)', fontFamily: 'Lato-Regular' } }}
                uncheckedColor={'#fff'}
                checkedColor={'rgb(70,50,103)'}
                onPress={checkedFemale}
              // fontFamily={'Lato-Regular'}
              />
            </View>

            <View style={{ flex: 1 }}>
              <CheckBox
                title=' Custom'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle'
                checked={Custom}
                containerStyle={{ padding: 0, margin: 0, backgroundColor: 'transparent', borderColor: 'transparent' }}
                titleProps={{ style: { color: 'rgba(51,51,51,0.5)', fontFamily: 'Lato-Regular' } }}
                uncheckedColor={'#fff'}
                checkedColor={'rgb(70,50,103)'}
                textStyle={{ color: '#33333380' }}
                onPress={checkedCustom}

              />

            </View>




          </View>

          {customgenderView && <View style={{}}>
            <View style={{
              marginBottom: '2%',
            }}>
              {/* label1="Select your pronoun" value1="0" label2="He" value2="1" label3="She" value3="2" selectedValue={pronoun} SelectedLanguagedata={(selectedValue) => setSelectpronoun(selectedValue)} */}

              <CustomDropdown
                placeholder={'Select your pronoun'}
                data={KYC_type_doc}
                selectedValue={KYC_type_doc_Selected}
                SelectedLanguagedata={(selectedValue) =>
                  (selectedValue)}
              />
            </View>

            <View style={{ marginBottom: '3%' }} >
              <TextField placeholder={'Gender (optional)'} imageIcon={''} onChangeText={val => setCustomGender(val)} value={CustomGender} />
            </View>

          </View >}

          <TouchableOpacity onPress={showDatepicker}>
            <View style={styles.inputmarginBottom}>
              <TextField placeholder={'Date of Birth'} imageIcon={Images.calendar_icon} editable={false} value={date_copy.toString()} />
            </View>
          </TouchableOpacity>


          <View>
            {/* <View>
              <Button onPress={showDatepicker} title="Show date picker!" />
            </View> */}

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                minDate={new Date()}
                maximumDate={new Date()}
                is24Hour={true}
                format="YYYY-MMM-DD"
                display="default"
                onChange={onChange}
              />
            )}
          </View>


          <View style={styles.inputmarginBottom}>
            <TextField placeholder={'Enter Password'}
              secureTextEntry={SecureTextEntry}
              onIconPress={() => {
                setSecureTextEntry(!SecureTextEntry)
              }}
              imageIcon={!SecureTextEntry
                ? Images.invisible_64
                : Images.eye_64}
              onChangeText={val => setPassword(val)} value={Password} />
          </View>
          <View >
            <TextField placeholder={'Confirm Password'}
              secureTextEntry={SecureTextEntryRepassword}
              onIconPress={() => {
                setSecureTextEntryRepassword(!SecureTextEntryRepassword)
              }} imageIcon={!SecureTextEntryRepassword
                ? Images.invisible_64
                : Images.eye_64}

              onChangeText={val => setConfirmPassword(val)} value={ConfirmPassword} />
          </View>

        </View>
        <View style={{ margin: 0, padding: 0 }}>

          <CheckBox
            title={<Text style={styles.agreetext}> I agree with <Text style={styles.termText} >Terms & Conditions</Text></Text>}
            checkedIcon={<Image source={Images.checkbox_select} style={styles.checkbox} />}
            uncheckedIcon={<Image source={Images.checkbox_unselect} style={styles.checkbox} />}
            checked={allSelected}
            containerStyle={{ padding: 0, margin: 0, backgroundColor: 'transparent', borderColor: 'transparent', alignItems: 'center' }}
            onPress={checkedterm}
          // onPress={() => setCount(count + 1)}
          />

        </View>
        <View style={{ padding: '5%', }}>
          <CustomButton title={'Sign Up'}
            onPress={onPressSignup}
          //onPress={() => props.navigation.navigate('Otp')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;
