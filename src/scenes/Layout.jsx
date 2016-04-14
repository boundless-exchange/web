import { Header } from '../components';

export default function Layout({children}) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
