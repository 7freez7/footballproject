import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTeamDto) {
    return this.prisma.team.create({
      data: {
        name: dto.name,
        logo: dto.logo,
        date_of_last_update: new Date(), // vyplníme aktuální čas
      },
    });
  }

  async findAll() {
    return this.prisma.team.findMany({
      include: {
        players: true,
        homeMatches: true,
        awayMatches: true,
      },
    });
  }

  async findOne(id: number) {
    const team = await this.prisma.team.findUnique({
      where: { id },
      include: {
        players: true,
        homeMatches: true,
        awayMatches: true,
      },
    });
    if (!team) throw new NotFoundException(`Team #${id} not found`);
    return team;
  }

  async update(id: number, dto: UpdateTeamDto) {
    return this.prisma.team.update({
      where: { id },
      data: {
        ...dto,
        date_of_last_update: new Date(), // aktualizujeme timestamp
      },
    });
  }

  async remove(id: number) {
    return this.prisma.team.delete({ where: { id } });
  }
}
