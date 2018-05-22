import React from 'react';
import ReactDOM from 'react-dom';
import {SketchField, Tools} from 'react-sketch';
import SketchThumb from './components/sketchThumb.js';
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

// Styled Components

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
        this.addDrawing = this.addDrawing.bind(this);
        this.removeDrawing = this.removeDrawing.bind(this);
        this.clearCanvas = this.clearCanvas.bind(this);
        this.undoCanvas = this.undoCanvas.bind(this);
        this.redoCanvas = this.redoCanvas.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.changeLineWidth = this.changeLineWidth.bind(this);
        
        this.state = {
            lineColor: "black",
            lineWidth: 10,
            tool: Tools.Pencil,
            canvasWidth: "500px",
            canvasHeight: "500px",
            undoSteps: 15,
            drawings: [],
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
        this.mainProjects.classList.toggle("projects--show");
    }

    saveCanvas () {
        const drawing = {
            sketch: this.sketch.toDataURL()
        }
        const dbref = firebase.database().ref();
        dbref.push(drawing)
    }

    clearCanvas() {
        this.sketch.clear();
    }

    undoCanvas() {
        this.sketch.undo();
    }

    redoCanvas() {
        this.sketch.redo();
    }

    addDrawing(drawingSketch) {
        this.sketch.clear();
        this.sketch.addImg(drawingSketch);
        this.mainProjects.classList.toggle("projects--show");
    }
    
    removeDrawing(drawingKey) {
        const dbref = firebase.database().ref(drawingKey);
        dbref.remove();
    }

    changeLineWidth(value) {
        // console.log(value)
        this.setState({
            lineWidth: Math.floor(value)
        });
    }

    changeColor(color) {
        this.setState({
            lineColor: color
        });
    }

    // Found a way to setState() on window size change however it slows down the browser when active.
    // getScreenSize() {
    //     window.addEventListener("resize", () => { 
    //         const height = window.innerHeight;
    //         const width = window.innerWidth;
    //         if (width > 1080) {
    //             this.setState({
    //                 canvasWidth: "500px",
    //                 canvasHeight: "500px"
    //             })
    //         }
    //         if (width > 768 && width < 1080) {
    //             this.setState({
    //                 canvasWidth: "400px",
    //                 canvasHeight: "400px"
    //             })
    //         }
    //         if (width < 768) {
    //             this.setState({
    //                 canvasWidth: "300px",
    //                 canvasHeight: "300px"
    //             })
    //         }
    //     });
    // }

    render() {
        // this.getScreenSize()
        return (
            <div className="background" >
                <header className="header">
                    <div className="wrapper">
                        <h1 className="header__title">REACT Paint</h1>
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
                                <div className="toolbar__utils">
                                    <button className="toolbar__button" onClick={this.saveCanvas}>save</button>
                                    <button className="toolbar__button" onClick={this.showProjects}>load</button>
                                    <div className="toolbar__buttons">
                                        <button className="toolbar__button--half" onClick={this.undoCanvas}>undo</button>
                                        <button className="toolbar__button--half" onClick={this.redoCanvas}>redo</button>
                                    </div>
                                </div>
                                <form className="slider">
                                    <label className="slider__title" htmlFor="slider__input">Line Width</label>
                                    <input 
                                        type="range"
                                        min="1"
                                        max="50"
                                        value={this.state.lineWidth}
                                        onChange={(e) => this.changeLineWidth(e.target.value)}
                                        step="1"
                                        className="slider__input"
                                        id="slider__input"
                                    />
                                </form>
                                <div className="toolbar__colors">
                                    <div className="toolbar__row">
                                        <div className="toolbar__color toolbar__color--red" onClick={() => this.changeColor("red")}></div>
                                        <div className="toolbar__color toolbar__color--orange" onClick={() => this.changeColor("darkorange")}></div>
                                        <div className="toolbar__color toolbar__color--yellow" onClick={() => this.changeColor("gold")}></div>
                                        <div className="toolbar__color toolbar__color--blue" onClick={() => this.changeColor("blue")}></div>
                                        <div className="toolbar__color toolbar__color--purple" onClick={() => this.changeColor("rebeccapurple")}></div>
                                    </div>
                                    <div className="toolbar__row">
                                        <div className="toolbar__color toolbar__color--green" onClick={() => this.changeColor("limegreen")}></div>
                                        <div className="toolbar__color toolbar__color--pink" onClick={() => this.changeColor("hotpink")}></div>
                                        <div className="toolbar__color toolbar__color--grey" onClick={() => this.changeColor("lightgrey")}></div>
                                        <div className="toolbar__color toolbar__color--black" onClick={() => this.changeColor("black")}></div>
                                        <div className="toolbar__color toolbar__color--white" onClick={() => this.changeColor("white")}></div>
                                    </div>
                                </div>
                                <button className="toolbar__button" onClick={this.clearCanvas}>clear</button>
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
                                    <SketchThumb drawing={drawing} key={`drawing-${i}`} removeDrawing={this.removeDrawing} addDrawing={this.addDrawing}/>
                                )
                            }).reverse()}
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));