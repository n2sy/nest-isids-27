import { IsIn, IsNotEmpty, IsNumber, IsString, Max, Min, MinLength } from "class-validator";


export class AddTaskDTO {

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    public title: string;

    @IsString()
    @IsIn(["todo", "in progress", "done"])
    public status: string;

    @IsNumber()
    @Min(2020)
    @Max(2040)
    public year: number;

}
