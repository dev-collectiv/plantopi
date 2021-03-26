import { CreateCronDto } from './create-cron.dto';

export class UpdateCronDto extends CreateCronDto {
  isActive?: boolean;
}
