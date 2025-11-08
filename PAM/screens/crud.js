import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { DataTable } from 'react-native-paper';

//https://callstack.github.io/react-native-paper/docs/components/DataTable/ (estou usando esse agora)
//https://mui.com/material-ui/react-table/
//https://primereact.org/datatable/
//https://mui.com/material-ui/react-table/

export default function Crud({ navigation }) {
  const onPressCountryForm = () => {
    navigation.navigate("Form País");
  }

  const onPressCityForm = () => {
    navigation.navigate("Form Cidade");
  }

  const onPressCitiesScreen = () => {
    navigation.navigate("Cidades");
  }

  const onPressCountriesScreen = () => {
    navigation.navigate("Países");
  }

  return (
    <View style={styles.container}>

    <Text style={styles.welcome_label}>
      Bem-vindo ao CRUD Mundo!
    </Text>
    <Text style={styles.intro_text}>
      Visualize as tabelas de países e cidades, crie, edite e exclua os dados.
    </Text>
    <Text style={styles.intro_text}>
      Selecione uma das opções para começar:
    </Text>
      
      <View style={styles.button_container}>
      <TouchableOpacity onPress={onPressCountriesScreen} style={styles.button}>
          <Text style={styles.button_text}>Gerenciar países</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressCitiesScreen} style={styles.button}>
          <Text style={styles.button_text}>Gerenciar cidades</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressCountryForm} style={styles.button}>
          <Text style={styles.button_text}>Cadastrar país</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressCityForm} style={styles.button}>
          <Text style={styles.button_text}>Cadastrar cidade</Text>
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
  intro_text: {
    width: '70%',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
  },
  welcome_label: {
    width: '90%',
    textAlign: 'center',
    fontSize: 22,
    color: '#2b2382',
    fontWeight: 'bold',
    marginTop: 20,
  },
  button_container: {
    marginTop: 25,
    width: '80%',
  },
  button: {
    width: '100%',
    padding: 11,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#7cb0d9',
  },
  button_text: {
    textAlign: 'center',
    fontSize: 18,
    color: '#232f7d',
    fontWeight: 'bold',
  },
});
