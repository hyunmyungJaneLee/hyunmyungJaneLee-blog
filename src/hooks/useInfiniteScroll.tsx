import { useState } from 'react';
import { MutableRefObject, useRef, useMemo } from 'react';
import { PostListItemType } from 'types/PostItem.types';

export type useInfiniteScrollType = {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  postList: PostListItemType[];
};

const NUMBER_OF_ITEMS_PER_PAGE = 10;

const useInfiniteScroll = function (
  selectedCategory: string,
  posts: PostListItemType[],
): useInfiniteScrollType {
  const containerRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const [count, setCount] = useState<number>(1);
  const postListByCategory = useMemo(
    () =>
      posts.filter(
        ({
          node: {
            frontmatter: { categories },
          },
        }: PostListItemType) =>
          selectedCategory !== 'All'
            ? categories.includes(selectedCategory)
            : true,
      ),
    [selectedCategory],
  );

  return {
    containerRef,
    postList: postListByCategory.slice(0, count * NUMBER_OF_ITEMS_PER_PAGE),
  };
};

export default useInfiniteScroll;
