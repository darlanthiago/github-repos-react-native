import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import axios from 'axios';

export default function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    async function loadRepos() {
      await axios
        .get('https://api.github.com/users/darlanthiago/repos')
        .then((res) => {
          setRepos(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    loadRepos();
  }, []);

  function buttonAlert() {
    Alert.alert("Hello", "Exemple Button");
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#2f3542" />
      <Text style={styles.h1}>My Github Repositories</Text>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repos}
          keyExtractor={(repo) => repo.id}
          renderItem={({item}) => (
            <View style={styles.repoContainer}>
              <Text style={styles.text}>{item.full_name}</Text>
            </View>
          )}
        />

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.button}
          onPress={buttonAlert}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#57606f',
  },
  h1: {
    fontSize: 40,
    color: '#ff4757',
    backgroundColor: '#57606f',
    textAlign: 'center',
    paddingVertical: 15,
  },
  repoContainer: {
    flex: 1,
    height: 40,
    padding: 35,
    marginVertical: 15,
    marginHorizontal: 15,
    borderRadius: 4,
    backgroundColor: '#2f3542',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#dfe4ea',
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ff4757',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#dfe4ea',
  },
});
