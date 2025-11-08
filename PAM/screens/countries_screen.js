import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { DataTable } from "react-native-paper"; // biblioteca do seu link
import { useNavigation } from "@react-navigation/native";
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://yblzpzdqxvjrqdlfiwtf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibHpwemRxeHZqcnFkbGZpd3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MzUwNDcsImV4cCI6MjA3ODAxMTA0N30.k0m9ar3DL-VY6iKlr3_riSMUF69oFdpLUIPvbuLj9v4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CountriesScreen() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]); //dados vindos do supabase dos países
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryOptions, setCountryOptions] = useState([]); //array para o picker
  const [countryInfo, setCountryInfo] = useState(null); //objeto do país selecionado
  const [deleting, setDeleting] = useState(false); //para monitorar quando estiver sendo deletado algum país

  useEffect(() => {
    //função de pegar as cidades do banco de dados (tanto para o seletor, quanto para a tabela)
    const fetchCountries = async () => {
      try {
        setLoading(true); //ativa o estado de carregando
        //faz o select do banco de dados
        const { data, error } = await supabase
          .from("paises")
          .select(`
            id_pais,
            nome,
            habitantes,
            idioma,
            continente
          `);

        //mostra isso caso tiver um erro (geralmente do banco de dados)
        if (error) {
          console.error("Erro ao buscar países:", error);
          Alert.alert("Erro", "Não foi possível buscar os países.");
          //limpa todas as constantes só por precaução
          setCountries([]);
          setCountryOptions([]);
          setCountryInfo(null);
          setSelectedCountry("");
          return;
        }

        const options = data.map((pais) => ({
          label: pais.nome,
          value: String(pais.id_pais),
          info: pais,
        }));

        setCountryOptions(options);
        setCountries(data);
      }
      //no final, para de mostrar o loading
      finally {
        setLoading(false);
      }
    };

    fetchCountries(); //roda a funçõa de em si (antes só estava definindo ela)
  }, []);

  //função para atualizar a cidade selecionada do picker
  const changeSelected = (value) => {
    setSelectedCountry(value);//mantém o ID como string
    if (!value) {
      setCountryInfo(null);
      return;
    }
    const found = countryOptions.find((opt) => opt.value === value);
    setCountryInfo(found ? found.info : null);
  };

  //funçõa do botão de adicionar cidade
  const addCountry = () => {
    navigation.navigate("Form País");
  };

  //função de editar o país
  const editCountry = () => {
    //avisa se não tiver país selecionado (mesmo com o botão desativado, só por segurança)
    if (!selectedCountry) {
      Alert.alert("Atenção", "Selecione um país primeiro.");
      return;
    }
    //caso tenha, vai para a tela de editar país, levando o id_pais para aquela tela
    const id_country = Number(selectedCountry);
    navigation.navigate("Editar País", { id: id_country });
  };

  const deleteCountry = (id) => {
    //se não tiver um id, cancela a ação (mesmo o botão estando desativado, só por segurança)
    if (!id) return;

    //caso tenha recebido um id, faz a confirmação
    Alert.alert("Confirmação", "Tem certeza que deseja excluir este país?", [
      {text: "Cancelar", style: "cancel" }, //caso ação seja cancelada, só valta
      //a partir daqui é para deletar o país
      {text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            setDeleting(true);
            //código sql para remover no banco
            const { error } = await supabase
              .from("paises")
              .delete()
              .eq("id_pais", id);
            
            //mostra isso caso tenha algum erro (geralmente do banco de dados)
            if (error) {
              console.error("Erro ao deletar país:", error);
              Alert.alert("Erro", "Não foi possível excluir o pais.");
              return;
            }

            //atualiza a tela para remover o país
            setCountries((prev) => prev.filter((c) => c.id_pais !== id));
            //atualiza também as opções do picker
            setCountryOptions((prev) => prev.filter((opt) => Number(opt.value) !== id));

            //limpa seleção se o país removito era o selecionado
            if (String(id) === selectedCountry) {
              setSelectedCountry("");
              setCountryInfo(null);
            }

            Alert.alert("Sucesso", "País excluído.");
          }
          //caso algum erro for detectado
          catch (err){
            console.error(err);
            Alert.alert("Erro", "Não foi possível excluir o país.");
          }
          finally {
            setDeleting(false);
          }
        },
      },
    ]);
  };


  //carregamento
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Carregando países...</Text>
      </View>
    );
  }

  return (
  <View style={styles.container}>

    <View style={styles.search_container}>
      <Text style={styles.search_title}>Procure por um país</Text>
      
      <View style={styles.picker_container}>
        {/* para selecionar uma cidade específica */}
        <Picker
          selectedValue={selectedCountry}
          onValueChange={changeSelected}
          style={styles.country_select}
        >
          <Picker.Item label="Selecione..." value="" />
          {countryOptions.map((option) => (
            <Picker.Item
              key={option.value} //a chave que vai ser passada caso a cidade seja editada ou deletada
              label={option.label} //o nome que aparece no input
              value={option.value} //o valor
            />
          ))}
        </Picker>
        
      </View>

      <View style={styles.result_container}>
        {/* caso exista um valor para o countryInfo diferente de nulo */}
        {countryInfo ? (
          <View style={styles.result_container}>
            <Text style={styles.result_container_text}>Habitantes: {countryInfo.habitantes}</Text>
            <Text style={styles.result_container_text}>Idioma: {countryInfo.idioma}</Text>
            <Text style={styles.result_container_text}>Continente: {countryInfo.continente}</Text>
          </View>
        ) : (
          <View style={styles.result_placeholder}>
            <Text>Selecione uma cidade para ver os detalhes.</Text>
          </View>
        )}
      </View>

      {/*botões para editar e excluir as cidades*/}
      <View style={styles.action_buttons_container}>
        <TouchableOpacity
          onPress={editCountry}
          style={[styles.action_button, !selectedCountry && styles.disabledButton]}
          disabled={!selectedCountry}
        >
          <Text style={styles.action_button_text}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => deleteCountry(Number(selectedCountry))}
          style={[styles.action_button, (!selectedCountry || deleting) && styles.disabledButton]}
          disabled={!selectedCountry || deleting}
        >
          <Text style={styles.action_button_text}>{deleting ? "Excluindo..." : "Excluir"}</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.linkContainer}>
      <TouchableOpacity onPress={addCountry} style={styles.formLink}>
        <Text style={styles.formLinkText}>Adicionar país</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.table_container}>
      <Text style={styles.table_title}>Tabela de países</Text>
      {/* tabela de cidades */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.table_scroll}>
        <DataTable>
          <DataTable.Header style={styles.table_header}>
            <DataTable.Title><Text style={styles.table_header_text}>Nome</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.table_header_text}>Habitantes</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.table_header_text}>Idioma</Text></DataTable.Title>
            <DataTable.Title><Text style={styles.table_header_text}>Continente</Text></DataTable.Title>
          </DataTable.Header>

          {countries.map((item) => (
            <DataTable.Row key={item.id_pais} style={styles.table_row}>
              <DataTable.Cell>{item.nome}</DataTable.Cell>
              <DataTable.Cell>{item.habitantes}</DataTable.Cell>
              <DataTable.Cell>{item.idioma}</DataTable.Cell>
              <DataTable.Cell>{item.continente}</DataTable.Cell>
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
    height: 330,
    backgroundColor: '#7cb0d9',
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  search_title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: '#2b2382',
  },
  linkContainer: {
    marginVertical: 20,
    width: "70%",
  },
  formLink: {
    backgroundColor: "#5e7bcc",
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
    flex: 1,
    width: "100%",
    backgroundColor: "#a5cfe8",
    paddingBottom: 20,
  },
  table_scroll: {
    paddingBottom: 20,
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
    marginBottom: 6,
  },
  country_select: {
    width: "100%",
  },
  result_container: {
    width: "90%",
    alignSelf: 'center',
    padding: 3,
    backgroundColor: "transparent",
    alignItems: "flex-start",
  },
  result_container_text: {
    alignSelf: 'center',
    textAlign: 'center',
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
    backgroundColor: "#5e7bcc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  /* para o botão desativado */
  disabledButton: {
    opacity: 0.5,
  },
  action_button_text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  center: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});


