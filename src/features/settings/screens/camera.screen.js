import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components/native";
import { View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { Text } from "../../../components/typography/text.component";

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;

export const CameraScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();

  const snap = async () => {
    const photoKey = "photo-" + user.uid;
    if (cameraRef) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        await AsyncStorage.setItem(photoKey, photo.uri);
        navigation.goBack();
      } catch (e) {
        console.log("error storing image", e);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <ProfileCamera
        ref={(camera) => (cameraRef.current = camera)}
        type={Camera.Constants.Type.front}
        ratio={"16:9"}
      >
        <TouchableOpacity onPress={snap}>
          <Ionicons name="camera" size={100} color="white" />
        </TouchableOpacity>
      </ProfileCamera>
    </>
  );
};
