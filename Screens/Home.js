import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../lib/supabase';
import ListItem from '../Components/listItem';
import ItemListList from '../Components/ItemListList';
import { useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';
export default function Home({ navigation }) {

  const [subjects, setSubjects] = useState([]);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('subject')
        .select('*');

      if (error) throw error;

      setSubjects(data);
    } catch (error) {
      console.log('Error fetching data: ', error.message);
    }
  };


  useFocusEffect(() => {
    fetchData();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Danh sách</Text>
      <View style={{ flexDirection: 'row', alignSelf: 'center', top: 750 }}>
        <TouchableOpacity onPress={() => navigation.navigate("AddList")}>
          <View style={{ hegiht: 30, width: 70, backgroundColor: '#407BFF', borderRadius: 20, paddingVertical: 7, marginHorizontal: 5 }}>
            <Text style={{ fontWeight: 'bold', alignSelf: 'center', color: '#fff' }}>Add</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("EditItem")}>
          <View style={{ hegiht: 30, width: 70, backgroundColor: '#407BFF', borderRadius: 20, paddingVertical: 7, marginHorizontal: 5 }}>
            <Text style={{ fontWeight: 'bold', alignSelf: 'center', color: '#fff' }}>Edit</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{ hegiht: 30, width: 70, backgroundColor: '#ff6666', borderRadius: 20, paddingVertical: 7, marginHorizontal: 5 }}>
            <Text style={{ fontWeight: 'bold', alignSelf: 'center', color: '#fff' }}>Remove</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => supabase.auth.signOut()}>
          <View style={{ hegiht: 30, width: 70, backgroundColor: '#ff6666', borderRadius: 20, paddingVertical: 7, marginHorizontal: 5 }}>
            <Text style={{ fontWeight: 'bold', alignSelf: 'center', color: '#fff' }}>Sign Out</Text>
          </View>
        </TouchableOpacity>

      </View>
      <View style={styles.flatListContainer}>
        <ItemListList subject={subjects} navigation={navigation}/>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatListContainer: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 10,
    width: '90%',
    height: 500,
    borderRadius: 20,
    top: 30,
  },
  titleText: {
    top: 50,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 30,

  },
  listItemContainer: {
    height: 30,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.3,
    margin: 20,
  }
});
