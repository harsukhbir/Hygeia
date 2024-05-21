import React, {Component} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {Images} from '../../src/assets/images';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import moment from 'moment';
import FastImage from 'react-native-fast-image';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  headerLogo: {
    width: 31,
    height: 31,
  },
  smallLogo: {
    width: 31,
    height: 31,
  },
  menuTrigger: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  babyImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  menuOptionImage: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  menuOptionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  menuOptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  menuOptionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '85%',
  },
  menuOptionName: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 5,
    color: '#000',
  },
  menuOptionNameActive: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 5,
    color: 'red',
  },
  menuOptionNameDisable: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 5,
    color: '#999999',
  },
  menuOptionContentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 5,
  },
  contentItemBold: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 17,
    color: '#000',
  },
  contentItemLight: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    color: '#000',
  },
  settingsText: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#999999',
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  babyPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: '#C4C4C4',
  },
});

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      activeIndex: null,
    };
  }

  componentDidMount() {
    let date = '2021-02-09';
    let date2 = '1995-06-01';
    let birthyear = moment(date2, 'YYYY');
    let visitdate = moment(date, 'DD-MM-YYYY');
    let age = visitdate.diff(birthyear, 'y');
  }

  EditProfileHandler(data) {
    const {navigation} = this.props;
    navigation?.navigate('EditProfile', {data});
  }

  SettingsHandler() {
    const {navigation} = this.props;
    navigation?.navigate('Settings');
  }

  ActiveBabyHandler(data) {
    this.setState({activeIndex: data.id});
  }

  DashboardHandler() {
    const {navigation} = this.props;
    navigation?.navigate('Dashboard');
  }

  getWeight(data) {
    let lbs = Number(data.weight_lb);
    let oz = Number(data.weight_oz);
    let ozToLbs = Number(oz / 16);

    return `${Number(lbs + ozToLbs).toFixed(2)} lbs`;
  }

  render() {
    return (
      <View style={[styles.header]}>
        <TouchableOpacity
          style={styles.headerLogo}
          onPress={() => {
            this.DashboardHandler();
          }}>
          <Image
            source={Images.globalScreen.smallLogo}
            style={styles.smallLogo}
          />
        </TouchableOpacity>
        <Menu
          opened={this.state.opened}
          onBackdropPress={() => this.setState({opened: false})}>
          <MenuTrigger
            style={styles.menuTrigger}
            onPress={() => this.setState({opened: true})}>
            <Image
              source={Images.globalScreen.downVector}
              style={styles.downVector}
            />
          </MenuTrigger>
          <MenuOptions
            style={styles.menuOptions}
            optionsContainerStyle={{marginTop: 70, elevation: 10}}>
            <MenuOption style={styles.menuOption} />
            <MenuOption style={styles.menuOption}>
              <TouchableOpacity
                onPress={() => {
                  this.SettingsHandler();
                  this.setState({opened: false});
                }}>
                <Text style={styles.settingsText}>Settings</Text>
              </TouchableOpacity>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    );
  }
}

export default HeaderComponent;
