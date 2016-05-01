import { BaseComponent } from '../components';

export default class Splash extends BaseComponent {

  state = {}

  componentWillMount() {
    require.ensure(['../articles/worldBuilder/guide'], require => {
      this.setState({articles: require('../articles/worldBuilder/guide')});
    }, 'worldBuilder-guide');
  }

  render() {
    if (!this.state.articles) return <p>Loading</p>;

    return <this.state.articles.intro.default />;
  }

}
