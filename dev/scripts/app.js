import React from 'react';
import ReactDOM from 'react-dom';
import {SketchField, Tools} from 'react-sketch';
import SketchThumb from './components/sketchThumb.js'
// import styled,{css} from 'styled-components';

const config = {
    apiKey: "AIzaSyD80CudW5IMKA0kJjwn3lT7IfJ-c7ejtAg",
    authDomain: "paint-react.firebaseapp.com",
    databaseURL: "https://paint-react.firebaseio.com",
    projectId: "paint-react",
    storageBucket: "paint-react.appspot.com",
    messagingSenderId: "476543522660"
};
firebase.initializeApp(config);

// const Wrapper = styled.div`
//     max-width: 1280px;
//     width: 85%;
//     margin: 0 auto;
// `;

// const Background = styled.div`
//     height: 100vh;
//     background-color: grey;
// `;

// const Header = styled.header`
//     height: 10%;
//     background-color: black;
//     display: flex;
//     align-items: center;
// `;

// const HeaderTitle = styled.h1`
//     color: white;
// `;

// const Main = styled.main`
//     height: 90%;
//     display: flex;
//     align-items: center;
// `;

// const MainBody = styled.div`
//     display: flex;
//     flex-flow: row nowrap;
//     justify-content: center;
// `;

// const Aside = styled.section`
//     width: 25%;
// `;

// const Button = styled.button`
//     width: 100%;
//     height: 50px;
//     border: 0;
//     background-color: lightgrey;
//     font-size: 1.4rem;
//     text-transform: uppercase;
//     ${props => props.secondary && css`
//         width: 50%
//         background-color: salmon;
//     `}
// `;

// const TwoColumns = styled.div`
//     display: flex;
//     flex-flow: row nowrap;
// `;

// const SketchContainer = styled.div`
//     background-color: white;
//     margin-right: 50px;
// `

// const ProjectSection = styled.section`
//     width: 100%;
//     height: 200px;
// 	position: absolute;
// 	bottom: 0px;
// 	left: 0px;
// 	background: white;
// 	transition: all 0.5s ease;
// 	padding: 0 15px;
// `


class App extends React.Component {
    constructor() {
        super();

        this.showProjects = this.showProjects.bind(this);
        this.saveCanvas = this.saveCanvas.bind(this);
        this.removeSketch = this.removeSketch.bind(this)
        this.resetCanvas = this.resetCanvas.bind(this);
        this.changeColorToRed = this.changeColorToRed.bind(this);
        this.changeColorToBlue = this.changeColorToBlue.bind(this);
        this.changeColorToYellow = this.changeColorToYellow.bind(this);
        this.changeColorToOrange = this.changeColorToOrange.bind(this);
        this.changeColorToPurple = this.changeColorToPurple.bind(this);
        this.changeColorToGreen = this.changeColorToGreen.bind(this);
        this.changeColorToPink = this.changeColorToPink.bind(this);
        this.changeColorToGrey = this.changeColorToGrey.bind(this);
        this.changeColorToBlack = this.changeColorToBlack.bind(this);
        this.changeColorToWhite = this.changeColorToWhite.bind(this);
        
        this.state = {
            lineColor: "black",
            lineWidth: 10,
            tool: Tools.Pencil,
            canvasWidth: "500px",
            canvasHeight: "500px",
            drawings: []
            // fillColor: '#68CCCA',
            // shadowWidth: 0,
            // shadowOffset: 0,
            // fillWithColor: false,
            // fillWithBackgroundColor: false,
            // drawings: [],
            // canUndo: false,
            // canRedo: false,
            // controlledSize: false,
            // stretched: true,
            // stretchedX: false,
            // stretchedY: false,
            // originX: 'left',
            // originY: 'top'
            
        };
    }
    componentDidMount() {
        firebase.database().ref().on("value", (res) => {
            // console.log(res.val())
            const userData = res.val();
            const dataArray = [];
            for(let drawKey in userData) {
                userData[drawKey].key = drawKey;
                dataArray.push(userData[drawKey])
            }
            // console.log(dataArray);
            this.setState({
                drawings: dataArray
            })
        });
    }

    showProjects() {
        // console.log("Showing Projects");
        this.mainProjects.classList.toggle("projects--show");
    }

