import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entity/like.entity';
import { CommentRepository } from './repository/comment.repository';
import { LikeRepository } from './repository/like.repository';
import { PostRepository } from './repository/post.repository';
import { PostController } from './controller/post.controller';
import { PostService } from './service/post.service';
import { Comment } from './entity/comment.entity';
import { Post } from './entity/post.entity';
import { CommentService } from './service/comment.service';
import { CommentController } from './controller/comment.controller';
import { LikeController } from './controller/like.controller';
import { LikeService } from './service/like.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Like, Post])],
  controllers: [PostController, CommentController, LikeController],
  providers: [PostService, CommentService, LikeService, CommentRepository, LikeRepository, PostRepository]
})
export class PostsModule {
}
