import { inject, observer } from "mobx-react";
import * as React from "react";
import { Message, Segment } from "semantic-ui-react";

import { IStore } from "../../stores/IStore";
import { IGame } from "../../stores/models/IGameInfo";

interface IProps {
  store?: IStore;
}

@inject("store")
@observer
class Rules extends React.Component<IProps, {}> {
  private get store(): IStore {
    return this.props.store as IStore;
  }

  private get gameInfo(): IGame {
    return this.store.game;
  }

  public render() {
    if (!this.canShowRules) {
      return null;
    }

    return (
      <div>
        <Message as="h4" attached="top">
          How to play!
        </Message>

        <Segment attached={true}>
          <ul>
            <h5>Sign-in</h5>
            <li>Sign in with your account</li>
            <li>
              Afer successfully signed in, the players will be added to the game
              pool and message will be notified to them.
            </li>
            <li>
              Once
              <u>
                <i>
                  <b> 4 players</b>
                </i>
              </u>{" "}
              joined in the game pool, the game will start and will be notified.
              Untill then you have to wait.
            </li>
          </ul>

          <br />

          <ul>
            <h5>Your turn</h5>
            <li>
              The game grid contains five sections
              <b>
                <i> your cards </i>
              </b>
              ,
              <b>
                <i> dropped cards.</i>
              </b>
              ,
              <b>
                <i> playground </i>
              </b>
              ,
              <b>
                <i> your balls </i>
              </b>
              and
              <b>
                <i> other players' balls </i>
              </b>
            </li>
            <li>
              Each player will get four cards, last shiffel will be five. When your turn comes you need to
              select one card by clicking the card from
              <b>
                <i> your cards.</i>
              </b>
            </li>
          </ul>

          <br />

          <ul>
            <h5>Card Functionality</h5>
            <li> Normal Cards: 2,3,6,7,8,9,10 are just moving the balls step forward according to thier value.</li>
            <li> Card no. 4: moving the ball backword.</li>
            <li> Card no. 5: moving any ball in playground 5 step forward (even other's ball).</li>
            <li> King Card K: ONLY using this for placing new ball.</li>
            <li> Queen Card Q: moving ball forward for 12 steps.</li>
            <li> Jack Card J: Used to replace player ball with another ball (to get closer to winning area).</li>
            <li> Ace Card A: Used to either place a ball or move 1 or 11.</li>
          </ul>

          <br />
          <ul>
            <h5>The Plaground</h5>

            <li> Playground consists of 73 postions. </li>
            <li> Each player has a base to place his ball in.</li>
            <li> Each player has a 4 postions for winning.</li>
            <li> Each player has 4 balls.</li>
            <li> Players have to place all thier balls and move them to winning area.</li>

          </ul>

          <br />

          <ul>
            <h5>Winner</h5>

            <li>
              Every player needs to move his ball among the playground
              to enter the winning area.
            </li>
            <li>
              The first player enter all his 4 balls into
              winning area, will be declared as The Winner!.
            </li>
          </ul>

          <br />

          <ul>
            <h5>Things to note</h5>

            <li>
              Please do not refresh the browser, if you refresh then you will be
              disconnected form the game. This is a limitation which will be
              overcomed <br />
              in the upcoming releases.
            </li>
          </ul>
        </Segment>
      </div>
    );
  }

  private get canShowRules() {
    return (
      !this.gameInfo.canStartGame &&
      !this.gameInfo.notification &&
      !this.gameInfo.error
    );
  }
}

export default Rules;
