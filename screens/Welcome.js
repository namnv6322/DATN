import React, { useEffect } from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { images, icons, color } from '../constants'
import { useMQTT } from '../MQTT/MQTTProvider';

function Welcome({navigation}) {
    const { connect, status } = useMQTT();

    useEffect(() => {
        if (status === 'connected') {
            navigation.navigate('UITab');
        }
    }, [status]);

    // state: khi state thay doi, giao dien se duoc load lai
    // khac voi cac thuoc tinh
    // like getter, setter
    return <View style={{
        backgroundColor: 'white',
        flex: 100,
    }}>
        <ImageBackground
            source={images.background}
            resizeMode='cover'
            style={{
                flex: 100,
            }}>
            <View style={{
                flex: 20,
            }}>
                <View style={{
                    flexDirection: 'row',
                    height: 50,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: 10,
                }}>
                    <Image source={icons.home}
                        style={{
                            width: 20,
                            height: 20,
                            alignSelf: 'center', //nếu nằm trong cái nào thì tự đúng giauwx
                            marginStart: 10,
                            tintColor: 'white'
                        }} />
                    <Text style={{
                        color: 'white',
                        alignItems: 'center',
                        marginLeft: 10,
                        fontSize: 18
                    }}>Chào mừng đến ứng dụng</Text>
                    <View style={{
                        flex: 1
                    }}></View>
                    <Image source={icons.info}
                        style={{
                            width: 20,
                            height: 20,
                            alignSelf: 'center', //nếu nằm trong cái nào thì tự đúng giauwx
                            tintColor: 'white',
                            marginEnd: 10
                        }} />
                </View>
            </View>
            <View style={{
                flex: 20,
                justifyContent: 'center',
                alignItems: 'center',

            }}>
                {/* <Text style={{
                    color: 'white',
                    fontSize: 15,
                }}> Welcome to </Text> */}
                <Text style={{
                    color: 'white',
                    marginVertical: 10,
                    fontWeight: 'bold'
                }}> WAREHOUSE APP </Text>
                <Text style={{
                    color: 'white',
                    fontSize: 15
                }}> Quản lý nhà kho của bạn </Text>
            </View>
            <View>
                <Image source={images.warehouse}
                    style={{
                        width: 256,
                        height: 256,
                        alignSelf: 'center', //nếu nằm trong cái nào thì tự đúng giauwx
                        //tintColor: 'black',
                        marginEnd: 10
                    }} />
            </View>
            <View style={{
                flex: 20,
            }}>
                <TouchableOpacity style={{
                    borderColor: 'white',
                    borderWidth: 2,
                    height: 40,
                    borderRadius: 10,
                    marginHorizontal: 60,
                    marginTop: 10,
                    marginBottom: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={connect}
                //onPress={()=>{navigation.navigate('UITab')}}
                loading={status === 'connecting' ? true : false}
                disabled={status === 'connected' ? true : false}>
                    <Text style ={{color: 'white',fontWeight: 'bold' , fontSize:16}}>BẮT ĐẦU</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    </View>
}
export default Welcome