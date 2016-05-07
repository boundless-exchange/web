import { ArticleLoader } from '../components';
import { Heading } from '../components/Articles';
import NotFound from './NotFound';

export default class Articles extends ArticleLoader {

  render() {
    if (this.state.loading) return null;
    if (this.state.notFound) return <NotFound />;
    const page = this.state.pages[this.state.pageKey];
    if (!page) return <NotFound />;

    return (
      <section>
        <Heading level={0}>{page.metadata.title}</Heading>
        <page.default />
      </section>
    );
  }

}
