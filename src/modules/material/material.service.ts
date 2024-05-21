import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Material } from './entities/material.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MaterialService {
  constructor(
    @Inject('MATERIAL_REPOSITORY')
    private materialRepository: Repository<Material>,
  ) {}

 async create(createMaterialDto: CreateMaterialDto): Promise<Material> {
    const newmaterial: Material = new Material();
    newmaterial.name = createMaterialDto.name.toUpperCase();
    const createdMaterial: Material =
      await this.materialRepository.save(newmaterial);
    return createdMaterial;
  }

 async findAll(): Promise<Material[]> {
  return await this.materialRepository.find();
  }
async  findOne(id: string): Promise<Material> {
  const findLmaterial: Material = await this.materialRepository.findOne({where:{id:id}
    
  });

  if (!findLmaterial) {
    throw new NotFoundException('No existe el material enviado');
  }

  return findLmaterial;
  }

 async update(id: string, updateMaterialDto: UpdateMaterialDto) {
  const findmaterial: Material = await this.materialRepository.findOne({where:{id:id}
    
  });
  if (!findmaterial) {
    throw new NotFoundException('No existe el material enviado');
  }
  findmaterial.name = updateMaterialDto.name.toUpperCase();
  findmaterial.updatedAt = new Date();
  return await this.materialRepository.save(findmaterial);
  }

 async remove(id: string): Promise<Material> {
  const findmaterial: Material = await this.materialRepository.findOne({where:{ id:id}
   
  });
  if (!findmaterial) {
    throw new NotFoundException('No existe el material enviado');
  }
    return await this.materialRepository.remove(findmaterial);
  }
}
