const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_PROFILE':
            return {
                ...state,
                profile: action.payload
            };
        case 'SET_USER_IS_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: action.payload
            };
        case 'DARK_THEME':
            return {
                ...state,
                darkTheme: action.payload
            };
        case 'CHANGE_LANGUAGE':
            return {
                ...state,
                language:  action.payload
            };
        case 'SET_T':
            return {
                ...state,
                t: action.payload
            };
        case 'SET_ARTICLE':
            return {
                ...state,
                articles: action.payload 
            };
        case 'SET_SELECTED_ARTICLE':
            return {
                ...state,
                selectedArticle:  action.payload
            };
        default:
            return state;
    }
};

export default Reducer;