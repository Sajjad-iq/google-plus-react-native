import { View, Text } from 'react-native'
import React from 'react'
import { Avatar } from '@/components/UI/avatar'
import { Colors } from '@/constants/Colors'
import { Actor, NotificationType } from '@/types/notification';

interface Props extends NotificationType {
    getActorNames: any
}

export function NotificationCard(props: Props) {

    return (
        <View style={{
            flexDirection: "row",
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 10,
            backgroundColor: !props.is_read ? Colors.whitePrimary : 'transparent',
            opacity: !props.is_read ? 1 : 0.7,
            gap: 15
        }}>
            {props.actors.length === 1 ? <Avatar size={'Medium'} src={props.actors[0].avatar} /> : props.actors.length === 2 ? <TwoUsers actors={props.actors} /> : props.actors.length === 3 ? <ThreeUsers actors={props.actors} /> : props.actors.length >= 4 ? <FourUsers actors={props.actors} /> : <Avatar size={'Medium'} />}
            <View style={{ flex: 1, gap: 1 }}>
                <Text style={{ fontWeight: '600', fontSize: 14, textAlign: 'left' }}>{props.getActorNames(props.actors)}</Text>
                <Text style={{ fontSize: 14, textAlign: 'left', fontWeight: '500', color: "gray" }}>{props.notification_content} </Text>
            </View>
        </View>
    );
}


function TwoUsers(props: any) {

    return (
        <View style={{}} >
            <View style={{ paddingLeft: 20 }}>
                <Avatar size={'Small'} src={props.actors[0].avatar} />
            </View>
            <View style={{ paddingLeft: 0 }}>
                <Avatar size={'Small'} src={props.actors[1].avatar} />
            </View>
        </View>
    )
}


function ThreeUsers(props: any) {
    return (
        <View style={{ justifyContent: "center", gap: 0 }} >
            <View style={{ alignItems: "center" }} >
                <Avatar size={'Small'} src={props.actors[0].avatar} />
            </View>
            <View style={{ flexDirection: 'row', gap: 1 }}>
                <Avatar size={'Small'} src={props.actors[1].avatar} />
                <Avatar size={'Small'} src={props.actors[2].avatar} />
            </View>
        </View>
    )
}


function FourUsers(props: any) {
    return (
        <View style={{ justifyContent: "center", gap: 1 }} >
            <View style={{ flexDirection: 'row', gap: 1 }}>
                <Avatar size={'Small'} src={props.actors[0].avatar} />
                <Avatar size={'Small'} src={props.actors[1].avatar} />
            </View>
            <View style={{ flexDirection: 'row', gap: 1 }}>
                <Avatar size={'Small'} src={props.actors[2].avatar} />
                <Avatar size={'Small'} src={props.actors[3].avatar} />
            </View>
        </View>
    )
}