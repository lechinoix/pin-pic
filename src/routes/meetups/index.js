import { h, Component } from 'preact';
import style from './style';
import { fetchMeetups } from 'src/service/Api';

export default class Meetups extends Component {
	constructor(props) {
		super(props);
		this.state = {
			meetups: [],
		}
	}
	onFethMeetups = () => {
		fetchMeetups()
		.then(meetups => this.setState({ meetups }));
	}

	render() {
		return (
			<div class={style.meetups}>
				<button onClick={() => this.onFethMeetups()}>
					Fetch next Meetups
				</button>
				{
					this.state.meetups.map(({name}) =>(
						<div>
							<div>{name}</div>
							<hr />
						</div>
					))
				}
			</div>
		);
	}
}
