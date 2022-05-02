import React from "react";

import { Spacer } from "../../../components/spacer/spacer.component.js";

import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  Title,
} from "../components/account.styles.js";

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover>
        <Title>Meals To Go</Title>
        <AccountContainer>
          <AuthButton onPress={() => navigation.navigate("Login")}>
            Login
          </AuthButton>
          <Spacer size="large">
            <AuthButton onPress={() => navigation.navigate("Register")}>
              Registration
            </AuthButton>
          </Spacer>
        </AccountContainer>
      </AccountCover>
    </AccountBackground>
  );
};
