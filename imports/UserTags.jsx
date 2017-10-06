import React, { Component } from 'react';

export default class UserTags extends Component {
  // temporary user tag list
  static defaultProps = {
    tags: [
      'Adventurous',
      'Extrovert',
      'Well-Organized',
      'Friendly',
      'Athletic',
      'Dynamic',
      'Reliable'
    ],
  }

  listTags() {
    return this.props.tags.map((tag) => (
      <span key={tag}>{tag}</span>
    ));
  }

  render() {
    return(
      <div className="tagsContainer">
        <p>I would describe myself as:</p>
        <span className="userTags">{this.listTags()}</span>
      </div>
    );
  }
}