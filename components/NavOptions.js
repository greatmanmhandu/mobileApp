import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/base';
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const data = [
    {
        id: "123",
        title: "Get A Truck",
        image: "https://links.papareact.com/3pn",
        screen: "MapScreen",
    },
    {
        id: "456",
        title: "Driver Mode",
        image: "https://links.papareact.com/28w",
        screen: "EatsScreen",
    },
];

const NavOptions = () => {
    const navigation = useNavigation();
    const renderItem = ({ item }) => (
        <TouchableOpacity
        onPress={() => navigation.navigate(item.screen)}
         style={tw`p-2 pl-6 pt-4 pb-8 bg-gray-200 m-2 w-40 rounded-md`}>
            <View>
                <Image
                    style={{ width: 120, height: 120, resizeMode: "contain" }}
                    source={{
                        uri: item.image,
                    }}
                />
                <Text style={tw`mt-2`}>{item.title}</Text>
                <Icon
                    style={tw`bg-black rounded-full w-10 mt-4`}
                    name="arrowright" color="white" type='antdesign'
                />
            </View>
        </TouchableOpacity>
    );

    const keyExtractor = (item) => item.id;

    return (
        <FlatList
            data={data}
            horizontal
            renderItem={renderItem}
            keyExtractor={keyExtractor}
        />
    );
};

const styles = StyleSheet.create({
    option: {
        padding: 10,
        marginRight: 10,
        backgroundColor: 'lightgray',
        borderRadius: 10,
    },
    optionText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default NavOptions;