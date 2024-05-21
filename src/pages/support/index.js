import React from 'react';
import {View, Text} from 'react-native';
import {Tabs, ScrollableTab} from 'native-base';
import styles from './styles';
import TutorialsCards from './tutorials';
import ContactUsCards from './contactus';
import ArticlesCards from './articles';
import ManualsScreen from './manuals';
import LactationHelpCart from './lactationhelp';
import {getActiveIndex} from './tab-menu';

function TabFirstComponent({child}) {
  return <View style={{flex: 1, flexGrow: 1}}>{child}</View>;
}

class TrackScreen extends React.Component {
  constructor(props) {
    super();
    const {navigation} = props;
    const initialTab = navigation.getParam('activeTab') || 'Tutorials';
    this.state = {
      activeIndex: getActiveIndex(initialTab),
    };
  }

  tabClick(tab) {
    if (this._tabRef) {
      this._tabRef.goToPage(getActiveIndex(tab));
    }
  }

  render() {
    const {activeIndex} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.supportHeader}>
          <Text style={styles.supportheaderTitle}>Support</Text>
        </View>
        <View style={{flex: 1, flexGrow: 1, marginTop: 10}}>
          <Tabs
            page={activeIndex}
            ref={ref => (this._tabRef = ref)}
            initialPage={activeIndex}
            renderTabBar={() => (
              <ScrollableTab
                style={{height: 25, backgroundColor: '#fff', borderWidth: 0}}
              />
            )}
            tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
            tabBgColor={{
              backgroundColor: '#fff',
              paddingLeft: 0,
              paddingRight: 0,
            }}
            tabStyle={{
              backgroundColor: '#fff',
              borderBottomWidth: 0,
              paddingLeft: 0,
              paddingRight: 0,
            }}
            tabContainerStyle={{
              elevation: 0,
              backgroundColor: '#fff',
              borderBottomWidth: 0,
              paddingLeft: 0,
              paddingRight: 0,
            }}>
            <TabFirstComponent
              heading="Tutorials"
              tabStyle={styles.tabStyle}
              textStyle={styles.tabTextStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTextStyle={styles.activeTextStyle}
              child={
                <TutorialsCards
                  navigation={navigation}
                  onTabChange={(tab, lengthValue) =>
                    this.tabClick(tab, lengthValue)
                  }
                />
              }
            />
            <TabFirstComponent
              heading="Manuals"
              tabStyle={styles.tabStyle}
              textStyle={styles.tabTextStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTextStyle={styles.activeTextStyle}
              child={
                <ManualsScreen
                  navigation={navigation}
                  onTabChange={(tab, lengthValue) =>
                    this.tabClick(tab, lengthValue)
                  }
                />
              }
            />
            <TabFirstComponent
              heading="Articles"
              tabStyle={styles.tabStyle}
              textStyle={styles.tabTextStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTextStyle={styles.activeTextStyle}
              child={
                <ArticlesCards
                  navigation={navigation}
                  onTabChange={(tab, lengthValue) =>
                    this.tabClick(tab, lengthValue)
                  }
                />
              }
            />
            <TabFirstComponent
              heading="Lactation Help"
              tabStyle={styles.tabStyle}
              textStyle={styles.tabTextStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTextStyle={styles.activeTextStyle}
              child={
                <LactationHelpCart
                  navigation={navigation}
                  onTabChange={(tab, lengthValue) =>
                    this.tabClick(tab, lengthValue)
                  }
                />
              }
            />
            <TabFirstComponent
              heading="Contact Us"
              tabStyle={styles.tabStyle}
              textStyle={styles.tabTextStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTextStyle={styles.activeTextStyle}
              child={
                <ContactUsCards
                  navigation={navigation}
                  onTabChange={(tab, lengthValue) =>
                    this.tabClick(tab, lengthValue)
                  }
                />
              }
            />
          </Tabs>
        </View>
      </View>
    );
  }
}

export default TrackScreen;
