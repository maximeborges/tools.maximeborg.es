import { h, Component, createElement } from 'preact';
import { Router } from 'preact-router';

import Header from './layout/Header';

import Home from './routes/Home';
import Crypto from 'async!./routes/Crypto';
import Converter from 'async!./routes/Converter';
import Error from 'async!./routes/Error';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	constructor(props) {
        super(props);
        this.state = {currentRoute: undefined};
    }

	handleRoute = e => {
		this.currentUrl = e.url;
		this.setState({currentRoute: e.current});
	};

	render() {
		return (
			<div id="app">
				<Header state={this.state.currentRoute} />
				<div id="wrapper">
					<Router onChange={this.handleRoute}>
						<Home path="/" title="Home" />
	                    <Converter path="/converter" title="Converter" />
	                    <Crypto path="/crypto" title="Crypto" />
						<Error default code="404" title="Error" />
					</Router>
				</div>
			</div>
		);
	}
}
