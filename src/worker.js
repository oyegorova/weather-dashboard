

export default () => {
    self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
        if (!e) return;

        let value = 0;

        const getOutsideTemperature = () => {

        }

        const getCenterRoomTemperature = () => {

        }

        const getNearWindowTemperature = () => {

        }

        switch (e.data) {
            case 'outside':
                getOutsideTemperature();
                break;
            case 'centerRoom':
                getCenterRoomTemperature();
                break;
            case 'nearWindow':
                getNearWindowTemperature();
                break;
            default: break;
        }

        postMessage(value);
    })
}
