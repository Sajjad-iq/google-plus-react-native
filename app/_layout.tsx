import { HeaderProvider } from "@/context/HeaderContext";
import DrawerLayout from "@/components/others/drawerLayout";

export default function RootLayout() {

  return (
    <HeaderProvider>
      <DrawerLayout />
    </HeaderProvider>
  );
}
