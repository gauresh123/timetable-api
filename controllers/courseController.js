import sequelize from "../db.js";

export const getCourses = async (req, res) => {
  try {
    const [result] = await sequelize.query(
      `select * from public.get_courses();`
    );
    return res.json({ data: result });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const addCourse = async (req, res) => {
  const { courseid, coursename, description, startdate, enddate, teacher } =
    req?.body;
  try {
    const [result] = await sequelize.query(
      `select * from public.manage_course(:mode,:courseid,:coursename,:description,:startdate,:enddate,:teacher);`,
      {
        replacements: {
          mode: "insert",
          courseid: courseid,
          coursename: coursename,
          description: description,
          startdate: startdate,
          enddate: enddate,
          teacher: teacher,
        },
      }
    );
    return res.json({ data: result });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateCourse = async (req, res) => {
  const { courseid, coursename, description, startdate, enddate, teacher } =
    req?.body;
  try {
    const [result] = await sequelize.query(
      `select * from public.manage_course(:mode,:courseid,:coursename,:description,:startdate,:enddate,:teacher);`,
      {
        replacements: {
          mode: "update",
          courseid: courseid,
          coursename: coursename,
          description: description,
          startdate: startdate,
          enddate: enddate,
          teacher: teacher,
        },
      }
    );
    return res.json({ data: result });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  const { courseid, coursename, description, startdate, enddate, teacher } =
    req?.body;
  try {
    const [result] = await sequelize.query(
      `select * from public.manage_course(:mode,:courseid,:coursename,:description,:startdate,:enddate,:teacher);`,
      {
        replacements: {
          mode: "delete",
          courseid: courseid,
          coursename: coursename,
          description: description,
          startdate: startdate,
          enddate: enddate,
          teacher: teacher,
        },
      }
    );
    return res.json({ data: result });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
