import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Searchbar, Card, Text, Button, Chip } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

export default function RecipesScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<"all" | "favorites" | "recently-used">("all");

  const loadRecipes = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch recipes from backend
      // const data = await api.getRecipes(searchQuery, filter);
      // setRecipes(data);

      // Mock data
      setRecipes([
        {
          id: "1",
          name: "Pan-Seared Scallops",
          cost: 46.34,
          price: 65.0,
          margin: 28.7,
        },
        {
          id: "2",
          name: "Herb-Roasted Chicken",
          cost: 39.22,
          price: 32.0,
          margin: 22.4,
        },
        {
          id: "3",
          name: "Grilled Vegetables",
          cost: 8.5,
          price: 18.0,
          margin: 52.8,
        },
      ]);
    } catch (error) {
      console.error("Error loading recipes:", error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, filter]);

  useFocusEffect(
    useCallback(() => {
      loadRecipes();
    }, [loadRecipes]),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadRecipes();
    setRefreshing(false);
  }, [loadRecipes]);

  const renderRecipeCard = ({ item }: any) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.recipeName}>
          {item.name}
        </Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text variant="labelSmall" style={styles.statLabel}>
              Cost
            </Text>
            <Text variant="bodyMedium" style={styles.statValue}>
              ${item.cost.toFixed(2)}
            </Text>
          </View>
          <View style={styles.stat}>
            <Text variant="labelSmall" style={styles.statLabel}>
              Price
            </Text>
            <Text variant="bodyMedium" style={styles.statValue}>
              ${item.price.toFixed(2)}
            </Text>
          </View>
          <View style={styles.stat}>
            <Text variant="labelSmall" style={styles.statLabel}>
              Margin
            </Text>
            <Text
              variant="bodyMedium"
              style={[
                styles.statValue,
                { color: item.margin >= 30 ? "#10b981" : "#ef4444" },
              ]}
            >
              {item.margin.toFixed(1)}%
            </Text>
          </View>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("RecipeDetail", { id: item.id })}
        >
          View Details
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search recipes..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>

      <View style={styles.filterContainer}>
        <Chip
          selected={filter === "all"}
          onPress={() => setFilter("all")}
          style={styles.chip}
        >
          All
        </Chip>
        <Chip
          selected={filter === "favorites"}
          onPress={() => setFilter("favorites")}
          style={styles.chip}
        >
          Favorites
        </Chip>
        <Chip
          selected={filter === "recently-used"}
          onPress={() => setFilter("recently-used")}
          style={styles.chip}
        >
          Recent
        </Chip>
      </View>

      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={recipes}
          renderItem={renderRecipeCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text variant="bodyMedium" style={styles.emptyText}>
                No recipes found
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  searchbar: {
    elevation: 0,
    backgroundColor: "#f1f5f9",
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    gap: 8,
  },
  chip: {
    backgroundColor: "#f1f5f9",
  },
  listContent: {
    padding: 12,
    gap: 12,
  },
  card: {
    marginBottom: 4,
  },
  recipeName: {
    fontWeight: "600",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  stat: {
    alignItems: "center",
  },
  statLabel: {
    color: "#64748b",
    marginBottom: 4,
  },
  statValue: {
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    color: "#64748b",
  },
});
