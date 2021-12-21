import React, {useState, Fragment} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import {useClipboard} from '@react-native-community/clipboard';
// import {Dirs, FileSystem} from 'react-native-file-access';
import Colors from './Colors';
import RNFS from 'react-native-fs';

const ProceedingScreen = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [copy, setCopy] = useClipboard();

  const [findings, setFindings] = useState(route.params.findingsKey);
  const fileName = 'ocr_converted.txt'; //whatever you want to call your file
  // const filePath = `${Dirs.DocumentDir}/${fileName}`;
  async function permissionWriteExternalStorage() {
    try {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ).then(res => console.log(res));
    } catch (err) {
      console.warn(err);
    }
  }
  const writeFile = (path, ext) => {
    try {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ).then(res => console.log(res));
    } catch (err) {
      console.warn(err);
    }
    // write the file
    RNFS.writeFile(path + '.' + ext, findings, 'utf8')
      .then(success => {
        console.log(ext + ' File succesfully written to  : ', path);
        alert(ext + ' File succesfully written to  : ', path);
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  return (
    <View
      style={{
        justifyContent: 'space-evenly',
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      }}>
      {/* <SafeAreaView style={backgroundStyle}> */}
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}> */}
      <Text style={styles.highlight}>Finding...</Text>

      <View style={styles.textAreaContainer}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <TextInput
            selectable={true}
            editable={true}
            multiline={true}
            value={findings}
            onChangeText={setFindings}
          />
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.59}
          onPress={() =>
            writeFile(RNFS.DownloadDirectoryPath + '/ocr-converted2', 'pdf')
          }
          style={styles.btnSection}>
          <Text style={styles.btnText}>Export To Pdf</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.59}
          onPress={() =>
            writeFile(RNFS.DownloadDirectoryPath + '/ocr-converted1', 'docx')
          }
          style={styles.btnSection}>
          <Text style={styles.btnText}>Export as Word</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.59}
          onPress={
            () =>
              writeFile(RNFS.DownloadDirectoryPath + '/ocr-converted', 'txt')
            // if (permissionGranted) {
            //   await FileSystem.writeFile(filePath, findings, 'utf8');
            //   if (!FileSystem.exists(filePath)) return; // check to see if our filePath was created
            //   await FileSystem.cpExternal(filePath, fileName, 'downloads'); // copies our file to the downloads folder/directory
            //   // file should now be visible in the downloads folder
            // }
          }
          style={styles.btnSection}>
          <Text style={styles.btnText}>Save as Text</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnParentSection}>
        <TouchableOpacity
          onPress={() => {
            setCopy(findings);
            alert('Copied to Clipboard');
          }}
          style={styles.btnSection}>
          <Text style={styles.btnText}>Copy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.59}
          onPress={() =>
            navigation.navigate('Web', {
              paramKey: findings,
            })
          }
          style={styles.btnSection}>
          <Text style={styles.btnText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: 'black',
    marginHorizontal: 5,
    borderWidth: 1,
    height: '85%',
  },
  highlight: {
    fontSize: 20,
    fontWeight: '700',
  },
  btnParentSection: {
    // position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    // paddingHorizontal: 8,
    // paddingVertical: 8,
    justifyContent: 'center',
    // bottom: 5,
  },
  btnSection: {
    // width: '30%',
    // height: 50,
    padding: 5,
    paddingHorizontal: 10,
    borderWidth: 1.5,
    borderColor: 'lightseagreen',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    // marginBottom: 10,
    margin: 4,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 14,
    color: 'lightseagreen',
    fontWeight: 'bold',
  },
});

export default ProceedingScreen;
