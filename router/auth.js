import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../relaciones/relaciones.js";
import dotenv from "dotenv";
import { Router } from "express";
import { differenceInMinutes } from "date-fns";
dotenv.config();
const auth = Router();

auth.post("/authUser", async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const user = await User.findOne({ where: { correo } });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isValid = await bcrypt.compare(
      contrasena,
      user.dataValues.contrasena
    );

    const currentTime = new Date();
    const blockedTime = new Date(user.last_Failed_Login);
    const minuteDifference = differenceInMinutes(currentTime, blockedTime);

    if (user.blocked) {
      if (minuteDifference >= 3) {
        await User.update(
          { blocked: false, failed_login: 0 },
          { where: { correo } }
        );
        throw new Error("Usuario bloqueado");
      } else {
        res.status(401).json({
          msg: `El usuario ha sido bloqueado.`,
        });
      }
      return true;
    }

    if (!isValid) {
      let failed_login = user.failed_login || 0;
      failed_login++;

      const currentDate = new Date().toISOString();
      if (failed_login >= 3) {
        await User.update(
          { blocked: true, last_Failed_Login: currentDate },
          { where: { correo } }
        );

        res.status(404).json({
          msg: `El usuario ha sido bloqueado.`,
        });
        return;
      } else {
        await User.update(
          { failed_login, last_Failed_Login: currentDate },
          { where: { correo } }
        );
        res.status(400).json({ msg: `El usuario no tiene permisos` });
        return;
      }
    }

    const payload = { id: user.dataValues.id };

    const token = jwt.sign(payload, "sdnsuidcsbkfcsnbcjksbhic", {
      expiresIn: "1h",
    });

    return res.status(200).json({
      user,
      token,
    });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

export default auth;
