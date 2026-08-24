import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

const API_KEY =
  "cv_i1izR2SmqXtbyEmzO0VSw2dAjIhfvihdBGmnQd4hdC-7VsNOBEzI6CD5SzXetcj_";

const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});

export default function FilmesListar() {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function buscarFilmes() {
    try {
      setCarregando(true);
      setErro("");

      const resposta = await api.get("/api/filmes", {
        params: {
          limit: 30,
          page: 1,
        },
      });

      console.log("RESPOSTA COMPLETA:");
      console.log(resposta.data);

      // Descobre onde a API colocou a lista
      let lista = [];

      if (Array.isArray(resposta.data)) {
        lista = resposta.data;
      } else if (Array.isArray(resposta.data?.data)) {
        lista = resposta.data.data;
      } else if (Array.isArray(resposta.data?.filmes)) {
        lista = resposta.data.filmes;
      } else if (Array.isArray(resposta.data?.results)) {
        lista = resposta.data.results;
      }

      console.log("FILMES ENCONTRADOS:");
      console.log(lista);

      setFilmes(lista);
    } catch (error) {
      console.log(
        "ERRO AO BUSCAR FILMES:",
        error.response?.data || error.message
      );

      if (error.response?.status === 401) {
        setErro("Erro 401: chave da API inválida.");
      } else if (error.response?.status === 404) {
        setErro("Erro 404: rota de filmes não encontrada.");
      } else if (error.response?.status === 429) {
        setErro("Erro 429: limite de requisições atingido.");
      } else {
        setErro("Não foi possível carregar os filmes.");
      }
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarFilmes();
  }, []);

  function imagemFilme(url) {
    if (!url) {
      return null;
    }

    if (
      url.startsWith("http://") ||
      url.startsWith("https://")
    ) {
      return url;
    }

    return `https://api-ds.codeverse.dev.br${url}`;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>
            🎬 Filmes
          </Text>

          <Text style={styles.subtitulo}>
            Filmes cadastrados
          </Text>
        </View>

        {carregando && (
          <View style={styles.carregando}>
            <ActivityIndicator
              size="large"
              color="#1565c0"
            />

            <Text style={styles.textoCarregando}>
              Carregando filmes...
            </Text>
          </View>
        )}

        {!carregando && erro !== "" && (
          <View style={styles.erroContainer}>
            <Text style={styles.iconeErro}>
              ⚠️
            </Text>

            <Text style={styles.erro}>
              {erro}
            </Text>

            <Pressable
              style={styles.botaoTentar}
              onPress={buscarFilmes}
            >
              <Text style={styles.botaoTentarTexto}>
                Tentar novamente
              </Text>
            </Pressable>
          </View>
        )}

        {!carregando &&
          erro === "" &&
          filmes.map((filme, index) => {
            const imagem = imagemFilme(
              filme.imageUrl
            );

            return (
              <View
                key={filme.id || index}
                style={styles.card}
              >
                {imagem ? (
                  <Image
                    source={{ uri: imagem }}
                    style={styles.imagem}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.semImagem}>
                    <Text style={styles.semImagemTexto}>
                      🎬
                    </Text>
                  </View>
                )}

                <View style={styles.info}>
                  <Text style={styles.numero}>
                    Filme #{index + 1}
                  </Text>

                  <Text
                    style={styles.titulo}
                    numberOfLines={2}
                  >
                    {filme.title || "Sem título"}
                  </Text>

                  <Text
                    style={styles.descricao}
                    numberOfLines={3}
                  >
                    {filme.description ||
                      "Sem descrição"}
                  </Text>

                  <Text style={styles.informacao}>
                    🎥 {filme.diretor || "Diretor não informado"}
                  </Text>

                  <Text style={styles.informacao}>
                    🎭 {filme.genero || "Gênero não informado"}
                  </Text>

                  <Text style={styles.informacao}>
                    ⏱️{" "}
                    {filme.duracao_minutos ||
                      "Não informado"}{" "}
                    minutos
                  </Text>
                </View>
              </View>
            );
          })}

        {!carregando &&
          erro === "" &&
          filmes.length === 0 && (
            <View style={styles.vazio}>
              <Text style={styles.vazioEmoji}>
                🎬
              </Text>

              <Text style={styles.semFilmes}>
                Nenhum filme encontrado.
              </Text>

              <Pressable
                style={styles.botaoTentar}
                onPress={buscarFilmes}
              >
                <Text style={styles.botaoTentarTexto}>
                  Atualizar
                </Text>
              </Pressable>
            </View>
          )}
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
    marginBottom: 20,
  },

  tituloPagina: {
    fontSize: 28,
    fontWeight: "800",
    color: "#102542",
  },

  subtitulo: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
  },

  carregando: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },

  textoCarregando: {
    marginTop: 12,
    fontSize: 14,
    color: "#64748b",
  },

  erroContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    paddingHorizontal: 20,
  },

  iconeErro: {
    fontSize: 40,
    marginBottom: 10,
  },

  erro: {
    color: "#c62828",
    textAlign: "center",
    fontSize: 15,
    lineHeight: 22,
  },

  botaoTentar: {
    marginTop: 16,
    backgroundColor: "#1565c0",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 9,
    alignItems: "center",
  },

  botaoTentarTexto: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  imagem: {
    width: 110,
    height: 150,
    backgroundColor: "#e2e8f0",
  },

  semImagem: {
    width: 110,
    height: 150,
    backgroundColor: "#e2e8f0",
    alignItems: "center",
    justifyContent: "center",
  },

  semImagemTexto: {
    fontSize: 35,
  },

  info: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },

  numero: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1565c0",
    marginBottom: 4,
  },

  titulo: {
    fontSize: 18,
    fontWeight: "800",
    color: "#102542",
  },

  descricao: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 6,
    lineHeight: 17,
  },

  informacao: {
    fontSize: 12,
    color: "#475569",
    marginTop: 5,
  },

  vazio: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },

  vazioEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },

  semFilmes: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 15,
  },
});