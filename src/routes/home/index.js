import { h, Component } from 'preact';
import style from './style';
import Maps from 'src/components/maps';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is not the Home component.</p>
				<div class={style.mapContainer}>
					<Maps />
				</div>
			</div>
		);
	}
}
