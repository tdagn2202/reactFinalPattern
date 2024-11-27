import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const AddList = ({ navigation }) => {
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');

  const addToList = async () => {
    try {
      const { data, error } = await supabase
        .from('subject')
        .insert([
          {
            subjectCode: subjectCode,
            subjectName: subjectName
          }
        ]);

      if (error) {
        Alert.alert('Error inserting', error.message);
      } else {
        Alert.alert('Success', 'Subject added successfully!');
        navigation.goBack();  // Go back to the previous screen after adding
      }
    } catch (err) {
      Alert.alert('Error', err.message || 'An error occurred while adding the subject.');
    }
  };

  return (
    <View>
      <Text style={styles.title}>Thêm phần tử vào danh sách</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter subject code"
        onChangeText={setSubjectCode}
        value={subjectCode}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter subject name"
        onChangeText={setSubjectName}
        value={subjectName}
      />
      <View style={{ top: 30 }}>
        <Button title="Add" onPress={addToList} />
      </View>
    </View>
  );
};

export default AddList;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    top: 50,
  },
  textInput: {
    width: '80%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 10,
    textAlign: 'center',
    top: 40,
    alignSelf: 'center',
  },
});