    saveCanvas () {
        const drawing = {
            sketch: this.sketch.toDataURL()
        }
        const dbref = firebase.database().ref();
        dbref.push(drawing)
    }

    resetCanvas() {
        this.sketch.clear();
    }
    
    removeSketch() {
        console.log("Clicked");
        // console.log(drawingKey);
        // const dbref = firebase.database().ref(drawingKey);
        // dbref.remove();
    }
    
    changeColorToRed() {
        this.setState({
            lineColor: "red"
        })
    }
    
    changeColorToOrange() {
        this.setState({
            lineColor: "orange"
        })
    }

    changeColorToYellow() {
        this.setState({
            lineColor: "yellow"
        })
    }
    
    changeColorToBlue() {
        this.setState({
            lineColor: "blue"
        })
    }

    changeColorToPurple() {
        this.setState({
            lineColor: "purple"
        })
    }

    changeColorToGreen() {
        this.setState({
            lineColor: "green"
        })
    }

    changeColorToPink() {
        this.setState({
            lineColor: "hotpink"
        })
    }

    changeColorToGrey() {
        this.setState({
            lineColor: "lightgrey"
        })
    }

    changeColorToBlack() {
        this.setState({
            lineColor: "black"
        })
    }

    changeColorToWhite() {
        this.setState({
            lineColor: "white"
        })
    }

    render() {
        return (    
            <div className="background">
                <header className="header">
                    <div className="wrapper">
                        <h1 className="header__title"></h1>
                    </div>
                </header>
                <main className="main">
                    <div className="wrapper">
                        <div className="main__body">
                            <div className="main__sketchpad">
                                <SketchField 
                                    name="main__canvas"
                                    className="main__canvas"
                                    ref={(ref) => this.sketch = ref}
                                    lineColor={this.state.lineColor}
                                    lineWidth={this.state.lineWidth}
                                    width={this.state.canvasWidth}
                                    height={this.state.canvasHeight}
                                    tool={this.state.tool}
                                />
                            </div>
                            <aside className="toolbar">
                                <button className="toolbar__button" onClick={this.saveCanvas}>save</button>
                                <div className="toolbar__buttons">
                                    <button className="toolbar__button--half">new</button>
                                    <button className="toolbar__button--half" onClick={this.showProjects}>load</button>
                                </div>
                                <div className="toolbar__colors">
                                    <div className="toolbar__row">
                                        <div className="toolbar__color toolbar__color--red" value="red" onClick={this.changeColorToRed}></div>
                                        <div className="toolbar__color toolbar__color--orange" value="orange" onClick={this.changeColorToOrange}></div>
                                        <div className="toolbar__color toolbar__color--yellow" value="yellow" onClick={this.changeColorToYellow}></div>
                                        <div className="toolbar__color toolbar__color--blue" value="blue" onClick={this.changeColorToBlue}></div>
                                        <div className="toolbar__color toolbar__color--purple" value="purple" onClick={this.changeColorToPurple}></div>
                                    </div>
                                    <div className="toolbar__row">
                                        <div className="toolbar__color toolbar__color--green" value="green" onClick={this.changeColorToGreen}></div>
                                        <div className="toolbar__color toolbar__color--pink" value="pink" onClick={this.changeColorToPink}></div>
                                        <div className="toolbar__color toolbar__color--grey" value="grey" onClick={this.changeColorToGrey}></div>
                                        <div className="toolbar__color toolbar__color--black" value="black" onClick={this.changeColorToBlack}></div>
                                        <div className="toolbar__color toolbar__color--white" value="white" onClick={this.changeColorToWhite}></div>
                                    </div>
                                </div>
                                <button className="toolbar__button" onClick={this.resetCanvas}>reset</button>
                            </aside> 
                        </div>
                    </div>
                    <section className="projects" ref={ref => this.mainProjects = ref}>
                        <div className="projects__close-button" onClick={this.showProjects}>
                            <i className="fas fa-times"></i>
                        </div>
                        <div className="projects__preview wrapper">
                            {this.state.drawings.map((drawing,i) => {
                                return (
                                    <SketchThumb drawing={drawing} key={`drawing-${i}`} removeSketch={this.removeSketch}/>
                                )
                            })}
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
