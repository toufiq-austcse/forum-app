import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AppBaseEntity } from '@common/database/entity/base.entity';
import { Post } from './post.entity';

@Entity({
  name: 'likes'
})
export class Like extends AppBaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar'
  })
  user_id: string;

  @ManyToOne(() => Post, (post) => post.id)
  @JoinColumn({ name: 'post_id' })
  post: Post;
}