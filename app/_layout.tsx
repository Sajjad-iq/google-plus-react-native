import { GlobalDataProvider } from "@/context/GlobalContext";
import DrawerLayout from "@/components/others/drawerLayout";
import '../i18n'
export default function RootLayout() {

  return (
    <GlobalDataProvider>
      <DrawerLayout />
    </GlobalDataProvider>
  );
}
