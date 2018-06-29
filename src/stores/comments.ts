import request from '@/utils/request';
import { AxiosResponse } from 'axios';
import { flow, types } from 'mobx-state-tree';

export const Comment = types
  .model('Comment', {
    food_id: types.string,
    food_name: types.string,
    rating: types.number,
    content: types.string,
    comment_time: types.string
  });

export type CommentType = typeof Comment.Type;
export type CommentSnapshotType = typeof Comment.SnapshotType;

export const Comments = types
  .model({
    list: types.array(Comment)
  })
  .actions((self) => ({
    LoadCommentsAsync: flow(function* LoadCommentsAsync() {
      const { data }: AxiosResponse<{ comment: CommentSnapshotType[] }> = yield request.get(
        '/comments'
      );
      self.list.clear();
      self.list.push(...(data && data.comment || []).map((one) => Comment.create(one)));
    })
  }));

export type CommentsType = typeof Comments.Type;
