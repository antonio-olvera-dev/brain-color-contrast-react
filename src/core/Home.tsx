import React from "react";
import { NeuralNetworkGPU } from "brain.js/src";
import { Context } from "vm";

let ctx: Context;
export default class Home extends React.Component<{}, {}> {

  net = new NeuralNetworkGPU();
  objColors = [];

  constructor(props: any) {
    super(props);
    ctx = this;
  }

  render() {
    return (
      <div>
        <h1>Brain colors contrast</h1>
        <br />
        <section>
          <input type="color"></input>

          <button onClick={() => this.training(false)}>
            Click si quieres el texto BLANCO
          </button>
          <button onClick={() => { this.training(true) }}>
            Click si quieres el texto NEGRO
          </button>
          <button onClick={this.ver}>Ver</button>

          <div id="divv">
            <h1 id="text">Texto</h1>
          </div>
        </section>
      </div>
    );
  }

  training = (blackBool = false) => {
    ctx.net = new NeuralNetworkGPU();

    const value0 = document.getElementsByTagName("input")[0].value;

    if (blackBool) {
      let newobjColors: NetColor = {
        input: {
          r: parseInt(value0.substring(1, 3), 16),
          g: parseInt(value0.substring(3, 5), 16),
          b: parseInt(value0.substring(5, 7), 16),
        },
        output: {
          black: 1,
        },
      };
      ctx.objColors.push(newobjColors);
      ctx.net.train(ctx.objColors);
      return false;
    }

    let newobjColors: NetColor = {
      input: {
        r: parseInt(value0.substring(1, 3), 16),
        g: parseInt(value0.substring(3, 5), 16),
        b: parseInt(value0.substring(5, 7), 16),
      },
      output: {
        white: 1,
      },
    };
    ctx.objColors.push(newobjColors);
    ctx.net.train(ctx.objColors);
 


  }

  ver = () => {
    const value = document.getElementsByTagName("input")[0].value;
    //@ts-ignore
    document.getElementById("divv").style.background = `${value}`;

    let output = ctx.net.run({
      r: parseInt(value.substring(1, 3), 16),
      g: parseInt(value.substring(3, 5), 16),
      b: parseInt(value.substring(5, 7), 16),
    }); // { white: 0.99, black: 0.002 }

    if (!output) {
      output = {white: 0}
    }
    console.log(output);
    if (output.white  > 0.5) {
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
    white?: number
    black?: number
  };
}
