import * as DropdownMenu from 'zeego/dropdown-menu';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useGlobalData } from '@/context/GlobalContext';
import { useTranslation } from 'react-i18next';
import { useDeletePost } from '@/hooks/useDeletePost';

export default function PostOptionsMenu() {

    const { selectedPost, userInfo } = useGlobalData();
    const { t } = useTranslation();
    const { deletePost } = useDeletePost(selectedPost, userInfo)
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <MaterialCommunityIcons style={{ flex: 1 }} name="dots-vertical" size={24} color={Colors.whitePrimary} />
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
                {userInfo.id === selectedPost.author_id ? (
                    <>
                        <DropdownMenu.Item key='delete' onSelect={deletePost}>
                            <DropdownMenu.ItemTitle>
                                {t('post.dropDownOptions.delete')}
                            </DropdownMenu.ItemTitle>
                        </DropdownMenu.Item>

                        {/*            <DropdownMenu.Item key='edit' onSelect={handleEdit}>
                            <DropdownMenu.ItemTitle>
                                {t('post.dropDownOptions.edit')}
                            </DropdownMenu.ItemTitle>
                        </DropdownMenu.Item> */}
                    </>
                ) : (
                    <DropdownMenu.Item key='report' onSelect={() => ""}>
                        <DropdownMenu.ItemTitle>
                            {t('post.dropDownOptions.report')}
                        </DropdownMenu.ItemTitle>
                    </DropdownMenu.Item>
                )}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}
