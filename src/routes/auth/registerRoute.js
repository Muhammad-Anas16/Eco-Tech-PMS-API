import { auth } from "../../utils/auth.js";

const registerRoute = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const resurlt = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      asResponse: false, // data return karega
    });
  } catch (error) {}
};

export default registerRoute;
