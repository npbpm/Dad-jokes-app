import React, { Component } from 'react'
import './DadJoke.css'

class DadJoke extends Component {
  render() {
    return (
      <div className='DadJoke'>
        <span className='Evaluation'>
          <span onClick={this.props.downVote}>
            <i className='fas fa-thumbs-down'/>
          </span>
          <span className='Qualification' style={{borderColor: this.props.evaluation < -5 ? "black" :
              (this.props.evaluation < -2) ? "red" :
              (this.props.evaluation < 0) ? "orange" :
              this.props.evaluation === 0 ? "yellow" :
              (this.props.evaluation <= 2) ? "#d1e52c" :
              (this.props.evaluation <= 5) ? "#65c22f" :
              "🤣"}}>
              {this.props.evaluation}
          </span>
          <span onClick={this.props.upVote}>
            <i className='fas fa-thumbs-up'/>
          </span>
        </span>
        <span className='Text-Container'>
          <span className='Text'>
            {this.props.text}
          </span>
        </span>
        <span className='Emoji'>
            {this.props.evaluation < -5 ? "🤢 " :
              (this.props.evaluation < -2) ? "😖" :
              (this.props.evaluation < 0) ? "😕" :
              this.props.evaluation === 0 ? "😐" :
              (this.props.evaluation <= 2) ? "😃" :
              (this.props.evaluation <= 5) ? "😂" :
              "🤣"}
          </span>
      </div>
    )
  }
} 

export default DadJoke;