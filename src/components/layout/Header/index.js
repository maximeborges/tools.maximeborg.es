import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import Sidebar from '../Sidebar';
import style from './style';

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
				<header class={style.header}>
					<div class={style.title}>
						<h1>Tools</h1>
					</div>
					<div class={style.currentPageTitle}>
						<h1>{title}</h1>
					</div>
					<div class={style.menu} onclick={this.sidebarToggle}></div>
				</header>
				<Sidebar ref={sidebar => this.sidebar = sidebar} />/>
			</div>
		);
	}
}
