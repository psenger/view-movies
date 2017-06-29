import React from 'react';
import ReactPlayer from "react-player";

export const VideoPlayer = (groupItem, i) => {
  return (<div>
    <section key={i}>
      <h2>{groupItem.title}</h2>
      {groupItem.videos.map((videoItem,ii) => {
        return (<div key={ii}>
          <h3>{videoItem.title}</h3>
          <ReactPlayer url={videoItem.url} controls/>
        </div>);
      })}
    </section>
  </div>)
};