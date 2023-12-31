import prisma from "../db";
import { ProgramCourse } from "./programs/programCourse";
import { Prisma, ProgramCourse as prismaProgramCourse } from "@prisma/client";

const getNormalizedDataFromProgramCourse = (
  programCourse: prismaProgramCourse
) => {
  const { englishName, arabicName, code, programId, creditHours } =
    programCourse;
  const program = { connect: { id: programId } };
  return {
    englishName,
    arabicName,
    code,
    creditHours,
    program,
  };
};

const getAllSelect = {
  select: {
    id: true,
    englishName: true,
    arabicName: true,
    levelId: true,
    lectureCount: true,
    labCount: true,
    sectionGroupCount: true,
    labGroupCount: true,
    hasLectureGroups: true,
    lectureGroupCount: true,
    lectureHrs: true,
    sectionHrs: true,
    labHrs: true,
  },
};

export class CourseInstance {
  static get = async (id: string) => {
    const data = await prisma.courseInstance.findUnique({
      where: { id },
    });
    return data;
  };

  static getAll = async (filter: Prisma.CourseInstanceWhereInput) => {
    const data = await prisma.courseInstance.findMany({
      where: filter,
      ...getAllSelect,
    });
    return data;
  };

  static getProfessorInstances = async (
    filter: Prisma.CourseInstanceWhereInput
  ) => {
    const data = await prisma.courseInstance.findMany({
      where: filter,
      select: {
        id: true,
        englishName: true,
        arabicName: true,
        levelId: true,
        code: true,
      },
    });
    return data;
  };

  static getAllStudents = async (id: string) => {
    const data = await prisma.studentCourseInstance.findMany({
      where: { instanceId: id },
      select: {
        student: {
          select: {
            id: true,
            englishName: true,
            arabicName: true,
            nationalId: true,
          },
        },
        finished: true,
        midtermScore: true,
        classworkScore: true,
        finalScore: true,
      },
    });
    return data;
  };
  static assignProfessor = async (
    professorId: string,
    courseInstanceId: string
  ) => {
    const data = await prisma.courseInstance.updateMany({
      where: { id: courseInstanceId },
      data: { professorId },
    });
    return data;
  };

  static assignMarks = async (
    courseInstanceId: string,
    data: any
  ) => {
    const assigned = await prisma.studentCourseInstance.updateMany({
      where: { instanceId: courseInstanceId },
      data,
    });
    return assigned;
  };

  static getStudentAvailableClasses = async (
    semesterId: string,
    availableCourses: string[] | undefined
  ) => {
    const data = await prisma.courseInstance.findMany({
      where: {
        academicSemesterId: semesterId,
        programCourseId: {
          in: availableCourses,
        },
      },
      select: {
        id: true,
        classes: true,
        level: true,
      },
    });
    return data;
  };

  static getStudents = async (id: string) => {
    const data = await prisma.studentCourseInstance.findMany({
      where: {
        studentId: id,
      },
      include: {
        instance: {
          select: {
            id: true,
            englishName: true,
            arabicName: true,
            code: true,
          },
        },
      },
    });
    return data;
  };

  static create = async (data: any) => {
    const {
      academicSemesterId,
      programCourseId,
      levelId,
      professorId,
      ...rest
    } = data;
    // get normalized data from program course
    const programCourseData = await ProgramCourse.get(programCourseId);
    if (!programCourseData) throw new Error("Program Course is required");
    const normalizedData =
      getNormalizedDataFromProgramCourse(programCourseData);
    const level = levelId ? { connect: { id: levelId } } : undefined;
    const academicSemester = academicSemesterId
      ? { connect: { id: academicSemesterId } }
      : undefined;
    const programCourse = programCourseId
      ? { connect: { id: programCourseId } }
      : undefined;
    const professor = professorId
      ? { connect: { id: professorId } }
      : undefined;

    const courseInstance = await prisma.courseInstance.create({
      data: {
        ...rest,
        ...normalizedData,
        academicSemester,
        programCourse,
        level,
        professor,
      },
    });
    return courseInstance;
  };

  static update = async (id: string, data: any) => {
    const { professorId, ...rest } = data;
    const professor = professorId
      ? { connect: { id: professorId } }
      : undefined;
    const courseInstance = await prisma.courseInstance.update({
      where: { id },
      data: {
        ...rest,
        professor,
      },
    });
    return courseInstance;
  };
}
