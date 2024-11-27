import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native';
// import CheckBox from 'react-native-check-box';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import Login from '../Screens/Login';
import { supabase } from '../lib/supabase';


export default function Register({ navigation }) {
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const [loading, setLoading] = useState()

    async function signUpWithEmail() {
        // Input validation
        if (!email || !password) {
            Alert.alert('Lỗi xác thực', 'Vui lòng nhập email và mật khẩu.');
            return;
        }
    
        try {
            setLoading(true); 
            const { error } = await supabase.auth.signUp({
                email: email.trim(),
                password: password,
            });
    
            if (error) {
                Alert.alert('Đăng ký thất bại', error.message); 
            } else {
                Alert.alert(
                    'Đăng ký thành công!',
                    'Vui lòng kiểm tra hộp thư để xác minh email của bạn.'
                );
                navigation.navigate('Login'); 
            }
        } catch (err) {
            console.error('Lỗi đăng ký:', err);
            Alert.alert('Lỗi không xác định', 'Đã xảy ra lỗi khi đăng ký.');
        } finally {
            setLoading(false); 
        }
    }
    

    const [isSelected, setSelection] = useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <ImageBackground
                    style={styles.image1}
                    source={require("../Images/registerimage.png")}
                >
                </ImageBackground>
            </View>

            <View style={styles.container2}>
                <Text style={styles.text2}>CREATE A NEW ACCOUNT</Text>
                <TextInput style={styles.containertxt} placeholder='Enter your email'onChangeText={(text) => setEmail(text)}></TextInput>
                <TextInput style={styles.containertxt} placeholder='Enter your password' onChangeText={(text) => setPassword(text)} secureTextEntry={true}></TextInput>
                <TouchableOpacity style={styles.buttonRegister}
                    onPress = {signUpWithEmail}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
    },

    container1: {
        flex: 1.4,
        width: '100%',
        backgroundColor: '#fff',
    },
    container2: {
        flex: 2,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    image1: {
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },

    text2: {
        color: '#3362CC',    // Màu chữ trắng để nổi bật trên ảnh
        fontSize: 29,      // Kích thước chữ
        fontWeight: 'bold',
        marginVertical: 35,
        marginTop: 10,
    },

    containertxt: {
        width: '75%',
        height: '9%',
        backgroundColor: '#ededed',
        margin: 7,
        borderRadius: 25,
        padding: 15,
    },

    label: {
        margin: 8,
        color: '#b3b3b3',
        fontSize: 18,
    },

    buttonRegister: {
        width: '50%',
        height: '9%',
        backgroundColor: '#407BFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginTop: 60,
    },
});