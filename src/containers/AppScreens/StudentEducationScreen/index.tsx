import React, {Component} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Platform
} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import styles from './style.tsx'; 
import CardView from 'react-native-cardview';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
 
import {CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
 
import { CustomButton, CustomStatusBar, Validate, CustomHeader, BackBtn,CustomDropdown,TextField} from '../../../components';
import { Images } from '../../../components/index';
interface AppProps {
  navigation: any;
}
interface State {
  hasError: any;
  email: any;
  checkedterm: any;
  active_data: any;
}

const pending_data = [
  {
    id: 1,
    Topic: 'Trignometry',
    Subject: 'mathematics',
     
  },
  
   
  
];
const approval_data = [
  {
    id: 1,
    Topic: 'Trignometry',
    Subject: 'Mathematics',
    
  },
  {
    id: 2,
    Topic: 'Algebra',
    Subject: 'mathematics',
  },
   
];

 
class StudentEducationScreen extends React.Component<AppProps, State> {
   
  constructor(props: AppProps) {
    super(props);
     
    this.state = {
      hasError: false,
      email: '',
      checkedterm: false,
      active_data: 'Student',
    };
  }

   

  componentDidMount = () => {};

  componentDidUpdate = () => {};

  componentWillUnmount = () => {};

  backPressed = () => {
    this.props.navigation.goBack(null);
    return true;
  }

  renderList1 = (item:any,index:any) => {
    return (
      <>
        <View key={item.id} style={styles.listCardWrapper}>
     
        <View style={styles.coursecontainer}>
          <View>
             <Text style={styles.coursetext1}>{item.Topic}</Text>
             <Text style={styles.coursetext}>{item.Subject}</Text>
          </View>
          <View style={{flexDirection:'row'}}>
          <Image
              style={{

                tintColor: 'green',
                height: 20,
                width: 20,
                resizeMode: 'stretch',
                marginRight:10
              }}
                        
                        source={Images.play}
                    />
              <Text style={{color:'green'}}>Play</Text>


          </View>
      </View>
       
           </View>
      </>
    );
  };
  renderList2 = ({item, index}) => {
    return (
      <>
        <View key={item.id} style={styles.listCardWrapper}>
     
        <View style={styles.coursecontainer}>
          <View>
             <Text style={styles.coursetext1}>{item.Topic}</Text>
             <Text style={styles.coursetext}>{item.Subject}</Text>
          </View>
          <View >
           
              <Text style={{color:'red'}}>Waiting For Approval!</Text>


          </View>
      </View>
       
           </View>
      </>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <CustomStatusBar />
        {/* <HeaderTitleWithBack
          navigation={this.props.navigation}
          headerTitle="Messages"
        /> */}
        {/* <HeaderWithTitle headerTitle="Messages" /> */}
        <View style={{
      height: Platform.OS === 'ios' ? '10%' : '7%',
      backgroundColor: 'rgb(70,50,103)',
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,

    }}>
      <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'center', }}>


        <TouchableOpacity 
        onPress={()=>this.backPressed()}
          style={{ marginTop: Platform.OS === 'ios' ? 30 : 10, marginLeft: 10 }} >
          <Icon name="arrow-left" size={25} color="white" />
        </TouchableOpacity>



        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",

        }}>
          <Text style={{
            textAlignVertical: "center",
            textAlign: "center",
            color: 'white',
            fontSize: hp(2.8),
            //marginRight: 20,
            fontFamily: 'Lato-Regular',
            marginTop: Platform.OS === 'ios' ? 30 : 5,
          }}>{'School Details'}</Text>
        </View>
     

      </View>
