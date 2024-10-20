import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar } from '@/components/UI/avatar'
import { UserInfo } from '@/types/user'

interface Props extends UserInfo {
    onPress: () => void
}
export default function UserCard(props: Props) {
    return (
        <TouchableOpacity onPress={props.onPress} style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <Avatar src={props.profile_avatar} size='Medium' />
            <Text>{props.username}</Text>
        </TouchableOpacity>
    )
}