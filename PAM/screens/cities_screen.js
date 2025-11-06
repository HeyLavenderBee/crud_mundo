import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, ActivityIndicator, ScrollView } from "react-native";
import { DataTable } from "react-native-paper"; // biblioteca do seu link
import { useNavigation } from "@react-navigation/native";
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://yblzpzdqxvjrqdlfiwtf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibHpwemRxeHZqcnFkbGZpd3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MzUwNDcsImV4cCI6MjA3ODAxMTA0N30.k0m9ar3DL-VY6iKlr3_riSMUF69oFdpLUIPvbuLj9v4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CitiesScreen({navigation}) {
  
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);

  // Simulando conexão ao banco (você pode trocar por fetch no seu PHP futuramente)
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("cidades")
        .select(`
          id_cidade,
          nome,
          habitantes,
          paises ( nome )
        `);

      if (error) {
        console.error("Erro ao buscar cidades:", error);
      } else {
        // Mapeia os dados para deixar mais fácil de renderizar
        const formatted = data.map((item) => ({
          id_cidade: item.id_cidade,
          nome: item.nome,
          habitantes: item.habitantes,
          pais: item.paises?.nome || "—",
        }));

        setCities(formatted);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Carregando cidades...</Text>
      </View>
    );
  }

  const handleAddCity = () => {
    navigation.navigate("FormCity");
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
      <Text style={styles.header}>Gerenciamento de Cidades</Text>

      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={handleAddCity} style={styles.formLink}>
          <Text style={styles.formLinkText}>Adicionar cidade</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.table_container}>
        <Text style={styles.table_title}>Tabela de cidades</Text>
      </View>

      <ScrollView>
        <DataTable>
          <DataTable.Header style={styles.table_header}>
            <DataTable.Title>Nome</DataTable.Title>
            <DataTable.Title>Habitantes</DataTable.Title>
            <DataTable.Title>País</DataTable.Title>
            <DataTable.Title>Ações</DataTable.Title>
          </DataTable.Header>

          {cities.map((item) => (
            <DataTable.Row key={item.id_cidade} style={styles.table_row}>
              <DataTable.Cell>{item.nome}</DataTable.Cell>
              <DataTable.Cell>{item.habitantes}</DataTable.Cell>
              <DataTable.Cell>{item.pais}</DataTable.Cell>
              <DataTable.Cell>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    onPress={() => handleEdit(item.id_cidade)}
                    style={styles.tableButton}
                  >
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(item.id_cidade)}
                    style={styles.tableButton}
                  >
                    <Text style={styles.buttonText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
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
  header: {
    backgroundColor: "#3576a1",
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    paddingVertical: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 10,
    marginLeft: 10,
  },
  backText: {
    color: "#3576a1",
    fontWeight: "bold",
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
    width: "95%",
    backgroundColor: "#a5cfe8",
    borderRadius: 10,
    padding: 10,
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
    backgroundColor: "#d4e5f4",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 4,
  },
  tableButton: {
    backgroundColor: "#78a7db",
    borderRadius: 6,
    padding: 4,
  },
  table_row: {
    height: '23px',
  },
  buttonText: {
    color: "white",
    fontSize: 12,
  },
});
