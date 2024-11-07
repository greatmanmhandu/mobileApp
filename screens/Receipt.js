import React from 'react';
import { Text, View } from 'react-native';

const Receipt = ({ order }) => {
  
  return (
    <View>
      <Text>Order: {order.id}</Text>
      <Text>Customer: {order.customer}</Text>
      <Text>Items:</Text>
      {order.items.map((item) => (
        <View key={item.id}>
          <Text>{item.name}</Text>
          <Text>Quantity: {item.quantity}</Text>
          <Text>Price: ${item.price}</Text>
        </View>
      ))}
      <Text>Total: ${order.total}</Text>
    </View>
  );
};

export default Receipt;