import { inject, observer } from "mobx-react";
import * as React from "react";
import { Dimmer, Grid, Image, Loader } from "semantic-ui-react";
import { IStore } from "../../stores/IStore";
import Card from "../Card/Card";


import "./game-grid.css";

interface IProps {
  store?: IStore;
}

@inject("store")
@observer
class GameGrid extends React.Component<IProps, {}> {
  private get store(): IStore {
    return this.props.store as IStore;
  }

  public render() {
    const { yourTurn, canStartGame, cards, droppedCards } = this.store.game;

    if (!canStartGame) {
      return null;
    }

    return (
      <Dimmer.Dimmable dimmed={!yourTurn}>
        <Grid stackable={true} id="game-grid">

          <Grid.Row>
            <Grid.Column width={8}>
              <h5 className="ui dividing header">Your Cards</h5>
              <Dimmer active={!yourTurn} inverted={true}>
                <Loader>Wait untill your turn!</Loader>
              </Dimmer>
              {this.renderCards(cards, true)}
            </Grid.Column>

            <Grid.Column width={8}>
              <h5 className="ui dividing header">Dropped Cards</h5>
              {this.renderCards(droppedCards)}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={8}>
              <h5 className="ui dividing header">Players Balls</h5>
            </Grid.Column>

            <Grid.Column width={8}>
              <h5 className="ui dividing header">Playground</h5>
            </Grid.Column>

          </Grid.Row>

          <Grid.Row>
            <Grid.Column className="text-center" width={2}>
              <h4 className="ui dividing header">Balls1</h4>
            </Grid.Column>
            <Grid.Column className="text-center" width={2}>
              <h5 className="ui dividing header">Balls2</h5>
            </Grid.Column>
            <Grid.Column className="text-center" width={2}>
              <h5 className="ui dividing header">Balls3</h5>
            </Grid.Column>
            <Grid.Column className="text-center" width={2}>
              <h5 className="ui dividing header">Balls4</h5>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column className="text-center" width={2}>
              <h3>1</h3>
              <h3>2</h3>
              <h3>3</h3>
              <h3>4</h3>
            </Grid.Column>
            <Grid.Column className="text-center" width={2}>
              <h3>10</h3>
              <h3>20</h3>
              <h3>30</h3>
              <h3>40</h3>
            </Grid.Column>
            <Grid.Column className="text-center" width={2}>
              <h3>11</h3>
              <h3>21</h3>
              <h3>31</h3>
              <h3>41</h3>
            </Grid.Column>
            <Grid.Column className="text-center" width={2}>
              <h3>21</h3>
              <h3>22</h3>
              <h3>23</h3>
              <h3>24</h3>
            </Grid.Column>

            <Grid.Column width={8}>
              <Image src="https://i.ibb.co/rfgVYKK/JAKAROO-3-0.png" size='huge' />
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </Dimmer.Dimmable>
    );
  }

  private handleCardClick = (card: string) => {
    this.store.dropCard(card);
  };

  private renderCards(cards?: string[], isClickable: boolean = false) {
    if (!cards) {
      return null;
    }

    return cards.map(card => (
      <Card
        className={isClickable ? "card-clickable" : "card"}
        id={card}
        key={card}
        card={card}
        style={{ fontSize: "17pt" }}
        disabled={!isClickable}
        onCardClick={this.handleCardClick}
      />
    ));
  }
}

export default GameGrid;
