import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the desired icon library


const ConnectivityCheckers = () => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <View>

            <View style={styles.footerContainer}>
                <View style={styles.footerCard}>
                    <View style={styles.section}>
                        <Text style={styles.label}>Connection Status:</Text>
                        <Text style={styles.value}>
                            <Text style={styles.value}>          <Icon
                                name={isConnected ? 'check-circle' : 'times-circle'}
                                size={12}
                                color={isConnected ? 'green' : 'red'}
                            /> {isConnected ? 'Connected' : 'Disconnected'}</Text>
                        </Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.valueBtm}>We value your trust in our cash collection services,
                            contact our support team for any assistance.</Text>
                    </View>
                </View>
            </View>


        </View>
    );
};
const styles = StyleSheet.create({

    value: {
        flex: 0.6,
        fontSize: 8,
        color: 'black',
    },
    statusText: {
        marginLeft: 8,
    },

    

});
export default ConnectivityCheckers;