import React from 'react'

import { SwipeListView } from 'react-native-swipe-list-view'
import {View, Button, StyleSheet} from 'react-native'
import { Item } from '../types/Item'
import ShoppingItem from './ShoppingItem'


interface ShoppingListProps {
    items: Item[]
    toggleToBePurchased: (item: Item) => void,
    removeItem: (id: string) => void
}

// list of todos 
export default function ShoppingList({ items, toggleToBePurchased, removeItem }: ShoppingListProps) {
  return (
    <SwipeListView
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
            <ShoppingItem item={item} toggleToBePurchased={toggleToBePurchased} />
        )}
        rightOpenValue={-75}
        disableRightSwipe 
        renderHiddenItem={({ item }) => <View style={styles.rowBack} > 
          <Button 
              title='Delete'
              color='d11a2a'
              onPress={() => {
                removeItem(item.id)
              }}
          />
        </View>}
    />
  )
}


const styles = StyleSheet.create({
   rowBack: { 
    backgroundColor: '#ddd', 
    flex: 1, 
    alignItems: 'flex-end', 
    justifyContent: 'center', 
    padding: 4 
  },
})
