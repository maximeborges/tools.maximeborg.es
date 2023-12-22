// import { Router } from 'preact-router';

// import { Header } from './components/header';

// // Code-splitting is automated for `routes` directory
// import Home from './routes/home';
// import Profile from './routes/profile';

// import style from './style/index.scss';

// export default function App() {
// 	this.state = {currentRoute: undefined};
// 	this.handleRoute = e => {
// 		this.setState({ currentRoute: e.url });
// 	}
//     return (
// 		<div id="app">
// 			<Header state={this.state.currentRoute} />
// 			<div id="wrapper">
// 				<Router onChange={this.handleRoute}>
// 					<Home path="/" title="Home" />
// 					<Converter path="/converter" title="Converter" />
// 					<Crypto path="/crypto" title="Crypto" />
// 					<Error default code="404" title="Error" />
// 				</Router>
// 			</div>
// 		</div>
//     );
// }

import './style';
import App from './components/app';

export default App;
