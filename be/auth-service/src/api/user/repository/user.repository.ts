import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '@common/database/repository/base.repository';
import { User, UserDocument } from '../schema/user.schema';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
  constructor(
    @InjectModel(User.name)
    private note: Model<UserDocument>
  ) {
    super(note);
    this.note.schema.pre('save', (next, docs) => {
      console.log('next ', next);
      console.log('docs ', docs);
    });
  }
}
