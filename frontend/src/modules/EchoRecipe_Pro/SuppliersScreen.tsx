import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Searchbar, Card, Text, Button, Chip, ProgressBar } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

export default function SuppliersScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState<"reliability" | "price" | "quality">(
    "reliability",
  );

  const loadSuppliers = useCallback(async () => {
    setLoading(true);
    try {
      // Mock supplier data
      setSuppliers([
        {
          id: "sup-sysco",
          name: "Sysco Corporation",
          reliability: 0.965,
          quality: 4.7,
          price: 3.8,
          onTimePercent: 96.5,
        },
        {
          id: "sup-us-foods",
          name: "US Foods",
          reliability: 0.942,
          quality: 4.6,
          price: 3.9,
          onTimePercent: 94.2,
        },
        {
          id: "sup-gfs",
          name: "Gordon Food Service",
          reliability: 0.928,
          quality: 4.5,
          price: 3.6,
          onTimePercent: 92.8,
        },
      ]);
    } catch (error) {
      console.error("Error loading suppliers:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSuppliers();
    }, [loadSuppliers]),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadSuppliers();
    setRefreshing(false);
  }, [loadSuppliers]);

  const sortedSuppliers = [...suppliers].sort((a, b) => {
    switch (sortBy) {
      case "reliability":
        return b.reliability - a.reliability;
      case "quality":
        return b.quality - a.quality;
      case "price":
        return a.price - b.price;
      default:
        return 0;
    }
  });

  const renderSupplierCard = ({ item }: any) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.supplierName}>
          {item.name}
        </Text>

        <View style={styles.metricsContainer}>
          <View style={styles.metricRow}>
            <Text variant="labelSmall" style={styles.metricLabel}>
              On-Time Delivery
            </Text>
            <View style={styles.metricValue}>
              <ProgressBar
                progress={item.onTimePercent / 100}
                style={styles.progressBar}
              />
              <Text variant="bodySmall" style={styles.percentText}>
                {item.onTimePercent.toFixed(1)}%
              </Text>
            </View>
          </View>

          <View style={styles.metricRow}>
            <Text variant="labelSmall" style={styles.metricLabel}>
              Quality Score
            </Text>
            <Text variant="bodyMedium" style={styles.scoreValue}>
              {item.quality.toFixed(1)}/5
            </Text>
          </View>

          <View style={styles.metricRow}>
            <Text variant="labelSmall" style={styles.metricLabel}>
              Price Index
            </Text>
            <Text variant="bodyMedium" style={styles.scoreValue}>
              {item.price.toFixed(1)}/5
            </Text>
          </View>
        </View>
      </Card.Content>

      <Card.Actions>
        <Button mode="outlined" onPress={() => {}}>
          View Products
        </Button>
        <Button mode="contained" onPress={() => {}}>
          Create Order
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search suppliers..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>

      <View style={styles.filterContainer}>
        <Chip
          selected={sortBy === "reliability"}
          onPress={() => setSortBy("reliability")}
          style={styles.chip}
        >
          Reliability
        </Chip>
        <Chip
          selected={sortBy === "quality"}
          onPress={() => setSortBy("quality")}
          style={styles.chip}
        >
          Quality
        </Chip>
        <Chip
          selected={sortBy === "price"}
          onPress={() => setSortBy("price")}
          style={styles.chip}
        >
          Price
        </Chip>
      </View>

      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={sortedSuppliers}
          renderItem={renderSupplierCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
  supplierName: {
    fontWeight: "600",
    marginBottom: 16,
  },
  metricsContainer: {
    gap: 12,
  },
  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metricLabel: {
    color: "#64748b",
    flex: 0.4,
  },
  metricValue: {
    flex: 0.6,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  percentText: {
    minWidth: 40,
    textAlign: "right",
  },
  scoreValue: {
    fontWeight: "600",
    color: "#0ea5e9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
