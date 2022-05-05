import React from "react";
import LottieView from "lottie-react-native";

import { Spacer } from "../../../components/spacer/spacer.component.js";

import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  Title,
  AnimationWrapper,
} from "../components/account.styles.js";

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AnimationWrapper>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../../assets/watermelon.json")}
        />
      </AnimationWrapper>
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
