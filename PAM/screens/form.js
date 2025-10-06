import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import ('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

//https://callstack.github.io/react-native-paper/docs/components/DataTable/ (estou usando esse agora)
//https://mui.com/material-ui/react-table/
//https://primereact.org/datatable/
//https://mui.com/material-ui/react-table/

export default function App({ navigation }) {
  const [countryName, setCountryName] = useState('');
  const [countryPopulation, setCountryPopulation] = useState('');
  const [countryContinent, setCountryContinent] = useState('');

  const onPressSubmit = () => {
    navigation.navigate("Crud Mundo");
  }

  return (
    <View style={styles.container}>
      <View style={styles.form_container}>
        <Text style={styles.title}>Form país</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do país"
          placeholderTextColor="#C0C0C0"
          value={countryName}
          onChangeText={setCountryName}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite a população do país"
          placeholderTextColor="#C0C0C0"
          value={countryPopulation}
          onChangeText={setCountryPopulation}
        />
        <TextInput
          style={styles.input}
          placeholder="Digite o continente do país"
          placeholderTextColor="#C0C0C0"
          value={countryContinent}
          onChangeText={setCountryContinent}
        />
        <View>
          <TouchableOpacity onPress={onPressSubmit} style={styles.button}>
            <Text style={styles.button_text}>Cadastrar país</Text>
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
    fontFamily: 'Sansation'
  },
  button: {
    width: 'fit-content',
    padding: '5px',
    borderRadius: '4px',
    backgroundColor: '#78a7db',
  },
  button_text: {
  },
  font_face: {
    fontFamily: 'Sansation',
    src: ('./fonts/Sansation-Regular.tff'),
  }
});