import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator, TextInput } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://yblzpzdqxvjrqdlfiwtf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibHpwemRxeHZqcnFkbGZpd3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MzUwNDcsImV4cCI6MjA3ODAxMTA0N30.k0m9ar3DL-VY6iKlr3_riSMUF69oFdpLUIPvbuLj9v4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function UpdateCountriesScreen({ route, navigation }) {
  //pega os parametros da tela anterior
  const { id } = route.params;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [countryName, setCountryName] = useState("");
  const [language, setLanguage] = useState("");
  const [countryPopulation, setCountryPopulation] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("");

  const continents = ["África", "América", "Ásia", "Europa", "Oceania"]; //lista de continentes

  //carrega os dados do país específico, para mostrar no input (baseado no id que veio da outra tela)
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true); //ativa o loading
        //comando sql
        const { data, error } = await supabase //esse await é só usado dentro de uma função async
          .from("paises")
          .select("nome, habitantes, idioma, continente")
          .eq("id_pais", id) //tipo o where do sql (pega o registo que tem o id_cidade igual o valor id)
          .single(); //espera apenas um resultado

        if (error) throw error; //caso tenha erro, ativa ele

        setCountryName(data.nome);
        setCountryPopulation(String(data.habitantes));
        setSelectedContinent(String(data.continente));
        setLanguage(String(data.idioma));
      }
      //se o erro tiver sido ativado, mostra aqui
      catch (err) {
        console.error(err);
        Alert.alert("Erro", "Não foi possível carregar os dados do país.");
      }
      finally {
        setLoading(false); //desativa o loading
      }
    };
    fetchCountry();
  }, [id]); //aqui define o parâmetro recebido da outra página

  //função de atualizar cidade
  const updateCountry = async () => {
    //vê se todos os campos foram preenchidos
    if (!countryName.trim() || !countryPopulation.trim() || !selectedContinent || !language.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos antes de atualizar."); //mostra um alert caso não
      return;
    }

    try {
      setSaving(true); //processo de salvar iniciado
      //comando sql de update
      const { error } = await supabase
        .from("paises")
        .update({
          nome: countryName.trim(),
          habitantes: Number(countryPopulation),
          idioma: language.trim(),
          continente: selectedContinent,
        })
        .eq("id_pais", id); //dar update nos dados acima no id pego da outra tela

      if (error) throw error;

      Alert.alert("Sucesso", "País atualizado com sucesso!", [
        { text: "OK", onPress: () => navigation.navigate("Países", {shouldRefresh: true, clearSelection: true}) }, //reinicia os valores da outra página
      ]);
    }
    //se houver, erro é mostrado aqui
    catch (err){
      console.error(err);
      Alert.alert("Erro", "Não foi possível atualizar o país.");
    }
    finally{
      setSaving(false); //no final, define que o salvamento acabou
    }
  };

  //mostrar o ícone de loading
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Carregando dados do país...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.form_container}>
        <Text style={styles.title}>Atualizar País</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite o nome do país"
          value={countryName}
          onChangeText={setCountryName}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite a população"
          keyboardType="numeric"
          value={countryPopulation}
          onChangeText={setCountryPopulation}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite o idioma"
          value={language}
          onChangeText={setLanguage}
        />

        <View style={styles.select_container}>
          <Picker
            selectedValue={selectedContinent}
            onValueChange={(value) => setSelectedContinent(value)}
            style={styles.country_select}
          >
            <Picker.Item label="Selecione um continente..." value="" />
            {continents.map((c) => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity
          onPress={updateCountry}
          style={[styles.button, saving && styles.disabledButton]}
          disabled={saving}
        >
          <Text style={styles.button_text}>
            {saving ? "Salvando..." : "Atualizar país"} {/*se estiver salvando, mostra "salvando...", senão "atualizar cidade"*/}
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
    height: 350,
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
  country_select: {
    width: '100%',
  },
  button: {
    alignSelf: 'center',
    width: 'fit-content',
    padding: 7,
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



