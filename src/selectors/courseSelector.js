export const getCourses = (state) => {
    /*
    valueSeq() takes a Map like this:

        Map({
            1: { id: 1, name: 'Course 1' },
            2: { id: 2, name: 'Course 2' }
        })
        
    And turns it into an IndexedSeq like this:

        IndexedSeq [
            { id: 1, name: 'Course 1' },
            { id: 2, name: 'Course 2' }
        ]
    
        IndexedSeq behaves like a list but is actually an object
    */
    return state.courses.valueSeq();
}