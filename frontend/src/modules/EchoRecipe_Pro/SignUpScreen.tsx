import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Button, TextInput, Text, useTheme } from "react-native-paper";
import { useAuth } from "../../client/context/AuthContext";

export default function SignUpScreen({ navigation }: any) {
  const { signUp, loading, error } = useAuth();
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [orgName, setOrgName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      return;
    }

    const success = await signUp(email, password, username, orgName);
    if (success) {
      // Navigation handled by auth context
    }
  };

  const isValid =
    email &&
    password &&
    confirmPassword &&
    username &&
    orgName &&
    password === confirmPassword;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text variant="displaySmall" style={styles.title}>
            Create Account
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Join Echo Recipe Pro
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            editable={!loading}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Organization Name"
            value={orgName}
            onChangeText={setOrgName}
            editable={!loading}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            editable={!loading}
            mode="outlined"
            style={styles.input}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />

          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            editable={!loading}
            mode="outlined"
            style={styles.input}
            right={
              <TextInput.Icon
                icon={showConfirmPassword ? "eye-off" : "eye"}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            }
          />

          {error && (
            <Text style={{ color: theme.colors.error, marginBottom: 12 }}>
              {error}
            </Text>
          )}

          {password !== confirmPassword && confirmPassword && (
            <Text style={{ color: theme.colors.error, marginBottom: 12 }}>
              Passwords do not match
            </Text>
          )}

          <Button
            mode="contained"
            onPress={handleSignUp}
            disabled={loading || !isValid}
            style={styles.button}
          >
            {loading ? <ActivityIndicator color="#fff" /> : "Create Account"}
          </Button>

          <View style={styles.footer}>
            <Text variant="bodySmall">Already have an account? </Text>
            <Button
              mode="text"
              onPress={() => navigation.navigate("Login")}
              disabled={loading}
              labelStyle={styles.linkLabel}
            >
              Sign In
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: "#64748b",
  },
  form: {
    gap: 16,
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
    paddingVertical: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
  },
  linkLabel: {
    fontSize: 14,
  },
});
