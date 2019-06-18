import { boardMapper } from './responseMappers';
import { Difficulty } from '../constants';

const url = process.env.SUDOKU_API_URL;

export const fetchBoard = async (difficulty = Difficulty.HARD) => {
    const response = await fetch(
        `${url}/api/board/${difficulty}`
    );
    return await boardMapper(response);
};
