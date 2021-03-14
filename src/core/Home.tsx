import React, { useState } from "react";
import { NeuralNetwork } from "brain.js/src";

export default class Home extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
    this.state = {
      net: new NeuralNetwork(),
      objColors: [],
    };
  }

  render() {
    return (
      <div>
        <h1>Brain colors contrast</h1>
        <br />
        <section>
          <input type="color"></input>

          <button onClick={this.training}>
            Click si quieres el texto blanco
          </button>
          <button onClick={this.ver}>Ver</button>

          <div id="divv">
            <h1 id="text">Texto</h1>
          </div>
        </section>
      </div>
    );
  }

  training() {

    const value0 = document.getElementsByTagName("input")[0].value;
    const newobjColors: NetColor = {
      input: {
        r: parseInt(value0.substring(1, 3), 16),
        g: parseInt(value0.substring(3, 5), 16),
        b: parseInt(value0.substring(5, 7), 16),
      },
      output: {
        white: 1,
      },
    };
    console.log(this.state);
    //@ts-ignore
    this.state.objColors.push(newobjColors);
    //@ts-ignore
    this.state.net.train([this.state.objColors]);
    //@ts-ignore
    let output = this.state.net.run({
      r: 1,
      g: 0.4,
      b: 0,
    }); // { white: 0.99, black: 0.002 }

    console.log(output);
  }

  ver() {
    const value = document.getElementsByTagName("input")[0].value;
    //@ts-ignore
    document.getElementById("divv").style.background = `${value}`;

    if (true) {
      //@ts-ignore
      document.getElementById("text").style.color = "white";
    } else {
      //@ts-ignore
      document.getElementById("text").style.color = "black";
    }
  }
}

interface NetColor {
  input: {
    r: number;
    g: number;
    b: number;
  };
  output: {
    white: number;
  };
}
