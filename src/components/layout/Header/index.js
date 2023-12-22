import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import Sidebar from '../Sidebar';
import style from './style.scss';

export default class Header extends Component {
	constructor(props) {
        super(props);
		this.state = {isMenuOpen: false};
	}

	sidebarToggle = (e) => {
		this.sidebar.toggle(e);
	}

    componentWillReceiveProps = (nextProps) => {
        this.sidebar.close();
    }

	render({ state }) {
		let title = state && state.attributes ? state.attributes.title : null;

		return (
			<div style="height:0">
				<header class="header">
					<div class="title">
						<h1>Tools</h1>
					</div>
					<div class="currentPageTitle">
						<h1>{title}</h1>
					</div>
					<div class="menu" onclick={this.sidebarToggle}></div>
				</header>
				<Sidebar ref={sidebar => this.sidebar = sidebar} />
			</div>
		);
	}
}
