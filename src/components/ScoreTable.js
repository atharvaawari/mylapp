// components/ScoreTable.js
import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

const ScoreTable = ({ title, data, visibleData, showAll, toggleShowMore }) => {
  
  // console.log("title",title);
  const renderScoreRow = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{title==="Score Board" ? `${index + 1}. ${item.Name}`: `${index+1}. ${item.name}`}</Text>
      <Text style={styles.cell}>{item.points}</Text>
    </View>
  );

  return (
    <View style={styles.tableContainer}>
      <Text style={styles.tableTitle}>{title}</Text>
      <View style={styles.header}>
        <Text style={styles.headerCell}>Name</Text>
        <Text style={styles.headerCell}>Points</Text>
      </View>
      <FlatList
        data={visibleData}
        renderItem={renderScoreRow}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button
        title={showAll ? "Show Less" : "Show More"}
        onPress={toggleShowMore}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    width: '100%',
    marginBottom: 20,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: "#000",
  },
});

export default ScoreTable;
