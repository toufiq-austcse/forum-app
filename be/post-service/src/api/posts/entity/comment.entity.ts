import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
import { AppBaseEntity } from '@common/database/entity/base.entity';
import { UserInfo } from '@common/http-clients/auth/dto/res/user-info.dto';

@Entity({ name: 'comments' })
export class Comment extends AppBaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, (post) => post.id)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column({
    type: 'varchar',
    nullable: true
  })
  user_id: string;

  @Column({
    type: 'text'
  })
  body: string;

  user: UserInfo;

}