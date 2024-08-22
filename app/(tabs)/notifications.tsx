import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useHeader } from '@/context/HeaderContext';
import { Colors } from '@/constants/Colors';
import { NotificationCard } from '@/components/others/NotificationCard';
import { ScrollView } from 'react-native-gesture-handler';

export default function NotificationsScreen() {
    const { setHeaderTitle, setHeaderColor } = useHeader();

    useFocusEffect(
        React.useCallback(() => {
            setHeaderTitle('Notifications');
            setHeaderColor(Colors.redPrimary);
        }, [setHeaderTitle])
    );

    return (
        <ScrollView contentContainerStyle={{ gap: 1 }} style={{ flex: 1 }}>
            <NotificationCard isRead numberOfUsers={1} />
            <NotificationCard isRead numberOfUsers={3} />
            <NotificationCard numberOfUsers={2} />
            <NotificationCard isRead numberOfUsers={4} />
            <NotificationCard numberOfUsers={2} />
        </ScrollView>
    );
}
