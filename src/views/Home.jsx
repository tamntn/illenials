import React, { Component } from 'react';
import ReactPageScroller from "react-page-scroller";
import CountdownPage from '../components/CountdownPage';
import WelcomePage from '../components/WelcomePage';
// import ReactFullpage from '@fullpage/react-fullpage';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollerHeight: window.innerHeight,
            disableScrolling: false
        }
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState({ scrollerHeight: window.innerHeight })
        })
    }

    componentWillUnmount() {
        window.removeEventListener('resize');
    }

    disableScrolling = (value) => {
        this.setState({ disableScrolling: value })
    }

    goToPage = (pageNumber) => {
        this.reactPageScroller.goToPage(pageNumber);
    }

    render() {
        return <div>
            <ReactPageScroller
                ref={c => this.reactPageScroller = c}
                animationTimer={500}
                containerHeight={this.state.scrollerHeight}
                blockScrollUp={this.state.disableScrolling ? true : false}
                blockScrollDown={this.state.disableScrolling ? true : false}
            >
                <CountdownPage goToPage={this.goToPage} />
                <WelcomePage disableScrolling={this.disableScrolling} />
            </ReactPageScroller>
        </div>
        // <ReactFullpage
        // 	render={({ state, fullpageApi }) => {
        // 		return (
        // 			<ReactFullpage.Wrapper>
        // 				<CountdownPage />
        // 				<WelcomePage />
        // 			</ReactFullpage.Wrapper>
        // 		);
        // 	}}
        // />
    }
}

export default Home;