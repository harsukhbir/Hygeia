import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {List, ListItem, Left, Right} from 'native-base';
import {Images} from '../../../../src/assets/images';
import styles from './styles';

class ContactusScreen extends React.Component {
  redirectToProductSupport() {
    const {navigation} = this.props;
    navigation.navigate('ProductSupport');
  }

  redirectToTechSupport() {
    const {navigation} = this.props;
    navigation.navigate('TechSupport');
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.supportList}>
            <List>
              <ListItem
                style={styles.supportListItem}
                onPress={() => this.redirectToProductSupport()}>
                <Left style={styles.supportListItemPadding}>
                  <Text style={styles.supportText}>Product Support</Text>
                </Left>
                <Right>
                  <Image
                    source={Images.ContactusScreen.rightArrowIcon}
                    style={styles.supportImage}
                  />
                </Right>
              </ListItem>
              <ListItem
                style={styles.supportListItem}
                onPress={() => this.redirectToTechSupport()}>
                <Left style={styles.supportListItemPadding}>
                  <Text style={styles.supportText}>Tech Support</Text>
                </Left>
                <Right>
                  <Image
                    source={Images.ContactusScreen.rightArrowIcon}
                    style={styles.supportImage}
                  />
                </Right>
              </ListItem>
            </List>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ContactusScreen;
