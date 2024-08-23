import { View, Text } from 'react-native'
import React from 'react'
import { Avatar } from '@/components/UI/avatar'
import { Colors } from '@/constants/Colors'
import { useLayoutDirection } from '@/context/GlobalContext';

interface Props {
    numberOfUsers?: number;
    isRead?: boolean;
}

export function NotificationCard(props: Props) {
    const { currentLayoutDirection } = useLayoutDirection()
    const flexDirection = currentLayoutDirection == 'rtl' ? 'row-reverse' : 'row'
    const align = currentLayoutDirection == 'rtl' ? 'right' : 'left'

    return (
        <View style={{
            flexDirection: flexDirection,
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
                <Text style={{ fontWeight: '600', fontSize: 15, textAlign: align }}>NotificationCard</Text>
                <Text style={{ fontSize: 14, textAlign: align }}>Added you to their circles</Text>
            </View>
        </View>
    );
}


function TwoUsers() {

    const { currentLayoutDirection } = useLayoutDirection()
    return (
        <View style={{}} >
            <View style={{ paddingLeft: currentLayoutDirection == 'rtl' ? 0 : 20 }}>
                <Avatar size={'Small'} />
            </View>
            <View style={{ paddingLeft: currentLayoutDirection == 'rtl' ? 20 : 0 }}>
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