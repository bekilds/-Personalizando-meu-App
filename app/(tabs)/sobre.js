import { View, Text, StyleSheet, Image, ScrollView, Pressable } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >

        {/* CABEÇALHO */}
        <View style={styles.header}>
          <Text style={styles.title}>Sobre Mim! 🌺</Text>

          <Text style={styles.subtitle}>
            Minha primeira interface em React Native 💗
          </Text>
        </View>

        {/* FOTO */}
        <Image
          source={require("../../assets/foto.png")}
          style={styles.image}
        />

        {/* CARD 1 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🌸 Quem eu sou</Text>

          <Text style={styles.cardContent}>
            Sou estudante de tecnologia, apaixonada por aprender coisas
            novas e criar interfaces bonitas e funcionais.
          </Text>
        </View>

        {/* CARD 2 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>💻 Minhas tecnologias</Text>

          <Text style={styles.cardContent}>
            JavaScript, React Native, HTML, CSS, Git e GitHub.
          </Text>
        </View>

        {/* BOTÕES */}
        <View style={styles.buttons}>

          <Pressable
            style={styles.buttonPrincipal}
            onPress={() => alert("Obrigada por visitar meu perfil! 💗")}
          >
            <Text style={styles.buttonPrincipalText}>
              💗 Conheça mais
            </Text>
          </Pressable>

          <Pressable
            style={styles.buttonOutline}
            onPress={() => alert("Tecnologias: React Native, JavaScript, HTML e CSS 💻")}
          >
            <Text style={styles.buttonOutlineText}>
              ✨ Minhas habilidades
            </Text>
          </Pressable>

        </View>

        {/* INFORMAÇÕES ADICIONAIS */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>
            🌷 Informações adicionais
          </Text>

          <Text style={styles.footerText}>
            Estou sempre buscando aprender, criar novos projetos e
            melhorar minhas habilidades na área de tecnologia. 💕
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  /* TELA INTEIRA */
  container: {
    flex: 1,
    backgroundColor: "#fff0f7",
  },

  scroll: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 40,
  },

  /* CABEÇALHO */
  header: {
    width: "100%",
    alignItems: "center",
    marginBottom: 22,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#8e245d",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#b64f83",
    marginTop: 8,
    textAlign: "center",
  },

  /* FOTO */
  image: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 5,
    borderColor: "#e68ab4",
    marginBottom: 25,
  },

  /* CARDS */
  card: {
    backgroundColor: "#ffffff",
    width: "100%",
    maxWidth: 500,
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,

    borderWidth: 1,
    borderColor: "#f4c5da",

    elevation: 4,

    shadowColor: "#8e245d",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#8e245d",
    marginBottom: 8,
  },

  cardContent: {
    fontSize: 15,
    color: "#6e3b55",
    lineHeight: 23,
  },

  /* BOTÕES */
  buttons: {
    width: "100%",
    maxWidth: 500,
    marginTop: 5,
    gap: 12,
  },

  /* BOTÃO ROSA PREENCHIDO */
  buttonPrincipal: {
    width: "100%",
    backgroundColor: "#d95b91",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",

    elevation: 4,

    shadowColor: "#8e245d",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  buttonPrincipalText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  /* BOTÃO ROSA CONTORNADO */
  buttonOutline: {
    width: "100%",
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",

    borderWidth: 2,
    borderColor: "#d95b91",
  },

  buttonOutlineText: {
    color: "#d95b91",
    fontSize: 16,
    fontWeight: "bold",
  },

  /* INFORMAÇÕES FINAIS */
  footer: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: "#ffe1ed",
    borderRadius: 20,
    padding: 18,
    marginTop: 22,
  },

  footerTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#8e245d",
    marginBottom: 7,
  },

  footerText: {
    fontSize: 14,
    color: "#6e3b55",
    lineHeight: 21,
  },

});