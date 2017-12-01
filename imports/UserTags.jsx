import React, { Component } from 'react';

export default class UserTags extends Component {
  listTags() {
    return this.props.tags.map((tag) => (
      <span key={tag}>{tag}</span>
    ));
  }

  render() {
    if (this.props.tags === "Hidden") {
      return (<p>Tags Hidden</p>);
    }
    return (
      <div className="tagsContainer">
        <p>I would describe myself as:</p>
        <span className="userTags">{this.listTags()}</span>
      </div>
    );
  }
}