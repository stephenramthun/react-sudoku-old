import React, { useState } from 'react';
import { animated, config, useSpring } from 'react-spring';
import { useInterval } from '../../../hooks';
import './AnimatedCube.less';

const AnimatedCube = () => {
    const [toggle, setToggle] = useState(false);
    const size = toggle ? '0.5rem' : '1.5rem';

    const [props, set, stop] = useSpring(() => ({
        to: { width: size, height: size },
        config: config.wobbly
    }));

    set({ width: size, height: size });
    stop();

    useInterval(() => {
        setToggle(state => !state);
    }, 500);

    return (
        <div className="container">
            <animated.div className="AnimatedCube" style={props} />
        </div>
    );
};

export default AnimatedCube;
