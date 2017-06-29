import React from 'react';
import ReactPlayer from "react-player";
import LazyLoad from 'react-lazy-load';

export const VideoPlayer = (groupItem, i) => {
  return (<div>
    <section key={i}>
      <h2>{groupItem.title}</h2>
      {groupItem.videos.map((videoItem,ii) => {
        return (<section key={ii}>
          <h3>{videoItem.title}</h3>
          <LazyLoad height={360} width={640}>
            <ReactPlayer url={videoItem.url} controls/>
          </LazyLoad>
        </section>);
      })}
    </section>
  </div>)
};