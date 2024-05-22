import React, {Component} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Images} from '../../../../src/assets/images';
import {connect} from 'react-redux';
import styles from './styles';
import VideoModal from './VideoModal';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {loadingEnd, loadingStart} from '../../../store/slices/commonSlice';

class ProVideos extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      tutorialsVideo: null,
      isLoading: false,
    };
  }

  setModalVisible = id => {
    const {dispatchLoadingStart, dispatchLoadingEnd} = this.props;
    // this.setState({ isLoading: true });
    dispatchLoadingStart();
    fetch(`https://player.vimeo.com/video/${id}/config`)
      .then(res => res.json())
      .then(res => {
        dispatchLoadingEnd();
        this.setState({
          modalVisible: true,
          tutorialsVideo:
            res.request.files.hls.cdns[res.request.files.hls.default_cdn].url,
        });
      })
      .catch(err => {
        dispatchLoadingEnd();
      });
    // this.setState({ modalVisible: visible, tutorialsVideo: video });
  };

  render() {
    const {modalVisible, tutorialsVideo, isLoading} = this.state;

    return (
      <View style={styles.container2}>
        {isLoading && <LoadingIndicator isLoading={isLoading} />}

        <View style={styles.supportHeader}>
          <Text style={styles.supportheaderTitle}>Videos</Text>
        </View>

        <ScrollView>
          <View>
            {tutorialsVideo && (
              <VideoModal
                videoUrl={tutorialsVideo}
                isModalOpen={modalVisible}
                onClose={() => {
                  this.setState({
                    modalVisible: false,
                    tutorialsVideo: null,
                  });
                }}
              />
            )}

            <TouchableOpacity
              style={styles.tutorialsVideoBox}
              onPress={() => this.setModalVisible('658021511')}>
              <View style={styles.tutorialsVideoImage}>
                <Image
                  source={Images.Tutorials.tutorialsVideo1}
                  style={styles.tutorialsVideo}
                />
                <Text style={styles.tutorialsVideoTime}>2:31</Text>
              </View>
              <Text style={styles.tutorialsvideoText}>
                Hygeia Pro Instructional Video
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tutorialsVideoBox}
              onPress={() => this.setModalVisible('658022543')}>
              <View style={styles.tutorialsVideoImage}>
                <Image
                  source={Images.Tutorials.tutorialsVideo1}
                  style={styles.tutorialsVideo}
                />
                <Text style={styles.tutorialsVideoTime}>3:20</Text>
              </View>
              <Text style={styles.tutorialsvideoText}>
                Como Utilzar El Extractor De Leche Hygeia Pro
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={styles.tutorialsVideoBox}
              onPress={() => this.setModalVisible("490523886")}
            >
              <View style={styles.tutorialsVideoImage}>
                <Image
                  source={Images.Tutorials.tutorialsVideo1}
                  style={styles.tutorialsVideo}
                />
                <Text style={styles.tutorialsVideoTime}>2:31</Text>
              </View>
              <Text style={styles.tutorialsvideoText}>
                How to Operate Hygeia Evolve Pump
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tutorialsVideoBox}
              onPress={() => this.setModalVisible("490896029")}
            >
              <View style={styles.tutorialsVideoImage}>
                <Image
                  source={Images.Tutorials.tutorialsVideo2}
                  style={styles.tutorialsVideo}
                />
                <Text style={styles.tutorialsVideoTime}>1:54</Text>
              </View>
              <Text style={styles.tutorialsvideoText}>
                How to Clean Hygeia Evolve Pump
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tutorialsVideoBox}
              onPress={() => this.setModalVisible("491921534")}
            >
              <View style={styles.tutorialsVideoImage}>
                <Image
                  source={Images.Tutorials.tutorialsVideo3}
                  style={styles.tutorialsVideo}
                />
                <Text style={styles.tutorialsVideoTime}>1:04</Text>
              </View>
              <Text style={styles.tutorialsvideoText}>
                Hygeia Evolve Pump Key Features
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tutorialsVideoBox}
              onPress={() => this.setModalVisible("492238725")}
            >
              <View style={styles.tutorialsVideoImage}>
                <Image
                  source={Images.Tutorials.tutorialsVideo4}
                  style={styles.tutorialsVideo}
                />
                <Text style={styles.tutorialsVideoTime}>1:08</Text>
              </View>
              <Text style={styles.tutorialsvideoText}>
                Hygeia Evolve Pump Troubleshooting Tips
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tutorialsVideoBox}
              onPress={() => this.setModalVisible("494200531")}
            >
              <View style={styles.tutorialsVideoImage}>
                <Image
                  source={Images.Tutorials.tutorialsVideo5}
                  style={styles.tutorialsVideo}
                />
                <Text style={styles.tutorialsVideoTime}>2:57</Text>
              </View>
              <Text style={styles.tutorialsvideoText}>
                Como Utilizar El Extractor De Leche Hygeia Evolve
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tutorialsVideoBox}
              onPress={() => this.setModalVisible("494197950")}
            >
              <View style={styles.tutorialsVideoImage}>
                <Image
                  source={Images.Tutorials.tutorialsVideo6}
                  style={styles.tutorialsVideo}
                />
                <Text style={styles.tutorialsVideoTime}>3:55</Text>
              </View>
              <Text style={styles.tutorialsvideoText}>
                Como Limpiar El Extractor De Leche Hygeia Evolve
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tutorialsVideoBox}
              onPress={() => this.setModalVisible("494196665")}
            >
              <View style={styles.tutorialsVideoImage}>
                <Image
                  source={Images.Tutorials.tutorialsVideo7}
                  style={styles.tutorialsVideo}
                />
                <Text style={styles.tutorialsVideoTime}>1:05</Text>
              </View>
              <Text style={styles.tutorialsvideoText}>
                Características Principales Del Extractor De Leche Hygeia Evolve
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tutorialsVideoBox}
              onPress={() => this.setModalVisible("494195438")}
            >
              <View style={styles.tutorialsVideoImage}>
                <Image
                  source={Images.Tutorials.tutorialsVideo8}
                  style={styles.tutorialsVideo}
                />
                <Text style={styles.tutorialsVideoTime}>1:04</Text>
              </View>
              <Text style={styles.tutorialsvideoText}>
                Extractor De Leche Hygeia Evolve Consejos Para Resolución De
                Problemas
              </Text>
            </TouchableOpacity> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = {
  dispatchLoadingStart: () => loadingStart(),
  dispatchLoadingEnd: () => loadingEnd(),
};

export default connect(null, mapDispatchToProps)(ProVideos);
