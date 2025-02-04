export const getUsers = (state) => {
    const users = state.ui.get('users');
    // In case getUsers is called before fetchUsers, state won't have users yet so it'll be undefined
    // When the state is updated (by fetchUsers) it triggers a re-render & the mapStateToProps function is called again (with users this time)
    return users ? users.valueSeq() : [];
}