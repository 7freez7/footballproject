import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({
    description: 'Název týmu',
    example: 'FC Slavia Praha',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'URL nebo název loga',
    example: 'https://example.com/logo.png',
  })
  @IsNotEmpty()
  @IsString()
  logo: string;
}
