import React, { useState, Fragment } from 'react';
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
} from 'react-native';
import {useClipboard} from '@react-native-community/clipboard';
import Colors from './Colors';


const ProceedingScreen = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [copy, setCopy] = useClipboard();

  const [findings, setFindings] = useState(
  route.params.findingsKey
  )

  return (
    <Fragment>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        {/* <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}> */}
        <Text style={styles.highlight}>Finding...</Text>


        <View style={styles.textAreaContainer} >
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
            <TextInput
            selectable={true}
              editable={false}
              multiline={true}
            >
              {findings}
            </TextInput>
          </ScrollView>
        </View>


      </SafeAreaView>
      <View style={styles.btnParentSection}>
        <TouchableOpacity
          onPress= {() => {
            setCopy(findings)
            alert('Copied to Clipboard')
          }}
          style={styles.btnSection}
        >
          <Text style={styles.btnText}>Copy</Text>
        </TouchableOpacity>

        <TouchableOpacity
        activeOpacity= {0.99}
         onPress={() => navigation.navigate('Web', {
           paramKey:findings,
         })}
          style={styles.btnSection}
        >
          <Text style={styles.btnText}>Search</Text>
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: 'black',
    margin: 5,
    borderWidth: 1,
    height: '88%'
  },
  highlight: {
    fontSize: 20,
    fontWeight: '700',
  },
  btnParentSection: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
    bottom: 5
  },
  btnSection: {
    width: '50%',
    height: 50,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
    margin: 10,

  },
  btnText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold'
  },
});

export default ProceedingScreen;
