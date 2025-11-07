import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator, ScrollView, Picker } from "react-native";
import { DataTable } from "react-native-paper"; // biblioteca do seu link
import { useNavigation } from "@react-navigation/native";
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://yblzpzdqxvjrqdlfiwtf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibHpwemRxeHZqcnFkbGZpd3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MzUwNDcsImV4cCI6MjA3ODAxMTA0N30.k0m9ar3DL-VY6iKlr3_riSMUF69oFdpLUIPvbuLj9v4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CountriesScreen({navigation}) {
  
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryOptions, setCountryOptions] = useState([]); //array contendo a lista de paises do banco de dados
  const [countryInfo, setCountryInfo] = useState(null);

  const changeSelected = (country_id) => {
    setSelectedCountry(country_id);
    const selected = country_id ? countryOptions.find((p) => p.value === country_id) : null;
    setCountryInfo(selected ? selected.info : null);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      const { data, error } = await supabase
        .from("paises")
        .select("id_pais, nome, habitantes, continente, idioma");

      if (error) {
        console.error("Erro ao buscar países:", error);
      } else if (Array.isArray(data)) {
        const options = data.map((pais) => ({
          label: pais.nome,
          value: String(pais.id_pais),
          info: pais,
        }));
        setCountries(data);
        setCountryOptions(options);
      }
      setLoading(false);
    };

    fetchCountries();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Carregando países...</Text>
      </View>
    );
  }

  const addCountry = () => {
    navigation.navigate("Form País");
  };

  const handleEdit = (id) => {
    navigation.navigate("UpdateCity", { id });
  };

  const handleDelete = (id) => {
    Alert.alert("Confirmação", "Tem certeza que deseja excluir este país?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => {
          setCities(prev => prev.filter(city => city.id !== id));
        }
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.search_container}>
        <Text style={styles.search_title}>Procure por um país</Text>
        <Picker
          selectedValue={selectedCountry}
          onValueChange={(value) => changeSelected(value)}
          style={styles.country_select}
          >
          <Picker.Item label="Selecione..." value={null} /> 
            {countryOptions.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
                />
              ))}
        </Picker>

        {/* Só vai ser mostrado quando countryInfo existir */}
       {countryInfo && (
          <View style={styles.result_container}>
            <Text style={styles.result_container_text}>Habitantes: {countryInfo.habitantes}</Text>
            <Text style={styles.result_container_text}>Continente: {countryInfo.continente}</Text>
            <Text style={styles.result_container_text}>Idioma: {countryInfo.idioma}</Text>
          </View>
       )}
      </View>
      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={addCountry} style={styles.formLink}>
          <Text style={styles.formLinkText}>Adicionar país</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.table_container}>
        <Text style={styles.table_title}>Tabela de países</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.table_container}>
        <DataTable>
          <DataTable.Header style={styles.table_header}>
            <DataTable.Title>
              <Text style={styles.table_header_text}>Nome</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.table_header_text}>Habitantes</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.table_header_text}>Continente</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.table_header_text}>Idioma</Text>
            </DataTable.Title>
          </DataTable.Header>

          {countries.map((item) => (
            <DataTable.Row key={item.id_pais} style={styles.table_row}>
              <DataTable.Cell>{item.nome}</DataTable.Cell>
              <DataTable.Cell>{item.habitantes}</DataTable.Cell>
              <DataTable.Cell>{item.continente}</DataTable.Cell>
              <DataTable.Cell>{item.idioma}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e4e6",
    alignItems: "center",
  },
  search_container: {
    marginTop: '20px',
    height: '250px',
    width: '90%',
    backgroundColor: "#a5cfe8",
    borderRadius: '7px',
  },
  linkContainer: {
    marginVertical: 20,
  },
  formLink: {
    backgroundColor: "#78a7db",
    padding: 10,
    borderRadius: 8,
  },
  formLinkText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  table_container: {
    width: "100%",
    backgroundColor: "#a5cfe8",
  },
  table_title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#3576a1",
    textAlign: "center",
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  table_header: {
    height: '70px',
    width: '100%',
    backgroundColor: "#d4e5f4",
  },
  table_header_text: {
    marginTop: '10px',
    textAlign: 'center',
    fontSize: '20px',
  },
  table_row: {
    height: '70px',
    width: '100%',
    padding: '10px',
  },
  country_select: {
    margin: 'auto',
    width: '80%',
    padding: '7px',
    borderRadius: '5px',
  },
  result_container: {
    margin: 'auto',
    height: '50%',
    padding: '5px',
    borderRadius: '7px',
    backgroundColor: '#00000000',
  },
  result_container_text: {
    fontSize: '19px',
  },
  search_title: {
    fontSize: '20px',
    margin: 'auto',
    fontWeight: 'bold',
  },
});
