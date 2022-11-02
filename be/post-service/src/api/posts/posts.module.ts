import { Module, Post } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entity/like.entity';
import { CommentRepository } from './repository/comment.repository';
import { LikeRepository } from './repository/like.repository';
import { PostRepository } from './repository/post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Like, Post])],
  providers: [CommentRepository, LikeRepository, PostRepository]
})
export class PostsModule {
}
