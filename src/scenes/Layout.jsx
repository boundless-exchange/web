import { BaseComponent, Header } from '../components';

export default class Layout extends BaseComponent {

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }

}
