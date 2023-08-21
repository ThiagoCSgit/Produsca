import { View, Pressable, TouchableOpacity, Text, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";

import IconAD from "react-native-vector-icons/AntDesign";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./styles";

export default function adjustDistance({
  range,
  setRange,
  modalVisible,
  setModalVisible,
}) {
  return (
    <View style={{ gap: 10, paddingVertical: 15 }}>
      <LinearGradient
        colors={[
          "#f09c33",
          "#f59234",
          "#f98736",
          "#fd7b38",
          "#ff6e3c",
          "#ff5f41",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.buttonGradient}
      >
        <TouchableOpacity
          style={[styles.buttonRange, { opacity: modalVisible ? 0.4 : 1 }]}
          onPress={() => setModalVisible(true)}
        >
          <IconMCI style={styles.iconGPS} name="crosshairs-gps" size={25} />
          <Text style={styles.textButtonRange}>Ajustar distância</Text>
        </TouchableOpacity>
      </LinearGradient>
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.containerModal}>
          <Pressable
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <IconAD name="close" size={27} />
          </Pressable>
          <Text style={styles.rangeLabel}>
            Raio de alcance {"\n"} {range / 1000}km
          </Text>
          <Slider
            style={{ width: 250, height: 50 }}
            minimumValue={1000}
            maximumValue={10000}
            onValueChange={(value) => setRange(parseInt(value))}
            value={range}
            step={100}
            minimumTrackTintColor="#1E90FF"
            thumbTintColor="#1E90FF"
          />
        </View>
      </Modal>
    </View>
  );
}
