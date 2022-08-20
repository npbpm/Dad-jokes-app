import React, { Component } from 'react'
import axios from 'axios'
import DadJoke from './DadJoke'
import './DadJokesList.css'
import uuid from 'react-uuid'
const API_URL = "https://icanhazdadjoke.com/"

class DadJokesList extends Component {
    static defaultProps = {
        NUM_JOKES: 10
    }

    constructor(props){
        super(props)
        this.state = {
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
            isLoading: false
        }
        this.fetchNewJokes = this.fetchNewJokes.bind(this)
        this.checkIfDoubles = this.checkIfDoubles.bind(this)
        this.handleVote = this.handleVote.bind(this)
    }

    componentDidMount() {
        if(this.state.jokes.length === 0){
            this.fetchNewJokes()
        }
    }

    async fetchNewJokes(){
        try{
        this.setState({ isLoading: true })
        let NewJokes = []
        for(let i = 0; i < this.props.NUM_JOKES; i++){
            let res = await axios.get(API_URL, {headers: { Accept: "application/json" }});
            NewJokes.push({joke: res.data.joke, evaluation: 0, id: uuid()})
        }

        this.setState({ 
            jokes: NewJokes,
            isLoading: false
        })
        this.checkIfDoubles()
        window.localStorage.setItem(
            "jokes",
            JSON.stringify(NewJokes)
        )
        } catch(e){
            alert(e)
        }
    }

    handleVote(id,vote){
        this.setState(st => ({
            jokes: st.jokes.map(elt => (
                elt.id === id ? {...elt, evaluation: elt.evaluation + vote} : elt
            ))
        }),
        () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        )
    }

    checkIfDoubles(){
        for (let index = 0; index < this.state.jokes.length; index++) {
            const phrase = this.state.jokes[index].joke;
            for (let j = index + 1; j < this.state.jokes.length; j++) {
                if(this.state.jokes[j].joke === phrase){
                    this.setState(st => ({
                        jokes: st.jokes.filter(elt => elt.text === this.state.jokes[j].text)
                    }))
                    axios.get(API_URL, {header: { Accept: "application/json" }}).then(joke => {
                        this.setState(st => ({ 
                            jokes: [...st.jokes, {joke: joke.data.text, evaluation: 0, id: uuid()}]
                        }))
                    });
                }
            }
        }
    }    

  render() {
     const DadJokes = this.state.jokes.sort((a,b) => b.evaluation - a.evaluation) 
     if(this.state.isLoading){
        return(
            <div>
                <div className='Loader'>
                    <span className='Loader-Emoji'>
                    😅
                    </span>
                </div>
                
                <h1>LOADING...</h1>
            </div>
        )
    }else{ 
        return (
            <div className='Jokes'>
              <span className='Menu'>
                  <h1>Dad <span  className='title'>Jokes</span></h1>
                  <div className='Menu-Emoji'>
                    <i className="em-svg em-stuck_out_tongue_closed_eyes" aria-label="FACE WITH STUCK-OUT TONGUE AND TIGHTLY-CLOSED EYES"></i>
                  </div>
                  <button className="button" onClick={this.fetchNewJokes}>New Jokes</button>
              </span>
              <span className='List'>
                  {DadJokes.map((obj,idx) => <DadJoke text={obj.joke} evaluation={obj.evaluation} key={obj.id} id={obj.id} upVote={() => this.handleVote(obj.id, 1)} downVote={() => this.handleVote(obj.id, -1)} />)}
              </span>
            </div>
          )
    }
  }
}

export default DadJokesList;