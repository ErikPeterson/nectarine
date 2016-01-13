import { h, Component } from 'preact';
import { Layout } from 'preact-mdl';
import LoadingScreen from './loading-screen';
import Header from './header';
import Sidebar from './sidebar';
import Create from './create';
import Main from './main';
import Login from './login';
import peach from '../peach';

class LoggedIn extends Component {
	shouldComponentUpdate() {
		return false;
	}
	render() {
		return (
			<Layout fixed-header={true} js={false}>
				<Create />
				<Sidebar />
				<Header />
				<Main />
			</Layout>
		);
	}
}

export default class App extends Component {
	state = {
		pending: true,
		loggedin: false
	};

	componentDidMount() {
		peach.init( () => this.setState({ pending:false }) );
		peach.on('login', () => this.setState({ loggedin:true }) );
		peach.on('logout', () => this.setState({ loggedin:false }) );
	}

	render({}, { pending, loggedin }) {
		return (
			<div id="app">
				{ pending ? (
					<LoadingScreen />
				) : loggedin ? (
					<LoggedIn />
				) : (
					<Login />
				) }
			</div>
		);

		/*
			<div id="app">
				{ loggedin ? (
					<main class="content has-header">
						<Router onChange={this.onRoute}>
							<Stream path="/stream/:id" />
							<Profile />
							<Settings />
						</Router>
					</main>
				) : (
					<main class="content">
						<Login />
					</main>
				) }
			</div>
		*/
	}
}
