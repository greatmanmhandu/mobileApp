import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ScrollableDropdown = ({ data, selectedValue, onValueChange }) => {
    const [open, setOpen] = useState(false);

    if (!selectedValue) {
      selectedValue = data[0]; // Set the first item as default selected value
    }

    return (
        <>
            <View style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}>
                <TouchableOpacity onPress={() => setOpen(!open)}>
                    <Text>{selectedValue.label}</Text>
                </TouchableOpacity>
                {open && (
                    <View style={{ maxHeight: 150 }}>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => { onValueChange(item); setOpen(false); }}>
                                    <Text>{item.firstName}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.lastName.toString()}
                        />
                    </View>
                )}
            </View>
        </>
    );
};

// const styles = StyleSheet.create({

// });

export default ScrollableDropdown;