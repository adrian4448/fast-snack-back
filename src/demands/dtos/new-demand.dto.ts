import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsNotEmpty, IsString } from 'class-validator';
import { FoodDto } from '../../foods/dtos/food.dto';

export class NewDemandDto {
  @ApiProperty({
    type: String,
    description: 'Número da mesa',
  })
  @IsNotEmpty()
  @IsString()
  table: string;

  @ApiProperty({
    type: FoodDto,
    isArray: true,
    description: 'Alimentos do pedido',
  })
  @IsNotEmpty()
  @ArrayMinSize(1)
  foods: Array<FoodDto>;
}
