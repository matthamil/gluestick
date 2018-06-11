import React from 'react';
import "./sentinels.css";
export const GlueSentinelTop = ({ style = {} }) => (
  <div style={style} className="glue-sentinel glue-sentinel__top" />
);
export const GlueSentinelBottom = ({ style = {} }) => (
  <div style={style} className="glue-sentinel glue-sentinel__bottom" />
);
