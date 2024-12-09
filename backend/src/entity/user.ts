import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Report } from './report';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @Column({ select: false })
  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  studentId: string;

  @Column()
  year: number;

  @Column()
  education: string;

  @Column('text',{ nullable: true })
  avatar: string;

  // 关联工作报告
  reports: Report[];
}
