import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Header } from './header';
import PrimaryDrawerItems from './primaryDrawerItems';
import SecondaryDrawerItems from './secondaryDrawerItems';

export const CustomDrawerContent = (props: any) => {
    return (
        <DrawerContentScrollView contentContainerStyle={{
            paddingTop: 0,
        }}  {...props}>
            <Header />
            <PrimaryDrawerItems />
            <SecondaryDrawerItems />
        </DrawerContentScrollView>
    );
};
