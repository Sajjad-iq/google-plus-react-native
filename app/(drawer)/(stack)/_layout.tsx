import { Stack } from "expo-router";
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from "@/constants/Colors";
import { useTranslation } from "react-i18next";
import getCurrentLang from "@/hooks/getCurrentLang";
import PostOptionsMenu from "@/components/shared/post/postOptionsMenu";
import SearchForPeople from "@/components/others/searchForPeople";


export default function ScreensLayout() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const lang = getCurrentLang()

  return (
    <Stack screenOptions={{
      headerTintColor: Colors.whitePrimary,  // Customize as needed
    }}
    >
      <Stack.Screen
        name="events"
        options={{
          headerShown: true,
          title: "Events",
          headerStyle: {
            backgroundColor: Colors.redPrimary, // Customize as needed
          },
        }}
      />
      <Stack.Screen name="feedback" options={{
        headerShown: true,
        title: "FeedBack",
        headerStyle: {
          backgroundColor: Colors.redPrimary, // Customize as needed
        },
      }}
      />
      <Stack.Screen name="help" options={{
        headerShown: true,
        title: "Help",
        headerStyle: {
          backgroundColor: Colors.redPrimary, // Customize as needed
        },
      }} />
      <Stack.Screen name="people" options={{
        headerShown: true,
        title: "People",
        headerStyle: {
          backgroundColor: Colors.redPrimary, // Customize as needed
        },
      }} />
      <Stack.Screen name="search" options={{
        headerRight: () => (
          <SearchForPeople />
        ),
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.whitePrimary} />
          </TouchableOpacity>
        ),
        headerShown: true,
        title: "",
        headerStyle: {
          backgroundColor: Colors.redPrimary,
        },
      }} />
      <Stack.Screen
        name="profile"
        options={{
          headerShown: true,
          title: t("profile.about"),
          headerTransparent: true, // Allows the content to overlap the header
          headerStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.09)'
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => { }}>
              <MaterialCommunityIcons name="dots-vertical" size={28} color={Colors.whitePrimary} />
            </TouchableOpacity>
          )
        }}
      />

      <Stack.Screen
        name="profilePreview"
        options={{
          headerShown: true,
          title: t("profile.about"),
          headerTransparent: true, // Allows the content to overlap the header
          headerStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => { }}>
              <MaterialCommunityIcons name="dots-vertical" size={28} color={Colors.whitePrimary} />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen name="settings" options={{
        headerShown: true,
        title: "Settings",
        headerStyle: {
          backgroundColor: Colors.redPrimary, // Customize as needed
        },
      }} />
      <Stack.Screen
        name="postView"
        options={{
          headerRight: () => (
            <PostOptionsMenu />
          ),
          title: "",
          headerStyle: {
            backgroundColor: Colors.redPrimary,
          },
        }}
      />
    </Stack>
  );
}


/* 
  headerTitle: () => (
            <View style={[styles.headerTitleContainer, { flexDirection: lang == 'ar' ? "row-reverse" : "row" }]}>
              <Text style={styles.headerTitle}>{t("profile.about")}</Text>
              <TouchableOpacity onPress={() => { }}>
                <MaterialCommunityIcons name="dots-vertical" size={28} color={Colors.whitePrimary} />
              </TouchableOpacity>
            </View>
          ),
*/