import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dish {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 255})
    name: string;

    @Column({type: "text"})
    photo_url: string;

    @Column({type: "text"})
    ingredients: string;

    @Column({type: "text"})
    description: string;

    @Column({type: "boolean", default: true})
    is_selectable: boolean;
}