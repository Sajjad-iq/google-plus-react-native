import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useHeader } from '@/context/GlobalContext';
import { Colors } from '@/constants/Colors';
import { NotificationCard } from '@/components/others/NotificationCard';
import { useTranslation } from 'react-i18next';
import { useNotifications } from '@/hooks/useNotifications';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { NotificationType } from '@/types/notification';

export default function NotificationsScreen() {
    const { setHeaderTitle } = useHeader();
    const { t } = useTranslation();
    const { notifications, loading, fetchNotifications, getActorNames, readTheNotification } = useNotifications();

    useFocusEffect(
        React.useCallback(() => {
            setHeaderTitle(t("Notifications.title"));
            fetchNotifications()
        }, [setHeaderTitle])
    );

    return (
        <View style={{ flex: 1 }}>
            {loading && notifications.length === 0 ? (
                <ActivityIndicator size="large" color={Colors.redPrimary} style={{ marginVertical: 20 }} />
            ) : (
                <FlatList
                    data={notifications}
                    keyExtractor={(notification: NotificationType) => notification.id}
                    renderItem={({ item }: { item: NotificationType }) => (
                        <NotificationCard onPress={() => readTheNotification(item)} getActorNames={getActorNames} {...item} />
                    )}
                    contentContainerStyle={{ gap: 2, backgroundColor: Colors.grayPrimary }}
                    onEndReachedThreshold={0.2} // Load more when the list is halfway through
                    ListFooterComponent={() => loading ? (
                        <ActivityIndicator size="large" color={Colors.redPrimary} style={{ marginVertical: 20 }} />
                    ) : null}
                />
            )}
        </View>
    );
}
