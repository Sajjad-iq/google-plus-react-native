import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Avatar } from '@/components/UI/avatar';
import { Colors } from '@/constants/Colors';
import { useTranslation } from 'react-i18next';
import { PostCommentType } from '@/types/comment';
import useTimeAgo from '@/hooks/useTimeAgo';
import * as DropdownMenu from 'zeego/dropdown-menu';
import { useGlobalData } from '@/context/GlobalContext';

interface Props extends PostCommentType {

}
export function PostComment(props: Props) {

    const { timeAgo } = useTimeAgo()
    const { userInfo } = useGlobalData();
    const { t } = useTranslation();
    return (

        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <View style={[styles.wrapper, { flexDirection: "row" }]}>
                    <Avatar size='Small' src={props.author_avatar} />
                    <View style={[styles.innerWrapper, { flexDirection: "row" }]} >
                        <View style={{ gap: 5, flex: 1 }}>
                            <Text style={[styles.arthur, { textAlign: 'left' }]}>{props.author_name}</Text>
                            <Text>{props.content}</Text>
                        </View>

                        <Text style={{ flex: 0, color: Colors.grayX2 }}>{timeAgo(props.created_at)}</Text>
                    </View>
                </View>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
                side="bottom"
                align="start"
                alignOffset={0}
                sideOffset={10}
                loop={false}
                avoidCollisions={true}
                collisionPadding={5}
            >
                {userInfo.id === props.user_id ? (
                    <>
                        <DropdownMenu.Item key='delete' onSelect={() => ""}>
                            <DropdownMenu.ItemTitle>
                                {t('post.dropDownOptions.delete')}
                            </DropdownMenu.ItemTitle>
                        </DropdownMenu.Item>
                    </>
                ) : (
                    <>
                        <DropdownMenu.Item key='replay' onSelect={() => ""}>
                            <DropdownMenu.ItemTitle>
                                {t('post.dropDownOptions.replay')}
                            </DropdownMenu.ItemTitle>
                        </DropdownMenu.Item>

                        <DropdownMenu.Item key='report' onSelect={() => ""}>
                            <DropdownMenu.ItemTitle>
                                {t('post.dropDownOptions.report')}
                            </DropdownMenu.ItemTitle>
                        </DropdownMenu.Item>
                    </>
                )}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 15,
        backgroundColor: Colors.whitePrimary,
        paddingHorizontal: 20
    },
    innerWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
        gap: 15,
        borderBottomColor: Colors.grayX3,
    },
    arthur: {
        fontWeight: 'bold',
        fontSize: 14,
        flex: 0
    }
});
