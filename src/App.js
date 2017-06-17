import React, {Component} from 'react';
import Login from './containers/login/login';
import AvailableVideos from './containers/avaiableVideos/availableVideos';

import "./App.scss";

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.displayName = 'views/App';
    this.state = {};
  }

  render() {
    return (
      <main role="main" data-display-name={this.displayName}>
          <Login>
              <div className="padded-container">
                  <h1>God's Light Foundation Course Videos</h1>
                  <AvailableVideos/>
              </div>
          </Login>
      </main>
    );
  }
}

export default App;
