import { router, Stack } from 'expo-router';
import { useEffect } from 'react';

export default function NotFoundScreen() {

  useEffect(() => {
    router.push("/(drawer)/")
  }, [])
  return (
    <>
      <Stack.Screen options={{ title: '' }} />
    </>
  );
}
