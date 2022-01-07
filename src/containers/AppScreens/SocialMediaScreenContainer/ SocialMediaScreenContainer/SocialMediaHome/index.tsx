import React, {Component, FC, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import {
  TextField,
  CustomButton,
  CustomStatusBar,
  Validate,
  CustomHeader,
  BackBtn,
  HeaderTitleWithBack,
  Colors,
  Customcard,
  CustomCheckBox,
} from '../../../../components';
import {CheckBox} from 'react-native-elements';
import Modal from 'react-native-modal';
import CardView from 'react-native-cardview';
import {Images} from '../../../../components/index';
import styles from './style.tsx';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import images from '../../../../components/images';
import {SafeAreaView} from 'react-native-safe-area-context';
import style from '../../Messages/style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const data1 = [
  {
    id: 1,
    name: 'Mukesh Sharma',
    src: require('../../../../assets/images/college1.jpg'),
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: false,
    comment: false,
  },
  {
    id: 2,
    name: 'Prashant Chaudhary',
    src: require('../../../../assets/images/college3.jpg'),
    time: 'Yesterday',
    profileImage: Images.profile_img2,
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: true,
    comment: false,
  },
  {
    id: 3,
    name: 'Mukesh Sharma',
    time: 'Yesterday',
    src: require('../../../../assets/images/college2.jpg'),
    profileImage: Images.profile_img2,
    message:
      'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
    msg_read: true,
    comment: false,
  },
];

const SocialMediaHome = (props: SocialMediaHome) => {
  const [data, active_data] = useState('Student');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [allSelected, setSelected] = useState(false);
  const [comment, showComment] = useState(false);
  const [Data, setData] = useState([data1]);
  const pressComment = () => {
    showComment(true);
  };
  const checkedterm = () => {
    setSelected(!allSelected);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
    setModalVisible('');
  };

  const Logout = async () => {
    setModalVisible('');
    setModalVisible('');
    Alert.alert(
      'ZatchUp',
      'Are you sure you want to unfollow?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes'},
      ],
      {cancelable: false},
    );
    return true;
  };

  const backPressed = () => {
    props.navigation.goBack(null);
    return true;
  };

  return (
    <View style={styles.container}>
      <HeaderTitleWithBack
        navigation={props.navigation}
        headerTitle="Zatchup"
      />

      <FlatList
        data={data1}
        renderItem={({item}) => (
          <CardView
            cardElevation={5}
            cardMaxElevation={5}
            // cornerRadius={15}
            style={{
              // padding: 16,

              backgroundColor: 'white',
              marginHorizontal: 15,
              marginTop: 10,
              paddingBottom: 14,
              paddingTop: 10,
              marginBottom: 5,
            }}>
            <View style={styles.rowContainer}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('UsersProfile');
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../../../../assets/images/pic.jpeg')}
                    style={styles.profilepic}
                  />
                  <Text style={{marginLeft: 20, fontWeight: 'bold'}}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModal}>
                <Image
                  source={require('../../../../assets/images/dot.png')}
                  style={{height: 18, width: 18}}
                />
              </TouchableOpacity>
            </View>
            <View style={{paddingHorizontal: 16, marginTop: 10}}>
              <Image source={item.src} style={{width: '100%'}} />
            </View>
            <View style={styles.likecommentContainer}>
              <TouchableOpacity>
                <Icon
                  name="thumbs-up"
                  size={15}
                  color="grey"
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('PostDetailScreen');
                }}>
                <Icon
                  name="comment"
                  color="grey"
                  size={15}
                  style={{marginLeft: 5}}
                  onPress={pressComment}
                />
              </TouchableOpacity>
            </View>
            {/* reply comment Section */}
            <View
              style={{
                marginLeft: 6,
                paddingHorizontal: 16,
                paddingVertical: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('ProfileScreen');
                }}>
                <Text>
                  Liked by <Text style={styles.boldText}>Harshit</Text> and
                  <Text style={styles.boldText}> Others</Text>
                </Text>
              </TouchableOpacity>
              <View style={styles.messageContainer}>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <Text style={{fontWeight: 'bold', flex: 1}}>
                    Kunal Pandya
                  </Text>
                  <Text style={{marginLeft: 5, flex: 2}}>Hii</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('PostDetailScreen');
                    }}>
                    <Icon
                      name="thumbs-up"
                      size={15}
                      color="grey"
                      style={{marginLeft: 5}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {/*end of reply comment Section */}
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('PostDetailScreen');
                }}>
                <Text style={{fontSize: 12, marginTop: 10}}>
                  VIEW ALL 4 COMMENTS
                </Text>
              </TouchableOpacity>
              <Text style={{fontSize: 12, marginTop: 10}}>1 Hour ago</Text>
            </View>
            {comment == true ? (
              <View>
                <View style={styles.border}></View>
                <View style={styles.rowContainer}>
                  <TextInput placeholder="Add a comment" />
                  <TouchableOpacity style={styles.postbtn}>
                    <Text style={{color: 'white'}}>Post</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View></View>
            )}
          </CardView>
        )}
        //  ItemSeparatorComponent={renderIndicator}
      />
      {/* modal1 */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        backdropOpacity={0.4}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            paddingVertical: 20,
            borderRadius: 5,
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={toggleModal2}>
            <Text style={styles.btn}>Report</Text>
          </TouchableOpacity>
          <View style={styles.mborder}></View>
          <TouchableOpacity onPress={() => Logout()}>
            <Text style={styles.btn}>Unfollow</Text>
          </TouchableOpacity>
          <View style={styles.mborder}></View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('PostDetailScreen');
            }}>
            <Text style={[styles.btn, {color: 'black'}]}>Go to Post</Text>
          </TouchableOpacity>
          <View style={styles.mborder}></View>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={[styles.btn, {color: 'rgb(70,50,103)'}]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* modal2 */}
      <Modal
        isVisible={isModalVisible2}
        onBackdropPress={toggleModal2}
        backdropOpacity={0.4}>
        <View style={styles.modalContainer}>
          <View style={[styles.rowContent, {paddingHorizontal: 16}]}>
            <TouchableOpacity>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: hp(2.4),
                }}>
                Report
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal2}>
              <Image
                source={Images.closeicon}
                style={{height: 15, width: 15, marginRight: 10}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.mborder}></View>
          <View style={{paddingHorizontal: 16}}>
            <Text style={{fontSize: hp(2.4)}}>Why are you reporting this?</Text>
            <View style={styles.rowContent}>
              <Text style={styles.reporttext}>Suspicious or Fake</Text>
              <CustomCheckBox onPress={checkedterm} checked={allSelected} />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.reporttext}>
                Harassment or hateful speech
              </Text>
              <CustomCheckBox
                onPress={checkedterm}
                // checked={allSelected}
              />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.reporttext}>Violence or physical harm</Text>
              <CustomCheckBox
                onPress={checkedterm}
                // checked={allSelected}
              />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.reporttext}>Adult Content</Text>
              <CustomCheckBox
                onPress={checkedterm}
                //  checked={allSelected}
              />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.reporttext}>
                Intellectual property infringement or defamation
              </Text>
              <CustomCheckBox
                onPress={checkedterm}
                // checked={allSelected}
              />
            </View>
          </View>
          <View style={styles.mborder}></View>
          <View
            style={{alignItems: 'flex-end', marginTop: 10, marginRight: 10}}>
            <TouchableOpacity style={styles.postbtn}>
              <Text style={{color: 'white'}}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default SocialMediaHome;
