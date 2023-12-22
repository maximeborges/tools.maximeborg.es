import { h, Component } from 'preact';
import style from './style';

export default class Home extends Component {
	render() {
		return (
			<div class="home">
				<p>This site offers some tools for manipulating binary data. It's only using client-side Javascript functions.</p>
                <p>This site is fully static and doesn't send any data anywhere.<br />
                Have fun !</p>
			</div>
		);
	}
}
