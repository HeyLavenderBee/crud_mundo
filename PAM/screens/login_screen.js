import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState } from 'react';
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

  //função para ir para a tela de cadastro
  const onRegisterPressed = () => {
    navigation.navigate("Cadastro");
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
    else{
      Alert.alert("Senha incorreta", "Tente novamente!");
      console.log("Senha incorreta");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.form_container}>
        <Text style={styles.title}>Faça seu login</Text>
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

        <TouchableOpacity onPress={onPressSubmit} style={styles.submit_button}>
          <Text style={styles.submit_button_text}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRegisterPressed} style={styles.register_button}>
            <Text style={styles.button_text}>Ainda não tem conta? Cadastre-se!</Text>
          </TouchableOpacity>
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
    height: '280px',
    padding: '12px',
    paddingTop: '20px',
    borderRadius: '8px',
    marginTop: '30px',
    backgroundColor: "#a5cfe8",
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    padding: '9px',
    borderRadius: '5px',
    marginBottom: '14px',
    backgroundColor: '#e5ecea',
  },
  submit_button: {
    width: '35%',
    textAlign: 'center',
    padding: '8px',
    borderRadius: '4px',
    backgroundColor: '#78a7db',
    marginBottom: '10px',
  },
  submit_button_text: {
    textAlign: 'center',
  },
  register_button: {
    padding: '3px',
  }, 
});