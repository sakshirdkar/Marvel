import React from "react";
import "./card-list.styles.css";
import { Card } from "../card/card.component";
export const CardList = (props) => (
  //console.log(props);
  <div className="card-list">
    {props.results.map((hero) => (
      <Card key={hero.id} name={hero.name}>
        {hero.thumbnail}
      </Card>
      // <h1 key={hero.id}>{hero.name}</h1>
    ))}
  </div>
);
