import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Images} from '../../src/assets/images';
import {Button, Footer, FooterTab, Text} from 'native-base';
// import { AppTheme } from "../utils/appTheme";
import {connect} from 'react-redux';
import {translate} from '../locales/i18n';
import {setActiveTab} from '../store/slices/tabSlice';
const styles = StyleSheet.create({
  footer: {
    paddingBottom: 0,
    height: 60,
  },
  footerTab: {
    backgroundColor: '#fff',
    position: 'relative',
    borderTopWidth: 1,
    borderColor: '#999',
    borderRadius: 0,
  },
  tabIcon: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 22,
    height: 35,
    resizeMode: 'contain',
    maxWidth: 30,
    opacity: 0.4,
  },
  tabText: {
    fontSize: 9,
    color: '#999',
    textAlign: 'center',
  },
  activetabIcon: {
    height: 35,
    resizeMode: 'contain',
    maxWidth: 30,
    opacity: 1,
  },
  activetabText: {
    fontSize: 9,
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

class TabBar extends Component {
  constructor(props) {
    super(props);
  }

  getActiveTabStyle(tab) {
    const {
      tab: {activeTab},
    } = this.props;
    if (tab === activeTab) {
      return [styles.activetabIcon, styles.activetabText];
    } else {
      return [styles.tabIcon, styles.tabText];
    }
  }

  redirect(page) {
    const {navigation} = this.props;
    this.props.setActiveTab(page);
    navigation.navigate(page);
  }

  render() {
    return (
      <View>
        <Footer style={styles.footer}>
          <FooterTab style={styles.footerTab}>
            <View>
              <Button
                style={{marign: 0, padding: 0}}
                onPress={() => this.redirect('Dashboard')}>
                <Image
                  source={Images.Footertab.dashboardBlackIcon}
                  style={this.getActiveTabStyle('Dashboard')[0]}
                  name="dashboard"
                />
                <Text
                  uppercase={false}
                  style={this.getActiveTabStyle('Dashboard')[1]}>
                  {translate('tabTitle.dashboard')}
                </Text>
              </Button>
            </View>
            <View>
              <Button
                style={{marign: 0, padding: 0}}
                onPress={() => this.redirect('Track')}>
                <Image
                  source={Images.Footertab.trackBlackIcon}
                  style={this.getActiveTabStyle('Track')[0]}
                  name="track"
                />
                <Text
                  uppercase={false}
                  style={this.getActiveTabStyle('Track')[1]}>
                  {translate('tabTitle.track')}
                </Text>
              </Button>
            </View>
            <View>
              <Button
                style={{marign: 0, padding: 0}}
                onPress={() => this.redirect('Statistics')}>
                <Image
                  source={Images.Footertab.statisticsBlackIcon}
                  style={this.getActiveTabStyle('Statistics')[0]}
                  name="statistics"
                />
                <Text
                  uppercase={false}
                  style={this.getActiveTabStyle('Statistics')[1]}>
                  {translate('tabTitle.statistics')}
                </Text>
              </Button>
            </View>
            <View>
              <Button
                style={{marign: 0, padding: 0}}
                onPress={() => this.redirect('Support')}>
                <Image
                  source={Images.Footertab.supportBlackIcon}
                  style={this.getActiveTabStyle('Support')[0]}
                  name="Support"
                />
                <Text
                  uppercase={false}
                  style={this.getActiveTabStyle('Support')[1]}>
                  {translate('tabTitle.support')}
                </Text>
              </Button>
            </View>
            <View>
              <Button
                style={{marign: 0, padding: 0}}
                onPress={() => this.redirect('Order')}>
                <Image
                  source={Images.Footertab.orderBlackIcon}
                  style={this.getActiveTabStyle('Order')[0]}
                  name="Order"
                />
                <Text
                  uppercase={false}
                  style={this.getActiveTabStyle('Order')[1]}>
                  {translate('tabTitle.order')}
                </Text>
              </Button>
            </View>
          </FooterTab>
        </Footer>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  tab: state.tabReducer,
});

const mapDisptachToProps = {
  setActiveTab,
};

export default connect(mapStateToProps, mapDisptachToProps)(TabBar);
