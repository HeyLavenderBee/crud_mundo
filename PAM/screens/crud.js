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

  return (
    <View style={styles.container}>
      
      <View style={styles.form_container}>
        <View>
          <TouchableOpacity onPress={onPressCountryForm} style={styles.button}>
            <Text style={styles.button_text}>Cadastrar país</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={onPressCityForm} style={styles.button}>
            <Text style={styles.button_text}>Cadastrar cidade</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.paragraph}>
        Tabela de países
      </Text>

      <DataTable style={styles.table_style}>
        <DataTable.Header style={styles.table_header_style}>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title numeric>Nome</DataTable.Title>
          <DataTable.Title numeric>Habitantes</DataTable.Title>
          <DataTable.Title numeric>Continente</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>0</DataTable.Cell>
          <DataTable.Cell numeric>Botsuana</DataTable.Cell>
          <DataTable.Cell numeric>78</DataTable.Cell>
          <DataTable.Cell numeric>África</DataTable.Cell>
        </DataTable.Row>
      </DataTable>

      <Text style={styles.paragraph}>
        Tabela de cidades
      </Text>
      <DataTable style={styles.table_style}>
        <DataTable.Header style={styles.table_header_style}>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title numeric>Nome</DataTable.Title>
          <DataTable.Title numeric>Habitantes</DataTable.Title>
          <DataTable.Title numeric>id_pais</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>0</DataTable.Cell>
          <DataTable.Cell numeric>hey</DataTable.Cell>
          <DataTable.Cell numeric>40594</DataTable.Cell>
          <DataTable.Cell numeric>0</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
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
  navbar: {
    width: '100%',
    marginTop: 0,
    marginBottom: '30px',
    height: 90,
    padding: 10,
    paddingTop: 30,
    backgroundColor: '#3576a1',
  },
  title: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  table_style: {
    backgroundColor: '#a5cfe8',
  },
  table_header_style: {
    backgroundColor: '#88b7db',
  },
  button: {
    width: '100%',
    padding: '6px',
    borderRadius: '5px',
    marginBottom: '10px',
    backgroundColor: '#a5cfe8',
  },
  button_text: {
    textAlign: 'center',
  },
  form_container: {
    width: '55%',
    height: '130px',
    marginTop: '30px',
    display: 'flex',
  },
});