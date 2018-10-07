import { Dispatcher } from 'flux';

const AppDispatcher = new Dispatcher();

AppDispatcher.register((payload) => {
    console.log(payload);
})

export default AppDispatcher;