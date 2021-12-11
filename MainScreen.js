import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Colors from './Colors';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Config from './Config.json';

const MainScreen = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [able, setAble] = useState(false);

  const [state, setState] = useState([{
    fileData: '',
    fileUri: ''
  }]);

  const renderFileUri = () => {
    if (state.fileUri) {
      return <Image
        source={{ uri: state.fileUri }}
        style={styles.images}
      />
    } else {
      return <Image
        source={require('./assets/01.jpg')}
        style={styles.images}
      />
    }
  }

  const openCamera = () => {
    let options = {
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        // console.log('response', response);
        setState({
          fileUri: response.assets[0].uri,
          fileData: response.assets[0].base64
        });
        setAble(
          true
        )
      }
    });
  }

  const openGallery = () => {
    let options = {
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        // console.log('response', response);
        setState({
          fileUri: response.assets[0].uri,
          fileData: response.assets[0].base64
        });
        setAble(
          true
        )
      }
    });
  }

  const ViewNext = () => {
    if (able) {
      return (
        <View style={styles.nextSection}>
          <TouchableOpacity
            onPress={() =>
              {
              fetch(`${Config.BASE_URI}/`, {
                method: 'POST',
                body: state.fileUri
              })
              .then(response => response.text())
              .then((responseText) => {
                  navigation.navigate('Search', {
                  findingsKey:responseText,
                })
              })
                .catch(error => console.log(error))
              }
            }
            style={styles.btnSection}
          >
            <Text style={styles.btnText}>Proceed</Text>
          </TouchableOpacity>
        </View >
      )
    }
    else {
      return (
        <View>

        </View>
      )
    }
  }


  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>

        {/* Description */}
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text style={styles.sectionDescription}>
            Capture from <Text style={styles.highlight}>Camera</Text> or Select from <Text style={styles.highlight}>Gallery</Text> to Extract the <Text style={styles.highlight}>Text</Text>
          </Text>
        </View>

        {/* ImageSection */}
        <View style={styles.imageSection}>
          <View>
            {renderFileUri()}
            <Text style={{ textAlign: 'center' }}>Image</Text>
          </View>
        </View>

        {/* ButtonSection */}
        <View style={styles.btnParentSection}>
          <TouchableOpacity
            onPress={() => openCamera()}
            style={styles.btnSection}
          >
            <Text style={styles.btnText}>Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => openGallery()}
            style={styles.btnSection}
          >
            <Text style={styles.btnText}>Gallery</Text>
          </TouchableOpacity>
        </View>
        <ViewNext />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  imageSection: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center'
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10
  },
  btnText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold'
  },
  nextSection: {
    alignItems: 'center',
    bottom: 0
  },
});

export default MainScreen;
