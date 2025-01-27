import sequelize from "../db.js";
import { messaging } from "../firebaseConfig.js";

export async function sendNotification(text) {
  const [result] = await sequelize?.query(
    `select * from public.get_all_tokens();`
  );

  let tokens = result?.map((val) => val?.token_data);

  const message = {
    data: {
      msg: text,
    },
    tokens: tokens,
  };

  messaging
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
}

export const addToken = async (req, res) => {
  const { token } = req?.body;
  try {
    const [result] = await sequelize.query(
      `select * from public.insert_token(:token);`,
      {
        replacements: {
          token: token,
        },
      }
    );
    return res.json({ data: result });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
