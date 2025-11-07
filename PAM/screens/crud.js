import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { DataTable } from 'react-native-paper';

//https://callstack.github.io/react-native-paper/docs/components/DataTable/ (estou usando esse agora)
//https://mui.com/material-ui/react-table/
//https://primereact.org/datatable/
//https://mui.com/material-ui/react-table/

export default function App({ navigation }) {
  const onPressCountryForm = () => {
    navigation.navigate("Form País");
  }

  const onPressCityForm = () => {
    navigation.navigate("Form Cidade");
  }

  const onPressCitiesScreen = () => {
    navigation.navigate("Cidades");
  }

  return (
    <View style={styles.container}>

    <Text style={styles.intro_text}>
      Bem-vindo ao CRUD Mundo!
      Visualize as tabelas de países e cidades, crie, edite e exclua os dados.
      Selecione uma das opções para começar:
    </Text>
      
      <View style={styles.button_container}>
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
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  intro_text: {
    width: '90%',
    textAlign: 'center',
    fontSize: '20px',
    marginTop: '20px',
  },
  table_style: {
    backgroundColor: '#a5cfe8',
  },
  table_header_style: {
    backgroundColor: '#88b7db',
  },
  button_container: {
    marginTop: '25px',
    width: '85%',
  },
  button: {
    width: '100%',
    padding: '9px',
    borderRadius: '8px',
    marginBottom: '10px',
    backgroundColor: '#a5cfe8',
  },
  button_text: {
    textAlign: 'center',
    fontSize: '18px',
  },
});
