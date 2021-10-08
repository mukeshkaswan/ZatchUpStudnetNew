import React, { useState, useEffect, Component } from 'react'
import { View, Text, TextInput, Image, TouchableWithoutFeedback, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import PropTypes from "prop-types";
import { Images } from '../../components/index';
import Modal from 'react-native-modal';
import { TextField, CustomButton, CustomStatusBar, BackBtn, Validate } from '../../components';
const screenWidth = Dimensions.get('window').width;
import { useDispatch, useSelector } from 'react-redux';
//import { Dispatch } from 'redux';
//import {useDispatch}   from 'react-redux';
import * as userActions from '../../actions/user-actions-types';
import Toast from 'react-native-simple-toast';
import ProgressLoader from 'rn-progress-loader';

// interface AppProps {
//   onPress: () => any;
//   isvisible?: boolean;
//   modeltype?: string;
//   navigation: any;
//   key: any;
//   uid: any;
//   dispatch?: Dispatch;
// }

// interface State {

//   password: any;
//   Re_password: any;
//   isLoading: any;
//   secureTextEntry: any;
//   cPassSecureTextEntry: any;  // hide:any,
// }
interface ModelComponentScreenProps { navigation: any, route: any, }

const ModelComponent = ({ keyy, uidd, onPress, isvisible, modeltype, navigationss }) => {

  const [secureTextEntry, setsecureTextEntry] = useState(true)
  const [cPassSecureTextEntry, setcPassSecureTextEntry] = useState(true)

  const [password, setPassword] = useState('');
  const [Re_password, setRe_password] = useState('');
  const [isLoading, setLoading] = useState(false);

  // const [uid, setuid] = useState('');
  // const [key, setkey] = useState('');

  const dispatch = useDispatch();

  // static defaultProps = {
  //   isvisible: false,
  //   modeltype: 'center',

  // };

  // constructor(props: AppProps) {
  //   super(props);
  //   this.state = {
  //     password: '',
  //     Re_password: '',
  //     isLoading: false,
  //     secureTextEntry: true,
  //     cPassSecureTextEntry: true,
  //     //  hide:this.props.isvisible

  //   };
  // }

  //this.props. dispatch = useDispatch();

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



  // componentDidMount() {

  // }
  // submitEmployeeIdNumber = () => {

  //   // this.props.navigation.navigate('Approval');

  // }

  // // ChangePassword = () => {

  // //   this.props.navigation.navigate('LoginScreen');

  // // }

  const ChangePassword = () => {
    // console.log('this is the recived props--->', props.route)

    //this.props.navigation.navigate('LoginScreen');
    const passwordError = Validate("password", password);
    const confirmPasswordError = Validate(
      "confirm_password",
      Re_password, password
    );

    if (
      passwordError || confirmPasswordError
    ) {
      //this._scrollView.scrollTo(0);
      Toast.show(passwordError || confirmPasswordError, Toast.SHORT);

      return false;
    }

    else {
      const data = {
        key: keyy,
        uid: uidd,
        password: password,
        confirm_password: Re_password,
      };

      setLoading(true);

      dispatch(
        userActions.getAdminSetNewPassword({
          data,
          callback: ({ result, error }) => {
            if (result.status === true) {
              console.warn(
                'after Set New Password result',
                JSON.stringify(result, undefined, 2),
                // setOtp(''),
                Toast.show(result.message, Toast.SHORT),
                // setSelected(!allSelected)
                navigationss.navigate('LoginScreen')
                //navigationss.navigation.navigate('LoginScreen')
                // props.navigation.navigate('eKYC'),
              );
              // setSpinnerStart(false);
              //  _storeData(result);
              setLoading(false);
            }

            if (result.status === false) {
              //console.warn(JSON.stringify(error, undefined, 2));
              // setLoginSuccess(result);
              //  Toast.show('OTP is Not Valid', Toast.SHORT)
              setLoading(false);

              // signOut();
            } else {

              // setError(true);
              // signOut();
              setLoading(false);

              console.warn(JSON.stringify(error, undefined, 2));
            }
          },
        }),
      );
    }

  }


  // login = () => {
  //   // this.props.navigation.navigate('Approval');
  //   this.props.navigation.navigate('LoginScreen')

  // }
  // loginn = () => {
  //   // this.props.navigation.navigate('Approval');
  //   // this.props.navigation.navigate('LoginScreen')
  //   //  this.setState({ hide: false });  


  // }

  // loginnot = () => {


  // }



  return (
    <View>
      <Modal
        testID={'modal'}
        isVisible={isvisible}
        onSwipeComplete={onPress}
        swipeDirection={['up', 'left', 'right', 'down']}
        style={styles.bottomModel}>
        <View style={styles.bottomModelContainer}>
          {/* <View style={[styles.logoContainer, styles.inputmarginBottom]}>

              <Image source={Images.crete_camera} style={styles.logo} />
            </View> */}
          <View style={styles.inputContainer}>
            {isLoading && renderIndicator()}
            <View style={styles.inputmarginBottom}>
              <Text style={[styles.textEmployee, styles.inputmarginBottom]}>Reset Your Password</Text>
              <View style={[styles.inputmarginBottom, styles.inputmarginTop]}>
                <TextField
                  secureTextEntry={secureTextEntry}
                  placeholder={'Enter New Password'}
                  onChangeText={val => setPassword(val)}
                  imageIcon={!secureTextEntry
                    ? Images.invisible_64
                    : Images.eye_64}
                  onIconPress={() => {
                    setsecureTextEntry(!secureTextEntry)
                  }}
                  value={password}
                />
              </View>

              <View style={styles.inputmarginBottom}>
                <TextField
                  secureTextEntry={cPassSecureTextEntry}
                  placeholder={'Confirmed Password'}
                  imageIcon={!cPassSecureTextEntry
                    ? Images.invisible_64
                    : Images.eye_64}
                  onChangeText={val => setRe_password(val)}

                  onIconPress={() => {
                    setcPassSecureTextEntry(!cPassSecureTextEntry)
                  }}
                  value={Re_password}
                />
              </View>


            </View>
            <View >
              <CustomButton title={'Change Password'} onPress={ChangePassword} />
            </View>
          </View>
        </View>
      </Modal>
      {/* {this.props.modeltype == 'center' && <Modal
          testID={'modal'}
          isVisible={this.props.isvisible}
          onSwipeComplete={this.props.onPress}
          swipeDirection={['up', 'left', 'right', 'down']}
        >
          <View style={styles.centerModelContainer}>
            <View><Text style={styles.welcomeText}>Welcome to ZatchUp</Text></View>
            <View><Text style={[styles.modelcontent, { marginBottom: '10%' }]}>ABC school has registered you as its teacher as MR. PRASHANT.</Text></View>
            <View><Text style={styles.modelcontent}>Please continue to confirm,{'\n'}If this is not you,{'\n'} please click Not Me and sign up as a New User</Text></View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '8%' }}>
              <CustomButton title={'Continue'} onPress={this.submitEmployeeIdNumber} backgroundColor={'green'} />
              <CustomButton title={'Reject'} onPress={this.submitEmployeeIdNumber} backgroundColor={'none'} textColor={'red'} />
            </View>
          </View>
        </Modal>} */}


      {/* {this.props.modeltype == 'loginagain' && <Modal
          testID={'modal'}
          isVisible={this.props.isvisible}
       
        >
          <View style={styles.centerModelContainercopy}>
            <View><Text style={styles.modelcontentcopy}>Your Profile is Sent for approval !!{'\n'}Please login again to continue.</Text></View>

            <View style={{
              flexDirection: 'row', justifyContent: 'center',
              alignItems: 'center', marginRight: '10%', marginLeft: '10%', marginTop: '10%'
            }}>

              <TouchableOpacity
                onPress={this.login}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#4B2A6A',
                  borderWidth: 1,
                  borderColor: '#4B2A6A',
                  height: 45,
                  width: '50%',
                  borderRadius: 15,
                  margin: 5,
                }}
                activeOpacity={0.5}>

                <Image source={Images.no_icon} style={{
                  padding: 1,
                  margin: 5,
                  height: 2,
                  width: 2,
                  marginLeft: '10%',
                  tintColor: '#4B2A6A',
                  resizeMode: 'stretch',
                }} />

                <Text style={{
                  color: '#FFFFFF',
                  marginBottom: 4,
                  marginLeft: 30,
                  fontSize: 18

                }}>
                  YES
          </Text>
              </TouchableOpacity>


              <TouchableOpacity
                onPress={this.loginn}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#ED0034',
                  borderWidth: 1,
                  borderColor: '#ED0034',
                  height: 45,
                  width: '50%',
                  borderRadius: 15,
                  margin: 5,
                }}
                activeOpacity={0.5}>

                <Image source={Images.yes_icon} style={{
                  padding: 1,
                  margin: 5,
                  height: 2,
                  width: 2,
                  marginLeft: '10%',
                  tintColor: '#ED0034',
                  resizeMode: 'stretch',
                }} />

                <Text style={{
                  color: '#FFFFFF',
                  marginBottom: 4,
                  marginLeft: 30,
                  fontSize: 18
                }}>
                  NO
          </Text>
              </TouchableOpacity>
            </View>


          
          </View>
        </Modal>} */}

      {/* <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '5%' }}>
              <View>
                <CustomButton title={'Yes'} onPress={this.login} backgroundColor={'green'} />

              </View>

              <View style={{ marginLeft: 10 }}>
                <CustomButton title={'No'} onPress={this.loginnot} backgroundColor={'green'} />

              </View>
            </View> */}

      {/* {this.props.modeltype == 'add_info' && <Modal
          testID={'modal'}
          isVisible={this.props.isvisible}
          onSwipeComplete={this.props.onPress}
          swipeDirection={['up', 'left', 'right', 'down']}
        >
          <View style={styles.centerModelContainer}>
            <View><Text style={styles.welcomeText}>Congratulation!</Text></View>
            <View><Text style={[styles.modelcontent, { marginBottom: '10%' }]}>Your educational institute is on-boarded with ZatchUp.</Text></View>
            <View><Text style={styles.modelcontent}>Congratulation for e-connecting with{'\n'}your educational institute.</Text></View>
            <View >
              <CustomButton title={'OK'} onPress={this.submitEmployeeIdNumber} />
            </View>
          </View>
        </Modal>} */}
      {/* {this.props.modeltype == 'midcenter' && <Modal
          testID={'modal'}
          isVisible={this.props.isvisible}
          onSwipeComplete={this.props.onPress}
          swipeDirection={['up', 'left', 'right', 'down']}
        >
          <View style={styles.centerModelContainer}>

            <View><Text style={[styles.modelcontent]}>“This email ID/Phone number/You is/are registered as Mr. Rohin Gupta, currently studying in ABC School</Text></View>
            <View><Text style={styles.modelcontent}>If this is you, Please login via using,{'\n'}ZatchUp Student/Alumni App.{'\n'} If this is not you press continue to sign up as new user”</Text></View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '8%' }}>
              <CustomButton title={'It’s Me'} onPress={this.submitEmployeeIdNumber} backgroundColor={'green'} />
              <CustomButton title={'Not Me'} onPress={this.submitEmployeeIdNumber} backgroundColor={'none'} textColor={'red'} />
            </View>
          </View>
        </Modal>} */}
      {/* 
        {this.props.modeltype == 'RequestAuth_1' && <Modal
          testID={'modal'}
          isVisible={this.props.isvisible}
          onSwipeComplete={this.props.onPress}
          swipeDirection={['up', 'left', 'right', 'down']}
        >
          <View style={styles.centerModelContainer}>
            <View style={[styles.logoContainer, styles.inputmarginBottom]}>
              <Image source={Images.logo} style={styles.logo} />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputmarginBottom}>
                <Text style={[styles.modelcontentAuth]}>Your access request to message and chat with students in B.com 1A is sent for approval.</Text>
              </View>
              <View >
                <CustomButton title={'OK'} onPress={this.submitEmployeeIdNumber} />
              </View>
            </View>
          </View>
        </Modal>} */}

      {/* {this.props.modeltype == 'RequestAuth_2' && <Modal
          testID={'modal'}
          isVisible={this.props.isvisible}
          onSwipeComplete={this.props.onPress}
          swipeDirection={['up', 'left', 'right', 'down']}
        >
          <View style={styles.centerModelContainer}>
            <View style={[styles.logoContainer, styles.inputmarginBottom]}>
              <Image source={Images.logo} style={styles.logo} />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputmarginBottom}>
                <Text style={[styles.modelcontentAuth]}>Your request has been sent.</Text>
              </View>
              <View >
                <CustomButton title={'OK'} onPress={this.submitEmployeeIdNumber} />
              </View>
            </View>
          </View>
        </Modal>} */}

    </View>

  );
}


export default ModelComponent;

