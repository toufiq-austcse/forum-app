import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AppBaseEntity } from '@common/database/entity/base.entity';
import { UserInfo } from '@common/http-clients/auth/dto/res/user-info.dto';

@Entity({
  name: 'posts'
})
export class Post extends AppBaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text'
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true
  })
  content: string;

  @Column({
    default: true
  })
  is_published: boolean;

  @Column()
  user_id: string;

  @Column({
    default: 0
  })
  no_of_comments: number;

  @Column({
    default: 0
  })
  no_of_likes: number;

  user: UserInfo;
}