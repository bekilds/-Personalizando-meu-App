import { View, Text, StyleSheet, Image, ScrollView } from "react-native";


export default function App() {
  return (


    
    <View style={styles.container}>
      <Text style={styles.title}>Sobre mim!🌺</Text>
      <Text style={styles.subtitle}>
        Minha primeira interface em React Native
      </Text>

     <Image 
     source={require("../../assets/foto.png")} 
     style={styles.image}/>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quem eu sou</Text>
        <Text style={styles.cardContent}>Estudante de tecnologia focada em desenvolvimento mobile e criação de interfaces.</Text>
      </View>

<View style={styles.card}>
    <Text style={styles.cardTitle}>💻Minhas tecnologias</Text>
    <Text style={styles.cardContent}>JavaScript, React Native, HTML, CSS, Git e GitHub.

    </Text>

</View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcefff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4b0734",
  },
  subtitle: {
    fontSize: 14,
    color: "#85003e",
    marginTop: 8,
  },

  image: {
    width:150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "#85003e",
    marginBottom: 20,
  },

  card: {
    backgroundColor:" #ffffff",
    width: "85%",
    maxWidth: 420,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f2cbee",
    elevation: 2,
    shadowColor: "#4b0734",
    shadowOffset: { width: 0, height: 2},
    shadowopacity: 0.1,
    shadowradius: 4,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#510B3B",
    marginBottom: 6,
  },

cardContent: {
    fontSize: 14,
    color: "#85003e",
    lineHeight: 20,
},

  
});