import type { Tags } from '@prisma/client';
import React from 'react'
import TagButton from './tagButton';

const TagButtonsLayout = (props: {allTags: Tags[]}) => {
  return (
    <div className="flex-start flex flex-wrap gap-2 md:gap-4">
    {props.allTags.map((tag) => {
      return <TagButton key={tag.id} tag={tag.name} />;
    })}
  </div>
  )
}

export default TagButtonsLayout