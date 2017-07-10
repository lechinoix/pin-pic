import { h, Component } from 'preact';
import style from './style';
import Maps from 'src/components/maps';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<Maps />
			</div>
		);
	}
}
