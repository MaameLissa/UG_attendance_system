import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const PopularJobCard = ({ job }) => {
  return (
    <View style={styles.card}>
      <Image source={job.image} style={styles.logo} />
      <View>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.company}>{job.company}</Text>
        <Text style={styles.salary}>{job.salary}</Text>
        <Text style={styles.location}>{job.location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  company: {
    fontSize: 16,
    color: "#888",
  },
  salary: {
    fontSize: 14,
    color: "#000",
    top: -40,
    left: 200,
  },
  location: {
    fontSize: 14,
    color: "#888",
    top: -40,
    left: 200,
  },
});

export default PopularJobCard;
