import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateReservationDto {
    @IsString()
    @ApiProperty({
        description: '예약 시작 날짜',
        example: '2022-2-22'
    })
    reservationStartDate: string;
    @ApiProperty({
        description: '예약 시작 시간',
        example: '18:00:00'
    })
    reservationStartHour: string;
    @IsString()
    @ApiProperty({
        description: '예약 종료 날짜',
        example: '2022-2-24'
    })
    reservationEndDate: string;
    @ApiProperty({
        description: '예약 종료 시간',
        example: '18:00:00'
    })
    reservationEndHour: string;
    @IsInt()
    @ApiProperty({
        description: '신청 유저 인덱스',
        example: '1'
    })
    userIdx: number;
    @IsString()
    @ApiProperty({
        description: '신청 유저 이름',
        example: '홍길동'
    })
    userName: string;
}