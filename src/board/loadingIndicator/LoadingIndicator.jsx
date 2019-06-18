import React, { useState } from 'react';
import { animated, config, useTrail } from 'react-spring';
import './LoadingIndicator.less';
import './animatedCube/AnimatedCube.less';
import { useInterval } from '../../hooks';

const LoadingIndicator = () => {
    const [toggle, setToggle] = useState(true);

    const cubes = [...Array(9).keys()].map(i => <div key={`cube${i}`} />);
    const minSize = '0.5rem';
    const maxSize = '1.5rem';

    const trail = useTrail(cubes.length, {
        config: config.stiff,
        reset: true,
        from: {
            width: toggle ? maxSize : minSize,
            height: toggle ? maxSize : minSize
        },
        to: {
            width: toggle ? minSize : maxSize,
            height: toggle ? minSize : maxSize
        }
    });

    useInterval(() => {
        setToggle(state => !state);
    }, 1000);

    return (
        <div className="wrapper" onClick={() => setToggle(state => !state)}>
            <div className="LoadingIndicator">
                {trail.map((style, index) => (
                    <animated.div
                        key={cubes[index].key}
                        className="container"
                        style={style.x}
                    >
                        <animated.div className="AnimatedCube" style={style}>
                            {cubes[index]}
                        </animated.div>
                    </animated.div>
                ))}
            </div>
        </div>
    );
};

export default LoadingIndicator;
