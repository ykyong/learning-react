import React from 'react';

import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      games:[],
      idx: 0
    };
    this.createNewGame = this.createNewGame.bind(this);
  }

  handleGameUpdate(){
    if(e.type==='play'){
      this.setState((state,props)=> ({GamesPlayed: state.gamesPlayed+1}));

    }
  }

  createNewGame(){
    console.log('Creating New Game');
    let game = <li key={this.state.idx}><Game/></li>;
    this.setState((state, props)=>{
      state.games.push(game);
      return {
        games: state.games,
        idx: state.idx +1
      };
    })
  }

  render(){
  return <div>
    <h1>Rock Paper Scissors with React</h1>
    <Stats gamesPlayed={this.state.gamesPlayed}
           gamesWon={this.state.gamesWon}
    />
    <ul>
      {this.state.games}
    </ul>
    <button onClick={this.createNewGame}>Create Game</button>
  </div>;
  }
}

class Stats extends React.Component {
  render(){

    let rate = this.props.gamesPlayed ? this.props.gamesWon/this.props.gamesPlayed : 0;
    let roundedRate = Math.round((rate*Number.EPSILON)*100)/100;
    return <div className='spaced'>
      <span>Games played: {this.props.gamesPlayed} | 
            Games Won: {this.props.gamesWon} | 
            Win rate: {roundedRate}</span>
    </div>
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      played: false,
      status: null,
      playerMove: null,
      opponentMove: null
    };

    this.rock = this.rock.bind(this);
    this.paper = this.paper.bind(this);
    this.scissor = this.scissor.bind(this);
    this.playerGame = this.playerGame.bind(this);
    //this.reset = this.reset.bind(this);
  }

  playerGame(playerMove){
    if (! this.state.played){
      let opponentMove = chooseRandomAction();
      let status = chooseWinner(playerMove,opponentMove);
      this.setState({
        played: true,
        status: status,
        playerMove: playerMove,
        opponentMove: opponentMove
      });
    } 
  }

  rock(){
    console.log("Rocks chosen");
    this.playerGame('Rock');
  }
  
  paper(){
    console.log("Paper chosen");
    this.playerGame('Paper');
  }
  
  scissor(){
    console.log("Scissor chosen");
    this.playerGame('Scissor');
  }

  render(){
    let stat = this.state.played ? this.state.status : '';
    let op = this.state.played ? this.state.opponentMove : '';
    return <div>
      <button onClick={this.rock}>Rock</button>
      <button onClick={this.paper}>Paper</button>
      <button onClick={this.scissor}>Scissor</button>
  <span> Game status: {stat}</span>
  <span> |  Computer choice: {op}</span>
    </div>;
  }
}

function chooseRandomAction() {
  let moves = ['Rock','Paper','Scissor'];
  let randNr = Math.floor(Math.random() * 3);
  let randMove = moves[randNr];
  return randMove;
}

function chooseWinner(playerMove,opponentMove) {
  if (playerMove === opponentMove){
    return 0;
  }
  if (playerMove === 'Rock') {
    if (opponentMove === 'Paper') return -1;
    if (opponentMove === 'Scissor') return 1;
  }
  if (playerMove === 'Paper') {
    if (opponentMove === 'Rock') return 1;
    if (opponentMove === 'Scissor') return -1;
  }  
  if (playerMove === 'Scissor') {
    if (opponentMove === 'Paper') return 1;
    if (opponentMove === 'Rock') return -1;
  }  
}


export default App;
