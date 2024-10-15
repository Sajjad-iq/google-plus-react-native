import { Stack } from "expo-router";
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from "@/constants/Colors";
import { useTranslation } from "react-i18next";
import getCurrentLang from "@/hooks/getCurrentLang";
import PostOptionsMenu from "@/components/shared/post/postOptionsMenu";


export default function ScreensLayout() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const lang = getCurrentLang()

  return (
    <Stack screenOptions={{
      headerTintColor: Colors.whitePrimary,  // Customize as needed
    }}>
      <Stack.Screen
        name="events"
        options={{
          headerShown: true, headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons name="arrow-left" size={28} color={Colors.whitePrimary} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: Colors.redPrimary, // Customize as needed
          },
        }}
      />
      <Stack.Screen name="feedback" options={{
        headerShown: true, headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={28} color={Colors.whitePrimary} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: Colors.redPrimary, // Customize as needed
        },
      }} />
      <Stack.Screen name="help" options={{
        headerShown: true, headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={28} color={Colors.whitePrimary} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: Colors.redPrimary, // Customize as needed
        },
      }} />
      <Stack.Screen name="people" options={{
        headerShown: true, headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={28} color={Colors.whitePrimary} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: Colors.redPrimary, // Customize as needed
        },
      }} />
      <Stack.Screen
        name="profile"
        options={{
          headerShown: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons name="arrow-left" size={28} color={Colors.whitePrimary} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={[styles.headerTitleContainer, { flexDirection: lang == 'ar' ? "row-reverse" : "row" }]}>
              <Text style={styles.headerTitle}>{t("profile.about")}</Text>
              <TouchableOpacity onPress={() => { }}>
                <MaterialCommunityIcons name="dots-vertical" size={28} color={Colors.whitePrimary} />
              </TouchableOpacity>
            </View>

          ),
          headerTransparent: true, // Allows the content to overlap the header
          headerStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          },
        }}
      />

      <Stack.Screen
        name="profilePreview"
        options={{
          headerShown: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons name="arrow-left" size={28} color={Colors.whitePrimary} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={[styles.headerTitleContainer, { flexDirection: lang == 'ar' ? "row-reverse" : "row" }]}>
              <Text style={styles.headerTitle}>{t("profile.about")}</Text>
              <TouchableOpacity onPress={() => { }}>
                <MaterialCommunityIcons name="dots-vertical" size={28} color={Colors.whitePrimary} />
              </TouchableOpacity>
            </View>

          ),
          headerTransparent: true, // Allows the content to overlap the header
          headerStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          },
        }}
      />
      <Stack.Screen name="settings" options={{
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={28} color={Colors.whitePrimary} />
          </TouchableOpacity>
        ),
        title: '',
        headerStyle: {
          backgroundColor: Colors.redPrimary, // Customize as needed
        },
      }} />
      <Stack.Screen
        name="postView"
        options={{
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons name="arrow-left" size={28} color={Colors.whitePrimary} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <PostOptionsMenu />
          ),
          headerStyle: {
            backgroundColor: Colors.redPrimary,
          },
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    justifyContent: 'flex-start', // Pushes the title to the right
    alignItems: 'center',
    gap: 25,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.whitePrimary,
  },
});