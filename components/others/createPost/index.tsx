import { Colors } from '@/constants/Colors';
import { Modal, StyleSheet, Text, View, TouchableOpacity, Platform, TextInput } from 'react-native';
import { CratePostHeader } from './cratePostHeader';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { CreatePostFooter } from './createPostFooter';
import KeyboardAvoidingView from '@/components/shared/KeyboardAvoidingView';

interface Props {
    isActive: boolean;
    hideCallback: () => void;
}

export const CreatePost = (props: Props) => {
    return (
        <Modal
            animationType="slide"
            visible={props.isActive}
            onRequestClose={props.hideCallback}
            transparent={Platform.OS === 'android'}
            presentationStyle={Platform.OS === 'ios' ? 'pageSheet' : 'overFullScreen'}
        >
            <KeyboardAvoidingView >
                <View style={styles.postView}>
                    <ScrollView contentContainerStyle={styles.contentContainer} >
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <CratePostHeader />
                            <TextInput
                                style={styles.textArea}
                                placeholder="Write something ..."
                                placeholderTextColor={Colors.grayX2}
                                multiline={true}
                            />
                        </View>
                    </ScrollView>

                    <TouchableOpacity
                        style={styles.addLocationButton}
                    >
                        <MaterialIcons name="location-pin" size={28} color="gray" />
                        <Text style={styles.addLocationText}>Add your location</Text>
                    </TouchableOpacity>

                    <CreatePostFooter />
                </View>

            </KeyboardAvoidingView>

        </Modal>
    );
};

const styles = StyleSheet.create({
    postView: {
        margin: 5,
        flex: 1,
        backgroundColor: Colors.whitePrimary,
        borderRadius: 4,
        flexDirection: 'column',
        gap: 20
    },
    contentContainer: {
        paddingBottom: 20, // Adds space at the bottom of the ScrollView
    },
    textArea: {
        paddingHorizontal: 20,
        backgroundColor: Colors.whitePrimary,
        borderRadius: 5,
        color: Colors.text,
        fontSize: 16,
        paddingVertical: 8,
        marginTop: 10,
        marginBottom: 20, // Adds space below the TextInput
    },
    addLocationButton: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    addLocationText: {
        color: Colors.grayX2,
        fontSize: 16,
        fontWeight: '500',
    },
});
