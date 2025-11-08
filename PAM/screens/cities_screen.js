import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { DataTable } from "react-native-paper"; // biblioteca do seu link
import { useNavigation } from "@react-navigation/native";
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://yblzpzdqxvjrqdlfiwtf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibHpwemRxeHZqcnFkbGZpd3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MzUwNDcsImV4cCI6MjA3ODAxMTA0N30.k0m9ar3DL-VY6iKlr3_riSMUF69oFdpLUIPvbuLj9v4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CitiesScreen() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]); // dados vindos do supabase (cada item tem id_cidade, nome, habitantes, paises)
  const [selectedCity, setSelectedCity] = useState(""); // string vazia significa "nenhum selecionado"
  const [cityOptions, setCityOptions] = useState([]); // array para o Picker: { label, value, info }
  const [cityInfo, setCityInfo] = useState(null); // objeto da cidade selecionada (ou null)
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("cidades")
          .select(`
            id_cidade,
            nome,
            habitantes,
            id_pais,
            paises ( nome )
          `);

        if (error) {
          console.error("Erro ao buscar cidades:", error);
          Alert.alert("Erro", "Não foi possível buscar as cidades.");
          setCities([]);
          setCityOptions([]);
          setCityInfo(null);
          setSelectedCity("");
          return;
        }

        const options = (data || []).map((cidade) => ({
          label: cidade.nome,
          value: String(cidade.id_cidade),
          info: cidade,
        }));

        const formattedCities = (data || []).map(cidade => ({
          ...cidade,
          pais: cidade.paises?.nome || "—"
        }));

        setCities(formattedCities);
        setCityOptions(options);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const changeSelected = (value) => {
    setSelectedCity(value); // mantém o ID como string
    if (!value) {
      setCityInfo(null);
      return;
    }
    const found = cityOptions.find((opt) => opt.value === value);
    setCityInfo(found ? found.info : null);
  };

  const addCity = () => {
    navigation.navigate("Form Cidade");
  };

  const editCity = () => {
    if (!selectedCity) {
      Alert.alert("Atenção", "Selecione uma cidade primeiro.");
      return;
    }
    const id_city = Number(selectedCity);
    navigation.navigate("Editar Cidade", { id: id_city });
  };

  const deleteCity = (id) => {
    // id esperado numérico
    if (!id) return;
    Alert.alert("Confirmação", "Tem certeza que deseja excluir esta cidade?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            setDeleting(true);
            // remove no banco
            const { error } = await supabase
              .from("cidades")
              .delete()
              .eq("id_cidade", id);

            if (error) {
              console.error("Erro ao deletar cidade:", error);
              Alert.alert("Erro", "Não foi possível excluir a cidade.");
              return;
            }

            // atualiza estado local removendo a cidade
            setCities((prev) => prev.filter((c) => c.id_cidade !== id));

            // atualiza também as opções do picker
            setCityOptions((prev) => prev.filter((opt) => Number(opt.value) !== id));

            // limpa seleção se a cidade removida era a selecionada
            if (String(id) === selectedCity) {
              setSelectedCity("");
              setCityInfo(null);
            }

            Alert.alert("Sucesso", "Cidade excluída.");
          }
          catch (err){
            console.error(err);
            Alert.alert("Erro", "Não foi possível excluir a cidade.");
          }
          finally {
            setDeleting(false);
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Carregando cidades...</Text>
      </View>
    );
  }

  return (
  <View style={styles.container}>

    <View style={styles.search_container}>
      <Text style={styles.search_title}>Procure por uma cidade</Text>
      
      <View style={styles.picker_container}>
        <Picker
          selectedValue={selectedCity}
          onValueChange={changeSelected}
          style={styles.country_select}
        >
          <Picker.Item label="Selecione..." value="" />
          {cityOptions.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.result_container}>
        {cityInfo ? (
          <View style={styles.result_container}>
            <Text style={styles.result_container_text}>Habitantes: {cityInfo.habitantes}</Text>
            <Text style={styles.result_container_text}>País: {cityInfo.paises?.nome || "—"}</Text>
          </View>
        ) : (
          <View style={styles.result_placeholder}>
            <Text>Selecione uma cidade para ver os detalhes.</Text>
          </View>
        )}
      </View>

      <View style={styles.action_buttons_container}>
        <TouchableOpacity
          onPress={editCity}
          style={[styles.action_button, !selectedCity && styles.disabledButton]}
          disabled={!selectedCity}
        >
          <Text style={styles.action_button_text}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => deleteCity(Number(selectedCity))}
          style={[styles.action_button, (!selectedCity || deleting) && styles.disabledButton]}
          disabled={!selectedCity || deleting}
        >
          <Text style={styles.action_button_text}>{deleting ? "Excluindo..." : "Excluir"}</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.linkContainer}>
      <TouchableOpacity onPress={addCity} style={styles.formLink}>
        <Text style={styles.formLinkText}>Adicionar cidade</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.table_container}>
      <Text style={styles.table_title}>Tabela de cidades</Text>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.table_scroll}>
        <DataTable style={styles.table_inner}>
          <DataTable.Header style={styles.table_header}>
            <DataTable.Title><Text style={styles.table_header_text}>Nome</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.table_header_text}>Habitantes</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.table_header_text}>País</Text></DataTable.Title>
          </DataTable.Header>

          {cities.map((item) => (
            <DataTable.Row key={item.id_cidade} style={styles.table_row}>
              <DataTable.Cell>{item.nome}</DataTable.Cell>
              <DataTable.Cell>{item.habitantes}</DataTable.Cell>
              <DataTable.Cell>{item.pais}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </View>
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
    marginTop: 20,
    width: "90%",
    height: 300,
    backgroundColor: "#a5cfe8",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  search_title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#2b2b2b",
  },
  linkContainer: {
    marginVertical: 20,
    width: "70%",
  },
  formLink: {
    backgroundColor: "#78a7db",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
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
  },
  table_header: {
    height: 50,
    width: "100%",
    backgroundColor: "#d4e5f4",
    justifyContent: "center",
  },
  table_header_text: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#2b2b2b",
  },
  table_row: {
    height: 50,
    width: "100%",
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  picker_container: {
    width: "80%",
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  country_select: {
    width: "100%",
  },
  result_container: {
    width: "90%",
    alignSelf: 'center',
    padding: 8,
    borderRadius: 7,
    backgroundColor: "transparent",
    alignItems: "flex-start",
  },
  result_container_text: {
    fontSize: 18,
    color: "#2b2b2b",
    marginVertical: 2,
  },
  action_buttons_container: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 4,
    width: "50%",
    marginVertical: 10,
  },
  action_button: {
    backgroundColor: "#78a7db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  action_button_text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});


