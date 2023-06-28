
interface State {
    loading: boolean;
    error: null | string;
    data: any[];
}

interface Action {
    type: string;
    payload?: any;
}
const countries = (state: State, action: Action) => {
    switch(action.type){
        case 'FETCH_START':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case 'FETCH_END':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
                return state;
    }   
}

export default countries;