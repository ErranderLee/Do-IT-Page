import { Department } from 'src/departments/entities/department.entity';
import { Study } from 'src/studies/entity/study.entity';
import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  BeforeInsert,
  BaseEntity,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ForbiddenException } from '@nestjs/common';
import { Project, ProjectTechStack } from 'src/projects/entity/project.entity';
import { Reservation } from 'src/reservation/entitiy/reservation.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ThrowFailResponse } from 'src/commons/dto/response-common.dto';

@Entity('User')
export class User extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  userIdx: number;
  @ApiProperty()
  @Column()
  id: string;
  @ApiProperty()
  @Column()
  password: string;
  @ApiProperty()
  @Column()
  studentId: number;
  @ApiProperty()
  @Column()
  name: string;
  @ApiProperty()
  @Column()
  phoneNumber: string;
  @ApiProperty()
  @Column({ unique: true })
  email: string;
  @ApiProperty()
  @CreateDateColumn()
  createdAt: string;
  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: string;
  @ApiProperty()
  @Column()
  status: string;
  // @OneToMany((_type) => UserTechStack, (_type) => _type.user)
  // userTechStacks: UserTechStack[];
  @OneToMany(
    (_type) => UserDepartment,
    (userDepartments) => userDepartments.user,
  )
  userDepartments: UserDepartment[];

  @OneToMany((_type) => UserSocial, (_type) => _type.user)
  userSocials: UserSocial[];

  @OneToMany((_type) => UserStudy, (_type) => _type.user)
  userStudies: UserStudy[];

  @OneToMany((_type) => UserProject, (_type) => _type.user)
  userProjects: UserProject[];

  @OneToMany((_type) => Reservation, (_type) => _type.user)
  reservations: Reservation[];

  @BeforeInsert()
  async hashPassword() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.log(error);
      throw new ThrowFailResponse('??????????????? ?????????????????????.');
    }
  }
  async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
  static async findByLogin(id: string, password: string) {
    const user = await User.findOne({ id });
    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new ThrowFailResponse('???????????? ??????????????? ?????? ??????????????????.');
    return user;
  }
}

// @Entity()
// export class TechStack extends BaseEntity {
//   @ApiProperty()
//   @PrimaryGeneratedColumn()
//   techStackIdx: number;
//   @ApiProperty()
//   @Column()
//   name: string;
//   @OneToMany((_type) => UserTechStack, (_type) => _type.techStack)
//   userTechStacks: UserTechStack[];
//   @OneToMany((_type) => ProjectTechStack, (_type) => _type.techStack)
//   projectTechStacks: ProjectTechStack[];
// }

// @Entity()
// export class UserTechStack extends BaseEntity {
//   @ApiProperty()
//   @PrimaryGeneratedColumn()
//   userTechStack: number;
//   @ApiProperty()
//   @Column()
//   userIdx: number;
//   @ApiProperty()
//   @Column()
//   techStackIdx: number;

//   @ManyToOne((_type) => User, (_type) => _type.userTechStacks)
//   user: User;

//   @ManyToOne((_type) => TechStack, (_type) => _type.userTechStacks)
//   techStack: TechStack;
// }

@Entity()
export class UserDepartment extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  userDepartmentIdx: number;
  @ApiProperty()
  @Column()
  userIdx: number;
  @ApiProperty()
  @Column()
  departmentIdx: number;
  @ApiProperty()
  @Column()
  sort: string;

  @ManyToOne(() => User, (user) => user.userDepartments)
  @JoinColumn({ name: 'userIdx', referencedColumnName: 'userIdx' })
  user: User;

  @ManyToOne(() => Department, (department) => department.userDepartments)
  @JoinColumn({ name: 'departmentIdx', referencedColumnName: 'departmentIdx' })
  department: Department;
}

@Entity()
export class UserStudy extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  userStudyIdx: number;
  @ApiProperty()
  @Column()
  userIdx: number;
  @ApiProperty()
  @Column()
  studyIdx: number;
  @ApiProperty()
  @Column({
    default: 'waiting',
  })
  status: string;
  @ManyToOne(() => User, (user) => user.userStudies)
  @JoinColumn({ name: 'userIdx', referencedColumnName: 'userIdx' })
  user: User;
  @ManyToOne(() => Study, (study) => study.userStudies)
  @JoinColumn({ name: 'studyIdx', referencedColumnName: 'studyIdx' })
  study: Study;
}

@Entity()
export class UserProject extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  userProjectIdx: number;
  @ApiProperty()
  @Column()
  userIdx: number;
  @ApiProperty()
  @Column()
  projectIdx: number;
  @ApiProperty()
  @Column({
    default: 'waiting',
  })
  status: string;
  @ManyToOne(() => User, (user) => user.userProjects)
  @JoinColumn({ name: 'userIdx', referencedColumnName: 'userIdx' })
  user: User;
  @ManyToOne(() => Project, (project) => project.userProjects)
  @JoinColumn({ name: 'projectIdx', referencedColumnName: 'projectIdx' })
  project: Project;
}

@Entity()
export class UserSocial extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  userSocialIdx: number;
  @ApiProperty()
  @Column()
  userIdx: number;
  @ApiProperty()
  @Column()
  name: string;
  @ApiProperty()
  @Column()
  id: string;
  @ApiProperty()
  @Column()
  status: string;
  @ApiProperty()
  @Column()
  createdAt: string;
  @ApiProperty()
  @Column()
  updatedAt: string;

  @ManyToOne((_type) => User, (_type) => _type.userSocials)
  user: User;
}
