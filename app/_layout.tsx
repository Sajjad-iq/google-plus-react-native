import { GlobalDataProvider } from "@/context/GlobalContext";
import LayoutComponent from "./layoutComponent";

export default function RootLayout() {
  return (
    <GlobalDataProvider>
      <LayoutComponent />
    </GlobalDataProvider>
  )
}



