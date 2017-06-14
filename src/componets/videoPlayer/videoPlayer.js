import React from 'react';
import ReactPlayer from "react-player";

export const VideoPlayer = (item,i) => (
  <section key={i}>
    <h2>{item.title}</h2>
    <ReactPlayer url={item.url} controls/>
  </section>
);