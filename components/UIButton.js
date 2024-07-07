import React, { Component } from "react"
import { TouchableOpacity, Text, Image } from "react-native"
import { images, icons ,color} from "../constants"
function UIbutton(props) {
    return <TouchableOpacity style={{
        borderColor: 'white',
        borderWidth: 2,
        height: 40,
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: props.isSelected ? 'white' : null
    }}
        onPress={props.onpress}
    >
        {props.isSelected && <Image source={icons.check}
            style={{
                width: 20,
                height: 20,
                alignSelf: 'center', //nếu nằm trong cái nào thì tự đúng giauwx
                position: 'absolute',
                top: 9,
                left: 10,
            }}>
        </Image>}
        <Text style={{
            color: props.isSelected ? color.primary : 'white',
            fontSize: 15,
        }}>{props.title}</Text>
    </TouchableOpacity>
}

export default UIbutton