import sequelize from "../db.js";
import { sendNotification } from "../service/Notification.js";

export const getTimeTables = async (req, res) => {
  try {
    const [result] = await sequelize.query(
      `select * from public.get_all_timetables();`
    );
    return res.json({ data: result });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const addTimeTable = async (req, res) => {
  const { name, timetable, date } = req?.body;
  try {
    const [result] = await sequelize.query(
      `select * from public.insert_timetable(:name,:timetable,:date);`,
      {
        replacements: {
          name: name,
          timetable: JSON.stringify(timetable),
          date: date,
        },
      }
    );
    return res.json({ data: result });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateTimeTable = async (req, res) => {
  const { name, timetable, date } = req?.body;
  const { id } = req?.params;
  try {
    const [result] = await sequelize.query(
      `select * from public.update_timetable(:id,:name,:timetable,:date);`,
      {
        replacements: {
          id: id,
          name: name,
          timetable: JSON.stringify(timetable),
          date: date,
        },
      }
    );
    await sendNotification(`Time Table ${name} is updated`);
    return res.json({ data: result });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteTimeTable = async (req, res) => {
  const { id } = req?.body;

  try {
    const [result] = await sequelize.query(
      `select * from public.delete_timetable(:id);`,
      {
        replacements: {
          id: id,
        },
      }
    );
    return res.json({ data: result });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
