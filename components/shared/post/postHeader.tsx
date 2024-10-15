import { Avatar } from '@/components/UI/avatar';
import { Colors } from '@/constants/Colors';
import { useGlobalData } from '@/context/GlobalContext';
import useTimeAgo from '@/hooks/useTimeAgo';
import { useUserAccount } from '@/hooks/useUserAccount';
import { PostType } from '@/types/post';
import { AntDesign } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props extends PostType {
}

export default function PostHeader(props: Props) {
    const { lang, userInfo } = useGlobalData()
    const { t } = useTranslation();
    const { timeAgo } = useTimeAgo()
    const { selectUser } = useUserAccount()
    return (
        <View style={[styles.headerWrapper, { flexDirection: "row" }]} >
            <View style={[styles.leftContainer, { flexDirection: "row" }]}>
                <TouchableOpacity onPress={() => userInfo.id === props.author_id ? null : selectUser(props.author_id || "")}>
                    <Avatar size="Medium" src={props.author_avatar} />
                </TouchableOpacity>
                <View style={[styles.labelWrapper, { flexDirection: "row" }]}>
                    <Text style={styles.arthurName} >{props.author_name}</Text>
                    <AntDesign style={{ transform: [{ rotate: lang === 'ar' ? '180deg' : '0deg' }] }} name="caretright" size={8} color={Colors.grayX2} />
                    <Text style={styles.postStatus}>{t(`post.postState.public`)}</Text>
                </View>
            </View>

            <Text style={styles.dateLabel}> {timeAgo(props.created_at)}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    labelWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    arthurName: {
        fontWeight: 'bold',
    },
    postStatus: {
        color: Colors.grayX2,
        fontSize: 13,
        fontWeight: 'bold',
    },
    dateLabel: {
        color: Colors.grayX2
    }
});