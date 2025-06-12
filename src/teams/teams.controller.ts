import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('teams') // Skupina v dokumentaci
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiOperation({ summary: 'Vytvoří nový tým' })
  @ApiResponse({ status: 201, description: 'Tým úspěšně vytvořen.' })
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  
  @ApiOperation({ summary: 'Vrátí všechny týmy' })
  @ApiResponse({ status: 200, description: 'Seznam týmů' })
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Vrátí tým podle ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID týmu' })
  @ApiResponse({ status: 200, description: 'Nalezený tým' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teamsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Aktualizuje tým podle ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID týmu' })
  @ApiResponse({ status: 200, description: 'Tým aktualizován' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Smaže tým podle ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID týmu' })
  @ApiResponse({ status: 200, description: 'Tým smazán' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.teamsService.remove(id);
  }
}
