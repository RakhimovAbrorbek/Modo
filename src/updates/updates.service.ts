import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUpdateDto } from './dto/create-update.dto';
import { UpdateUpdateDto } from './dto/update-update.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Update } from './schemas/update.schema';
import { Model } from 'mongoose';

@Injectable()
export class UpdatesService {
  constructor(@InjectModel(Update.name) private readonly updateSchema:Model<Update>){}
  create(createUpdateDto: CreateUpdateDto) {
    return this.updateSchema.create(createUpdateDto)
  }

  findAll() {
    return this.updateSchema.find({})
  }

  findOne(id: string) {
    const update = this.updateSchema.findById(id)
    if(!update){
      throw new BadRequestException("Update not found")
    }
    return update
  }

  update(id: string, updateUpdateDto: UpdateUpdateDto) {
     const update = this.updateSchema.findById(id);
     if (!update) {
       throw new BadRequestException("Update not found");
     }
     const updatedUpdate = this.updateSchema.findByIdAndUpdate(id,updateUpdateDto)
     return updatedUpdate
  }

  async remove(id: string) {
      const update = this.updateSchema.findById(id);
      if (!update) {
        throw new BadRequestException("Update not found");
      }
      await this.updateSchema.findByIdAndDelete(id)
      return {message:"Update deleted successfully"}
    }
}
