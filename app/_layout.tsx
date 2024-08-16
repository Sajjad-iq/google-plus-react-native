import { HeaderProvider } from "@/context/HeaderContext";
import DrawerWrapper from "@/components/drawerComponent";

export default function RootLayout() {

  return (
    <HeaderProvider>
      <DrawerWrapper />
    </HeaderProvider>
  );
}
