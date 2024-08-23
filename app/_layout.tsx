import { HeaderProvider } from "@/context/HeaderContext";
import DrawerLayout from "@/components/others/drawerLayout";
import '../i18n'
export default function RootLayout() {

  return (
    <HeaderProvider>
      <DrawerLayout />
    </HeaderProvider>
  );
}
