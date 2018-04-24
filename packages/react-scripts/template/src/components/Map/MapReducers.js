import { types as mapActionsType } from './MapActions';
import { initialState } from "./initialState";

const mapReducers = (state = initialState , action) => {
    switch (action.type) {
        case mapActionsType.DID_INIT:
            return {
                ...state,
                state: "idle",
            };
        case mapActionsType.SWITCH_MODE:
            return {
                mode: action.mode
            };
        default:
            return state
    }
};

export default mapReducers