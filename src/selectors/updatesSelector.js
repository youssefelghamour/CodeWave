export const getUpdates = (state) => {
    return state.updates.valueSeq();
}

export const getUpdateById = (state, id) => {
    const updates = state.updates;  // Immutable.Map

    const article = updates.get(id);  // Use get() for Immutable.Map

    return article;
}