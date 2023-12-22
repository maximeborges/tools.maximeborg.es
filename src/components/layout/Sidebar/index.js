import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

export default class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {isOpen: false};
	}

	toggle(e) {
		if(this.state.isOpen) {
			this.base.className = this.base.className.split(' ' + style.open).join('');
			this.setState({isOpen: false});
		} else {
			this.base.className += " " + style.open;
			this.setState({isOpen: true});
		}
	}

	close() {
		if(this.state.isOpen) {
			this.base.className = this.base.className.split(' ' + style.open).join('');
			this.setState({isOpen: false});
		}
	}

	render() {
		return (
			<aside class="sidebar" >
				<nav>
					<Link activeClassName="active" href="/">Home</Link>
                    <Link activeClassName="active" href="/converter">Converter</Link>
					<Link activeClassName="active" href="/crypto">Crypto</Link>
				</nav>
			</aside>
		);
	}
}
