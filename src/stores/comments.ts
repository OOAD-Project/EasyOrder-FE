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
      const { data }: AxiosResponse<{ comments: CommentSnapshotType[] }> = yield request.get(
        '/comments'
      );
      self.list.clear();
      self.list.push(...(data && data.comments || []).map((one) => Comment.create(one)));
    }),
    LeaveCommentAsync: flow(function* LeaveCommentAsync({
      food_id, food_name, rating, content
    }: { food_id: string, food_name: string, rating: number, content: string }) {
      yield request.post('/comments', {
        food_id,
        food_name,
        content,
        rating,
        comment_time: formatDate()
      }, {
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          params: {
            food_id,
            food_name,
            content,
            rating,
            comment_time: formatDate()
          }
        });
    })
  }));

function formatDate() {
  const date = new Date();

  // tslint:disable-next-line:one-variable-per-declaration
  const year = date.getFullYear(),
    month = date.getMonth() + 1, // 月份是从0开始的
    day = date.getDate(),
    hour = date.getHours(),
    min = date.getMinutes(),
    sec = date.getSeconds();
  const newTime = year + '-' +
    (month < 10 ? '0' + month : month) + '-' +
    (day < 10 ? '0' + day : day) + ' ' +
    (hour < 10 ? '0' + hour : hour) + ':' +
    (min < 10 ? '0' + min : min) + ':' +
    (sec < 10 ? '0' + sec : sec);

  return newTime;
}

export type CommentsType = typeof Comments.Type;
