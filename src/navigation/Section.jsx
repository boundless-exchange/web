import { BaseComponent, Layer } from '../components';

export default class Section extends BaseComponent {

  render() {
    return (
      <Layer>
        {this.props.title}
      </Layer>
    );
  }

}
