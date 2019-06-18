import React from 'react';
import Cell from '../cell/Cell';
import { Constants } from '../../constants';
import './Row.less';

const Row = React.memo(({ index, values }) => {
    return (
        <div className="Row">
            {values &&
                values.map((value, i) => {
                    const cellIndex = index * Constants.NUMBER_OF_ROWS + i;
                    return (
                        <Cell key={`Cell${i}`} index={cellIndex}>
                            {value}
                        </Cell>
                    );
                })}
        </div>
    );
});

export default Row;
