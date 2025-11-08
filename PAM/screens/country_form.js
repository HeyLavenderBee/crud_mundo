import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://yblzpzdqxvjrqdlfiwtf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibHpwemRxeHZqcnFkbGZpd3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MzUwNDcsImV4cCI6MjA3ODAxMTA0N30.k0m9ar3DL-VY6iKlr3_riSMUF69oFdpLUIPvbuLj9v4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CountryForm({ navigation }) {
  const [countryName, setCountryName] = useState("");
  const [language, setLanguage] = useState("");
  const [countryPopulation, setCountryPopulation] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("");
  const [saving, setSaving] = useState(false);

  const continents = ["África", "América", "Ásia", "Europa", "Oceania"]; //lista de continentes

  const onPressSubmit = async () => {
    //vè se as variáveis dos inputs estão vazias
    //se estiver vazio, transforma em false, senão, em true, e se baseia nisso para checar
    if (!countryName.trim() || !countryPopulation.trim() || !selectedContinent || !language.trim()) { //já o trim tira espaços antes e no final da palavra
      Alert.alert("Atenção", "Preencha todos os campos antes de cadastrar.");
      return;
    }

    try {
      setSaving(true);

      //consulta sql para ver se tem um país com o mesmo nome
      const { data: existing, error: checkError } = await supabase
        .from("paises")
        .select("id_pais")
        .ilike("nome", countryName.trim()); //consulta ignorando caixa alta, para ver se tem um país com o mesmo nome

      if (checkError) throw checkError;

      //se existir
      if (existing && existing.length > 0) {
        Alert.alert("Aviso", "Já existe um país com esse nome");
        return;
      }

      //código sql para inserir país
      const { error: insertError } = await supabase.from("paises").insert([
        {
          nome: countryName.trim(),
          habitantes: Number(countryPopulation), //transforma em número
          idioma: language.trim(),
          continente: selectedContinent
        },
      ]);

      if (insertError) throw insertError;

      //alerta de país cadastrado com sucesso
      Alert.alert("Sucesso", "País cadastrado com sucesso!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Países"),
        },
      ]);

      //Limpa campos
      setCountryName("");
      setCountryPopulation("");
      setSelectedContinent("");
      setLanguage("");
    }
    catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível cadastrar o país.");
    }
    finally {
      setSaving(false); //sai do estado de salvamento
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form_container}>
        <Text style={styles.title}>Cadastrar país</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite o nome do país"
          placeholderTextColor="#C0C0C0"
          value={countryName}
          maxLength={160}
          onChangeText={setCountryName}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite a população"
          placeholderTextColor="#C0C0C0"
          keyboardType="numeric"
          maxLength={160}
          value={countryPopulation}
          onChangeText={setCountryPopulation}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite o idioma"
          placeholderTextColor="#C0C0C0"
          maxLength={160}
          value={language}
          onChangeText={setLanguage}
        />

        <View style={styles.select_container}>
          <Picker
            selectedValue={selectedContinent}
            onValueChange={(value) => setSelectedContinent(value)}
            style={styles.select_input}
          >
            <Picker.Item label="Selecione um continente..." value={""} />
            {continents.map((c) => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity
          onPress={onPressSubmit}
          style={styles.button}
          disabled={saving}
        >
          <Text style={styles.button_text}>
            Cadastrar país
          </Text>
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
    color: '#35558c',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 14,
  },
  form_container: {
    width: '80%',
    height: 343,
    padding: 14,
    borderRadius: 8,
    marginTop: 30,
    backgroundColor: "#a5cfe8",
  },
  input: {
    alignSelf: 'center',
    width: '86%',
    padding: 6,
    borderRadius: 5,
    marginBottom: 14,
    backgroundColor: '#e5ecea',
  },
  select_container: {
    width: '86%',
    alignSelf: 'center',
    padding: 3,
    borderRadius: 5,
    marginBottom: 14,
    backgroundColor: '#e5ecea',
  },
  select_input: {
    width: '100%',
  },
  button: {
    alignSelf: 'center',
    width: 'fit-content',
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#78a7db',
  },
  button_text: {
    color: 'white',
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

