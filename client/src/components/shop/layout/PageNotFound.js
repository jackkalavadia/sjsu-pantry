import React from "react";
import Layout from "./index";
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

const PageNotFoundComponent = (props) => {
  return (
    <div className="flex flex-col items-center justify-center my-32">
    <div className="selfCenter spaceBetween">
    <TwitterTweetEmbed
      onLoad={function noRefCheck(){}}
      tweetId="1559541908904431617"
    />
  </div>
  </div>

  );
};

const PageNotFound = (props) => {
  return <Layout children={<PageNotFoundComponent />} />;
};

export default PageNotFound;
