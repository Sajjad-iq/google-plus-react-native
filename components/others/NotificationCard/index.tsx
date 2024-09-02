import { View, Text } from 'react-native'
import React from 'react'
import { Avatar } from '@/components/UI/avatar'
import { Colors } from '@/constants/Colors'

interface Props {
    numberOfUsers?: number;
    isRead?: boolean;
}

export function NotificationCard(props: Props) {

    return (
        <View style={{
            flexDirection: "row",
            alignItems: 'center',
            paddingVertical: 15,
            paddingHorizontal: 10,
            backgroundColor: props.isRead ? Colors.whitePrimary : 'transparent',
            opacity: props.isRead ? 1 : 0.7,
            borderBottomColor: Colors.grayPrimary,
            borderBottomWidth: 1,
            gap: 15
        }}>
            {props.numberOfUsers === 1 ? <Avatar size={'Medium'} /> : props.numberOfUsers === 2 ? <TwoUsers /> : props.numberOfUsers === 3 ? <ThreeUsers /> : <FourUsers />}
            <View style={{ flex: 1, gap: 8 }}>
                <Text style={{ fontWeight: '600', fontSize: 15 }}>NotificationCard</Text>
                <Text style={{ fontSize: 14 }}>Added you to their circles</Text>
            </View>
        </View>
    );
}


function TwoUsers() {

    return (
        <View style={{}} >
            <View style={{ paddingLeft: 20 }}>
                <Avatar size={'Small'} />
            </View>
            <View style={{ paddingLeft: 0 }}>
                <Avatar size={'Small'} />
            </View>
        </View>
    )
}


function ThreeUsers() {
    return (
        <View style={{ justifyContent: "center", gap: 0 }} >
            <View style={{ alignItems: "center" }} >
                <Avatar size={'Small'} />
            </View>
            <View style={{ flexDirection: 'row', gap: 1 }}>
                <Avatar size={'Small'} />
                <Avatar size={'Small'} />
            </View>
        </View>
    )
}


function FourUsers() {
    return (
        <View style={{ justifyContent: "center", gap: 1 }} >
            <View style={{ flexDirection: 'row', gap: 1 }}>
                <Avatar size={'Small'} />
                <Avatar size={'Small'} />
            </View>
            <View style={{ flexDirection: 'row', gap: 1 }}>
                <Avatar size={'Small'} />
                <Avatar size={'Small'} />
            </View>
        </View>
    )
}