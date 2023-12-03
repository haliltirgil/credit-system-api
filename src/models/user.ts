import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { MaxLength, MinLength } from 'class-validator';
import { MAX_LENGTH, MIN_LENGTH } from '../constants/const-variables';

@Entity('Users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @MinLength(MIN_LENGTH)
  @MaxLength(MAX_LENGTH)
  @Column({ nullable: false })
  firstName: string;

  @MinLength(MIN_LENGTH)
  @MaxLength(MAX_LENGTH)
  @Column({ nullable: false })
  lastName: string;
}
