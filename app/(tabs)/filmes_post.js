import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const API_KEY =
  "cv_i1izR2SmqXtbyEmzO0VSw2dAjIhfvihdBGmnQd4hdC-7VsNOBEzI6CD5SzXetcj_";

const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
    "Content-Type": "application/json",
  },
});

export default function FilmesPost() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [diretor, setDiretor] = useState("");
  const [duracaoMinutos, setDuracaoMinutos] = useState("");
  const [genero, setGenero] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function criarFilme() {
    if (!titulo.trim()) {
      Alert.alert("Atenção", "Digite o título do filme.");
      return;
    }

    if (!descricao.trim()) {
      Alert.alert("Atenção", "Digite a descrição do filme.");
      return;
    }

    if (!imagemUrl.trim()) {
      Alert.alert("Atenção", "Digite a URL da imagem.");
      return;
    }

    if (!diretor.trim()) {
      Alert.alert("Atenção", "Digite o diretor.");
      return;
    }

    if (!duracaoMinutos.trim()) {
      Alert.alert("Atenção", "Digite a duração do filme.");
      return;
    }

    if (!genero.trim()) {
      Alert.alert("Atenção", "Digite o gênero do filme.");
      return;
    }

    const duracao = Number(duracaoMinutos);

    if (isNaN(duracao) || duracao <= 0) {
      Alert.alert(
        "Atenção",
        "Digite uma duração válida."
      );
      return;
    }

    setEnviando(true);

    try {
      const novoFilme = {
        title: titulo.trim(),
        description: descricao.trim(),
        imageUrl: imagemUrl.trim(),
        diretor: diretor.trim(),
        duracao_minutos: duracao,
        genero: genero.trim(),
      };

      console.log("ENVIANDO FILME:");
      console.log(novoFilme);

      const resposta = await api.post(
        "/api/filmes",
        novoFilme
      );

      console.log("FILME CADASTRADO:");
      console.log(resposta.data);

      Alert.alert(
        "Sucesso! 🎬",
        `O filme "${titulo}" foi cadastrado.`
      );

      setTitulo("");
      setDescricao("");
      setImagemUrl("");
      setDiretor("");
      setDuracaoMinutos("");
      setGenero("");
    } catch (error) {
      console.log(
        "ERRO AO CADASTRAR FILME:",
        error.response?.data || error.message
      );

      if (error.response?.status === 400) {
        Alert.alert(
          "Erro 400",
          "Os dados enviados são inválidos."
        );
      } else if (error.response?.status === 401) {
        Alert.alert(
          "Erro 401",
          "A chave da API não foi aceita."
        );
      } else if (error.response?.status === 429) {
        Alert.alert(
          "Erro 429",
          "Limite de requisições atingido."
        );
      } else {
        Alert.alert(
          "Erro",
          "Não foi possível cadastrar o filme."
        );
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>
            🎬 Criar filme
          </Text>

          <Text style={styles.subtitulo}>
            POST /api/filmes
          </Text>
        </View>

        <Text style={styles.rotulo}>
          Título
        </Text>

        <TextInput
          style={styles.campo}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ex: As Branquelas"
          placeholderTextColor="#94a3b8"
        />

        <Text style={styles.rotulo}>
          Descrição
        </Text>

        <TextInput
          style={[
            styles.campo,
            styles.campoDescricao,
          ]}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Digite a descrição do filme"
          placeholderTextColor="#94a3b8"
          multiline
        />

        <Text style={styles.rotulo}>
          URL da imagem
        </Text>

        <TextInput
          style={styles.campo}
          value={imagemUrl}
          onChangeText={setImagemUrl}
          placeholder="https://exemplo.com/imagem.jpg"
          placeholderTextColor="#94a3b8"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.secao}>
          Informações do filme
        </Text>

        <Text style={styles.rotulo}>
          Diretor
        </Text>

        <TextInput
          style={styles.campo}
          value={diretor}
          onChangeText={setDiretor}
          placeholder="Ex: Keenen Ivory Wayans"
          placeholderTextColor="#94a3b8"
        />

        <Text style={styles.rotulo}>
          Duração em minutos
        </Text>

        <TextInput
          style={styles.campo}
          value={duracaoMinutos}
          onChangeText={setDuracaoMinutos}
          placeholder="Ex: 109"
          placeholderTextColor="#94a3b8"
          keyboardType="numeric"
        />

        <Text style={styles.rotulo}>
          Gênero
        </Text>

        <TextInput
          style={styles.campo}
          value={genero}
          onChangeText={setGenero}
          placeholder="Ex: Comédia"
          placeholderTextColor="#94a3b8"
        />

        <Pressable
          style={[
            styles.botao,
            enviando && styles.botaoDesativado,
          ]}
          onPress={criarFilme}
          disabled={enviando}
        >
          <Text style={styles.botaoTexto}>
            {enviando
              ? "Cadastrando..."
              : "Cadastrar filme"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fbff",
  },

  conteudo: {
    padding: 24,
    paddingBottom: 50,
  },

  header: {
    marginBottom: 18,
  },

  tituloPagina: {
    fontSize: 26,
    fontWeight: "800",
    color: "#102542",
  },

  subtitulo: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 3,
  },

  secao: {
    fontSize: 15,
    fontWeight: "700",
    color: "#102542",
    marginTop: 8,
    marginBottom: 10,
  },

  rotulo: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 5,
  },

  campo: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginBottom: 13,
    backgroundColor: "#fff",
    fontSize: 14,
    color: "#102542",
  },

  campoDescricao: {
    minHeight: 90,
    textAlignVertical: "top",
  },

  botao: {
    backgroundColor: "#1565c0",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },

  botaoDesativado: {
    opacity: 0.6,
  },

  botaoTexto: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});