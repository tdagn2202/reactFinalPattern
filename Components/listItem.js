import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
const ListItem = ({ title, subjectCode, navigation }) => {
    useEffect(() => {
        console.log(subjectCode);
    }, [subjectCode]);


    const handleRemove = () => {
        Alert.alert(
            'Removing comfirm?',
            'Are you sure you want to remove',
            [
                {
                    text:' Delete',
                    onPress: () => removeFromList()
                },
                {text: "No" , style: 'cancel'},
            ]
        )
    }

    const removeFromList = async () => {

        try {
            const { data, error } = await supabase
                .from('subject')
                .delete()
                .eq('subjectCode', subjectCode)

            if (error) {
                Alert.alert('Error', error.message)
            }
        } catch (err) {
            console.log('Error deleting item:', err.message);
        }
    }

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("EditItem", { subjectCode, title })}
            onLongPress={handleRemove}
            >
            <View style={styles.listItemContainer}>
                <Text>{subjectCode}: {title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ListItem

const styles = StyleSheet.create({
    flatListContainer: {
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        marginTop: 10,
        width: '90%',
        height: 500,
        borderRadius: 20,
        top: 20,
    },

    listItemContainer: {
        height: 40,
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.2,
        margin: 10,
    }
})