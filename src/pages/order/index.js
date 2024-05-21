import React from 'react';
import {View, Text} from 'react-native';
import {Tabs, ScrollableTab} from 'native-base';
import styles from './styles';
import BreastpumpCards from './breastpump';
import PumpAccessoriesCards from './pump-accessories';
import {getActiveIndex} from './tab-menu';

function TabFirstComponent({child}) {
  return <View style={{flex: 1, flexGrow: 1}}>{child}</View>;
}

class OrderScreen extends React.Component {
  constructor(props) {
    super();
    const {navigation} = props;
    const initialTab = navigation.getParam('activeTab') || 'BreastPump';
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
          <Text style={styles.supportheaderTitle}>Order</Text>
        </View>
        <View style={{flex: 1, flexGrow: 1, marginTop: 10}}>
          <Tabs
            page={activeIndex}
            ref={ref => (this._tabRef = ref)}
            initialPage={activeIndex}
            renderTabBar={() => (
              <ScrollableTab
                style={{
                  width: 270,
                  height: 28,
                  backgroundColor: '#fff',
                  borderWidth: 0,
                }}
                tabsContainerStyle={{width: 270}}
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
              heading="Breast Pump"
              tabStyle={styles.tabStyle}
              textStyle={styles.tabTextStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTextStyle={styles.activeTextStyle}
              child={
                <BreastpumpCards
                  navigation={navigation}
                  onTabChange={(tab, lengthValue) =>
                    this.tabClick(tab, lengthValue)
                  }
                />
              }
            />
            <TabFirstComponent
              heading="Pump Accessories"
              tabStyle={styles.tabStyle}
              textStyle={styles.tabTextStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTextStyle={styles.activeTextStyle}
              child={
                <PumpAccessoriesCards
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

export default OrderScreen;
