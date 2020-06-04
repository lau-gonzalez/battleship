import React from 'react';

const EnemyName = (props) => (
  <div id={props.nameId} className={props.glowingState}>{props.name}</div>
)


const PlayerName = (props) => (
  <div id={props.nameId} className={props.glowingState}>{props.name}</div>
  )

export default {PlayerName,EnemyName}