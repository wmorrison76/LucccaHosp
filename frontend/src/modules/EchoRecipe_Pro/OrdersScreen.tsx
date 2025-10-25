import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Card, Text, Button, Chip } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

export default function OrdersScreen({ navigation }: any) {
  const [orders, setOrders] = useState([
    {
      id: "po-001",
      supplier: "Sysco",
      amount: 118.0,
      status: "delivered",
      date: "2024-12-10",
    },
    {
      id: "po-002",
      supplier: "US Foods",
      amount: 520.0,
      status: "confirmed",
      date: "2024-12-12",
    },
  ]);
  const [filter, setFilter] = useState<"all" | "pending" | "delivered">("all");

  useFocusEffect(
    React.useCallback(() => {
      // Load orders
    }, []),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "#10b981";
      case "confirmed":
        return "#3b82f6";
      case "draft":
        return "#64748b";
      default:
        return "#f97316";
    }
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) =>
          filter === "pending" ? o.status !== "delivered" : o.status === "delivered",
        );

  const renderOrderCard = ({ item }: any) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.orderHeader}>
          <View>
            <Text variant="titleMedium">{item.supplier}</Text>
            <Text variant="bodySmall" style={styles.orderId}>
              {item.id}
            </Text>
          </View>
          <Text variant="titleMedium" style={styles.amount}>
            ${item.amount.toFixed(2)}
          </Text>
        </View>

        <View style={styles.orderDetails}>
          <Text variant="bodySmall" style={styles.date}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
          <Chip
            label={item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            style={{ backgroundColor: getStatusColor(item.status) }}
            textStyle={{ color: "#fff" }}
          />
        </View>
      </Card.Content>

      <Card.Actions>
        <Button mode="outlined" onPress={() => {}}>
          View Details
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Chip
          selected={filter === "all"}
          onPress={() => setFilter("all")}
          style={styles.chip}
        >
          All
        </Chip>
        <Chip
          selected={filter === "pending"}
          onPress={() => setFilter("pending")}
          style={styles.chip}
        >
          Pending
        </Chip>
        <Chip
          selected={filter === "delivered"}
          onPress={() => setFilter("delivered")}
          style={styles.chip}
        >
          Delivered
        </Chip>
      </View>

      <FlatList
        data={filteredOrders}
        renderItem={renderOrderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
      />

      <View style={styles.floatingButton}>
        <Button mode="contained" onPress={() => {}}>
          Create Order
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
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
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  orderId: {
    color: "#64748b",
    marginTop: 4,
  },
  amount: {
    color: "#10b981",
    fontWeight: "bold",
  },
  orderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    color: "#64748b",
  },
  floatingButton: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});
