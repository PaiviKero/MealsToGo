import React, { useState, useContext } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";

import { Text } from "../../../components/typography/text.component.js";
import { Spacer } from "../../../components/spacer/spacer.component.js";
import { AuthenticationContext } from "../../../services/authentication/authentication.context.js";
import {
  AccountBackground,
  AccountCover,
  AuthButton,
  LoginInput,
  ErrorContainer,
  Title,
  AccountContainer,
} from "../components/account.styles.js";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, isLoading, error } = useContext(AuthenticationContext);

  return (
    <AccountBackground>
      <AccountCover>
        <Title>Meals To Go</Title>
        <AccountContainer>
          <LoginInput
            label="Email"
            value={email}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          <Spacer size="large">
            <LoginInput
              label="Password"
              value={password}
              textContentType="password"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            />
          </Spacer>
          {error && (
            <ErrorContainer size="large">
              <Text variant="error">{error}</Text>
            </ErrorContainer>
          )}
          <Spacer size="large">
            {!isLoading ? (
              <AuthButton onPress={() => onLogin(email, password)}>
                Login
              </AuthButton>
            ) : (
              <ActivityIndicator animating={true} color={Colors.blue300} />
            )}
          </Spacer>
        </AccountContainer>
        <Spacer size="large">
          <AuthButton onPress={() => navigation.goBack()}>Back</AuthButton>
        </Spacer>
      </AccountCover>
    </AccountBackground>
  );
};
