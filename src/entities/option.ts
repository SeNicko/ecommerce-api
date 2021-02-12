import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	ManyToOne,
} from 'typeorm';
import { Variant } from './variant';

export interface IOption {
	option: string;
}

@Entity()
export class Option extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	option!: string;

	@ManyToOne(() => Variant, variant => variant.options, { onDelete: 'CASCADE' })
	variant!: Variant;
}
