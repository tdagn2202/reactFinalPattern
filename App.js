import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import Home from './Screens/Home';
import AddList from './Screens/AddList';
import ListItem from './Components/listItem';
import EditItem from './Screens/EditItem';
import { supabase } from './lib/supabase';
import { useState, useEffect } from 'react';
const Stack = createNativeStackNavigator();
export default function App() {

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // Fetch the session
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session ?? null);
      setLoading(false);
    };

    // Subscribe to auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    fetchSession();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!session ? (
          <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />

          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="AddList" component={AddList} options={{ headerShown: false }} />
            <Stack.Screen name="EditItem" component={EditItem} options={{ headerShown: false }} />
            {/* <Stack.Screen name="ListItem" component={ListItem} options={{ headerShown: false }} /> */}
          </>  
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
