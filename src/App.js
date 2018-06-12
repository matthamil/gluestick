import React from "react";
import { GlueSentinelTop, GlueSentinelBottom } from './gluestick/sentinels';
import GlueStick from './gluestick/gluestick';
import "./App.css";

export default class App extends React.Component {
  jumpToQuestion = id => {
    const node = document.getElementById(id);
    node.style.position = 'relative';
    // node.style.position = 'sticky';
    document.getElementById('scroll-container').scroll(
      node.offsetTop + 1,
      node.offsetTop + 1
    )
    node.style.position = 'sticky';
  }

  render() {
    return (
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>

        <div
          id="scroll-container"
          style={{
            width: '500px',
            overflow: 'auto',
            margin: '0 auto',
            height: '60vh'
          }}>

          <GlueStick>
            {(currentStick) => (
              [1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div className="question-wrapper" key={i}>
                  <div className={`question ${currentStick === i ? 'selected' : ''}`} id={i}>
                    <GlueSentinelTop />
                    Question {i}
                    {i % 2 === 0 && (currentStick !== i) ?
                      <div className="question-table">
                        <table>
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>10/10/2018</td>
                              <td>Steve Smith</td>
                            </tr>
                            <tr>
                              <td>05/03/2017</td>
                              <td>Bob Henderson</td>
                            </tr>
                          </tbody>

                        </table>
                      </div>
                      : null}
                  </div>
                  <div className="question-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut quam quis ipsum finibus pharetra. Sed sodales viverra dignissim. Ut dapibus congue orci, sit amet molestie velit eleifend sit amet. Mauris et nunc accumsan, dictum leo et, tempus est. Sed pulvinar erat sit amet consectetur dignissim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris eu neque eu mi condimentum feugiat. Suspendisse potenti. Etiam vehicula dignissim accumsan. Aenean nisi nulla, ultricies ac porta ut, feugiat nec libero. Duis sem libero, euismod vitae rutrum eu, dapibus non mauris. Nullam volutpat augue sit amet tortor vulputate rutrum. Nullam sit amet nisl varius, aliquam orci eu, egestas turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

                    Aenean ornare nunc nisi, nec posuere lacus consectetur et. Sed cursus arcu nec arcu auctor, consectetur mollis velit tempor. Curabitur ornare lacus elit, eget luctus massa elementum mattis. Morbi finibus mattis sem, dignissim pretium ante interdum sed. Sed luctus, quam id venenatis bibendum, neque odio porttitor massa, id porta quam enim sed felis. Integer molestie, ante sit amet consectetur tincidunt, est lectus facilisis turpis, eu commodo leo sem et dui. Vivamus posuere ut tortor eget suscipit. Donec vehicula vestibulum nibh vitae lacinia. Aenean in ligula et orci euismod tristique. Interdum et malesuada fames ac ante ipsum primis in faucibus. In sagittis enim auctor, tincidunt nunc sed, blandit justo.
              </div>
                </div>
              ))
            )}
          </GlueStick>

        </div>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <button onClick={() => this.jumpToQuestion(i)}>
            Jump to {i}
          </button>
        ))}
      </div>
    );
  }
}
