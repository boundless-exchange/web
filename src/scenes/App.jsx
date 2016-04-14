import { Header } from '../components';

export default function App({children}) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
