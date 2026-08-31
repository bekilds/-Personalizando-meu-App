import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  Image,
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

export default function JogosCriarScreen() {
  const [titulo, setTitulo] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [genero, setGenero] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [anoLancamento, setAnoLancamento] = useState("");
  const [desenvolvedora, setDesenvolvedora] = useState("");

  const [enviando, setEnviando] = useState(false);

  async function criarJogo() {
    if (
      !titulo.trim() ||
      !genero.trim() ||
      !plataforma.trim() ||
      !anoLancamento.trim() ||
      !desenvolvedora.trim()
    ) {
      Alert.alert(
        "Atenção",
        "Preencha todos os campos obrigatórios."
      );
      return;
    }

    const ano = Number(anoLancamento);

    if (isNaN(ano)) {
      Alert.alert(
        "Ano inválido",
        "Digite o ano de lançamento somente com números."
      );
      return;
    }

    try {
      setEnviando(true);

      const novoJogo = {
        title: titulo.trim(),
        imageUrl: imagemUrl.trim() || null,
        genero: genero.trim(),
        plataforma: plataforma.trim(),
        ano_lancamento: ano,
        desenvolvedora: desenvolvedora.trim(),
      };

      console.log("ENVIANDO PARA A API:");
      console.log(novoJogo);

      const resposta = await api.post(
        "/api/jogos",
        novoJogo
      );

      console.log("RESPOSTA DA API:");
      console.log(resposta.data);

      Alert.alert(
        "Jogo criado! 🎮",
        `${resposta.data.title} foi cadastrado com sucesso!`
      );

      setTitulo("");
      setImagemUrl("");
      setGenero("");
      setPlataforma("");
      setAnoLancamento("");
      setDesenvolvedora("");

    } catch (error) {
      console.log(
        "ERRO AO CRIAR JOGO:",
        error.response?.status
      );

      console.log(
        "DETALHES:",
        error.response?.data || error.message
      );

      Alert.alert(
        "Erro ao criar jogo",
        error.response?.data?.message ||
          "A API recusou o cadastro. Confira os campos e tente novamente."
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >

        <View style={styles.header}>
          <Text style={styles.tituloPagina}>
            🎮 Criar jogo
          </Text>

          <Text style={styles.subtitulo}>
            Cadastre um novo jogo
          </Text>
        </View>

        <View style={styles.formulario}>

          <Text style={styles.tituloFormulario}>
            ➕ Novo jogo
          </Text>

          
          <Text style={styles.label}>
            Título *
          </Text>

          <TextInput
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
            placeholder="Ex: Minecraft"
            placeholderTextColor="#94a3b8"
          />

          <Text style={styles.label}>
            URL da imagem
          </Text>

          <TextInput
            style={styles.input}
            value={imagemUrl}
            onChangeText={setImagemUrl}
            placeholder="Cole o link da imagem"
            placeholderTextColor="#94a3b8"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
          />

          {imagemUrl.trim() !== "" && (
            <View style={styles.previewContainer}>

              <Text style={styles.previewTitulo}>
                Prévia da imagem
              </Text>

              <Image
                source={{
                  uri: imagemUrl.trim(),
                }}
                style={styles.previewImagem}
                resizeMode="cover"
                onError={() =>
                  console.log(
                    "Erro ao carregar imagem"
                  )
                }
              />

            </View>
          )}

  
          <Text style={styles.secao}>
            🎮 Informações do jogo
          </Text>

          <Text style={styles.label}>
            Gênero *
          </Text>

          <TextInput
            style={styles.input}
            value={genero}
            onChangeText={setGenero}
            placeholder="Ex: Sandbox"
            placeholderTextColor="#94a3b8"
          />
          <Text style={styles.label}>
            Plataforma *
          </Text>

          <TextInput
            style={styles.input}
            value={plataforma}
            onChangeText={setPlataforma}
            placeholder="Ex: PlayStation"
            placeholderTextColor="#94a3b8"
          />
          <Text style={styles.label}>
            Ano de lançamento *
          </Text>

          <TextInput
            style={styles.input}
            value={anoLancamento}
            onChangeText={setAnoLancamento}
            placeholder="Ex: 2011"
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
          />
          <Text style={styles.label}>
            Desenvolvedora *
          </Text>

          <TextInput
            style={styles.input}
            value={desenvolvedora}
            onChangeText={setDesenvolvedora}
            placeholder="Ex: Mojang"
            placeholderTextColor="#94a3b8"
          />
          <Pressable
            style={[
              styles.botao,
              enviando && styles.botaoDesativado,
            ]}
            onPress={criarJogo}
            disabled={enviando}
          >
            {enviando ? (
              <>
                <ActivityIndicator
                  size="small"
                  color="#ffffff"
                />

                <Text style={styles.botaoTexto}>
                  Enviando...
                </Text>
              </>
            ) : (
              <Text style={styles.botaoTexto}>
                ➕ Criar jogo
              </Text>
            )}
          </Pressable>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fbff",
  },

  scroll: {
    flex: 1,
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
    marginTop: 4,
  },

  formulario: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 18,
    marginBottom: 25,

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  tituloFormulario: {
    fontSize: 20,
    fontWeight: "800",
    color: "#102542",
    marginBottom: 15,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    height: 46,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#102542",
    backgroundColor: "#f8fafc",
  },

  secao: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1565c0",
    marginTop: 20,
    marginBottom: 5,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },

  previewContainer: {
    marginTop: 15,
  },

  previewTitulo: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 8,
  },

  previewImagem: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    backgroundColor: "#e2e8f0",
  },

  botao: {
    backgroundColor: "#1565c0",
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 20,
  },

  botaoDesativado: {
    opacity: 0.6,
  },

  botaoTexto: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
});