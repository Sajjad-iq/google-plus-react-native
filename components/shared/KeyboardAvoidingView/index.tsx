import { useState } from 'react';
import { Dimensions, KeyboardAvoidingViewProps, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CommonKeyboardAvoidingView from './KeyboardAvoidingView';
import { Colors } from '@/constants/Colors';

const { height: DEVICE_HEIGHT } = Dimensions.get('screen');

const IOSKeyboardAvoidingView = (props: KeyboardAvoidingViewProps) => {
    const insets = useSafeAreaInsets();
    const [screenHeight, setScreenHeight] = useState(0);

    const modalOffsetFromTop = DEVICE_HEIGHT - screenHeight;

    return (
        <SafeAreaView
            style={styles.container}
            onLayout={(event) => {
                setScreenHeight(event.nativeEvent.layout.height);
            }}
        >
            {screenHeight ? (
                <CommonKeyboardAvoidingView {...props} keyboardVerticalOffset={modalOffsetFromTop - insets.bottom + 30} />
            ) : null}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whitePrimary
    },
});

const KeyboardAvoidingView =
    Platform.OS === 'ios' ? IOSKeyboardAvoidingView : CommonKeyboardAvoidingView;

export default KeyboardAvoidingView;