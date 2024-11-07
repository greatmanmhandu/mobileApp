import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ResponseMessageModal = ({ message, setMessage }) => {
    useEffect(() => {
        if (message !== '') {
            const timer = setTimeout(() => {
                setMessage('');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message, setMessage]);

    return (
        <View style={styles.container}>
            <Text style={styles.messageText}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        alignItems: 'center',
    },
    messageText: {
        color: '#E72929',
        fontSize: 16,
        alignItems: 'center',
        textAlign: 'center',
        padding:2
    },
});

export default ResponseMessageModal;