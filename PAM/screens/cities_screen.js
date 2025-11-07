import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Picker, Alert, ActivityIndicator, ScrollView } from "react-native";
import { DataTable } from "react-native-paper"; // biblioteca do seu link
import { useNavigation } from "@react-navigation/native";
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://yblzpzdqxvjrqdlfiwtf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibHpwemRxeHZqcnFkbGZpd3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MzUwNDcsImV4cCI6MjA3ODAxMTA0N30.k0m9ar3DL-VY6iKlr3_riSMUF69oFdpLUIPvbuLj9v4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CitiesScreen({navigation}) {
  
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [cityOptions, setCityOptions] = useState([]); //array contendo a lista de paises do banco de dados
  const [cityInfo, setCityInfo] = useState(null);

  const changeSelected = (value) => {
    setSelectedCity(value); // value já vem como string do Picker
    const found = cityOptions.find((opt) => opt.value === value);
    setCityInfo(found ? found.info : null);
  };

  useEffect(() => {
    const fetchCities = async () => {
      const { data, error } = await supabase
        .from("cidades")
        .select(`
          id_cidade,
          nome,
          habitantes,
          paises ( nome )
        `); // ← pega o nome do país junto

      if (error) {
        console.error("Erro ao buscar cidades:", error);
      } else if (Array.isArray(data)) {
        const options = data.map((cidade) => ({
          label: cidade.nome,
          value: String(cidade.id_cidade),
          info: cidade,
        }));
        setCities(data);
        setCityOptions(options);
      }
      setLoading(false);
    };

    fetchCities();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Carregando cidades...</Text>
      </View>
    );
  }

  const addCity = () => {
    navigation.navigate("Form Cidade");
  };

  const handleEdit = (id) => {
    navigation.navigate("UpdateCity", { id });
  };

  const handleDelete = (id) => {
    Alert.alert("Confirmação", "Tem certeza que deseja excluir esta cidade?", [
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
        <Text style={styles.search_title}>Procure por uma cidade</Text>

        <Picker
          selectedValue={selectedCity}
          onValueChange={(value) => changeSelected(value)}
          style={styles.city_select}
        >
          <Picker.Item label="Selecione..." value={null} />
          {cityOptions.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>

        {cityInfo && (
          <View style={styles.result_container}>
            <Text style={styles.result_container_text}>
              Habitantes: {cityInfo.habitantes}
            </Text>
            <Text style={styles.result_container_text}>
              País: {cityInfo.paises?.nome || "Desconhecido"}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={addCity} style={styles.formLink}>
          <Text style={styles.formLinkText}>Adicionar cidade</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.table_container}>
        <Text style={styles.table_title}>Tabela de cidades</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.table_container}>
        <DataTable style={styles.table_container}>
          <DataTable.Header style={styles.table_header}>
            <DataTable.Title><Text style={styles.table_header_text}>Nome</Text></DataTable.Title>
            <DataTable.Title>Habitantes</DataTable.Title>
            <DataTable.Title>País</DataTable.Title>
          </DataTable.Header>

          {cities.map((item) => (
            <DataTable.Row key={item.id_cidade} style={styles.table_row}>
              <DataTable.Cell>{item.nome}</DataTable.Cell>
              <DataTable.Cell>{item.habitantes}</DataTable.Cell>
              <DataTable.Cell>
                {item.paises?.nome || "—"} {/* se não achar o país, mostra traço */}
              </DataTable.Cell>
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
    fontSize: '20px',
  },
  action_button: {
    backgroundColor: "#78a7db",
    borderRadius: 6,
    padding: 8,
  },
  action_buttons_container: {
    flexDirection: "row",
    gap: 4,
  },
  table_row: {
    height: '70px',
    width: '100%',
    padding: '10px',
  },
  buttonText: {
    color: "white",
    fontSize: 12,
  },
  city_select: {
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
