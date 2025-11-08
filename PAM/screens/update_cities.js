import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator, TextInput } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { DataTable } from "react-native-paper"; // biblioteca do seu link
import { useNavigation } from "@react-navigation/native";
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://yblzpzdqxvjrqdlfiwtf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibHpwemRxeHZqcnFkbGZpd3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MzUwNDcsImV4cCI6MjA3ODAxMTA0N30.k0m9ar3DL-VY6iKlr3_riSMUF69oFdpLUIPvbuLj9v4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function UpdateCitiesScreen({ route, navigation }) {
  //pega os parametros da tela anterior
  const { id } = route.params;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cityName, setCityName] = useState("");
  const [cityPopulation, setCityPopulation] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);

  // Carrega os países
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data, error } = await supabase
          .from("paises")
          .select("id_pais, nome");
        if (error) throw error;
        setCountries(data);
      }
      catch (err){
        Alert.alert("Erro", "Não foi possível carregar os países.");
      }
    };

    fetchCountries();
  }, []);

  // Carrega os dados da cidade específica
  useEffect(() => {
    const fetchCity = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("cidades")
          .select("nome, habitantes, id_pais")
          .eq("id_cidade", id)
          .single();

        if (error) throw error;

        setCityName(data.nome);
        setCityPopulation(String(data.habitantes));
        setSelectedCountry(String(data.id_pais));
      }
      catch (err) {
        console.error(err);
        Alert.alert("Erro", "Não foi possível carregar os dados da cidade.");
      }
      finally {
        setLoading(false);
      }
    };
    fetchCity();
  }, [id]);

  const onPressUpdate = async () => {
    if (!cityName.trim() || !cityPopulation.trim() || !selectedCountry) {
      Alert.alert("Atenção", "Preencha todos os campos antes de atualizar.");
      return;
    }

    try {
      setSaving(true);

      const { error } = await supabase
        .from("cidades")
        .update({
          nome: cityName.trim(),
          habitantes: Number(cityPopulation),
          id_pais: Number(selectedCountry),
        })
        .eq("id_cidade", id);

      if (error) throw error;

      Alert.alert("Sucesso", "Cidade atualizada com sucesso!", [
        { text: "OK", onPress: () => navigation.navigate("Cidades", {shouldRefresh: true, clearSelection: true}) },
      ]);
    }
    catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível atualizar a cidade.");
    }
    finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Carregando dados da cidade...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.form_container}>
        <Text style={styles.title}>Atualizar Cidade</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome da cidade"
          value={cityName}
          onChangeText={setCityName}
        />

        <TextInput
          style={styles.input}
          placeholder="População"
          keyboardType="numeric"
          value={cityPopulation}
          onChangeText={setCityPopulation}
        />

        <View style={styles.select_container}>
          <Picker
            selectedValue={selectedCountry}
            onValueChange={(value) => setSelectedCountry(value)}
            style={styles.select_container}
          >
            <Picker.Item label="Selecione um país..." value="" />
            {countries.map((p) => (
              <Picker.Item key={p.id_pais} label={p.nome} value={String(p.id_pais)} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity
          onPress={onPressUpdate}
          style={[styles.button, saving && styles.disabledButton]}
          disabled={saving}
        >
          <Text style={styles.button_text}>
            {saving ? "Salvando..." : "Atualizar cidade"}
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
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 14,
  },
  form_container: {
    width: '80%',
    height: 290,
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
  button: {
    alignSelf: 'center',
    width: 'fit-content',
    padding: 5,
    borderRadius: 4,
    backgroundColor: '#78a7db',
  },
  center: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
});



