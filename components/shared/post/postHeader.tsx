import { Avatar } from '@/components/UI/avatar';
import { Colors } from '@/constants/Colors';
import { useGlobalData } from '@/context/GlobalContext';
import getCurrentLang from '@/hooks/getCurrentLang';
import { PostType } from '@/types/post';
import { AntDesign } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native'

interface Props extends PostType {
}

export default function PostHeader(props: Props) {
    const { lang } = useGlobalData()
    const { t } = useTranslation();

    return (
        <View style={[styles.headerWrapper, { flexDirection: "row" }]} >
            <View style={[styles.leftContainer, { flexDirection: "row" }]}>
                <Avatar size="Medium" src={props.author_avatar} />
                <View style={[styles.labelWrapper, { flexDirection: "row" }]}>
                    <Text style={styles.arthurName} >{props.author_name}</Text>
                    <AntDesign style={{ transform: [{ rotate: lang === 'ar' ? '180deg' : '0deg' }] }} name="caretright" size={8} color={Colors.grayX2} />
                    <Text style={styles.postStatus}>{t(`post.postState.public`)}</Text>
                </View>
            </View>

            <Text style={styles.dateLabel}> {`2 ${t('post.postTimer.d')} `}</Text>
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