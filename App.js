import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'

export default function App() {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])  
 

const testId ='testID'
const accessibility='App is loading books'

// https://fudap-books-api.herokuapp.com/books/
const getBooks = async () =>{
  fetch('https://fudap-books-api.herokuapp.com/books/')
  .then((response) => response.json())
  .then((json) =>setData(json))
  .catch((err) => console.error(err))
  .finally(() => setLoading(false));
}


useEffect(() => {
    getBooks();
    
  }, []);

// console.log(data)

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor:'#ffff', alignItems: 'center', justifyContent: 'center'}}>
     {isLoading ? <ActivityIndicator  testID={testId} accessibilityLabel={accessibility}/> : 
     <View style={{flex:1, alignItems: 'center', justifyContent: 'center',top:50,}}>
     <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            accessibilityLabel="books"
            renderItem={({ item }) => (
              <View style={{flex:1, alignItems: 'flex-start', justifyContent: 'center', backgroundColor:'tomato', height:80,
              margin:2, borderRadius:6, padding:4, 
              }} testID="book">
                <Text>Title:  {item.title}</Text>
                <Text>Author: {item.author}</Text>
              </View>
            )}
          />
     </View>
     }
    
    </View>)
 
}

