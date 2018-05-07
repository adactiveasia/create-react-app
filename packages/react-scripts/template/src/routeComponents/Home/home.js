// @flow

import * as React from 'react';
import type { Node } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Map } from '../../components/Map';

import './home.css';

type PropsType = {
    changePage: () => void
};

const Home = (props: PropsType): Node => (
    <div>
        <h1>Home</h1>
        <p>Welcome home!</p>
        <button onClick={props.changePage}>Go to about page via redux</button>
        <Map />
    </div>
);

const mapDispatchToProps = (dispatch: *): PropsType => bindActionCreators({
    changePage: (): void => push('/about-us')
}, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(Home);
