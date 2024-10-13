import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Avatar } from '@/components/UI/avatar';
import { Colors } from '@/constants/Colors';
import { useTranslation } from 'react-i18next';
import { PostCommentType } from '@/types/comment';
import useTimeAgo from '@/hooks/useTimeAgo';
import * as DropdownMenu from 'zeego/dropdown-menu';
import { useGlobalData } from '@/context/GlobalContext';
import { mentionedUserType } from '@/types/user';

interface Props extends PostCommentType {
    deleteComment: (id: string) => Promise<void>;
    setReplay: (user: mentionedUserType) => void
}
export function PostComment(props: Props) {

    const { timeAgo } = useTimeAgo()
    const { userInfo } = useGlobalData();
    const { t } = useTranslation();
    return (

        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <View style={[styles.wrapper]}>
                    <View style={{ paddingLeft: 20, marginRight: 10 }}>
                        <Avatar size='Small' src={props.author_avatar} />
                    </View>

                    <View style={[styles.contentWrapper]}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1, paddingRight: 20 }}>
                            <Text style={[styles.arthur, { textAlign: 'left' }]}>{props.author_name}</Text>
                            <Text style={{ flex: 0, color: "gray" }}>{timeAgo(props.created_at)}</Text>
                        </View>

                        <Text style={[styles.innerWrapper]} >
                            {
                                props.mentioned_users ?
                                    <Text style={{ color: Colors.bluePrimary, flex: 0 }}> {props.mentioned_users[0].user_id !== "" ? `+${props.mentioned_users[0].user_name} ` : ""}</Text>
                                    :
                                    null
                            }
                            <Text>{props.content}</Text>
                        </Text>
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
                        <DropdownMenu.Item key='delete' onSelect={() => props.deleteComment(props.id)}>
                            <DropdownMenu.ItemTitle>
                                {t('post.dropDownOptions.delete')}
                            </DropdownMenu.ItemTitle>
                        </DropdownMenu.Item>
                    </>
                ) : (
                    <>
                        <DropdownMenu.Item key='replay' onSelect={() => props.setReplay({
                            user_id: props.user_id,
                            user_name: props.author_name
                        })}>
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
        backgroundColor: Colors.whitePrimary,
        gap: 5
    },
    innerWrapper: {
        flexDirection: 'row',
        flex: 1,
        gap: 5,
        marginRight: 20,
    },
    contentWrapper: {
        flexDirection: "column",
        gap: 5,
        flex: 1,
        borderBottomColor: Colors.grayPrimary,
        borderBottomWidth: 1,
        paddingBottom: 17
    },
    arthur: {
        fontWeight: 'bold',
        fontSize: 14,
        flex: 0
    }
});
