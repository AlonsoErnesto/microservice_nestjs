import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateReservationDto {

   @IsDate()
   @Type(() => Date)
   startDate: Date;

   @IsDate()
   @Type(() => Date)
   endDate: Date;

   @IsString()
   @Type(() => String)
   @IsNotEmpty()
   placeId: string;

   @IsString()
   @Type(() => String)
   @IsNotEmpty()
   invoiceId: string;
}
