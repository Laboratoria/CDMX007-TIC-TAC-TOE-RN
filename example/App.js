import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {MaterailCommunityIcons as Icon} from 'react-native-vector-icons';

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state={
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
    }
  }

  componentDidMount(){
    this.initializeGame();
  }

  initializeGame = () =>{
    this.setState({gameState:
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
  });
  }

  renderIcon = (row, col) => {
    var value= this.state.gameState[row][col];
    switch(value)
    {
      case 1: return <Icon name="close" style={styles.tileX}/>;
      case -1: return <Icon name="circle-outline" style={styles.tileO}/>;
      default: return <View/>
    }
  }

  render(){
    return (
      <View style={styles.container}>
  
        <View style={{flexDirection: "row", alignItems: "center", justifyContent:"center"}}>
          <View style={[styles.tile, {borderLeftWidth: 0, borderTopWidth: 0}]}>
            {this.renderIcon(0, 0)}
            </View>

          <View style={[styles.tile, {borderTopWidth: 0}]}>
            {this.renderIcon(0, 1)}
            </View>

          <View style={[styles.tile, {borderTopWidth: 0, borderRightWidth:0}]}>
          {this.renderIcon(0, 2)}
          </View>
        </View>
  
        <View style={{flexDirection: "row"}}>
        <View style={[styles.tile, {borderLeftWidth: 0}]}>
          {this.renderIcon(1, 0)}
          </View>

          <View style={[styles.tile, {}]}>
          {this.renderIcon(1, 1)}
          </View>

          <View style={[styles.tile, {borderRightWidth:0}]}>
          {this.renderIcon(1, 2)}
          </View>
          </View>
  
        <View style={{flexDirection: "row"}}>
        <View style={[styles.tile, {borderBottomWidth: 0, borderLeftWidth: 0}]}>
          {this.renderIcon(2, 0)}
          </View>

          <View style={[styles.tile, {borderBottomWidth: 0}]}>
          {this.renderIcon(2, 1)}
          </View>

          <View style={[styles.tile, {borderBottomWidth: 0, borderRightWidth:0}]}>
          {this.renderIcon(2, 2)}
          </View>
        </View>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tile:{
    borderWidth:5,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  }, 

  tileX:{
    color:"red",
    fontSize: 60,
  },

  tileO: {
    color:"green",
    fontSize: 60,
  }
});
