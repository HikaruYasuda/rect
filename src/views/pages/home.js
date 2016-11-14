import React from 'react'
import { connect } from 'react-redux'

export class Home extends React.Component {
  render() {
    return (
      <div className="g-row">
        welcome
      </div>
    );
  }
}

export default connect(state => ({}))(Home)
