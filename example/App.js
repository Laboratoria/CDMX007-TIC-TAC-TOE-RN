import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Button, Text, Image, ImageBackground} from 'react-native';


export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
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

  initializeGame = () => {
    this.setState({gameState:
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ]
    });
  }

  //Returns 1 if Player1 won, -1 if Player 2 won, or a 0 if no one has won
  getWinner = () =>{
    const NUM_TILES = 3;
    var arr = this.state.gameState;
    var sum;

    //Check rows...
    for (var i = 0; i < NUM_TILES; i++){
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3){return 1;}
      else if (sum == -3){return -1;}
    }

    //Check columns..
    for (var i = 0; i < NUM_TILES; i++){
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3){ return 1; }
      else if (sum == -3){ return -1 ;}
    }

    //Check the diagonals...
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3){ return 1; }
    else if (sum == -3){ return -1; }
      
    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3){ return 1; }
    else if (sum == -3){return -1;}
    
    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3){ return 1; }
    else if (sum == -3){ return -1; }

    //There are no winners...
    return 0;
  }

  onTilePress = (row, col) => {
    //Don't allow tiles to change..
    var value=this.state.gameState[row][col];
    if (value !== 0) {return; }

    //Grab current player...
    var currentPlayer = this.state.currentPlayer;

    //Set the correct tile...
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});

    //Switch to other player...
    var nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({currentPlayer: nextPlayer})

    //Check for winners...
    var winner = this.getWinner();
    if (winner === 1){
      Alert.alert("The winner is Player 1");
      this.initializeGame();
    } else if(winner === -1){
      Alert.alert("The winer is Player 2");
      this.initializeGame();
    } else if(winner != -1 && winner ==7){
      Alert.alert("No one is winner");
      this.initializeGame();
  }
}

  onNewGamePress =() =>{
    this.initializeGame();
  }

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1: return <Image style={styles.tileX}
      source={require('./assets/iron_body.png')}/>;
      case -1: return <Image style={styles.tileO}
      source={require('./assets/captain_body.png')}/>;
      default: return <View />
    }
  }

  turnPlayer = () => {
    if(this.state.currentPlayer == 1) {
      return (
        <Image style={styles.tileX}
      source={require('./assets/iron_body.png')}/>
      )
    } else if (this.state.currentPlayer == -1) {
      return (
        <Image style={styles.tileO}
      source={require('./assets/captain_body.png')}/>
      )
    }
  }

  render() {
    return (
      <ImageBackground source={{uri:'https://i.pinimg.com/736x/7f/fc/36/7ffc367e9406b41be32a2ecf9b4fb109.jpg'}} style={{ flex: 1}}>
      <View style={styles.container}>

        <View>
          <Text style={styles.nextP}>
            Next turn:{this.turnPlayer()}
            </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity onPress={() => this.onTilePress(0, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(0, 1)} style={[styles.tile, { borderTopWidth: 0 }]}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(0, 2)} style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]}>
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.onTilePress(1, 0)} style={[styles.tile, { borderLeftWidth: 0 }]}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(1, 1)} style={[styles.tile, {}]}>
            {this.renderIcon(1, 1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(1, 2)} style={[styles.tile, { borderRightWidth: 0 }]}>
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.onTilePress(2, 0)} style={[styles.tile, { borderBottomWidth: 0, borderLeftWidth: 0 }]}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(2, 1)} style={[styles.tile, { borderBottomWidth: 0 }]}>
            {this.renderIcon(2, 1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onTilePress(2, 2)} style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>

        <View style={{paddingTop:50}}/>
        <Button title='New Game' onPress={this.onNewGamePress} />

      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, .5)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tile: {
    borderWidth: 5,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  tileX: {
    width: 50,
    height:50,
  },

  tileO: {
    width: 50,
    height:50,
  },

  nextP: {
    padding:20,
    alignItems: "center",
    fontSize: 25,
    fontWeight: 'bold',
    color:'#b22222',
  } 
  
});
