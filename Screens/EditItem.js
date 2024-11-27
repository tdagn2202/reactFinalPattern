import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const EditItem = ({ route, navigation }) => {
    const  data = route.params || {}; 
    const [subjectName, setSubjectName] = useState('');

    console.log(data.subjectCode); 
    console.log(data.title)
    const handleSaveChanges = async () => {
        try {
            const { error } = await supabase 
            .from('subject')
            .update({
                subjectName: subjectName
            })
            .eq('subjectCode', data.subjectCode)

            if(error) {
                Alert.alert("Error inserting", error.message)
            }

        } catch (error) {
            console.error('Error saving changes: ', error.message);            
        } finally{
            navigation.goBack(); 
        }


        Alert.alert('Changes Saved', `Subject code: ${subjectCode}, Subject name: ${subjectName}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Subject Name</Text>
            <Text style={styles.title}>{data.title}</Text>

            <TextInput
                style={styles.textInput}
                placeholder="Input here"
                // value={data.title}
                onChangeText={setSubjectName} 
            />

            <Button title="Save Changes" onPress={handleSaveChanges} />
        </View>
    );
};

export default EditItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    textInput: {
        width: '80%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 10,
        textAlign: 'center',
    },
});
