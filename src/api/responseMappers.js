export const boardMapper = async boardResponse => {
    const board = await boardResponse.json();
    return {
        current: board.unsolved.split(''),
        solution: board.solved.split('')
    };
};
