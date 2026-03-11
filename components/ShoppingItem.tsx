import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Item } from '../types/Item'
import { IconButton } from 'react-native-paper'


interface TodoItemProps {
  item: Item
  toggleToBePurchased: (item: Item) => void
}

// a single todo item
export default function TodoItem({ item, toggleToBePurchased }: TodoItemProps) {
  return (
    <Pressable 
        style={[styles.rowFront, {backgroundColor: item.toBePurchased ? '#d3d3d3' : '#f9f9f9'}]}
        onPress={() => toggleToBePurchased(item)} >
        <Text style={{textDecorationLine: item.toBePurchased ? 'underline' : 'none'}}>{item.name}</Text>
    </Pressable>
  )
}


const styles = StyleSheet.create({
  rowFront: { 
    backgroundColor: '#f9f9f9', 
    borderBottomWidth: 1, 
    borderColor: '#eee', 
    padding: 16, 
  },
})
