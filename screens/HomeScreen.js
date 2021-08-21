import * as React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Button} from 'react-native';
import db from '../config';
import AppHeader from '../components/AppHeader'

export default class HomeScreen extends React.Component{
  constructor() {
    super();
    this.state = {
      all_students: [],
      presentPressedList: [],
      absentPressedList: [],
    };
  }

  componentDidMount = async() => {
    
    var class_ref =await db.ref('/').on('value', data => {

       var class_a = data.val()      

      var all_students =  []
      for (var i in class_a) {
        all_students.push(class_a[i]);
      }
      all_students.sort(function(a, b) {
        return a.rollno - b.rollno;
      });
      this.setState({ all_students: all_students });
       console.log(all_students);
    });
  };

  updateAttendence=(rollno, status)=> {
    var id = '';
    if (rollno <= 9) {
      id = '0' + rollno;
    } else {
      id = rollno;
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    today = dd + '-' + mm + '-' + yyyy;
    
     let refPath = 'class/' + id;
     let classRef = db.ref(refPath);
     classRef.update({
       [today]: status,
     });

  }

  
goToSummary = ()=>{
    this.props.navigation.navigate('SummaryScreen')
  }


render(){
  var all_students = this.state.all_students;
    
   return (
        <View style={styles.container}>
          <AppHeader/>
          <View style={{ flex: 3 }}>
            {all_students.map((student, index) => (
              <View key={index} style={styles.studentChartContainer}>
                  <View
                  key={'name' + index}
                  style={{ flex: 1, flexDirection: 'row' }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold', }}>
                    {student.rollno}
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight:'bold' }}> {student.name}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  
                  <TouchableOpacity
                    style={
                      this.state.presentPressedList.includes(index)
                        ? [styles.presentButton, { backgroundColor: '#0f0' }]
                        : styles.presentButton
                    }
                    onPress={() => {
                      var presentPressedList = this.state.presentPressedList;
                      presentPressedList.push(index);
                      this.setState({ presentPressedList: presentPressedList });
                      var rollno = index + 1;
                      this.updateAttendence(rollno, 'present');
                    }}>
                    <Text>Present</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={
                      this.state.absentPressedList.includes(index)
                        ? [styles.absentButton, { backgroundColor: '#f00' }]
                        : styles.absentButton
                    }
                    onPress={() => {
                      var absentPressedList = this.state.absentPressedList;
                      absentPressedList.push(index);
                      this.setState({ absentPressedList: absentPressedList });
                      var rollno = index + 1;
                      this.updateAttendence(rollno, 'absent');
                    }}>
                    <Text>Absent</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.footer}
              onPress={() => {
                this.props.navigation.navigate('SummaryScreen');
              }}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
          </View>
          
        </View>
      );
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  studentChartContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    margin: 20,
  
  },
  presentButton: {
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 4,
  },
  absentButton: {
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 67,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cfc',
    marginTop:10,  
  },
});
