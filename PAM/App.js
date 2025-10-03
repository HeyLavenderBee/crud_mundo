import { StyleSheet, Text, View, } from 'react-native';
import { DataTable } from 'react-native-paper';

//https://callstack.github.io/react-native-paper/docs/components/DataTable/ (estou usando esse agora)
//https://mui.com/material-ui/react-table/
//https://primereact.org/datatable/
//https://mui.com/material-ui/react-table/

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.title}>Crud Mundo</Text>
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
});


