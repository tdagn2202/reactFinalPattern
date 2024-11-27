import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View, ImageBackground, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
export default function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function signInWithEmail() {
        console.log('clicked')
        if (!email || !password) {
            Alert.alert('Xác thực thất bại', 'Vui lòng điền đầy đủ email và password.');
            return;
        }
    
        setLoading(true); 
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password,
            });
    
            if (error) {
                
                Alert.alert('Đăng nhập thất bại', 'Thông tin đăng nhập không hợp lệ');
            } else {
                navigation.navigate('Home');
            }
        } catch (err) {
            Alert.alert('Lỗi bất định', 'Hệ thống đang gặp vấn đề, vui lòng thử lại sao.');
            console.error('Sign-in error:', err);
        } finally {
            setLoading(false);
        }
    }
    

    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <ImageBackground
                    style={styles.image1}
                    source={require("../Images/loginimage.png")}
                >
                </ImageBackground>
            </View>

            <View style={styles.container2}>

                <Text style={styles.text1}>LOGIN</Text>
                <TextInput style={styles.containertxt} placeholder='Enter your email' onChangeText={(text) => setEmail(text)}></TextInput>
                <TextInput style={styles.containertxt} placeholder='Enter your password'onChangeText={(text) => setPassword(text)}></TextInput>

                <TouchableOpacity style={{ marginBottom: 30 }}>
                    <Text style={styles.forgotPass}>I have forgot my password</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonLogin}
                    onPress={signInWithEmail}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 17 }}>Login</Text>
                </TouchableOpacity>

                <View style={styles.line}></View>

                <TouchableOpacity style={{ marginTop: 110 }}>
                    <Text style={{ color: '#b1b1b1', fontWeight: 'bold', fontSize: 15 }}>New to us?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginBottom: 30 }}
                    onPress={() => {
                        navigation.navigate('Signup')
                    }}
                >
                    <Text style={{ color: '#407BFF', fontWeight: 'bold', fontSize: 17, textDecorationLine: 'underline' }}>Sign up a free  account</Text>
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
        width: '105%',
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
        justifyContent: 'center', // Canh giữa nội dung bên trong ảnh
        alignItems: 'center',
        marginTop: 30
    },

    text1: {
        color: '#3362CC',    // Màu chữ trắng để nổi bật trên ảnh
        fontSize: 45,      // Kích thước chữ
        fontWeight: 'bold',
        marginTop: 40,

    },

    containertxt: {
        width: '75%',
        height: '8%',
        backgroundColor: '#F4F4F4',
        margin: 7,
        borderRadius: 20,
        padding: 15,
    },

    forgotPass: {
        color: '#12469a',
        marginTop: 13
    },

    buttonLogin: {
        width: '30%',
        height: '7%',
        backgroundColor: '#407BFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
    },

    line: {
        width: '50%',
        height: '0.2%',
        backgroundColor: '#ededed',
        marginTop: 20,
    },

});