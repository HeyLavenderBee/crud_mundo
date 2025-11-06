import { StyleSheet, Text, View, TouchableOpacity, TextInput, Picker } from 'react-native';
import { useState } from 'react';
import ('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
import * as Crypto from "expo-crypto";


export default function App({ navigation }) {

  //função de criptografar senha (bcrypt não funciona direto no expo, então usei uma alternativa)
  async function createPasswordHash(password) {
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password //faz a criptografia do valor que recebe
    );
    console.log("Hash gerado:", hash);
    return hash;
  }

  //constantes de email e senha, definidas como string
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPressSubmit = async () => { //define que é uma função que espera por retorno de algo
    const hash = await createPasswordHash(password); //gera o hash da senha, e coloca numa variável
    if(hash=="bc86396b649631aa7b528ab04875a55886db5fb81b83168eea2c7dce277ed5c9"){
      console.log("A senha está correta, indo para a página principal...")
      navigation.navigate("Crud Mundo"); //vai para a página principal do CRUD
    } 
  }

  return (
    <View style={styles.container}>
      <View style={styles.form_container}>
        <Text style={styles.title}>Faça seu cadastro</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          placeholderTextColor="#C0C0C0"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#C0C0C0"
          value={password}
          onChangeText={setPassword}
        />

        <View>
          <TouchableOpacity onPress={onPressSubmit} style={styles.button}>
            <Text style={styles.button_text}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#e1e4e6',
  },
  title: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '14px',
  },
  form_container: {
    width: '80%',
    height: '250px',
    padding: '14px',
    borderRadius: '8px',
    marginTop: '30px',
    backgroundColor: "#a5cfe8",
  },
  input: {
    padding: '6px',
    borderRadius: '5px',
    marginBottom: '14px',
    backgroundColor: '#e5ecea',
  },
  select_input: {
    padding: '6px',
    borderRadius: '5px',
    marginBottom: '14px',
    backgroundColor: '#e5ecea',
  },
  button: {
    width: 'fit-content',
    padding: '5px',
    borderRadius: '4px',
    backgroundColor: '#78a7db',
  },
  button_text: {
  },
});