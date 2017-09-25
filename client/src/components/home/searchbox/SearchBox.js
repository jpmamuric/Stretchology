import React, { Component } from 'react';

import './SearchBox.css';

class SearchBox extends Component {
  state = { text: '' }

  handleOnSubmit(e){
    e.preventDefault();
    this.setState({ text: '' });
  }

  handleOnChange(e){
    this.setState({ text: e.target.value });
  }

  render(){
    return (
      <form className='searchbox_container' onSubmit={e=>this.handleOnSubmit(e)}>
        <div>
          { /* place search icon here later */}
          <input
            ref='client'
            value={this.state.text}
            placeholder='enter a location' className='searchbox_input box_shadow'
            onChange={e=>this.handleOnChange(e)}/>
        </div>

      </form>
    )
  }
}

export default SearchBox;
