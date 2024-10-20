import { View, FlatList } from 'react-native'
import React from 'react'
import { useGlobalData } from '@/context/GlobalContext'
import UserCard from '@/components/shared/userCard'
import { Colors } from '@/constants/Colors'
import { UserInfo } from '@/types/user'
import { useUserAccount } from '@/hooks/useUserAccount'

export default function Search() {

    const { searchUsers } = useGlobalData()
    const { selectUser } = useUserAccount()

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whitePrimary }}>

            <FlatList
                data={searchUsers.users}
                keyExtractor={(user: UserInfo) => user.id}
                renderItem={({ item }: { item: UserInfo }) => (
                    <UserCard onPress={() => selectUser(item.id)}  {...item} />
                )}
                contentContainerStyle={{ gap: 10, backgroundColor: Colors.whitePrimary, padding: 10 }}
            />

        </View>
    ) // people
}
