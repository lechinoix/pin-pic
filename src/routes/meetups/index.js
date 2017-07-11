import { h, Component } from 'preact';
import style from './style';
import { fetchMeetups } from 'src/service/Api';
import mdl from 'material-design-lite/material';
import { Button, List, ListItem } from 'preact-mdl';

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
				<div class={style.meetups__container}>
					<Button colored raised onClick={() => this.onFethMeetups()}>
						Fetch next Meetups
					</Button>
					<List>
					{
						this.state.meetups.map(({name}) => (
							<ListItem>{name}</ListItem>
						))
					}
					</List>
				</div>
			</div>
		);
	}
}
