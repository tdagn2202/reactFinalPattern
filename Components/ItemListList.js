import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import ListItem from './listItem';
import { useEffect } from 'react';
const ItemListList = ({ subject, navigation }) => {
    const [data, setData] = useState();
    // const fetchData = async () => {
    //     try {
    //         const { data, error } = await supabase
    //             .from('subject')
    //             .select('*')


    //         if (error) {
    //             setData([])
    //         } else {
    //             setData(data)
    //         } 
    //     } catch (err) {
    //         console.error(error)
    //     }
    // }

    // useEffect(() => {
    //     fetchData()
    // }, [])

    return (
        <View>
            <FlatList
                data={subject}
                renderItem={({ item }) => {
                    return (
                        <ListItem
                            title={item.subjectName} 
                            subjectCode = {item.subjectCode} 
                            navigation={navigation}
                            />
                    )
                }}
            />
        </View>
    )
}

export default ItemListList

const styles = StyleSheet.create({})