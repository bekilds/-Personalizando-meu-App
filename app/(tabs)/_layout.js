import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        tabBarActiveTintColor: "#0f62fe",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          headerTitle: "Projeto Base",
        }}
      />

      <Tabs.Screen
        name="aulas"
        options={{
          title: "Aulas",
          headerTitle: "Conteúdo",
        }}
      />

      <Tabs.Screen
        name="api"
        options={{
          title: "API",
          headerTitle: "Conteúdo - API",
        }}
      />

      <Tabs.Screen
        name="post"
        options={{
          title: "POST",
          headerTitle: "Conteúdo - POST",
        }}
      />

      <Tabs.Screen
        name="sobre"
        options={{
          title: "Sobre",
          headerTitle: "Sobre",
        }}
      />

      <Tabs.Screen
        name="exemplo"
        options={{
          title: "Exemplo",
          headerTitle: "Exemplo",
        }}
      />

      <Tabs.Screen
        name="interface"
        options={{
          title: "Interface",
          headerTitle: "Interface",
        }}
      />

      <Tabs.Screen
        name="delete"
        options={{
          title: "delete",
          headerTitle: "delete",
        }}
      />
    </Tabs>
  );
}