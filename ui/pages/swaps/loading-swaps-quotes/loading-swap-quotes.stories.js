import React from 'react';
import LoadingSwapsQuotes from './loading-swaps-quotes';
import storiesMetadata from './loading-swaps-quotes-stories-metadata';

export const DefaultStory = () => (
  <div className="swaps">
    <div className="swaps__container">
      <LoadingSwapsQuotes loadingComplete={false} onDone={action('Loading done')} aggregatorMetadata={storiesMetadata.totle} />
    </div>
  </div>
);
