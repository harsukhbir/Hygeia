import React from 'react';
import {connect} from 'react-redux';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import TextInput from '../../../src/components/TextInput';
import ButtonComponent from '../../../src/components/ButtonComponent';
import * as authActions from '../../../src/redux/actions/authActions';
import {Images} from '../../../src/assets/images';
import styles from './styles';

class BreastfeedEntryDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NotesValue: '',
      time: '6:00 AM',
      timeCount: '0m 0s',
      timeCountRight: '0m 0s',
    };
  }

  componentDidMount() {}

  cancelHandler() {
    const {navigation} = this.props;
    navigation.navigate('Track');
  }

  saveHandler() {
    const {navigation} = this.props;
    navigation.navigate('Track');
  }

  render() {
    const {NotesValue, time, timeCountRight, timeCount} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.TrackHeader}>
          <Text style={styles.breastfeedTitle}>Breastfeed Entry Details</Text>
          <TouchableOpacity style={styles.editButton}>
            <Image
              source={Images.BreastfeedEntryDetails.editIcon}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.ScrollView}>
          <View style={styles.startTimePicker}>
            <Text
              style={[
                styles.pickerLabel,
                {backgroundColor: '#fff', color: '#999'},
              ]}>
              Start Time
            </Text>
            <View style={styles.picker}>
              <TouchableOpacity style={styles.pickerInput}>
                <Text style={styles.pickerInput}>{time}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.manualEntryMain}>
            <View style={styles.TimeCount}>
              <View style={styles.LeftTimeCount}>
                <Text style={styles.timeTitle}>Left</Text>
                <Text style={styles.timeCountText}>{timeCount}</Text>
              </View>
              <View style={styles.MiddleTimeCount}>
                <Text style={styles.timeTitle}>Total Time</Text>
                <Text style={styles.timeCountText}>0m 0s</Text>
              </View>
              <View style={styles.RightTimeCount}>
                <Text style={styles.timeTitle}>Right</Text>
                <Text style={styles.timeCountText}>{timeCountRight}</Text>
              </View>
            </View>
            <View style={styles.ClearButton}>
              <ButtonComponent
                style={styles.clearButtonContainer}
                buttonStyle={styles.clearButtonStyle}
                buttonText="Clear"
                buttonTextStyle={{color: '#fff', fontSize: 16}}
              />
            </View>
          </View>
          <View style={styles.notsInput}>
            <TextInput
              style={styles.textInput}
              inputStyle={styles.inputStyle}
              textLabelColor="#999999"
              textLabelBackground="white"
              value={NotesValue}
              placeholder="Notes"
            />
          </View>
        </ScrollView>
        <View style={styles.addbreastfeeddmButtons}>
          <View style={styles.addbreastfeedbuttons}>
            <ButtonComponent
              style={styles.buttonContainer}
              buttonStyle={styles.cancelbuttonStyle}
              buttonText="Cancel"
              buttonClicked={() => this.cancelHandler()}
            />
          </View>
          <View style={styles.addbreastfeedbuttons}>
            <ButtonComponent
              style={styles.buttonContainer}
              buttonStyle={styles.savebuttonStyle}
              buttonText="Save"
              buttonTextStyle={{color: '#fff'}}
              buttonClicked={() => this.saveHandler()}
            />
          </View>
        </View>
      </View>
    );
  }
}

// const mapDispatchToProps = {
//   dispatchResetAuthState: () => authActions.resetAuthState(),
// };

// export default connect(null, mapDispatchToProps)(BreastfeedEntryDetails);
export default BreastfeedEntryDetails;
