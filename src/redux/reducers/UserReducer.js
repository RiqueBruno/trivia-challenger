const INITIAL_STATE = {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {        
        default:
            return state;
    }
};

export default userReducer;
