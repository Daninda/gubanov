const Router = require("express");
const router = new Router();
const controller = require("./controller");

router.get("/teachers", controller.getTeachers);
router.get("/teacher-raw/:id", controller.getTeacherRaw);
router.put("/teacher/:id", controller.updateTeacher);
router.post("/teacher", controller.createTeacher);
router.delete("/teacher/:id", controller.deleteTeacher);

router.get("/students", controller.getStudents);
router.get("/student-raw/:id", controller.getStudentRaw);
router.put("/student/:id", controller.updateStudent);
router.post("/student", controller.createStudent);
router.delete("/student/:id", controller.deleteStudent);

router.get("/topics", controller.getTopics);
router.get("/topic/:id", controller.getTopic);
router.get("/topic-raw/:id", controller.getTopicRaw);
router.get("/free-teacher-topics/:id", controller.getFreeTeacherTopics);
router.put("/topic/:id", controller.updateTopic);
router.post("/topic", controller.createTopic);
router.delete("/topic/:id", controller.deleteTopic);

router.get("/departments", controller.getDepartments);
router.get("/department-raw/:id", controller.getDepartmentRaw);
router.put("/department/:id", controller.updateDepartment);
router.post("/department", controller.createDepartment);
router.delete("/department/:id", controller.deleteDepartment);

router.get("/faculties", controller.getFaculties);
router.get("/faculty-raw/:id", controller.getFacultyRaw);
router.put("/faculty/:id", controller.updateFaculty);
router.post("/faculty", controller.createFaculty);
router.delete("/faculty/:id", controller.deleteFaculty);

router.get("/groups", controller.getGroups);
router.get("/group-raw/:id", controller.getGroupRaw);
router.put("/group/:id", controller.updateGroup);
router.post("/group", controller.createGroup);
router.delete("/group/:id", controller.deleteGroup);

router.get("/science-degrees", controller.getScienceDegrees);
router.get("/science-degree-raw/:id", controller.getScienceDegreeRaw);
router.put("/science-degree/:id", controller.updateScienceDegree);
router.post("/science-degree", controller.createScienceDegree);
router.delete("/science-degree/:id", controller.deleteScienceDegree);

router.get("/teacher-ranks", controller.getTeacherRanks);
router.get("/teacher-rank-raw/:id", controller.getTeacherRankRaw);
router.put("/teacher-rank/:id", controller.updateTeacherRank);
router.post("/teacher-rank", controller.createTeacherRank);
router.delete("/teacher-rank/:id", controller.deleteTeacherRank);

module.exports = router;
