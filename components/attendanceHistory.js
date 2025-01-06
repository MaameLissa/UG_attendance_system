import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const FeaturedJobCard = ({ job }) => {
  return (
    <View style={[styles.card, { backgroundColor: job.background }]}>
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
    padding: 16,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "flex-start",
    width: 260,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    top: -60,
    left: 60,
  },
  company: {
    fontSize: 16,
    color: "#FFF",
    top: -60,
    left: 60,
  },
  salary: {
    fontSize: 14,
    color: "#FFF",
    top: 12,
  },
  location: {
    fontSize: 14,
    color: "#FFF",
    top: -8,
    left: 130,
  },
});

export default FeaturedJobCard;
