import { CommentsType } from '@/stores/comments';
import { Card } from 'antd-mobile';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import styles from './CommentsPage.less';

interface ICommentsProps {
  $comments?: CommentsType;
}

@inject('$comments')
@observer
export default class Comments extends React.Component<ICommentsProps> {
  async componentDidMount() {
    const { $comments } = this.props;
    await $comments!.LoadCommentsAsync();
  }

  @computed
  get Comments() {
    const { $comments } = this.props;
    return $comments!.list.map((comment, index) => {
      return (
        <Card
          key={comment.comment_time + index}
          full={true}
          style={{ marginBottom: '1rem' }}
        >
          <Card.Header
            title={comment.food_name}
            extra={`评价：${comment.rating}分`}
          />
          <Card.Body>
            <div>{comment.content}</div>
          </Card.Body>
          <Card.Footer
            content={comment.comment_time}
          />
        </Card>
      );
    });
  }

  render() {
    return (
      <div style={{ marginTop: '1rem' }}>
        {this.Comments}
      </div>
    );
  }
}
