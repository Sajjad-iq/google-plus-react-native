import { Alert } from "react-native";
export default function Alerts() {
    const networkAlert = () =>
        Alert.alert(
            "Network Issue",
            "You might be offline. Please check your internet connection and try again.",
            [
                {
                    text: "OK",
                    style: "cancel"
                },
            ],
            { cancelable: true }
        );

    const errorAlert = () =>
        Alert.alert(
            "Error",
            "Something went wrong. Please try again later.",
            [
                {
                    text: "OK",
                    style: "cancel"
                },
            ],
            { cancelable: true }
        );

    const emptyPostAlert = () =>
        Alert.alert(
            "Error",
            "Post cannot be empty.",
            [
                {
                    text: "OK",
                    style: "cancel"
                },
            ],
            { cancelable: true }
        );


    const NoPostsAlert = () =>
        Alert.alert(
            "No Posts Yet",
            "",
            [
                {
                    text: "OK",
                    style: "cancel"
                },
            ],
            { cancelable: true }
        );
    return {
        networkAlert,
        errorAlert,
        emptyPostAlert,
        NoPostsAlert
    }
}
