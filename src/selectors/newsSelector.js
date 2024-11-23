export const getNews = (state) => {
    return state.news.valueSeq();
}

export const getNewsById = (state, id) => {
    const news = state.news;  // Immutable.Map

    const article = news.get(id);  // Use get() for Immutable.Map

    return article;
}