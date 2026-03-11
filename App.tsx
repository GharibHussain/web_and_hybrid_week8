import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';

import {firestore, collection, addDoc, serverTimestamp, SHOPPING_LIST, getDocs, query, onSnapshot, orderBy, doc, updateDoc, deleteDoc} from "./firebase/Config";
import { useState, useEffect } from 'react';
import { Item } from './types/Item';
import ShoppingList from './components/ShoppingList';



// libraries
// npx expo install firebase
// npm install react-native-swipe-list-view



export default function App() {
  const [newInput, setNewInput] = useState('')
  const [items, setItems] = useState<Item[]>([])

  
  useEffect(() => {
    // reference to the collection
    const colRef = collection(firestore, SHOPPING_LIST)
    // query
    const q = query(colRef, orderBy('createdAt', 'desc'))
    // event listener
    const subscription = onSnapshot(q, (data) => {   // data => query data
      const rows: Item[] = data.docs.map(d => { 
        const document = d.data() as any              // each item in the collection is called a document
        const name = document.name ?? 'undefined' 
        const tobePurchased = document.toBePurchased ?? 'undefined'
        const createdAt = document.createdAt?.toDate ? document.createdAt.toDate() : null
        //const time = createdAt ? new Date(createdAt).toLocaleDateString() : 'undefined'
        return {
          id: d.id,
          name: name,
          toBePurchased: tobePurchased,
          createdAt: createdAt,
        }
      })
      setItems(rows)
    })
    

    return () => {
      subscription()
    }
  }, [])


  // add
  const handleSend = async (): Promise<void> => {
    if (!newInput.trim()) return

    try {
      // collection name is SHOPPING_LIST
      const colRef = collection(firestore, SHOPPING_LIST)
      await addDoc(colRef, {
        "name": newInput.trim(),
        "toBePurchased": false,
        "createdAt": serverTimestamp()
      })
      setNewInput('')

    } catch (error) {
      console.log(error)
    }
  }

  // update
  const toggleToBePurchased = async (item: Item): Promise<void> => {
    try {
      const docRef = doc(firestore, SHOPPING_LIST, item.id)
      await updateDoc(docRef, {
        toBePurchased: !item.toBePurchased
      })
    } catch (error) {
      console.log(error)
    }
  }

  // delete
  const handleRemoveItem = async (id: string): Promise<void> => {
    try {
      const docRef = doc(firestore, SHOPPING_LIST, id)
      await deleteDoc(docRef)
    } catch (error) {
      console.log(error)
    }
  }



    

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <TextInput
        placeholder="Enter new item..."
        value={newInput}
        onChangeText={setNewInput}
      />
      <Button title="Add Item" onPress={handleSend} />
      <ShoppingList items={items} toggleToBePurchased={toggleToBePurchased} removeItem={handleRemoveItem} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    marginTop: 50,
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 16, 
    textAlign: 'center', 
  },
});

