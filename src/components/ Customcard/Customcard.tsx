import React, {Component, FC} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {TextInput} from 'react-native-paper';
// import FloatLabelTextInput from 'react-native-floating-label-text-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
// create a component
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
const Customcard: FC = ({}) => {
  return (
    <Card style={styles.cardcontent}>
      <View style={{padding: 16}}>
        <View style={styles.cardcontent1}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../assets/images/pic.jpeg')}
              style={styles.profilepic}
            />
            <Text style={styles.nametext}>Simmi Sharma</Text>
          </View>
          <Icon name="ellipsis-v" color="grey" size={20} />
        </View>
        <View style={styles.cardcontent2}>
          <Text style={styles.projecttitletext}>Title of the Project</Text>

          <View style={{flexDirection: 'row'}}>
            <Icon
              name="eye"
              color="black"
              size={15}
              style={{margin: 2, marginRight: 8}}
            />
            <Text style={{color: 'grey', fontWeight: 'bold'}}>432</Text>
          </View>
        </View>
        <Image
          source={require('../../assets/images/video.jpg')}
          style={{width: '100%', height: 150, borderRadius: 15}}
        />
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Icon
            name="thumbs-up"
            size={15}
            color="grey"
            style={{marginLeft: 5}}
          />
          <Icon name="comment" color="grey" size={15} style={{marginLeft: 5}} />
        </View>
        <Paragraph style={styles.cardparagrap}>
          Lorem ipsum is simply dummy text of the printing and simply type
          setting industry
        </Paragraph>
        <Text style={{fontSize: 12}}>1 Hour ago</Text>
      </View>
      <View style={{borderWidth: 0.5, borderColor: 'lightgrey'}}></View>
      <Text>jbj</Text>
    </Card>
  );
};
export default Customcard;
