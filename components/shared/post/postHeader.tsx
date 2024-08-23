import { Avatar } from '@/components/UI/avatar';
import { Colors } from '@/constants/Colors';
import { useLayoutDirection } from '@/context/GlobalContext';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native'

interface Props {
    avatar?: string
    userName: string
    date: string
    status: "Public" | "Private"
}

export default function PostHeader(props: Props) {

    const { currentLayoutDirection } = useLayoutDirection()
    const flexDirection = currentLayoutDirection == 'rtl' ? 'row-reverse' : 'row'
    return (
        <View style={[styles.headerWrapper, { flexDirection: flexDirection }]} >
            <View style={[styles.leftContainer, { flexDirection: flexDirection }]}>
                <Avatar size="Medium" src={props.avatar} />
                <View style={[styles.labelWrapper, { flexDirection: flexDirection }]}>
                    <Text style={styles.arthurName} >{props.userName}</Text>
                    <AntDesign style={{ transform: [{ rotate: currentLayoutDirection === 'rtl' ? '180deg' : '0deg' }] }} name="caretright" size={8} color={Colors.grayX2} />
                    <Text style={styles.postStatus}>{props.status}</Text>
                </View>
            </View>

            <Text style={styles.dateLabel}>{props.date}</Text>
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