import { Provider } from 'react-redux';

import store from './src/store';
import StackNavigator from './src/screens/stack-navigator/StackNavigator';

function App() {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
}

export default App;