</View>

        <View style={styles.tabButtonWrapper}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.setState({active_data: 'Student'})}
            style={[
              styles.tabButtonStyles,
              {
                backgroundColor:
                  this.state.active_data === 'Student' ? '#4B2A6A' : '#ffffff',
              },
            ]}>
            <Text style={styles.tabButtonTextStyle}>Student</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.setState({active_data: 'Teacher'})}
            style={[
              styles.tabButtonRightStyle,
              {
                backgroundColor:
                  this.state.active_data === 'Teacher' ? '#4B2A6A' : '#FFFFFF',
              },
            ]}>
            <Text style={styles.tabButtonTextStyle}>Alumni</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1,marginTop:15}}>
          { !(this.state.active_data === 'Teacher')?
    <ScrollView > 
            <View style={{paddingHorizontal:16}}>
             <View style={{marginTop:10}}>
               <Text style={styles. fillText_Add}>Course Joining Date</Text>
              
        
         <TextField placeholder={'yyyy-mm-dd'}
        //  onChangeText={val => setID(val)}
        //   value={ID}
        //   onEndEditing={val => getDetailZatchupID(val)}
        //    onEndEditing={() => getDetailZatchupID}
        //   onEndEditing={(value) => getDetailZatchupID()}

        />
        </View>
        <View style={{marginTop:10}}>
        <Text style={styles. fillText_Add}>Joining Standard</Text>
              
        
         <TextField placeholder={'Select Join Standard'}
        //  onChangeText={val => setID(val)}
        //   value={ID}
        //   onEndEditing={val => getDetailZatchupID(val)}
        //    onEndEditing={() => getDetailZatchupID}
        //   onEndEditing={(value) => getDetailZatchupID()}

        />
        </View>
        <View style={{marginTop:10}}>
        <Text style={styles. fillText_Add}>Current Standard</Text>
              
        
         <TextField placeholder={'Select Current Standard'}
        //  onChangeText={val => setID(val)}
        //   value={ID}
        //   onEndEditing={val => getDetailZatchupID(val)}
        //    onEndEditing={() => getDetailZatchupID}
        //   onEndEditing={(value) => getDetailZatchupID()}

        />
        </View>
        <View style={{marginTop:10}}>
        <Text style={styles. fillText_Add}>Select Class</Text>
              
        
         <TextField placeholder={'Select Class'}
        //  onChangeText={val => setID(val)}
        //   value={ID}
        //   onEndEditing={val => getDetailZatchupID(val)}
        //    onEndEditing={() => getDetailZatchupID}
        //   onEndEditing={(value) => getDetailZatchupID()}

        />
        </View>
        <View style={{marginTop:10}}>
        <Text style={styles. fillText_Add}>School ID/Admission Number</Text>
              
        
         <TextField placeholder={'Select School ID'}
        //  onChangeText={val => setID(val)}
        //   value={ID}
        //   onEndEditing={val => getDetailZatchupID(val)}
        //    onEndEditing={() => getDetailZatchupID}
        //   onEndEditing={(value) => getDetailZatchupID()}

        />
        </View>
        
              
        <View style={{marginTop:10}}>
        <Text style={styles. fillText_Add}>Roll Number</Text>
              <TextField placeholder={'Select School ID'}
             //  onChangeText={val => setID(val)}
             //   value={ID}
             //   onEndEditing={val => getDetailZatchupID(val)}
             //    onEndEditing={() => getDetailZatchupID}
             //   onEndEditing={(value) => getDetailZatchupID()}
     
             />
             </View>
             <View style={{marginTop:10}}>
        <Text style={styles. fillText_Add}>Course Description</Text>
              <TextField placeholder={'Enter Course Description'}
                multiline={true}
             //  onChangeText={val => setID(val)}
             //   value={ID}
             //   onEndEditing={val => getDetailZatchupID(val)}
             //    onEndEditing={() => getDetailZatchupID}
             //   onEndEditing={(value) => getDetailZatchupID()}
     
             />
             </View>
        
             </View>
    </ScrollView>  
          :
          <FlatList
            showsVerticalScrollIndicator={false}
            data={   
                pending_data  
            }
            keyExtractor={(item) => {
              item.id;
            }}
            renderItem={ this.renderList2}
            
          />
  }
        </View>
        
      </View>
    );
  }
}
export default StudentEducationScreen;