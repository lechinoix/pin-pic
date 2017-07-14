import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import ModalVideo from './ModalVideo';
import Home from 'src/routes/home';
import Meetups from 'src/routes/meetups';

// import Home from 'async!./home';
// import Profile from 'async!./profile';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpened: false,
      pictureUrl: ''
    };
  }

  /** Gets fired when the route changes.
   *  @param {Object} event    "change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  openModalVideo = () => {
    this.setState({ isModalOpened: true });
  };

  onTakePicture = (pictureUrl) => {
    this.setState({
      isModalOpened: false,
      pictureUrl
    });
  }

  render() {
    return (
      <div id="app">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href="https://code.getmdl.io/1.2.1/material.indigo-pink.min.css" />
        <ModalVideo
          isOpened={this.state.isModalOpened}
          onTakePicture={this.onTakePicture}
        />
        <Header />
        <Router onChange={this.handleRoute}>
          <Home
            openModalVideo={this.openModalVideo}
            pictureUrl={this.state.pictureUrl}
            path="/map/"
          />
          <Meetups path="/meetups/" />
        </Router>
      </div>
    );
  }
}
